
import mongoose from "mongoose";
import Project from "../models/Project.js";
import { cloudinary, cloudinaryConfigured } from "../config/cloudinary.js";
import { slugify } from "../utils/slugify.js";

function parseBoolean(value, fallback = false) {
  if (value === undefined) return fallback;
  return value === true || value === "true";
}

function parseTechnologies(value) {
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  if (typeof value !== "string" || !value.trim()) return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.map(String).map((item) => item.trim()).filter(Boolean);
    }
  } catch {
    // A comma-separated list is also accepted.
  }

  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function validOptionalUrl(value) {
  if (!value) return "";

  try {
    const parsed = new URL(value);
    return ["http:", "https:"].includes(parsed.protocol) ? parsed.toString() : null;
  } catch {
    return null;
  }
}

async function makeUniqueSlug(title, currentId = null) {
  const base = slugify(title);

  if (!base) {
    const error = new Error("Project title must contain letters or numbers.");
    error.statusCode = 400;
    throw error;
  }

  let slug = base;
  let suffix = 2;

  while (true) {
    const existing = await Project.findOne({ slug }).select("_id");

    if (!existing || (currentId && existing._id.toString() === currentId.toString())) {
      return slug;
    }

    slug = `${base}-${suffix++}`;
  }
}

async function deleteCloudinaryImage(publicId) {
  if (!publicId || !cloudinaryConfigured) return;

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    // A failed remote deletion should not crash the request.
    console.error("Cloudinary image cleanup failed:", error.message);
  }
}

function sendValidationError(res, message) {
  return res.status(400).json({ success: false, message });
}

export async function getPublishedProjects(req, res, next) {
  try {
    const projects = await Project.find({ status: "published" })
      .sort({ featured: -1, sortOrder: 1, createdAt: -1 })
      .lean();

    res.json({ success: true, projects });
  } catch (error) {
    next(error);
  }
}

export async function getPublishedProjectBySlug(req, res, next) {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      status: "published",
    }).lean();

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    res.json({ success: true, project });
  } catch (error) {
    next(error);
  }
}

export async function getAllAdminProjects(req, res, next) {
  try {
    const projects = await Project.find()
      .sort({ updatedAt: -1 })
      .lean();

    res.json({ success: true, projects });
  } catch (error) {
    next(error);
  }
}

export async function createProject(req, res, next) {
  let uploadedImageId;

  try {
    if (!cloudinaryConfigured) {
      return res.status(503).json({
        success: false,
        message: "Image storage is not configured on the server.",
      });
    }

    const {
      title,
      category,
      shortDescription,
      description,
      liveUrl = "",
      githubUrl = "",
      year,
      sortOrder,
      technologies,
      featured,
      status,
    } = req.body ?? {};

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof category !== "string" ||
      !category.trim() ||
      typeof shortDescription !== "string" ||
      !shortDescription.trim() ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      return sendValidationError(
        res,
        "Title, category, short description, and description are required."
      );
    }

    if (!req.file?.path || !req.file?.filename) {
      return sendValidationError(res, "Please upload a project cover image.");
    }

    uploadedImageId = req.file.filename;

    const safeLiveUrl = validOptionalUrl(liveUrl);
    const safeGithubUrl = validOptionalUrl(githubUrl);

    if (safeLiveUrl === null || safeGithubUrl === null) {
      return sendValidationError(res, "Project URLs must use http or https.");
    }

    const project = await Project.create({
      title: title.trim(),
      slug: await makeUniqueSlug(title),
      category: category.trim(),
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      technologies: parseTechnologies(technologies),
      coverImage: {
        url: req.file.path,
        publicId: req.file.filename,
      },
      liveUrl: safeLiveUrl,
      githubUrl: safeGithubUrl,
      featured: parseBoolean(featured),
      status: status === "published" ? "published" : "draft",
      year: year && Number.isFinite(Number(year)) ? Number(year) : new Date().getFullYear(),
      sortOrder: sortOrder && Number.isFinite(Number(sortOrder)) ? Number(sortOrder) : 0,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project,
    });
  } catch (error) {
    if (uploadedImageId) await deleteCloudinaryImage(uploadedImageId);
    next(error);
  }
}

export async function updateProject(req, res, next) {
  let uploadedImageId;

  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID.",
      });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    const body = req.body ?? {};

    if (body.title !== undefined) {
      if (typeof body.title !== "string" || !body.title.trim()) {
        return sendValidationError(res, "Project title cannot be empty.");
      }
      project.title = body.title.trim();
      project.slug = await makeUniqueSlug(body.title, project._id);
    }

    for (const field of ["category", "shortDescription", "description"]) {
      if (body[field] !== undefined) {
        if (typeof body[field] !== "string" || !body[field].trim()) {
          return sendValidationError(res, `${field} cannot be empty.`);
        }
        project[field] = body[field].trim();
      }
    }

    if (body.technologies !== undefined) {
      project.technologies = parseTechnologies(body.technologies);
    }

    if (body.liveUrl !== undefined) {
      const url = validOptionalUrl(body.liveUrl);
      if (url === null) return sendValidationError(res, "Live URL must use http or https.");
      project.liveUrl = url;
    }

    if (body.githubUrl !== undefined) {
      const url = validOptionalUrl(body.githubUrl);
      if (url === null) return sendValidationError(res, "GitHub URL must use http or https.");
      project.githubUrl = url;
    }

    if (body.featured !== undefined) {
      project.featured = parseBoolean(body.featured);
    }

    if (body.status !== undefined) {
      if (!["draft", "published"].includes(body.status)) {
        return sendValidationError(res, "Status must be draft or published.");
      }
      project.status = body.status;
    }

    if (body.year !== undefined && Number.isFinite(Number(body.year))) {
      project.year = Number(body.year);
    }

    if (body.sortOrder !== undefined && Number.isFinite(Number(body.sortOrder))) {
      project.sortOrder = Number(body.sortOrder);
    }

    if (req.file) {
      if (!cloudinaryConfigured || !req.file.path || !req.file.filename) {
        return res.status(503).json({
          success: false,
          message: "Image storage is not configured correctly.",
        });
      }

      uploadedImageId = req.file.filename;
      const previousImageId = project.coverImage?.publicId;

      project.coverImage = {
        url: req.file.path,
        publicId: req.file.filename,
      };

      await project.save();
      await deleteCloudinaryImage(previousImageId);

      return res.json({
        success: true,
        message: "Project updated successfully.",
        project,
      });
    }

    await project.save();

    res.json({
      success: true,
      message: "Project updated successfully.",
      project,
    });
  } catch (error) {
    if (uploadedImageId) await deleteCloudinaryImage(uploadedImageId);
    next(error);
  }
}

export async function deleteProject(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID.",
      });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    await project.deleteOne();

    if (project.coverImage?.publicId) {
      await deleteCloudinaryImage(project.coverImage.publicId);
    }

    res.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}

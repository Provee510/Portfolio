
import mongoose from "mongoose";
import Project from "../models/Project.js";
import { cloudinary, cloudinaryConfigured } from "../config/cloudinary.js";
import { slugify } from "../utils/slugify.js";

function parseBoolean(value, fallback = false) {
  if (value === undefined) return fallback;
  return value === true || value === "true";
}

function parseTechnologies(value) {
  if (Array.isArray(value)) {
    return value
      .map(String)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value !== "string" || !value.trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed
        .map(String)
        .map((item) => item.trim())
        .filter(Boolean);
    }
  } catch {
    // Also support comma-separated technologies.
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function validOptionalUrl(value) {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  if (typeof value !== "string") {
    return null;
  }

  try {
    const parsed = new URL(value.trim());

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

/**
 * Generate a homepage screenshot URL from a live website URL.
 * This uses thum.io; the screenshot is not uploaded to Cloudinary.
 */
function makeWebsiteScreenshotUrl(websiteUrl) {
  if (!websiteUrl) return "";

  const safeUrl = validOptionalUrl(websiteUrl);

  if (!safeUrl) return "";

  return `https://image.thum.io/get/width/1200/crop/900/noanimate/${safeUrl}`;
}

/**
 * Screenshot URLs are external images, not Cloudinary assets.
 * Never send their synthetic IDs to Cloudinary for deletion.
 */
function isExternalScreenshot(publicId) {
  return (
    typeof publicId === "string" &&
    publicId.startsWith("external-screenshot:")
  );
}

async function makeUniqueSlug(title, currentId = null) {
  const base = slugify(title);

  if (!base) {
    const error = new Error(
      "Project title must contain letters or numbers."
    );
    error.statusCode = 400;
    throw error;
  }

  let slug = base;
  let suffix = 2;

  while (true) {
    const existing = await Project.findOne({ slug }).select("_id");

    if (
      !existing ||
      (currentId && existing._id.toString() === currentId.toString())
    ) {
      return slug;
    }

    slug = `${base}-${suffix++}`;
  }
}

async function deleteCloudinaryImage(publicId) {
  if (
    !publicId ||
    !cloudinaryConfigured ||
    isExternalScreenshot(publicId)
  ) {
    return;
  }

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    // A failed remote deletion should not crash the request.
    console.error("Cloudinary image cleanup failed:", error.message);
  }
}

function sendValidationError(res, message) {
  return res.status(400).json({
    success: false,
    message,
  });
}

/**
 * Public: return published projects.
 */
export async function getPublishedProjects(req, res, next) {
  try {
    const projects = await Project.find({ status: "published" })
      .sort({ featured: -1, sortOrder: 1, createdAt: -1 })
      .lean();

    res.json({
      success: true,
      projects,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Public: return one published project by slug.
 */
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

    res.json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Admin: return every project, including drafts.
 */
export async function getAllAdminProjects(req, res, next) {
  try {
    const projects = await Project.find()
      .sort({ updatedAt: -1 })
      .lean();

    res.json({
      success: true,
      projects,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Admin: create a project.
 *
 * An uploaded cover image is optional.
 * If there is no uploaded image, the live website screenshot is used.
 */
export async function createProject(req, res, next) {
  let uploadedImageId = null;

  try {
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

    const safeLiveUrl = validOptionalUrl(liveUrl);
    const safeGithubUrl = validOptionalUrl(githubUrl);

    if (safeLiveUrl === null) {
      return sendValidationError(
        res,
        "Live URL must be a valid HTTP or HTTPS URL."
      );
    }

    if (safeGithubUrl === null) {
      return sendValidationError(
        res,
        "GitHub URL must be a valid HTTP or HTTPS URL."
      );
    }

    // Use an uploaded Cloudinary image if supplied.
    // Otherwise, generate a screenshot from the live website URL.
    let coverImage;

    if (req.file) {
      if (
        !cloudinaryConfigured ||
        !req.file.path ||
        !req.file.filename
      ) {
        return res.status(503).json({
          success: false,
          message:
            "Image storage is not configured correctly. Remove the uploaded image or configure Cloudinary.",
        });
      }

      uploadedImageId = req.file.filename;

      coverImage = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    } else {
      if (!safeLiveUrl) {
        return sendValidationError(
          res,
          "Enter a live website URL to generate the homepage screenshot."
        );
      }

      coverImage = {
        url: makeWebsiteScreenshotUrl(safeLiveUrl),
        publicId: `external-screenshot:${Date.now()}`,
      };
    }

    const project = await Project.create({
      title: title.trim(),
      slug: await makeUniqueSlug(title),
      category: category.trim(),
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      technologies: parseTechnologies(technologies),
      coverImage,
      liveUrl: safeLiveUrl,
      githubUrl: safeGithubUrl,
      featured: parseBoolean(featured),
      status: status === "published" ? "published" : "draft",
      year:
        year !== undefined &&
        year !== "" &&
        Number.isFinite(Number(year))
          ? Number(year)
          : new Date().getFullYear(),
      sortOrder:
        sortOrder !== undefined &&
        sortOrder !== "" &&
        Number.isFinite(Number(sortOrder))
          ? Number(sortOrder)
          : 0,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project,
    });
  } catch (error) {
    if (uploadedImageId) {
      await deleteCloudinaryImage(uploadedImageId);
    }

    next(error);
  }
}

/**
 * Admin: update a project.
 *
 * Updating liveUrl refreshes the screenshot URL when the project uses
 * an external screenshot. An uploaded replacement image takes priority.
 */
export async function updateProject(req, res, next) {
  let uploadedImageId = null;

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
    const previousImageId = project.coverImage?.publicId;

    if (body.title !== undefined) {
      if (
        typeof body.title !== "string" ||
        !body.title.trim()
      ) {
        return sendValidationError(
          res,
          "Project title cannot be empty."
        );
      }

      project.title = body.title.trim();
      project.slug = await makeUniqueSlug(
        body.title,
        project._id
      );
    }

    for (const field of [
      "category",
      "shortDescription",
      "description",
    ]) {
      if (body[field] !== undefined) {
        if (
          typeof body[field] !== "string" ||
          !body[field].trim()
        ) {
          return sendValidationError(
            res,
            `${field} cannot be empty.`
          );
        }

        project[field] = body[field].trim();
      }
    }

    if (body.technologies !== undefined) {
      project.technologies = parseTechnologies(
        body.technologies
      );
    }

    if (body.liveUrl !== undefined) {
      const url = validOptionalUrl(body.liveUrl);

      if (url === null) {
        return sendValidationError(
          res,
          "Live URL must be a valid HTTP or HTTPS URL."
        );
      }

      project.liveUrl = url;
    }

    if (body.githubUrl !== undefined) {
      const url = validOptionalUrl(body.githubUrl);

      if (url === null) {
        return sendValidationError(
          res,
          "GitHub URL must be a valid HTTP or HTTPS URL."
        );
      }

      project.githubUrl = url;
    }

    if (body.featured !== undefined) {
      project.featured = parseBoolean(body.featured);
    }

    if (body.status !== undefined) {
      if (!["draft", "published"].includes(body.status)) {
        return sendValidationError(
          res,
          "Status must be draft or published."
        );
      }

      project.status = body.status;
    }

    if (
      body.year !== undefined &&
      body.year !== "" &&
      Number.isFinite(Number(body.year))
    ) {
      project.year = Number(body.year);
    }

    if (
      body.sortOrder !== undefined &&
      body.sortOrder !== "" &&
      Number.isFinite(Number(body.sortOrder))
    ) {
      project.sortOrder = Number(body.sortOrder);
    }

    // A newly uploaded image replaces the existing screenshot/image.
    if (req.file) {
      if (
        !cloudinaryConfigured ||
        !req.file.path ||
        !req.file.filename
      ) {
        return res.status(503).json({
          success: false,
          message:
            "Image storage is not configured correctly.",
        });
      }

      uploadedImageId = req.file.filename;

      project.coverImage = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    } else if (
      body.liveUrl !== undefined &&
      isExternalScreenshot(previousImageId)
    ) {
      // Refresh the screenshot URL when the website URL changes.
      if (project.liveUrl) {
        project.coverImage = {
          url: makeWebsiteScreenshotUrl(project.liveUrl),
          publicId: `external-screenshot:${Date.now()}`,
        };
      } else {
        return sendValidationError(
          res,
          "A live website URL is required when using a website screenshot as the cover image."
        );
      }
    } else if (
      !project.coverImage?.url &&
      project.liveUrl
    ) {
      // Repair older records that have a live URL but no cover image.
      project.coverImage = {
        url: makeWebsiteScreenshotUrl(project.liveUrl),
        publicId: `external-screenshot:${Date.now()}`,
      };
    }

    await project.save();

    // Remove the previous image only after the update succeeds.
    if (
      previousImageId &&
      previousImageId !== project.coverImage?.publicId
    ) {
      await deleteCloudinaryImage(previousImageId);
    }

    return res.json({
      success: true,
      message: "Project updated successfully.",
      project,
    });
  } catch (error) {
    // Clean up a newly uploaded image if saving the update fails.
    if (uploadedImageId) {
      await deleteCloudinaryImage(uploadedImageId);
    }

    next(error);
  }
}

/**
 * Admin: delete a project and its Cloudinary image, if applicable.
 */
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
      await deleteCloudinaryImage(
        project.coverImage.publicId
      );
    }

    return res.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}

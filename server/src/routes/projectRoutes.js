
import { Router } from "express";
import multer from "multer";

import { storage, cloudinaryConfigured } from "../config/cloudinary.js";
import { requireAdmin } from "../middleware/auth.js";
import {
  getPublishedProjects,
  getPublishedProjectBySlug,
  getAllAdminProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = Router();

const upload = multer({
  storage: storage || undefined,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
  fileFilter(req, file, callback) {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(new Error("Upload a JPG, PNG, or WebP image."));
    }

    callback(null, true);
  },
});

function requireImageStorage(req, res, next) {
  if (!cloudinaryConfigured || !storage) {
    return res.status(503).json({
      success: false,
      message: "Cloudinary image storage is not configured.",
    });
  }

  next();
}

// Public routes.
router.get("/", getPublishedProjects);
router.get("/admin/all", requireAdmin, getAllAdminProjects);
router.get("/:slug", getPublishedProjectBySlug);

// Protected admin routes.
router.post(
  "/",
  requireAdmin,
  requireImageStorage,
  upload.single("coverImage"),
  createProject
);

router.put(
  "/:id",
  requireAdmin,
  (req, res, next) => {
    if (req.headers["content-type"]?.includes("multipart/form-data")) {
      return requireImageStorage(req, res, next);
    }
    next();
  },
  (req, res, next) => {
    if (req.headers["content-type"]?.includes("multipart/form-data")) {
      return upload.single("coverImage")(req, res, next);
    }
    next();
  },
  updateProject
);

router.delete("/:id", requireAdmin, deleteProject);

export default router;

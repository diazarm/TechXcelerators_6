import { Router } from "express";
import {
  getSections,
  getSectionById,
  createSection,
  updateSection,
  softDeleteSection,
  restoreSection
} from "../controllers/sectionController";
import { authMiddleware } from "../middlewares/auth.middleware";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware";

const sectionRouter = Router();

sectionRouter.get("/", authMiddleware, getSections);
sectionRouter.get("/:id", authMiddleware, getSectionById);
sectionRouter.post("/", authMiddleware, createSection);
sectionRouter.put("/:id", authMiddleware, updateSection);
sectionRouter.delete("/:id", authMiddleware, verifyAdmin, softDeleteSection);
sectionRouter.post("/:id/restore", authMiddleware, verifyAdmin, restoreSection);

export default sectionRouter;

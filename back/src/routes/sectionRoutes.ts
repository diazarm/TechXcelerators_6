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
import { isDirectorOrAdmin } from "../middlewares/isDirectorOrAdmin.middleware";

const sectionRouter = Router();

//Los usuarios autenticados pueden ver las secciones y filtrar por id
sectionRouter.get("/", authMiddleware, getSections);
sectionRouter.get("/:id", authMiddleware, getSectionById);

//Los directores y el administrador pueden crear y editar secciones
sectionRouter.post("/", authMiddleware, isDirectorOrAdmin, createSection);
sectionRouter.put("/:id", authMiddleware, isDirectorOrAdmin, updateSection);

//Sólo el administrador puede eliminar (soft delete) y restaurar secciones
sectionRouter.delete("/:id", authMiddleware, verifyAdmin, softDeleteSection);
sectionRouter.post("/:id/restore", authMiddleware, verifyAdmin, restoreSection);

export default sectionRouter;

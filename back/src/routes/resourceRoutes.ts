import { Router } from "express";
import { getResources, createResource, getResourceById, getResourcesBySection, updateResource, deleteResource, restoreResource, getResourcesByAlliance } from "../controllers/resourceController";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isDirectorOrAdmin } from "../middlewares/isDirectorOrAdmin.middleware";

const resourceRouter = Router();

//Todos los usuarios autenticados pueden ver,filtrar por seccion o editar los recursos
resourceRouter.get("/", authMiddleware, getResources);
resourceRouter.get('/alliance/:name', authMiddleware, getResourcesByAlliance);
resourceRouter.get("/:id", authMiddleware, getResourceById);
resourceRouter.get("/section/:sectionId", authMiddleware, getResourcesBySection);
resourceRouter.put("/:id", authMiddleware, updateResource);

//Los directores y el administrador pueden crear, eliminar (soft delete) y restaurar recursos
resourceRouter.post("/", authMiddleware, isDirectorOrAdmin, createResource);
resourceRouter.delete("/:id", authMiddleware, isDirectorOrAdmin, deleteResource);
resourceRouter.patch("/restore/:id", authMiddleware, isDirectorOrAdmin, restoreResource);

export default resourceRouter;
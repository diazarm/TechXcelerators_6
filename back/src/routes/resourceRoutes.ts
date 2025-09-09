import { Router } from "express";
import { getResources, createResource, getResourceById, getResourcesBySection, updateResource, deleteResource, restoreResource } from "../controllers/resourceController";
import { authMiddleware } from "../middlewares/auth.middleware";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware";

const resourceRouter = Router();

//Todos los usuarios autenticados pueden ver los recursos o filtrar por seccion
resourceRouter.get("/", authMiddleware, getResources);
resourceRouter.get("/:id", authMiddleware, getResourceById);
resourceRouter.get("/section/:sectionId", authMiddleware, getResourcesBySection);

//Todos los usuarios autenticados pueden crear y actualizar recursos
resourceRouter.post("/", authMiddleware, createResource);
resourceRouter.put("/:id", authMiddleware, updateResource);

//Solo Admin puede eliminar (soft delete) y restaurar recursos
resourceRouter.delete("/:id", authMiddleware, verifyAdmin, deleteResource);
resourceRouter.patch("/restore/:id", authMiddleware, verifyAdmin, restoreResource);

export default resourceRouter;
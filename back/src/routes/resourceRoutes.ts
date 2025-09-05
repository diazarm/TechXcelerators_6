import { Router } from "express";
import { getResources, createResource, getResourceById, getResourcesBySection, updateResource, deleteResource, restoreResource } from "../controllers/resourceController";

const resourceRouter = Router();

resourceRouter.get("/", getResources);
resourceRouter.post("/", createResource);
resourceRouter.get("/:id", getResourceById);
resourceRouter.get("/section/:sectionId", getResourcesBySection);
resourceRouter.put("/:id", updateResource);
resourceRouter.delete("/:id", deleteResource);
resourceRouter.patch("/restore/:id", restoreResource);

export default resourceRouter;
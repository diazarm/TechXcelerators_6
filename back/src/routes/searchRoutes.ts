import { Router } from "express";
import { search, getUserSearchKeywords } from "../controllers/searchController";
import { authMiddleware } from "../middlewares/auth.middleware";

const searchRouter = Router();

searchRouter.get("/", authMiddleware, search);
searchRouter.get("/keywords", authMiddleware, getUserSearchKeywords);

export default searchRouter;
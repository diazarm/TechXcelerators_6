import { Router } from "express";
import { searchController } from "../controllers/searchController";

const router = Router();

router.get("/", searchController.globalSearch);
router.get("/recent", searchController.getRecentSearches); 

export default router;

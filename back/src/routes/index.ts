import { Router } from "express";
import userRouter from "./userRoutes";
import allianceRouter from "./allianceRoutes";
import resourceRouter from "./resourceRoutes";
import sectionRouter from "./sectionRoutes";
import searchRoutes from "./searchRoutes"; 
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Endpoint base para verificar API
router.get("/", (_req, res) => {
  res.send("¡API funcionando!");
});

// Montamos el módulo de búsqueda (usa su propio router)
router.use("/search", authMiddleware, searchRoutes);

router.use("/users", userRouter);
router.use("/alliances", allianceRouter);
router.use("/resources", resourceRouter);
router.use("/sections", sectionRouter);

export default router;


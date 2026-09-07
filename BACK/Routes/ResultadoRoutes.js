import express from "express";
import ResultadoControllers from "../Controllers/ResultadoControllers.js";
import authMiddleware from "../Middlewares/authMiddlewares.js";
import adminMiddleware from "../Middlewares/adminMiddlewares.js";

const router = express.Router();

router.post("/", authMiddleware, ResultadoControllers.salvarResultado);
router.get("/me", authMiddleware, ResultadoControllers.meusResultados);
router.get("/estatisticas", authMiddleware, adminMiddleware, ResultadoControllers.estatisticas);

export default router;

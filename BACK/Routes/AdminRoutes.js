import express from "express";
import AdminController from "../Controllers/AdminControllers.js";
import authMiddleware from "../Middlewares/authMiddlewares.js";
import adminMiddleware from "../Middlewares/adminMiddlewares.js";  
import rateLimitAuth from "../Middlewares/Ratelimitauth.js";

const router = express.Router();

router.post("/codigo", rateLimitAuth, AdminController.entrarComCodigo);
router.get("/usuarios", authMiddleware, adminMiddleware, AdminController.listarUsuarios);
router.put("/promover", authMiddleware, adminMiddleware, AdminController.promoverParaAdmin);
router.put("/rebaixar", authMiddleware, adminMiddleware, AdminController.rebaixarAdmin);
router.get("/estatisticas", authMiddleware, adminMiddleware, AdminController.estatisticas);
router.get("/resultados", authMiddleware, adminMiddleware, AdminController.listarResultados);

export default router;
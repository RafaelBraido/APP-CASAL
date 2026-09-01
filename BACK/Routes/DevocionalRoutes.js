import express from "express";
import DevocionalControllers from "../Controllers/DevocionalControllers.js";
import authMiddleware from "../Middlewares/authMiddlewares.js";
import adminMiddleware from "../Middlewares/adminMiddlewares.js";

const router = express.Router();

// Público: qualquer pessoa pode ver os devocionais
router.get("/", DevocionalControllers.listDevocionais);

// Admin: criar, atualizar e deletar
router.post("/", authMiddleware, adminMiddleware, DevocionalControllers.createDevocional);
router.put("/:id", authMiddleware, adminMiddleware, DevocionalControllers.updateDevocional);
router.delete("/:id", authMiddleware, adminMiddleware, DevocionalControllers.deleteDevocional);

export default router;

import express from "express";
import PregacaoControllers from "../Controllers/PregacaoControllers.js";
import authMiddleware from "../Middlewares/authMiddlewares.js";
import adminMiddleware from "../Middlewares/adminMiddlewares.js";

const router = express.Router();

// Usuários logados podem assistir às pregações
router.get("/", authMiddleware, PregacaoControllers.listPregacoes);

// Admin: adicionar e remover pregações
router.post("/", authMiddleware, adminMiddleware, PregacaoControllers.createPregacao);
router.delete("/:id", authMiddleware, adminMiddleware, PregacaoControllers.deletePregacao);

export default router;

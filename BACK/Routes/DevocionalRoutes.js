import express from "express";
import TutorialControllers from "../Controllers/DevocionalControllers.js";
import authMiddleware from "../Middlewares/authMiddlewares.js";
import adminMiddleware from "../Middlewares/adminMiddlewares.js"; 

const router = express.Router();

router.post("/create/devocional", authMiddleware, adminMiddleware, TutorialControllers.createDevocional);
router.delete("/delete/devocional/:id", authMiddleware, adminMiddleware, TutorialControllers.deleteDevocional);
router.put("/update/devocional/:id", authMiddleware, adminMiddleware, TutorialControllers.updateDevocional);

export default router;
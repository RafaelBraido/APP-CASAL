import express from "express";
import UserControllers from "../Controllers/UserControllers.js";
import authMiddleware from "../Middlewares/authMiddlewares.js";
import adminMiddleware from "../Middlewares/adminMiddlewares.js";

const router = express.Router();

router.put("/me", authMiddleware, UserControllers.updateMe);
router.delete("/me", authMiddleware, UserControllers.DeleteMe);
router.get("/all", authMiddleware, adminMiddleware, UserControllers.getAllUsers);

export default router;
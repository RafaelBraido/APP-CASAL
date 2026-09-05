import express from "express";
import authController from "../Controllers/AuthControllers.js";
import rateLimitAuth from "../Middlewares/Ratelimitauth.js";

const router = express.Router();

router.post("/register", rateLimitAuth, authController.register);
router.post("/login", rateLimitAuth, authController.login);

export default router;
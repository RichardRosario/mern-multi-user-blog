import express from "express";
const router = express.Router();
import {
	authMiddleware,
	adminMiddleware
} from "../controllers/authController.js";
import { read, publicProfile, update, photo } from "../controllers/user.js";

router.get("/user/profile", authMiddleware, read);
router.get("/user/:username", publicProfile);
router.put("/user/update", authMiddleware, update);
router.get("/user/photo/:username", photo);

export default router;

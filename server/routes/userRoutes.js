import express from "express";

import { authencatedUser, adminUser } from "../middleware/auth.js";
import { profile } from "../controllers/userController.js";
import { isSignedIn } from "../controllers/authController.js";

const router = express.Router();

router.get("/profile", isSignedIn, authencatedUser, adminUser, profile);

export default router;

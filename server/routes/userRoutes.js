import express from "express";

import { authencatedUser, adminUser, read } from "../middleware/auth.js";
import { isSignedIn } from "../controllers/authController.js";

const router = express.Router();

router.get("/profile", isSignedIn, authencatedUser, read);

export default router;

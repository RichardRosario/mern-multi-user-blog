import express from "express";

import { isSignedIn, authencatedUser, adminUser } from "../middleware/auth.js";
import { profile } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", isSignedIn, authencatedUser, adminUser, profile);

export default router;

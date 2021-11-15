import express from "express";

import { tagValidator } from "../validators/tagValidator.js";
import { runValidation } from "../validators/index.js";
import { createTag } from "../controllers/tagController";

import { authencatedUser, adminUser } from "../middleware/auth.js";
import { isSignedIn } from "../controllers/authController.js";

const router = express.Router();

router.post(
	"/createTag",
	tagValidator,
	runValidation,
	isSignedIn,
	authencatedUser,
	adminUser,
	createTag
);

export default router;

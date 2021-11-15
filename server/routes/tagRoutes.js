import express from "express";

import { tagValidator } from "../validators/tagValidator.js";
import { runValidation } from "../validators/index.js";
import {
	createTag,
	removeTag,
	getTag,
	getTags
} from "../controllers/tagController.js";

import { authencatedUser, adminUser } from "../middleware/auth.js";
import { isSignedIn } from "../controllers/authController.js";

const router = express.Router();

router.post(
	"/tag/create",
	tagValidator,
	runValidation,
	isSignedIn,
	authencatedUser,
	adminUser,
	createTag
);

router.delete("/tag/:slug", isSignedIn, authencatedUser, adminUser, removeTag);
router.get("/tag/:slug", isSignedIn, authencatedUser, adminUser, getTag);
router.get("/tag/getTags", isSignedIn, authencatedUser, adminUser, getTags);

export default router;

import express from "express";
const router = express.Router();

// validators
import { runValidation } from "../validators/index.js";
import { categoryValidator } from "../validators/category.js";
// middlewares
import { authencatedUser, adminUser } from "../middleware/auth.js";
import { isSignedIn } from "../controllers/authController.js";

import { create } from "../controllers/categoryController.js";

router.post(
	"/category/create",
	categoryValidator,
	runValidation,
	isSignedIn,
	authencatedUser,
	adminUser,
	create
);

export default router;

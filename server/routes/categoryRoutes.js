import express from "express";
const router = express.Router();

// validators
import { runValidation } from "../validators/index.js";
import { categoryValidator } from "../validators/categoryValidator.js";
// middlewares
import { authencatedUser, adminUser } from "../middleware/auth.js";
import { isSignedIn } from "../controllers/authController.js";

import {
	create,
	getCategories,
	getCat,
	removeCat
} from "../controllers/categoryController.js";

router.post(
	"/category/create",
	categoryValidator,
	runValidation,
	isSignedIn,
	authencatedUser,
	adminUser,
	create
);
router.get(
	"/categories",
	isSignedIn,
	authencatedUser,
	adminUser,
	getCategories
);

router.get("/category/:slug", isSignedIn, authencatedUser, adminUser, getCat);
router.delete(
	"/category/:slug",
	isSignedIn,
	authencatedUser,
	adminUser,
	removeCat
);
export default router;

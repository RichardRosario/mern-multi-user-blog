import express from "express";

import { createPost } from "../controllers/blogController.js";
import { postValidation } from "../validators/postValidate.js";
import { runValidation } from "../validators/validationResult.js";
import { isSignedIn, adminUser, authencatedUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ time: Date().toString() });
});

router.post(
	"/post",
	postValidation,
	runValidation,
	isSignedIn,
	authencatedUser,
	createPost
);

export default router;

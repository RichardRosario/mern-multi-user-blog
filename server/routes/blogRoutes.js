import express from "express";

import {
	createPost,
	getPosts,
	getPost,
	removePost
} from "../controllers/blogController.js";

import { isSignedIn, adminUser, authencatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/post", isSignedIn, adminUser, createPost);
router.get("/posts", getPosts);
router
	.route("/posts/:id")
	.get(getPost)
	.delete(isSignedIn, authencatedUser, adminUser, removePost);

export default router;

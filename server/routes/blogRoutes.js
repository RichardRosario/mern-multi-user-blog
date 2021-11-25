import express from "express";

import { createPost } from "../controllers/blogController.js";

import { isSignedIn, adminUser, authencatedUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ time: Date().toString() });
});

router.post("/post", isSignedIn, authencatedUser, createPost);

export default router;

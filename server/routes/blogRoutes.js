import express from "express";

import { createPost, getPosts } from "../controllers/blogController.js";

import { isSignedIn, adminUser, authencatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/post", isSignedIn, adminUser, createPost);
router.get("/posts", getPosts);

export default router;

import express from "express";

import { createPost } from "../controllers/blogController.js";

import { isSignedIn, adminUser, authencatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/post", isSignedIn, adminUser, createPost);

export default router;

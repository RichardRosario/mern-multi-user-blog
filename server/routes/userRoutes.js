import express from "express";

import { read } from "../controllers/userController.js";
import { protectRoute, adminUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", protectRoute, read);

export default router;

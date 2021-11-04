import express from "express";
const router = express.Router();

import { protectRoute } from "../middleware/auth.js";
import { signup, login, signOut } from "../controllers/authController.js";

// validators
import { runValidation } from "../validators/index.js";
import { userSignupValidator, userLoginValidator } from "../validators/auth.js";

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/login", userLoginValidator, runValidation, login);
router.get("/logout", signOut);
router.get("/secret", protectRoute);

export default router;

import express from "express";
import { registerValidation } from "../validators/userValidator.js";

import { signup, login, signOut } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", registerValidation, signup);
router.post("/login", login);
router.get("/logout", signOut);

export default router;

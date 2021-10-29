import express from "express";
import { registerValidation } from "../validators/userValidator.js";

import { register, login } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", login);

export default router;

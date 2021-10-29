import express from "express";
import registerValidation from "../validators/userValidator.js";

import { register } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerValidation, register);

export default router;

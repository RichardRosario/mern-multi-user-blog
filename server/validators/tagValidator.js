import { check } from "express-validator";

export const tagValidator = [
	check("name")
		.not()
		.isEmpty()
		.withMessage("Tag name must not be empty")
];

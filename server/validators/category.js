import { check } from "express-validator";

export const categoryValidator = [
	check("name")
		.not()
		.isEmpty()
		.withMessage("Name is required")
];

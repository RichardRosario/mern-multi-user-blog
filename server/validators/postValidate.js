import { check } from "express-validator";

export const postValidation = [
	check("title")
		.not()
		.isEmpty()
		.withMessage("Title is required"),
	check("title")
		.isLength()
		.withMessage(
			"title must be at least 3 char and not more than 160 character."
		),
	check("body")
		.not()
		.isEmpty()
		.withMessage("Post body is required"),
	check("body")
		.isLength({ min: 200 })
		.withMessage("Body is too short! Must contain at least 200 characters.")
];

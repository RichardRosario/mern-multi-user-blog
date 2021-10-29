import User from "../models/userModel.js";
import { validationResult } from "express-validator";

// POST, /api/users/register
// public route
export const register = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ error: errors.array()[0].msg });
	}
	try {
		const { username, name, email, password } = req.body;

		const userExist = await User.findOne({ email });

		if (userExist) {
			res.status(500).json({ msg: "Email already in use" });
		}

		const user = await User.create({ username, name, email, password });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Server Error..." });
	}
};

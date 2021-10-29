import User from "../models/userModel.js";
import { validationResult } from "express-validator";
import { nanoid } from "nanoid";
import generateToken from "../utils/token.js";

// ===========================
// POST, /api/users/register
// public route
export const register = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ error: errors.array()[0].msg });
	}
	try {
		const { name, email, password } = req.body;

		const userExist = await User.findOne({ email });

		if (userExist) {
			res.status(500).json({ msg: "Email already in use" });
		}

		let username = nanoid();
		let profile = `${process.env.CLIENT_URL}/profile/${username}`;

		const user = new User({ username, name, email, password, profile });

		await user.save();
		res
			.status(200)
			.json({ msg: "Register process successful! Please signin..." });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Server Error..." });
	}
};

// ========================
// POST, /api/users/login
// public route
export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password)
			return res.status(401).json({ message: "all fields are required" });
		const user = await User.findOne({ email });

		if (user && (await user.matchPassword(password))) {
			res.json({
				_id: user._id,
				email: user.email,
				name: user.name,
				isAdmin: user.isAdmin,
				token: generateToken(user._id)
			});
		} else {
			res.status(401);
			throw new Error("Invalid email or password");
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Invalid email and password" });
	}
};

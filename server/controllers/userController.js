import User from "../models/userModel.js";
import { validationResult } from "express-validator";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

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
	try {
		const { email, password } = req.body;
		// check of user exist
		const user = await User.findOne({ email });
		if (!user) {
			res.status(401).res.json({
				msg: "There is no user of that email, please register an account."
			});
		}
		// authenticate the user
		if (!user.authenticate(password)) {
			res.status(400).json({ msg: "Wrong email and password" });
		}

		// generate a token and send to client
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1d"
		});

		res.cookie("token", token, { expiresIn: "1d" });
		res.json({
			_id: user._id,
			username: user.username,
			name: user.name,
			email: user.email,
			role: user.role,
			token
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Server Error..." });
	}
};

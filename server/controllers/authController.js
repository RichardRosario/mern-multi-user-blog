import User from "../models/userModel.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

// POST, api/signup
export const signup = (req, res) => {
	User.findOne({ email: req.body.email }).exec((err, user) => {
		if (user) {
			return res.status(400).json({
				error: "Email is taken"
			});
		}

		const { name, email, password } = req.body;
		let username = nanoid();
		let profile = `${process.env.CLIENT_URL}/profile/${username}`;

		let newUser = new User({ name, email, password, profile, username });

		newUser.save();

		res.json(newUser);
	});
};

// =====================
// POST, api/signin

export const login = (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "Email does not exist."
			});
		}

		if (!user.authenticate(password)) {
			return res.status(400).json({
				error: "Email and password does not match"
			});
		}
		// generate token
		const token = jwt.sign(
			{
				_id: user._id
			},
			`${process.env.JWT_SECRET}`,
			{ expiresIn: "1d" }
		);

		res.cookie("token", token, { expiresIn: "1d" });

		const { _id, username, name, email, role } = user;
		res.json({ token, user: { _id, username, name, email, role } });
	});
};

// ====================
//
export const signOut = (req, res) => {
	res.clearCookie("token");
	res.json({
		message: "Sign out successful"
	});
};

// ============-==
// protected routes

import User from "../models/userModel.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import exJwt from "express-jwt";

// POST, api/signup
export const signup = async (req, res) => {
	await User.findOne({ email: req.body.email }).exec((err, user) => {
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

		res.json({ message: "Signup is successful. Please login!" });
	});
};

// =====================
// POST, api/signin

export const login = async (req, res) => {
	const { email, password } = req.body;
	await User.findOne({ email }).exec((err, user) => {
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
		const token = jwt.sign({ _id: user._id }, `${process.env.JWT_SECRET}`, {
			expiresIn: "1d"
		});

		res.cookie("token", token, { expiresIn: "1d" });

		const { _id, username, name, email, role } = user;
		return res.json({
			token,
			user: { _id, username, name, email, role }
		});
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
export const isSignedIn = async (req, res, next) => {
	let token;

	if (
		req.headers &&
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			req.user = jwt.verify(token, `${process.env.JWT_SECRET}`);

			next();
		} catch (error) {
			res.status(401);
			throw new Error("Not Authorized, token failed.");
		}
	}
};

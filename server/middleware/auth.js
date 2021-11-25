import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// auth middleware
export const authencatedUser = async (req, res, next) => {
	const authUserId = req.user._id;

	await User.findById({ _id: authUserId }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User not found"
			});
		}

		req.profile = user;
		console.log(user);
		next();
	});
};

export const adminUser = async (req, res, next) => {
	const adminUserId = req.user._id;

	await User.findById({ _id: adminUserId }).exec((err, user) => {
		if ((err, !user)) {
			return res.status(400).json({
				error: "Admin User not found"
			});
		}

		if (user.role !== 1) {
			return res.status(400).json({
				error: "Admin area: Access denied"
			});
		}
		req.profile = user;
		console.log(user);
		next();
	});
};

// ============-==
// protected routes, verify token
export const isSignedIn = async (req, res, next) => {
	let token;

	if (
		// check if user is logged in and with bearer
		req.headers &&
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// assign bearer value to token
			token = req.headers.authorization.split(" ")[1];
			// verify token with jwt secret and assign it to req.user
			req.user = jwt.verify(token, `${process.env.JWT_SECRET}`);

			next();
		} catch (error) {
			res.status(401);
			throw new Error("Not Authorized, token failed.");
		}
	}
};

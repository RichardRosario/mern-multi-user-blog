import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protectRoute = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(tokenVerify.id).select("-password");

			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error("Not Authorized, token failed.");
		}
	}

	if (!token) {
		res.status(401);
		throw new Error("Not Authorized, no token.");
	}
});

const adminUser = (req, res, next) => {
	if (req.user && req.user.role !== 1) {
		next();
	} else {
		res.status(401);
		throw new Error("No admin authorization");
	}
};

export { protectRoute, adminUser };

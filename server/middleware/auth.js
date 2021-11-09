import User from "../models/userModel.js";

export const read = (req, res) => {
	req.profile.hashed_password = undefined;

	return res.json(req.profile);
};
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
				error: "Amdin User not found"
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

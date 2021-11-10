import User from "../models/userModel.js";

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

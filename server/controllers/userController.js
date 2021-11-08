import User from "../models/userModel.js";

// ===========================
// GET, profile

export const read = async (req, res) => {
	req.user.hashed_password = undefined;
	return req.json(req.user);
};

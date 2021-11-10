import User from "../models/userModel.js";

// ===========================
// GET, profile

export const profile = async (req, res) => {
	req.profile.hashed_password = undefined;
	return res.json(req.profile);
};

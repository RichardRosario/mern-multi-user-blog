import jwt from "jsonwebtoken";

const generateToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 86400 });
};

export default generateToken;

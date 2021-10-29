import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			required: true,
			max: 32,
			unique: true,
			index: true,
			lowercase: true
		},
		name: {
			type: String,
			trim: true,
			required: true,
			max: 32
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true
		},
		profile: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		about: {
			type: String
		},
		role: {
			type: Number,
			trim: true
		},
		photo: {
			data: Buffer,
			contentType: String
		},
		resetPasswordLink: {
			data: String,
			default: ""
		}
	},
	{ timestamp: true }
);

// compare entered password with saved password using bcrypt
userSchema.methods.matchPassword = async function(enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};
// hash password
userSchema.pre("save", async function(next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSaltSync(10);

	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;

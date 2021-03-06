import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			max: 32
		},
		slug: {
			type: String,
			unique: true,
			index: true
		}
	},
	{ timestamps: true }
);

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;

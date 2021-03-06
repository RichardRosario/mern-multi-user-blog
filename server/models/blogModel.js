import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			min: 3,
			max: 160,
			required: true
		},
		slug: {
			type: String,
			unique: true,
			index: true
		},
		body: {
			type: {},
			required: true,
			min: 200,
			max: 2000000
		},
		excerpt: {
			type: String,
			max: 1000
		},
		mtitle: {
			type: String
		},
		mdesc: {
			type: String
		},
		photo: {
			data: Buffer,
			contentType: String
		},
		categories: [{ type: mongoose.ObjectId, ref: "Category", required: true }],
		tags: [{ type: mongoose.ObjectId, ref: "Tag", required: true }],
		postedBy: {
			type: mongoose.ObjectId,
			ref: "User"
		}
	},
	{ timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;

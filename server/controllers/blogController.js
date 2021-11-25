import Blog from "../models/blogModel.js";
import slugify from "slugify";

// =========================
// POST /api/blog/post
// private route
export const createPost = async (req, res) => {
	const { title, body } = req.body;

	try {
		const slug = slugify({ title });

		const postExist = await Blog.findOne({ slug });

		if (postExist) {
			res
				.status(400)
				.json({ message: "Post with this title slug already exist" });
		}

		const post = new Blog({ title, body, slug });

		await post.save();

		res.json(post);
	} catch (error) {
		console.log(error);
	}
};

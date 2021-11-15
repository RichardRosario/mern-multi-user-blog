import Tag from "../models/tagModel.js";
import slugify from "slugify";

export const createTag = async (req, res) => {
	try {
		const { name } = req.body;
		const tagSlug = slugify(name).toLowerCase();

		const tag = new Tag({ name, tagSlug });

		await tag.save();

		res.json({ message: "Tag successfully created" });
	} catch (err) {
		res.status(400).json({ error: err });
	}
};

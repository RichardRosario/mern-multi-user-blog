import Tag from "../models/tagModel.js";
import slugify from "slugify";
import errorHandler from "../helpers/dbErrorHandler.js";

// POST
// private, admin route
export const createTag = async (req, res) => {
	try {
		const { name } = req.body;
		const slug = slugify(name).toLowerCase();

		const tagExist = await Tag.findOne({ slug });
		if (tagExist) {
			return res.status(302).json({ message: "Tag already exist!" });
		}

		const tag = new Tag({ name, slug });

		await tag.save();

		res.status(200).json({ message: "Tag successfully created" });
	} catch (err) {
		res.status(400).json({ error: errorHandler(err) });
	}
};

// ==================
// DELETE
// private, admin routes
export const removeTag = async (req, res) => {
	const slug = req.params.slug.toLowerCase();
	try {
		await Tag.findOneAndRemove({ slug });

		res.status(302).json({ message: "Tag successfully delete" });
	} catch (err) {
		res.status(400).json({ error: errorHandler(err) });
	}
};

// ==================
// GET
// private, admin routes
export const getTag = async (req, res) => {
	const slug = req.params.slug.toLowerCase();
	try {
		const tag = await Tag.findOne({ slug });

		if (!tag) {
			return res
				.status(404)
				.json({ message: "System cannot found the tag you were looking" });
		}

		res.json(tag);
	} catch (err) {
		res.status(400).json({ error: errorHandler(err) });
	}
};

// ==========
// GET
// private, admin routs
export const getTags = async (req, res) => {
	try {
		const tags = await Tag.find({});

		res.json(tags);
	} catch (err) {
		res.status(400).json({ error: errorHandler(err) });
	}
};

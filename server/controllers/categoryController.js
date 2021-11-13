import Category from "../models/categoryModel.js";
import slugify from "slugify";
import errorHandler from "../helpers/dbErrorHandler.js";

// ======
// private, admin route
// POST, api/blog/category/create
export const create = async (req, res) => {
	try {
		const { name } = req.body;
		const slug = slugify(name).toLowerCase();

		const catExist = await Category.findOne({ slug });

		if (catExist) {
			res.status(400).json({ message: "Category already exist!" });
		}

		const category = new Category({ name, slug });

		const newCat = await category.save();

		res.status(200).json(newCat);
	} catch (error) {
		console.log(error.message);
		return res.status(400).json({ error: errorHandler(error) });
	}
};

// ===============
// GET, all categories
// private,admin route
export const getCategories = async (req, res) => {
	try {
		const categories = await Category.find({});

		res.json(categories);
	} catch (err) {
		res.status(400).json({
			error: errorHandler(err)
		});
	}
};

// ===========
// GET, single category
// private, admin route
export const getCat = async (req, res) => {
	const slug = req.params.slug.toLowerCase();

	try {
		const category = await Category.findOne({ slug });
		res.json(category);
	} catch (err) {
		res.status(400).json({
			error: errorHandler(err)
		});
	}
};

// ============
// DELETE, single category
// private, admin route
export const removeCat = async (req, res) => {
	const slug = req.params.slug.toLowerCase();

	try {
		await Category.findOneAndRemove({ slug });

		res.json({ message: "Category successfully deleted" });
	} catch (err) {
		res.status(401).json({ error: errorHandler(err) });
	}
};

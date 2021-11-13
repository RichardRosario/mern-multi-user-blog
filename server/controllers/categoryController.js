import Category from "../models/categoryModel.js";
import slugify from "slugify";

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
	}
};

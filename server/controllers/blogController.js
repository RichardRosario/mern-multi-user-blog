import Blog from "../models/blogModel.js";
import Category from "../models/categoryModel.js";
import Tag from "../models/tagModel.js";
import formidable from "formidable";
import slugify from "slugify";
import { stripHtml } from "string-strip-html";
import _ from "lodash";
import fs from "fs";

// =========================
// POST /api/blog/post
// private route
export const createPost = async (req, res) => {
	try {
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;

		form.parse(req, (err, fields, files) => {
			if (err) {
				res.status(400).json({ error: "cannot upload files" });
			}

			const { title, body, categories, tags } = fields;

			let post = new Blog();
			post.title = title;
			post.body = body;
			post.categories = categories;
			post.tags = tags;
			post.slug = slugify(title).toLocaleLowerCase();
			post.mtitle = `${title} | ${process.env.APP_NAME}`;
			post.mdesc = stripHtml(body.substring(0, 160)).result;
			post.postedBy = req.user._id;

			if (files.photo) {
				console.log(files.photo.filepath);
				if (files.photo.size > 1000000) {
					res.status(400).json({ error: "Image must be under 1mb in size" });
				}

				post.photo.data = fs.readFileSync(files.photo.filepath);
				post.photo.contentType = files.photo.type;
			}
			const newBlog = post.save();
			res.json(newBlog);
		});
	} catch (error) {
		console.log(error);
	}
};

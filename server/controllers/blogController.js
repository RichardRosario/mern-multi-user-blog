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
		// initiate the blog form with formidable
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;

		form.parse(req, (err, fields, files) => {
			if (err) {
				res.status(400).json({ error: "cannot upload files" });
			}

			const { title, body, categories, tags } = fields;
			// validate the blog post fields
			if (!title || !title.length) {
				return res.status(400).json({
					error: "title is required"
				});
			}

			if (!body || body.length < 200) {
				return res.status(400).json({
					error: "Content is too short"
				});
			}

			if (!categories || categories.length === 0) {
				return res.status(400).json({
					error: "At least one category is required"
				});
			}

			if (!tags || tags.length === 0) {
				return res.status(400).json({
					error: "At least one tag is required"
				});
			}

			// create new blog post
			let post = new Blog();
			post.title = title;
			post.body = body;
			post.categories = categories;
			post.tags = tags;
			post.slug = slugify(title).toLocaleLowerCase();
			post.mtitle = `${title} | ${process.env.APP_NAME}`;
			post.mdesc = stripHtml(body.substring(0, 160)).result;
			post.postedBy = req.user._id;

			// split the category and tag and initiate
			let arrayOfCategories = categories && categories.split(",");
			let arrayOfTags = tags && tags.split(",");

			// check for the photo
			if (files.photo) {
				if (files.photo.size > 1000000) {
					res.status(400).json({ error: "Image must be under 1mb in size" });
				}

				post.photo.data = fs.readFileSync(files.photo.filepath);
				post.photo.contentType = files.photo.type;
			}
			post.save((err, result) => {
				if (err) {
					return res.status(400).json(err);
				}
				// res.json(result);
				Blog.findByIdAndUpdate(
					result._id,
					{ $push: { categories: arrayOfCategories } },
					{ new: true }
				).exec((err, result) => {
					if (err) {
						return res.status(400).json({ error: "Error saving the blog" });
					} else {
						Blog.findByIdAndUpdate(
							result._id,
							{ $push: { tags: arrayOfTags } },
							{ new: true }
						).exec((err, result) => {
							if (err) {
								return res
									.status(400)
									.json({ error: "Error saving blog post" });
							} else {
								res.json(result);
							}
						});
					}
				});
				// console.log(updatePost);
			});
		});
	} catch (error) {
		console.log(error);
	}
};

// GET blog/posts
// public route
export const getPosts = async (req, res) => {
	try {
		const posts = await Blog.find({});

		if (!posts) {
			return res.status(400).json({ error: "No blog posts found" });
		}

		res.json(posts);
	} catch (err) {
		console.log(err.message);
	}
};

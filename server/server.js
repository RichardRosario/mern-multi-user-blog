import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import dbConn from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();
const app = express();
dbConn();

// =============
// middlewares
app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
	app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
}

// routes
app.use("/api/users", userRoutes);
app.use("/api/blog", blogRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running at port ${port}`));

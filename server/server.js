import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import dbConn from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();
const app = express();
dbConn();

// =============
// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
	app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
}

// routes
app.use("/api", authRoutes);
app.use("/api", blogRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running at port ${port}`));

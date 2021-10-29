import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dbConn from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
const app = express();
dbConn();

// =============
// middlewares
app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 4000;
app.listen(process.env.PORT, () =>
	console.log(`Server running at port ${PORT}`)
);

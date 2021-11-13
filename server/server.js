import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import dbConn from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
// import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();
const app = express();
dbConn();

// =============
// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

// routes
app.use("/api", authRoutes);
app.use("/api/blog", categoryRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running at port ${port}`));

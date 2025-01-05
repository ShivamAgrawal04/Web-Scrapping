import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/connectDB.js"; // Database connection helper
import authRoutes from "./routes/auth.route.js"; // Authentication routes
import vulnerabilityRoutes from "./routes/vulnerability.route.js"; // Vulnerability routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Workaround for __dirname in ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Serve static files from the front-end build directory
const buildpath = path.join(__dirname, "../client/build"); // Make sure this points to your actual build folder
app.use(express.static(buildpath));

// Set up CORS (Cross-Origin Resource Sharing) to allow requests from a specific origin
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware to parse incoming JSON requests
app.use(express.json()); // Allows us to access req.body
app.use(cookieParser()); // Allows us to access cookies in req.cookies

// API routes for authentication and vulnerability management
app.use("/api/auth", authRoutes);
app.use("/api/vulnerability", vulnerabilityRoutes);

// Default route
// app.use("/", (req, res) => {
//   res.send("hello world");
// });

// Serve production build of the front-end (if in production)
if (process.env.NODE_ENV === "production") {
  // Serve static files from the /client/build directory (production build folder)
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // Handle all routes and return the front-end index.html for SPAs
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
}

// Start the server and connect to the database
app.listen(PORT, () => {
  connectDB(); // Connect to the database
  console.log(`Server is running on port: ${PORT}`);
});

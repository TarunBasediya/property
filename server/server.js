import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import posts from "./routes/posts.js"; // Note the .js extension

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); // Load environment variables

// Initialize the Express app
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/posts", posts);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rudrarathore148:Tarun%40%23%24123@cluster0.yn8ir.mongodb.net/myDatabase?retryWrites=true&w=majority"
    );
    console.log("Connected to MongoDB database");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

app.use(express.static(path.join(__dirname, "client/build")));
app.use("*", (req, res) =>
  res.sendFile(path.join(__dirname, "client/build/index.html"))
);

// Start the server and connect to the database
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB(); // Call the function to connect to MongoDB
});

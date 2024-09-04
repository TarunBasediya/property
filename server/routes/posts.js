import express from "express";
import Post from "../models/Post.js"; // Ensure the .js extension is included for ES6 imports

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post("/", async (req, res) => {
  const { title, content, author } = req.body;
  const post = new Post({ title, content, author });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a post
router.patch("/:postId", async (req, res) => {
  const { title, content } = req.body;

  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title, content } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a post
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

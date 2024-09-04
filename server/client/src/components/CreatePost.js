import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import axios from "axios";
import "./CreatePost.css"; // Import the CSS file

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content, author };
    await axios.post("http://localhost:5000/posts", newPost);
    setTitle("");
    setContent("");
    setAuthor("");
  };

  // Function to handle view posts button click
  const handleViewPosts = () => {
    navigate("/"); // Redirect to the posts page
  };

  return (
    <div className="create-post-container">
      <button
        type="button"
        className="view-posts-btn"
        onClick={handleViewPosts}
      >
        View Posts
      </button>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            placeholder="Author's name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="create-btn">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

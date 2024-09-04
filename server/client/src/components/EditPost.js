import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditPost.css"; // Import the CSS file

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/posts/${postId}`
        );
        setPost({
          title: response.data.title,
          content: response.data.content,
        });
      } catch (error) {
        console.error("Error fetching the post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/posts/${postId}`, post);
      navigate("/");
    } catch (error) {
      console.error("Error updating the post:", error);
    }
  };

  return (
    <div className="edit-post-container">
      <h1>Edit Post</h1>
      <form onSubmit={handleFormSubmit} className="edit-post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="update-btn">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;

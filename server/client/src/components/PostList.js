import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PostList.css"; // Import the CSS file

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Attempting to fetch posts...");
        const response = await axios.get("http://localhost:5000/posts");
        setPosts(response.data);
        console.log("Fetched posts:", response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Handle delete post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      // Remove the post from the UI after deletion
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Handle edit post
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="post-list-container">
      <h1>Post List</h1>
      {posts.length === 0 ? (
        <p className="no-posts">No posts available.</p>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <div className="post-card" key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <div className="post-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(post._id)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;

import React from "react";
import "../styles/Blog.css"; // Prepričaj se, da imaš pravilno pot do CSS datoteke

function Blog() {
  return (
    <div className="blog-container">
      <h1 className="blog-title">Blog</h1>
      <div className="blog-cards">
        <div className="blog-card">
          <div className="blog-image"></div>
          <h2 className="blog-card-title">Title</h2>
          <p className="blog-card-description">Description...</p>
        </div>
        <div className="blog-card">
          <div className="blog-image"></div>
          <h2 className="blog-card-title">Title</h2>
          <p className="blog-card-description">Description...</p>
        </div>
        <div className="blog-card">
          <div className="blog-image"></div>
          <h2 className="blog-card-title">Title</h2>
          <p className="blog-card-description">Description...</p>
        </div>
      </div>
    </div>
  );
}

export default Blog;

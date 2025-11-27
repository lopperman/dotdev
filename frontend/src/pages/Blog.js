import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="blog">
      <h1>Blog</h1>
      <p className="page-intro text-secondary">
        Thoughts on software development, tech, and whatever else I find interesting.
      </p>

      {posts.length > 0 ? (
        <div className="posts-list">
          {posts.map(post => (
            <article key={post.slug} className="post-preview">
              <Link to={`/blog/${post.slug}`}>
                <h2 className="post-title">{post.title}</h2>
              </Link>
              {post.date && (
                <time className="post-date text-secondary">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
              {post.summary && (
                <p className="post-summary text-secondary">{post.summary}</p>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className="text-secondary">No posts yet. Check back soon!</p>
      )}
    </div>
  );
}

export default Blog;

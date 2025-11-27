import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogPost.css';

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) throw new Error('Post not found');
          throw new Error('Failed to fetch post');
        }
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return (
    <div className="error-page">
      <h1>Post Not Found</h1>
      <p>{error}</p>
      <Link to="/blog">Back to Blog</Link>
    </div>
  );

  return (
    <article className="blog-post">
      <Link to="/blog" className="back-link">&larr; Back to Blog</Link>

      <header className="post-header">
        <h1>{post.title}</h1>
        <div className="post-meta">
          {post.date && (
            <time className="text-secondary">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div
        className="markdown-content post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}

export default BlogPost;

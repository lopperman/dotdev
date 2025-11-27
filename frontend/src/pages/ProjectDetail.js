import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProjectDetail.css';

function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/projects/${slug}`)
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) throw new Error('Project not found');
          throw new Error('Failed to fetch project');
        }
        return res.json();
      })
      .then(data => {
        setProject(data);
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
      <h1>Project Not Found</h1>
      <p>{error}</p>
      <Link to="/projects">Back to Projects</Link>
    </div>
  );

  return (
    <article className="project-detail">
      <Link to="/projects" className="back-link">&larr; Back to Projects</Link>

      <header className="project-header">
        <h1>{project.title}</h1>
        {project.technologies && project.technologies.length > 0 && (
          <div className="project-tags">
            {project.technologies.map(tech => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        )}
        <div className="project-meta">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          )}
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          )}
        </div>
      </header>

      <div
        className="markdown-content project-content"
        dangerouslySetInnerHTML={{ __html: project.content }}
      />
    </article>
  );
}

export default ProjectDetail;

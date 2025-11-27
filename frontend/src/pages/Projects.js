import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const featured = projects.filter(p => p.featured);
  const other = projects.filter(p => !p.featured);

  return (
    <div className="projects">
      <h1>Projects</h1>
      <p className="page-intro text-secondary">
        A collection of things I've built. Click on any project to learn more.
      </p>

      {featured.length > 0 && (
        <section className="projects-section">
          <h2>Featured</h2>
          <div className="projects-grid">
            {featured.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {other.length > 0 && (
        <section className="projects-section">
          {featured.length > 0 && <h2>Other Projects</h2>}
          <div className="projects-grid">
            {other.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {projects.length === 0 && (
        <p className="text-secondary">No projects yet. Check back soon!</p>
      )}
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <Link to={`/projects/${project.slug}`} className="project-card-link">
        <h3 className="project-title">{project.title}</h3>
        {project.summary && (
          <p className="project-summary">{project.summary}</p>
        )}
        {project.technologies && project.technologies.length > 0 && (
          <div className="project-tags">
            {project.technologies.map(tech => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        )}
      </Link>
      <div className="project-links">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}

export default Projects;

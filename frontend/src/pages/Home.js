import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">
          Hi, I'm <span className="highlight">Paul Brower</span>
        </h1>
        <p className="hero-subtitle">
          Passionate about building things that make a difference.
        </p>
        <div className="hero-cta">
          <Link to="/projects" className="btn btn-primary">
            View My Work
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Get in Touch
          </Link>
        </div>
      </section>

      <section className="home-section">
        <h2>What I Do</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <h3>Backend Development</h3>
            <p className="text-secondary">
              Building robust APIs and services with Python, Flask, and modern backend technologies.
            </p>
          </div>
          <div className="skill-card">
            <h3>Frontend Development</h3>
            <p className="text-secondary">
              Creating responsive, user-friendly interfaces with React and modern CSS.
            </p>
          </div>
          <div className="skill-card">
            <h3>DevOps & Infrastructure</h3>
            <p className="text-secondary">
              Deploying and managing applications with cloud services and automation.
            </p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2>Recent Posts</h2>
          <Link to="/blog" className="view-all">View all posts &rarr;</Link>
        </div>
        <p className="text-secondary">
          Check out the <Link to="/blog">blog</Link> for my latest writings on software development.
        </p>
      </section>
    </div>
  );
}

export default Home;

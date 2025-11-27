---
title: paulbrower.dev
summary: My personal website and blog, built with Flask and React.
technologies:
  - Python
  - Flask
  - React
  - Markdown
github: https://github.com/lopperman/dotdev
live_url: https://paulbrower.dev
featured: true
---

This is the site you're looking at right now! It's a simple personal website and blog that I built to have a presence on the web and a place to share my thoughts.

## Features

- **Blog** - Markdown-based blog posts with syntax highlighting
- **Projects** - Showcase of things I've built
- **Contact** - Contact form with Pushover notifications
- **Dark theme** - Easy on the eyes

## Technical Details

The backend is a Flask application that serves both the API and the React frontend. Content is stored as Markdown files with YAML frontmatter, making it easy to write and version control.

### API Endpoints

- `GET /api/posts` - List all blog posts
- `GET /api/posts/:slug` - Get a single post
- `GET /api/projects` - List all projects
- `GET /api/projects/:slug` - Get a single project
- `POST /api/contact` - Submit contact form

### Deployment

The site is hosted on Render with auto-deploy on push to main. The build process compiles the React frontend and bundles it with the Flask backend.

## What I Learned

Building this site was a good exercise in keeping things simple. It's easy to over-engineer a personal site, but sometimes a straightforward solution is the best one.

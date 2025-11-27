# paulbrower.dev

Personal website and blog built with Flask and React.

## Project Structure

```
dotdev/
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   └── content/
│       ├── posts/          # Blog posts (Markdown)
│       └── projects/       # Projects (Markdown)
├── frontend/
│   ├── src/                # React source
│   ├── public/             # Static assets
│   └── package.json        # Node dependencies
├── requirements.txt        # Root requirements for Render
├── wsgi.py                 # Gunicorn entry point
└── render.yaml             # Render deployment config
```

## Local Development

### Prerequisites

- Python 3.11+
- Node.js 20+

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/lopperman/dotdev.git
   cd dotdev
   ```

2. **Set up Python environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Set environment variables** (optional, for contact form)
   ```bash
   export PUSHOVER_USER_KEY=your_user_key
   export PUSHOVER_API_TOKEN=your_api_token
   ```

5. **Run development servers**

   In one terminal (backend):
   ```bash
   cd backend
   python app.py
   ```

   In another terminal (frontend):
   ```bash
   cd frontend
   npm start
   ```

   The React dev server runs on http://localhost:3000 and proxies API requests to Flask on http://localhost:5000.

## Adding Content

### Blog Posts

Create a new Markdown file in `backend/content/posts/`:

```markdown
---
title: My Post Title
date: 2024-01-15
summary: A brief description of the post.
tags:
  - tag1
  - tag2
---

Your content here...
```

### Projects

Create a new Markdown file in `backend/content/projects/`:

```markdown
---
title: Project Name
summary: Brief project description.
technologies:
  - Python
  - React
github: https://github.com/user/repo
live_url: https://example.com
featured: true
---

Detailed project description...
```

## Deployment

The site is configured for deployment on Render. Push to the `main` branch to trigger auto-deploy.

### Render Configuration

Update these settings in Render dashboard:

- **Build Command**: `pip install -r requirements.txt && cd frontend && npm install && npm run build`
- **Start Command**: `gunicorn wsgi:app`
- **Environment Variables**:
  - `PUSHOVER_USER_KEY` - Your Pushover user key
  - `PUSHOVER_API_TOKEN` - Your Pushover API token

## License

MIT

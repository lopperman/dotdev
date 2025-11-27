import os
import glob
import time
import hashlib
import requests
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import markdown
import frontmatter
from datetime import datetime
from collections import defaultdict

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')
CORS(app)

# Content directories
CONTENT_DIR = os.path.join(os.path.dirname(__file__), 'content')
POSTS_DIR = os.path.join(CONTENT_DIR, 'posts')
PROJECTS_DIR = os.path.join(CONTENT_DIR, 'projects')

# Pushover configuration
PUSHOVER_USER_KEY = os.environ.get('PUSHOVER_USER_KEY')
PUSHOVER_API_TOKEN = os.environ.get('PUSHOVER_API_TOKEN')

# Rate limiting for contact form
# Tracks submission timestamps by IP and email hash
RATE_LIMIT_WINDOW = 24 * 60 * 60  # 24 hours in seconds
MAX_SUBMISSIONS_PER_WINDOW = 2
contact_submissions = defaultdict(list)  # key -> list of timestamps


def get_client_ip():
    """Get the real client IP, accounting for proxies."""
    # Check X-Forwarded-For header (set by Render and other proxies)
    if request.headers.get('X-Forwarded-For'):
        return request.headers.get('X-Forwarded-For').split(',')[0].strip()
    return request.remote_addr


def hash_email(email):
    """Hash email for privacy-preserving rate limiting."""
    return hashlib.sha256(email.lower().encode()).hexdigest()[:16]


def cleanup_old_submissions():
    """Remove submissions older than the rate limit window."""
    cutoff = time.time() - RATE_LIMIT_WINDOW
    keys_to_delete = []
    for key, timestamps in contact_submissions.items():
        contact_submissions[key] = [t for t in timestamps if t > cutoff]
        if not contact_submissions[key]:
            keys_to_delete.append(key)
    for key in keys_to_delete:
        del contact_submissions[key]


def is_rate_limited(ip, email):
    """Check if IP or email has exceeded rate limit."""
    cleanup_old_submissions()
    current_time = time.time()

    # Check IP-based limit
    ip_submissions = contact_submissions.get(f"ip:{ip}", [])
    if len(ip_submissions) >= MAX_SUBMISSIONS_PER_WINDOW:
        return True

    # Check email-based limit
    email_hash = hash_email(email)
    email_submissions = contact_submissions.get(f"email:{email_hash}", [])
    if len(email_submissions) >= MAX_SUBMISSIONS_PER_WINDOW:
        return True

    return False


def record_submission(ip, email):
    """Record a successful submission for rate limiting."""
    current_time = time.time()
    contact_submissions[f"ip:{ip}"].append(current_time)
    contact_submissions[f"email:{hash_email(email)}"].append(current_time)


def parse_markdown_file(filepath):
    """Parse a markdown file with frontmatter."""
    with open(filepath, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)

    html_content = markdown.markdown(
        post.content,
        extensions=['fenced_code', 'codehilite', 'tables', 'toc']
    )

    return {
        'slug': os.path.splitext(os.path.basename(filepath))[0],
        'content': html_content,
        'raw_content': post.content,
        **post.metadata
    }


def get_all_items(directory):
    """Get all markdown files from a directory."""
    items = []
    pattern = os.path.join(directory, '*.md')

    for filepath in glob.glob(pattern):
        try:
            item = parse_markdown_file(filepath)
            items.append(item)
        except Exception as e:
            app.logger.error(f"Error parsing {filepath}: {e}")

    # Sort by date if available, newest first
    items.sort(key=lambda x: x.get('date', ''), reverse=True)
    return items


# API Routes
@app.route('/api/posts')
def get_posts():
    """Get all blog posts."""
    posts = get_all_items(POSTS_DIR)
    # Return list without full content for index
    return jsonify([{
        'slug': p['slug'],
        'title': p.get('title', 'Untitled'),
        'date': p.get('date', ''),
        'summary': p.get('summary', ''),
        'tags': p.get('tags', [])
    } for p in posts])


@app.route('/api/posts/<slug>')
def get_post(slug):
    """Get a single blog post by slug."""
    filepath = os.path.join(POSTS_DIR, f'{slug}.md')
    if not os.path.exists(filepath):
        return jsonify({'error': 'Post not found'}), 404

    post = parse_markdown_file(filepath)
    return jsonify(post)


@app.route('/api/projects')
def get_projects():
    """Get all projects."""
    projects = get_all_items(PROJECTS_DIR)
    return jsonify([{
        'slug': p['slug'],
        'title': p.get('title', 'Untitled'),
        'summary': p.get('summary', ''),
        'technologies': p.get('technologies', []),
        'github': p.get('github', ''),
        'live_url': p.get('live_url', ''),
        'image': p.get('image', ''),
        'featured': p.get('featured', False)
    } for p in projects])


@app.route('/api/projects/<slug>')
def get_project(slug):
    """Get a single project by slug."""
    filepath = os.path.join(PROJECTS_DIR, f'{slug}.md')
    if not os.path.exists(filepath):
        return jsonify({'error': 'Project not found'}), 404

    project = parse_markdown_file(filepath)
    return jsonify(project)


@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submission via Pushover."""
    data = request.get_json()

    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    message = data.get('message', '').strip()

    if not name or not email or not message:
        return jsonify({'error': 'All fields are required'}), 400

    # Check rate limit before processing
    client_ip = get_client_ip()
    if is_rate_limited(client_ip, email):
        return jsonify({
            'error': 'You have reached the maximum number of messages (2) allowed per 24 hours. Please try again later.'
        }), 429

    if not PUSHOVER_USER_KEY or not PUSHOVER_API_TOKEN:
        app.logger.error("Pushover credentials not configured")
        return jsonify({'error': 'Contact form not configured'}), 500

    # Send Pushover notification
    pushover_message = f"From: {name}\nEmail: {email}\nIP: {client_ip}\n\n{message}"

    try:
        response = requests.post(
            'https://api.pushover.net/1/messages.json',
            data={
                'token': PUSHOVER_API_TOKEN,
                'user': PUSHOVER_USER_KEY,
                'title': f'paulbrower.dev Contact: {name}',
                'message': pushover_message,
                'priority': 0
            }
        )

        if response.status_code == 200:
            # Record successful submission for rate limiting
            record_submission(client_ip, email)
            return jsonify({'success': True, 'message': 'Message sent successfully!'})
        else:
            app.logger.error(f"Pushover error: {response.text}")
            return jsonify({'error': 'Failed to send message'}), 500

    except Exception as e:
        app.logger.error(f"Contact form error: {e}")
        return jsonify({'error': 'Failed to send message'}), 500


# Serve React app
@app.route('/')
@app.route('/<path:path>')
def serve_react(path=''):
    """Serve React frontend."""
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True, port=5000)

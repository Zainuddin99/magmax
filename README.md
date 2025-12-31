# MagMax - Article/Blog Platform

A modern, content-driven web application built with **Django CMS** (backend) and **Next.js**
(frontend). This platform allows content management through Django CMS admin interface and exposes
content via REST API for consumption by the Next.js frontend.

## 🏗️ Architecture

- **Backend**: Django 5.0 + Django CMS 4.1 + REST Framework
- **Frontend**: Next.js 14+ with App Router + Tailwind CSS
- **Database**: PostgreSQL 16 (via Docker)
- **Authentication**: JWT (JSON Web Tokens)

## 📁 Project Structure

```
magmax/
├── backend/                 # Django CMS Backend
│   ├── config/             # Django project settings
│   ├── articles/           # Articles app (models, serializers, views)
│   ├── templates/          # Django CMS templates
│   ├── media/              # Uploaded media files
│   ├── requirements.txt    # Python dependencies
│   └── manage.py           # Django management script
├── frontend/               # Next.js Frontend (to be created)
├── docker-compose.yml      # Docker configuration for PostgreSQL
└── README.md              # This file
```

## ✨ Features

### Backend Features

- ✅ Django CMS for content management
- ✅ Article CRUD with rich text support
- ✅ Category/Tag management
- ✅ Image upload and management
- ✅ Publish/Unpublish workflow
- ✅ SEO fields (meta title, description, keywords)
- ✅ Open Graph tags for social media
- ✅ JWT Authentication
- ✅ REST API with filtering, search, and pagination
- ✅ View count tracking
- ✅ Reading time calculation
- ✅ Responsive admin interface

### API Features

- Article listing with pagination
- Article detail by slug
- Category management
- Filter by status, author, category
- Search in title, excerpt, content
- Published articles endpoint
- Featured articles endpoint
- User's articles endpoint

---

## 🚀 Quick Start

**👉 For complete step-by-step setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

### Quick Setup Summary

1. **Start Database**: `docker-compose up -d`
2. **Backend**:
   `cd backend && source venv/bin/activate && pip install -r requirements.txt && python manage.py migrate && python manage.py createsuperuser && python manage.py runserver`
3. **Frontend**: `cd frontend && npm install && npm run dev`

**For detailed instructions with troubleshooting, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

---

## 🚀 Backend Setup (Detailed)

### Prerequisites

- **Python 3.11 or 3.12** (⚠️ **Important**: Python 3.14+ is NOT supported)
- Docker Desktop (for PostgreSQL)
- pip and virtualenv

### Step 1: Start PostgreSQL Database

First, **start Docker Desktop** on your machine, then:

```bash
# From project root
docker-compose up -d

# Verify database is running
docker ps
```

You should see the `magmax_postgres` container running on port 5432.

### Step 2: Backend Installation

```bash
# Navigate to backend directory
cd backend

# Create virtual environment with Python 3.11 or 3.12
# macOS/Linux:
python3.11 -m venv venv
# OR
python3.12 -m venv venv

# Windows (Git Bash):
py -3.11 -m venv venv
# OR
py -3.12 -m venv venv

# Activate virtual environment
# macOS/Linux:
source venv/bin/activate
# Windows (Git Bash):
source venv/Scripts/activate
# Windows (CMD/PowerShell):
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Configure Environment Variables

The `.env` file is already created from `env.example`. You can modify it if needed:

```bash
# backend/.env
SECRET_KEY=your-secret-key-here-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DB_ENGINE=django.db.backends.postgresql
DB_NAME=magmax_db
DB_USER=postgres
DB_PASSWORD=postgres123
DB_HOST=localhost
DB_PORT=5432

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Step 4: Run Migrations

```bash
# Make sure you're in backend directory and venv is activated
cd backend
source venv/bin/activate

# Run migrations
python manage.py makemigrations
python manage.py migrate

# The following migrations will be created:
# - Django core migrations
# - Django CMS migrations
# - Articles app migrations
# - Filer (file management) migrations
```

### Step 5: Create Superuser

```bash
# Create admin user for Django CMS
python manage.py createsuperuser

# Enter:
# Username: admin
# Email: admin@magmax.com
# Password: (your secure password)
```

### Step 6: Collect Static Files

```bash
python manage.py collectstatic --noinput
```

### Step 7: Run Development Server

```bash
# Start Django development server
python manage.py runserver

# Server will start at: http://localhost:8000
```

---

## 🎯 Using the Backend

### Accessing Admin Interface

1. **Django Admin**: http://localhost:8000/admin/

   - Login with superuser credentials
   - Manage articles, categories, users

2. **Django CMS**: http://localhost:8000/en/
   - CMS page management interface
   - Create and edit pages

### Creating Articles

1. Go to http://localhost:8000/admin/articles/article/
2. Click "Add Article"
3. Fill in the form:

   - **Title**: Article title (slug auto-generates)
   - **Excerpt**: Brief description
   - **Content**: Full article content
   - **Featured Image**: Upload image
   - **Author**: Auto-assigned to current user
   - **Categories**: Select categories
   - **Status**: Draft/Published/Archived
   - **Published Date**: When to publish
   - **SEO Fields**: Meta title, description, keywords
   - **Open Graph**: Social media preview settings

4. Click "Save"

### Managing Categories

1. Go to http://localhost:8000/admin/articles/category/
2. Click "Add Category"
3. Enter name (slug auto-generates) and description
4. Click "Save"

---

## 📡 API Documentation

### Base URL

```
http://localhost:8000/api/v1/
```

### Authentication

#### Get JWT Token

```bash
POST /api/token/
Content-Type: application/json

{
  "username": "admin",
  "password": "your-password"
}

Response:
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### Refresh Token

```bash
POST /api/token/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### Using Token

```bash
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

### Endpoints

#### Articles

##### List All Articles (Published)

```bash
GET /api/v1/articles/

# With filters
GET /api/v1/articles/?status=published
GET /api/v1/articles/?categories=1
GET /api/v1/articles/?search=django
GET /api/v1/articles/?ordering=-published_date
```

##### Get Published Articles Only

```bash
GET /api/v1/articles/published/
```

##### Get Featured Articles

```bash
GET /api/v1/articles/featured/
```

##### Get Article Detail

```bash
GET /api/v1/articles/{slug}/

Example: GET /api/v1/articles/my-first-article/
```

##### Get My Articles (Authenticated)

```bash
GET /api/v1/articles/my_articles/
Authorization: Bearer <token>
```

##### Create Article (Authenticated)

```bash
POST /api/v1/articles/
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My New Article",
  "excerpt": "Short description",
  "content": "Full article content here...",
  "status": "published",
  "published_date": "2024-12-24T10:00:00Z",
  "meta_title": "My New Article - SEO Title",
  "meta_description": "SEO description for search engines",
  "meta_keywords": "django, article, blog"
}
```

##### Update Article (Authenticated)

```bash
PUT /api/v1/articles/{slug}/
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

##### Delete Article (Authenticated)

```bash
DELETE /api/v1/articles/{slug}/
Authorization: Bearer <token>
```

#### Categories

##### List Categories

```bash
GET /api/v1/categories/
```

##### Get Category Detail

```bash
GET /api/v1/categories/{slug}/
```

##### Get Articles in Category

```bash
GET /api/v1/categories/{slug}/articles/
```

##### Create Category (Authenticated)

```bash
POST /api/v1/categories/
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Technology",
  "description": "Tech-related articles"
}
```

### Response Format

#### Article List Response

```json
{
  "count": 10,
  "next": "http://localhost:8000/api/v1/articles/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Getting Started with Django",
      "slug": "getting-started-with-django",
      "excerpt": "Learn the basics of Django framework",
      "featured_image_url": "http://localhost:8000/media/django.jpg",
      "author": {
        "id": 1,
        "username": "admin",
        "first_name": "Admin",
        "last_name": "User",
        "email": "admin@magmax.com"
      },
      "categories": [
        {
          "id": 1,
          "name": "Technology",
          "slug": "technology"
        }
      ],
      "status": "published",
      "published_date": "2024-12-24T10:00:00Z",
      "reading_time": 5,
      "view_count": 42,
      "created_at": "2024-12-20T10:00:00Z"
    }
  ]
}
```

#### Article Detail Response

```json
{
  "id": 1,
  "title": "Getting Started with Django",
  "slug": "getting-started-with-django",
  "excerpt": "Learn the basics of Django framework",
  "content": "Full article content here...",
  "featured_image_url": "http://localhost:8000/media/django.jpg",
  "author": {
    "id": 1,
    "username": "admin",
    "first_name": "Admin",
    "last_name": "User",
    "email": "admin@magmax.com"
  },
  "categories": [...],
  "status": "published",
  "published_date": "2024-12-24T10:00:00Z",
  "created_at": "2024-12-20T10:00:00Z",
  "updated_at": "2024-12-23T15:30:00Z",
  "reading_time": 5,
  "view_count": 42,
  "is_published": true,
  "seo": {
    "meta_title": "Getting Started with Django - SEO Title",
    "meta_description": "Complete guide to Django framework",
    "meta_keywords": "django, python, web framework",
    "og_title": "Getting Started with Django",
    "og_description": "Complete guide to Django framework",
    "og_image": "http://localhost:8000/media/django-og.jpg"
  }
}
```

---

## 🧪 Testing the API

### Using curl

```bash
# Get all published articles
curl http://localhost:8000/api/v1/articles/published/

# Get article detail
curl http://localhost:8000/api/v1/articles/my-article-slug/

# Get JWT token
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your-password"}'

# Create article with token
curl -X POST http://localhost:8000/api/v1/articles/ \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Article","content":"Content here"}'
```

### Using Postman/Insomnia

1. Import endpoints from API documentation above
2. Set base URL: `http://localhost:8000/api/v1/`
3. For authenticated requests:
   - Get token from `/api/token/`
   - Add to Authorization header: `Bearer <token>`

### Using Django REST Framework Browsable API

Visit http://localhost:8000/api/v1/articles/ in your browser for an interactive API interface.

---

## 📊 Database Schema

### Article Model

- `id`: Primary key
- `title`: Article title (max 200 chars)
- `slug`: URL-friendly slug (unique)
- `excerpt`: Brief description (max 500 chars)
- `content`: Full article content (rich text)
- `featured_image`: Foreign key to Filer image
- `author`: Foreign key to User
- `categories`: Many-to-many with Category
- `status`: draft/published/archived
- `published_date`: When published
- `created_at`, `updated_at`: Timestamps
- **SEO Fields**: meta_title, meta_description, meta_keywords
- **Open Graph**: og_title, og_description, og_image
- `view_count`: Article views
- `reading_time`: Calculated property

### Category Model

- `id`: Primary key
- `name`: Category name (unique)
- `slug`: URL-friendly slug (unique)
- `description`: Category description
- `created_at`, `updated_at`: Timestamps

---

## 🔒 Security Notes

1. **Change SECRET_KEY in production**
2. **Set DEBUG=False in production**
3. **Use strong passwords for database and admin**
4. **Configure ALLOWED_HOSTS properly**
5. **Use HTTPS in production**
6. **Rotate JWT tokens regularly**

---

## 🛠️ Development Commands

```bash
# Create new app
python manage.py startapp app_name

# Make migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Run on different port
python manage.py runserver 8080

# Django shell
python manage.py shell

# Database shell
python manage.py dbshell

# Check for issues
python manage.py check

# Collect static files
python manage.py collectstatic
```

---

## 🐛 Troubleshooting

### Database Connection Error

```
Error: could not connect to server
```

**Solution**: Make sure Docker Desktop is running and PostgreSQL container is up:

```bash
docker-compose up -d
docker ps
```

### Port Already in Use

```
Error: That port is already in use
```

**Solution**: Run on different port or kill process:

```bash
python manage.py runserver 8080
```

### Static Files Not Loading

```bash
python manage.py collectstatic --noinput
```

### Media Files Not Displaying

Check `MEDIA_ROOT` and `MEDIA_URL` in settings.py and ensure media URLs are configured in urls.py.

---

## 📝 Next Steps

1. ✅ Backend API is ready
2. 🔄 Create Next.js frontend
3. 🔄 Integrate frontend with API
4. 🔄 Add search functionality
5. 🔄 Add pagination in frontend
6. 🔄 Deploy to production (Vercel + Railway)
7. 🔄 Add Docker setup for backend

---

## 🤝 Contributing

This is a test assignment project. For production use, consider:

- Adding comprehensive tests
- Implementing caching (Redis)
- Adding rate limiting
- Setting up CI/CD pipeline
- Adding monitoring and logging
- Implementing search with Elasticsearch

---

## 📄 License

This project is created as a developer test assignment.

---

## 👨‍💻 Developer Notes

**Completed Backend Features:**

- ✅ Django 5.0 + Django CMS 4.1
- ✅ PostgreSQL database with Docker
- ✅ Article model with SEO fields
- ✅ Category model
- ✅ Django REST Framework API
- ✅ JWT Authentication
- ✅ Admin interface customization
- ✅ Image upload with django-filer
- ✅ CORS configuration for Next.js
- ✅ Filtering, search, and pagination
- ✅ Published/Draft workflow
- ✅ View count tracking
- ✅ Reading time calculation
- ✅ Comprehensive API documentation

### Frontend (Next.js)

- ✅ Next.js 14 App Router with Tailwind CSS
- ✅ Public article list (SSR/ISR)
- ✅ Article detail pages with SEO meta and OG tags
- ✅ Typography styling for CMS content
- ✅ No frontend auth needed (public-only)

#### Run Frontend

```bash
cd frontend
cp env.example .env.local   # optional - defaults are set
npm install
npm run dev   # http://localhost:3000
```

**Ready for Frontend Integration!** 🚀

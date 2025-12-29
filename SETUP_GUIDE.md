# 🚀 Complete Setup Guide

This guide will walk you through setting up both the **Django CMS backend** and **Next.js frontend** from scratch.

---

## 📋 Prerequisites

Before starting, make sure you have:

- ✅ **Python 3.11+** installed
- ✅ **Node.js 18+** and npm/yarn installed
- ✅ **Docker Desktop** installed and running
- ✅ **Git** installed

---

## 🗄️ Step 1: Database Setup (PostgreSQL with Docker)

### 1.1 Start PostgreSQL Container

```bash
# From project root directory
cd /Users/zainuddin/bheja/magmax

# Start PostgreSQL database
docker-compose up -d

# Verify it's running
docker ps
# You should see: magmax_postgres container running on port 5432
```

**✅ Success**: You should see the container running. If not, make sure Docker Desktop is running.

---

## 🔧 Step 2: Backend Setup (Django CMS)

### 2.1 Navigate to Backend Directory

```bash
cd backend
```

### 2.2 Create Virtual Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# You should see (venv) in your terminal prompt
```

### 2.3 Install Dependencies

```bash
# Upgrade pip
pip install --upgrade pip

# Install all Python packages
pip install -r requirements.txt
```

**⏱️ This may take 2-3 minutes** - installing Django, Django CMS, and all dependencies.

### 2.4 Configure Environment Variables

```bash
# Copy example environment file
cp env.example .env

# The .env file is already configured with defaults:
# - Database: localhost:5432
# - Database name: magmax_db
# - User: postgres
# - Password: postgres123
```

**Note**: You can edit `.env` if you need different database credentials.

### 2.5 Run Database Migrations

```bash
# Create migration files (if any new changes)
python manage.py makemigrations

# Apply migrations to database
python manage.py migrate
```

**✅ Success**: You should see "Applying migrations..." and all migrations applied successfully.

### 2.6 Create Admin User (Superuser)

```bash
python manage.py createsuperuser

# Enter details:
# Username: admin (or your choice)
# Email: admin@magmax.com (or your email)
# Password: (choose a secure password - remember this!)
```

**✅ Success**: "Superuser created successfully."

### 2.7 Collect Static Files

```bash
python manage.py collectstatic --noinput
```

**✅ Success**: "X static files copied..."

### 2.8 Start Django Server

```bash
python manage.py runserver
```

**✅ Success**: You should see:
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

### 2.9 Verify Backend is Working

1. **Open browser**: http://localhost:8000/admin/
2. **Login** with your superuser credentials
3. **You should see**: Django admin dashboard

**✅ Backend is ready!**

---

## 🎨 Step 3: Frontend Setup (Next.js)

### 3.1 Open a New Terminal Window

**Keep the Django server running** in the first terminal, and open a **new terminal** for frontend.

### 3.2 Navigate to Frontend Directory

```bash
cd /Users/zainuddin/bheja/magmax/frontend
```

### 3.3 Install Dependencies

```bash
# Using npm (default)
npm install

# OR using yarn (if you prefer)
yarn install
```

**⏱️ This may take 1-2 minutes** - installing Next.js, React, Tailwind, and dependencies.

### 3.4 Configure Environment Variables (Optional)

```bash
# Copy example environment file
cp env.example .env.local

# Edit .env.local if needed (defaults are already set):
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
# NEXT_PUBLIC_SITE_NAME=MagMax Blog
# NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Note**: Defaults work fine for local development. Only edit if you need custom values.

### 3.5 Start Next.js Development Server

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev
```

**✅ Success**: You should see:
```
▲ Next.js 16.1.1
- Local:        http://localhost:3000
- Ready in XXXms
```

### 3.6 Verify Frontend is Working

1. **Open browser**: http://localhost:3000
2. **You should see**: Homepage with article list (may be empty if no articles yet)

**✅ Frontend is ready!**

---

## 🧪 Step 4: Test the Complete Setup

### 4.1 Create Test Article in Django Admin

1. Go to http://localhost:8000/admin/
2. Click **"Articles"** → **"Add Article"**
3. Fill in:
   - **Title**: "My First Article"
   - **Content**: "This is my first article content..."
   - **Excerpt**: "A brief description"
   - **Status**: Select **"Published"**
   - **Published date**: Today's date/time
   - **Author**: Select your user
4. Click **"Save"**

### 4.2 View Article on Frontend

1. Go to http://localhost:3000
2. **You should see**: Your article in the list
3. **Click the article** → Should open detail page

**✅ Everything is working!**

---

## 📝 Quick Reference Commands

### Backend Commands

```bash
# Activate virtual environment
cd backend
source venv/bin/activate

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start server
python manage.py runserver

# Stop server
Ctrl + C
```

### Frontend Commands

```bash
# Navigate to frontend
cd frontend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Stop server
Ctrl + C
```

### Database Commands

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View database logs
docker logs magmax_postgres

# Restart database
docker-compose restart
```

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to database"

**Solution**:
```bash
# Make sure Docker is running
docker ps

# If not running, start it:
docker-compose up -d

# Wait a few seconds, then try again
```

### Issue: "Port 8000 already in use" (Backend)

**Solution**:
```bash
# Use a different port
python manage.py runserver 8080

# Then update frontend .env.local:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
```

### Issue: "Port 3000 already in use" (Frontend)

**Solution**:
```bash
# Kill the process using port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Issue: "Module not found" errors

**Solution**:
```bash
# Backend: Make sure venv is activated
source venv/bin/activate
pip install -r requirements.txt

# Frontend: Reinstall dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Migrations not applied"

**Solution**:
```bash
cd backend
source venv/bin/activate
python manage.py migrate
```

### Issue: Images not showing

**Solution**:
1. Make sure backend is running on `http://localhost:8000`
2. Check that image URLs in API response are correct
3. Restart Next.js server after changing `next.config.ts`

---

## ✅ Setup Checklist

Use this checklist to verify your setup:

### Backend
- [ ] Docker Desktop is running
- [ ] PostgreSQL container is running (`docker ps`)
- [ ] Virtual environment created and activated
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] `.env` file exists
- [ ] Migrations applied (`python manage.py migrate`)
- [ ] Superuser created (`python manage.py createsuperuser`)
- [ ] Static files collected (`python manage.py collectstatic`)
- [ ] Django server running (`python manage.py runserver`)
- [ ] Can access admin at http://localhost:8000/admin/

### Frontend
- [ ] Node.js and npm/yarn installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` file exists (optional)
- [ ] Next.js server running (`npm run dev`)
- [ ] Can access homepage at http://localhost:3000
- [ ] Can see API data (articles list)

### Integration
- [ ] Created test article in Django admin
- [ ] Article appears on homepage
- [ ] Can click article to see detail page
- [ ] Images are displaying correctly
- [ ] Author name is showing
- [ ] Publish date is showing

---

## 🎯 Next Steps

Once setup is complete:

1. **Create more articles** via Django admin
2. **Add categories** and assign them to articles
3. **Upload images** for articles
4. **Test pagination** (create 10+ articles)
5. **Test SEO** - check page source for meta tags
6. **Customize** site name, description in `.env.local`

---

## 📚 Additional Resources

- **Backend API Docs**: http://localhost:8000/api/v1/ (browsable API)
- **Django Admin**: http://localhost:8000/admin/
- **Frontend**: http://localhost:3000
- **API Endpoints**: See `README.md` for full API documentation

---

## 🆘 Still Having Issues?

1. **Check logs**: Look at terminal output for error messages
2. **Verify versions**: Python 3.11+, Node.js 18+
3. **Restart everything**: Stop all servers, restart Docker, start fresh
4. **Check ports**: Make sure 8000 and 3000 are available
5. **Review this guide**: Make sure you didn't skip any steps

---

**Happy Coding! 🚀**


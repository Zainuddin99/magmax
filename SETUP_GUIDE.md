# 🚀 Complete Setup Guide

This guide will walk you through setting up both the **Django CMS backend** and **Next.js frontend**
from scratch on **macOS** and **Windows**.

---

## 📋 Prerequisites

Before starting, make sure you have:

- ✅ **Python 3.11 or 3.12** installed (⚠️ **Important**: Python 3.14+ is not supported)
- ✅ **Node.js 18+** and npm/yarn installed
- ✅ **Docker Desktop** installed and running
- ✅ **Git** installed

### ⚠️ Python Version Requirements

**Critical**: This project requires **Python 3.11 or 3.12**. Python 3.14+ is not compatible with
Django 5.0.1.

**Check your Python version:**

```bash
# macOS/Linux
python3 --version

# Windows (Git Bash)
py --version
# OR
python --version
```

**If you have Python 3.14 or higher:**

- **macOS/Linux**: Install Python 3.11 or 3.12 using pyenv or download from python.org
- **Windows**: Download Python 3.11.x or 3.12.x from https://www.python.org/downloads/ and check
  "Add Python to PATH" during installation

---

## 🗄️ Step 1: Database Setup (PostgreSQL with Docker)

### 1.1 Start PostgreSQL Container

**macOS/Linux:**

```bash
# From project root directory
cd ~/path/to/magmax-submission

# Start PostgreSQL database
docker-compose up -d

# Verify it's running
docker ps
# You should see: magmax_postgres container running on port 5432
```

**Windows (Git Bash):**

```bash
# From project root directory
cd /c/Users/YourName/Downloads/magmax-submission

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

**macOS/Linux:**

```bash
# Create virtual environment with Python 3.11 or 3.12
python3.11 -m venv venv
# OR if you have 3.12:
# python3.12 -m venv venv

# Activate virtual environment
source venv/bin/activate

# You should see (venv) in your terminal prompt
```

**Windows (Git Bash):**

```bash
# First, check which Python versions you have
py --list
# OR check specific version
py -3.11 --version
py -3.12 --version

# Create virtual environment with Python 3.11 or 3.12
py -3.11 -m venv venv
# OR if you have 3.12:
# py -3.12 -m venv venv

# Activate virtual environment (Git Bash)
source venv/Scripts/activate

# You should see (venv) in your terminal prompt
```

**Windows (Command Prompt/PowerShell):**

```cmd
# Create virtual environment
py -3.11 -m venv venv
# OR
py -3.12 -m venv venv

# Activate virtual environment
venv\Scripts\activate
```

### 2.3 Install Dependencies

```bash
# Upgrade pip
pip install --upgrade pip

# Install all Python packages
pip install -r requirements.txt
```

**⏱️ This may take 2-3 minutes** - installing Django, Django CMS, and all dependencies.

**⚠️ If you get errors:**

- Make sure you're using Python 3.11 or 3.12 (not 3.14+)
- Make sure your virtual environment is activated
- Try: `python -m pip install -r requirements.txt`

### 2.4 Configure Environment Variables

**macOS/Linux:**

```bash
# Copy example environment file
cp env.example .env
```

**Windows (Git Bash):**

```bash
# Copy example environment file
cp env.example .env
```

**Windows (Command Prompt):**

```cmd
copy env.example .env
```

**The .env file is already configured with defaults:**

- Database: localhost:5432
- Database name: magmax_db
- User: postgres
- Password: postgres123

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

**macOS/Linux:**

```bash
cd ~/path/to/magmax-submission/frontend
```

**Windows (Git Bash):**

```bash
cd /c/Users/YourName/Downloads/magmax-submission/frontend
```

**Windows (Command Prompt):**

```cmd
cd C:\Users\YourName\Downloads\magmax-submission\frontend
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

**macOS/Linux:**

```bash
# Copy example environment file
cp env.example .env.local
```

**Windows (Git Bash):**

```bash
# Copy example environment file
cp env.example .env.local
```

**Windows (Command Prompt):**

```cmd
copy env.example .env.local
```

**Edit .env.local if needed (defaults are already set):**

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_NAME=MagMax Blog
NEXT_PUBLIC_SITE_URL=http://localhost:3000
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

**macOS/Linux:**

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

**Windows (Git Bash):**

```bash
# Activate virtual environment
cd backend
source venv/Scripts/activate

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

**Windows (Command Prompt):**

```cmd
# Activate virtual environment
cd backend
venv\Scripts\activate

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

# On Windows (Git Bash):
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
PORT=3001 npm run dev
```

### Issue: "Module not found" errors

**Solution**:

```bash
# Backend: Make sure venv is activated and using correct Python version
cd backend
source venv/bin/activate  # macOS/Linux
# OR
source venv/Scripts/activate  # Windows Git Bash
# OR
venv\Scripts\activate  # Windows CMD

# Verify Python version
python --version  # Should show 3.11.x or 3.12.x (NOT 3.14+)

# Reinstall dependencies
pip install -r requirements.txt

# Frontend: Reinstall dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Python 3.14 compatibility errors" or "'super' object has no attribute 'dicts'"

**Solution**: This means you're using Python 3.14+ which is not compatible.

```bash
# Check your Python version
python --version

# If it shows 3.14+, you need to install Python 3.11 or 3.12

# macOS/Linux: Install Python 3.11/3.12 using pyenv
pyenv install 3.11.9
pyenv local 3.11.9

# Windows: Download Python 3.11.x or 3.12.x from python.org
# Then recreate venv:
rm -rf venv  # or rmdir /s venv on Windows CMD
py -3.11 -m venv venv  # Windows
# OR
python3.11 -m venv venv  # macOS/Linux
```

### Issue: "Migrations not applied"

**Solution**:

```bash
cd backend
source venv/bin/activate  # macOS/Linux
# OR
source venv/Scripts/activate  # Windows Git Bash
python manage.py migrate
```

### Issue: Images not showing

**Solution**:

1. Make sure backend is running on `http://localhost:8000`
2. Check that image URLs in API response are correct
3. Restart Next.js server after changing `next.config.ts`

### Issue: "pip install giving errors" (Pillow build errors)

**Solution**: This usually happens with Python 3.14+. Use Python 3.11 or 3.12 instead.

---

## ✅ Setup Checklist

Use this checklist to verify your setup:

### Backend

- [ ] Python 3.11 or 3.12 installed (NOT 3.14+)
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
2. **Verify versions**:
   - Python 3.11 or 3.12 (NOT 3.14+)
   - Node.js 18+
3. **Restart everything**: Stop all servers, restart Docker, start fresh
4. **Check ports**: Make sure 8000 and 3000 are available
5. **Review this guide**: Make sure you didn't skip any steps
6. **Python version**: Most issues are caused by using Python 3.14+ - use 3.11 or 3.12

---

**Happy Coding! 🚀**

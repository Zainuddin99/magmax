# 🚀 Quick Start Guide

Get the MagMax backend up and running in 5 minutes!

## Method 1: Automated Setup (Recommended)

### Prerequisites

- Docker Desktop installed and running
- **Python 3.11 or 3.12** installed (⚠️ **Important**: Python 3.14+ is NOT supported)

### Steps

```bash
# 1. Start Docker Desktop (make sure it's running)

# 2. Navigate to backend directory
cd backend

# 3. Run the setup script
./setup.sh

# 4. Create superuser
source venv/bin/activate
python manage.py createsuperuser
# Enter username, email, and password

# 5. Start the server
python manage.py runserver

# 6. Access the application
# Admin: http://localhost:8000/admin/
# API: http://localhost:8000/api/v1/articles/
```

---

## Method 2: Manual Setup

### Step 1: Start Database

```bash
# Make sure Docker Desktop is running, then:
cd magmax
docker-compose up -d
```

### Step 2: Setup Backend

```bash
cd backend

# Create and activate virtual environment
# macOS/Linux:
python3.11 -m venv venv
source venv/bin/activate

# Windows (Git Bash):
py -3.11 -m venv venv
source venv/Scripts/activate

# Windows (CMD):
py -3.11 -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp env.example .env

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Create admin user
python manage.py createsuperuser
```

### Step 3: Run Server

```bash
python manage.py runserver
```

---

## 🎯 What to Do Next

### 1. Access Django Admin

- URL: http://localhost:8000/admin/
- Login with your superuser credentials
- Create some categories and articles

### 2. Test the API

- List articles: http://localhost:8000/api/v1/articles/
- Browsable API: http://localhost:8000/api/v1/
- See `API_TESTING.md` for detailed API documentation

### 3. Get JWT Token (for authenticated requests)

```bash
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your-password"}'
```

### 4. Create Your First Article via API

```bash
curl -X POST http://localhost:8000/api/v1/articles/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hello World",
    "content": "My first article!",
    "status": "published",
    "published_date": "2024-12-24T10:00:00Z"
  }'
```

---

## 🛠️ Useful Commands

```bash
# Activate virtual environment
source venv/bin/activate

# Run development server
python manage.py runserver

# Create new superuser
python manage.py createsuperuser

# Make migrations after model changes
python manage.py makemigrations
python manage.py migrate

# Django shell (for testing)
python manage.py shell

# Check for issues
python manage.py check
```

---

## 📊 Check If Everything Works

### Database Connection

```bash
docker ps
# Should show magmax_postgres container running
```

### API Health Check

```bash
curl http://localhost:8000/api/v1/articles/
# Should return JSON response (may be empty initially)
```

### Admin Access

- Visit http://localhost:8000/admin/
- You should see Django admin login page

---

## ❓ Common Issues

### Docker not running

```
Error: Cannot connect to Docker daemon
```

**Fix**: Start Docker Desktop application

### Port 8000 already in use

```
Error: That port is already in use
```

**Fix**: Use a different port

```bash
python manage.py runserver 8080
```

### Database connection error

```
Error: could not connect to server
```

**Fix**:

1. Make sure Docker Desktop is running
2. Check if PostgreSQL container is up: `docker ps`
3. Restart container: `docker-compose restart`

### Module not found error

```
ModuleNotFoundError: No module named 'django'
```

**Fix**: Activate virtual environment

```bash
source venv/bin/activate
```

---

## 🎉 Success!

If you can:

1. ✅ Access admin at http://localhost:8000/admin/
2. ✅ See API at http://localhost:8000/api/v1/articles/
3. ✅ Create and retrieve articles

**You're all set!** 🚀

---

## 📚 Next Steps

1. Read `README.md` for complete documentation
2. Check `API_TESTING.md` for API testing examples
3. Create some test articles via admin
4. Test API endpoints
5. Build the Next.js frontend!

---

## 🆘 Need Help?

1. Check `README.md` for detailed documentation
2. Review error messages carefully
3. Make sure all prerequisites are installed
4. Verify Docker Desktop is running
5. Check if virtual environment is activated

---

**Happy Coding!** 🎊

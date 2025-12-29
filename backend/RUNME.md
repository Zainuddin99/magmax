# 🏃 HOW TO RUN THE BACKEND

## Prerequisites Check ✓

Before starting, ensure you have:
- [ ] Docker Desktop installed and **RUNNING**
- [ ] Python 3.11+ installed
- [ ] Terminal/Command Line access

---

## 🚀 FIRST TIME SETUP

### 1. Start Docker Desktop
**IMPORTANT**: Open Docker Desktop application and make sure it's running!

### 2. Start PostgreSQL Database

```bash
# From project root (magmax directory)
cd /Users/zainuddin/bheja/magmax
docker-compose up -d

# Verify it's running
docker ps
# You should see: magmax_postgres container running on port 5432
```

### 3. Setup Backend Environment

```bash
# Navigate to backend
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 4. Configure Environment (already done)
The `.env` file is already created with proper settings!

### 5. Setup Database

```bash
# Make sure you're in backend directory with venv activated
python manage.py makemigrations
python manage.py migrate
```

### 6. Create Admin User

```bash
python manage.py createsuperuser

# Enter details:
# Username: admin
# Email: admin@magmax.com
# Password: (choose a secure password)
```

### 7. Collect Static Files

```bash
python manage.py collectstatic --noinput
```

### 8. Start Development Server

```bash
python manage.py runserver
```

**🎉 Done! Server running at http://localhost:8000**

---

## 🔄 RUNNING AFTER FIRST SETUP

Once you've completed the first-time setup, future runs are simple:

```bash
# 1. Make sure Docker Desktop is running

# 2. Start database (if not already running)
docker-compose up -d

# 3. Navigate to backend and activate venv
cd backend
source venv/bin/activate

# 4. Run server
python manage.py runserver
```

---

## 🎯 ACCESS POINTS

Once the server is running:

### Django Admin Interface
- **URL**: http://localhost:8000/admin/
- **Login**: Use superuser credentials you created
- **Purpose**: Create and manage articles, categories, users

### REST API
- **Base URL**: http://localhost:8000/api/v1/
- **Articles**: http://localhost:8000/api/v1/articles/
- **Categories**: http://localhost:8000/api/v1/categories/
- **Browsable API**: Visit in browser for interactive testing

### Django CMS
- **URL**: http://localhost:8000/en/
- **Purpose**: CMS page management (bonus feature)

---

## 📝 QUICK TEST

### Test 1: Check API is working

```bash
curl http://localhost:8000/api/v1/articles/
```

Expected: JSON response (may be empty if no articles created yet)

### Test 2: Get JWT Token

```bash
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your-password"}'
```

Expected: JSON with `access` and `refresh` tokens

### Test 3: Access Admin
- Go to http://localhost:8000/admin/ in browser
- Login with superuser credentials
- You should see Django admin dashboard

---

## 🛠️ USEFUL COMMANDS

```bash
# Activate virtual environment (always do this first!)
source venv/bin/activate

# Run server
python manage.py runserver

# Run on different port
python manage.py runserver 8080

# Create migrations after model changes
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Django shell (for testing/debugging)
python manage.py shell

# Check for project issues
python manage.py check

# Show all database migrations
python manage.py showmigrations

# Stop server
Ctrl + C
```

---

## 🐛 TROUBLESHOOTING

### Issue: "ModuleNotFoundError"
**Cause**: Virtual environment not activated
**Fix**:
```bash
source venv/bin/activate
```

### Issue: "Port 8000 already in use"
**Fix**: Use different port
```bash
python manage.py runserver 8080
```

### Issue: "Could not connect to database"
**Cause**: Docker not running or container stopped
**Fix**:
1. Start Docker Desktop
2. Run: `docker-compose up -d`
3. Check: `docker ps` (should show magmax_postgres)

### Issue: "No such table" error
**Cause**: Migrations not run
**Fix**:
```bash
python manage.py migrate
```

### Issue: Static files not loading
**Fix**:
```bash
python manage.py collectstatic --noinput
```

---

## 📊 VERIFY EVERYTHING WORKS

Run these checks:

```bash
# 1. Check Docker container
docker ps
# Should show: magmax_postgres running

# 2. Check database connection
python manage.py dbshell
# Should connect to PostgreSQL (type \q to exit)

# 3. Check migrations
python manage.py showmigrations
# All should have [X] marks

# 4. Check API
curl http://localhost:8000/api/v1/articles/
# Should return JSON

# 5. Check admin
# Visit http://localhost:8000/admin/ in browser
# Should show login page
```

---

## 🎓 CREATE YOUR FIRST ARTICLE

### Via Admin Interface (Easy)

1. Go to http://localhost:8000/admin/
2. Click "Articles" → "Add Article"
3. Fill in:
   - Title: "My First Article"
   - Content: "Hello World!"
   - Status: "Published"
   - Published date: (today's date)
4. Click "Save"
5. Visit http://localhost:8000/api/v1/articles/ to see it in API!

### Via API (Advanced)

```bash
# 1. Get token
TOKEN=$(curl -s -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your-password"}' | \
  python3 -c "import sys, json; print(json.load(sys.stdin)['access'])")

# 2. Create article
curl -X POST http://localhost:8000/api/v1/articles/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First API Article",
    "excerpt": "Created via REST API",
    "content": "This is my first article created using the API!",
    "status": "published",
    "published_date": "2024-12-24T10:00:00Z"
  }'

# 3. View article
curl http://localhost:8000/api/v1/articles/my-first-api-article/
```

---

## 🎯 NEXT STEPS

1. ✅ Backend is running
2. 📝 Create some test articles via admin
3. 🧪 Test API endpoints (see API_TESTING.md)
4. 🎨 Build Next.js frontend
5. 🔗 Connect frontend to this API

---

## 🆘 STILL HAVING ISSUES?

1. Make sure Docker Desktop is **running** (check the icon in menu bar)
2. Make sure virtual environment is **activated** (you should see `(venv)` in terminal)
3. Check if port 8000 is available (no other server running)
4. Try restarting:
   ```bash
   docker-compose down
   docker-compose up -d
   python manage.py runserver
   ```

---

## 📚 MORE INFORMATION

- **Full Documentation**: See `../README.md`
- **Quick Start Guide**: See `../QUICKSTART.md`
- **API Testing**: See `API_TESTING.md`

---

**You're all set! Happy coding! 🚀**




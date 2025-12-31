# Environment Variables for Railway Deployment

This document lists all environment variables you need to set in Railway for your Django backend.

## 📋 Complete List of Environment Variables

### 🔴 **REQUIRED - Must Set These**

#### 1. Django Security Settings
```
SECRET_KEY=your-very-secure-random-secret-key-here
```
- **What it is:** Django's secret key for cryptographic signing
- **How to generate:** Use Python: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
- **Example:** `SECRET_KEY=django-insecure-abc123xyz789...` (but use a secure one!)

```
DEBUG=False
```
- **What it is:** Turns off debug mode in production
- **Value:** Must be `False` for production (security)

```
ALLOWED_HOSTS=*.railway.app,your-app-name.railway.app
```
- **What it is:** List of domains that can access your Django app
- **Format:** Comma-separated, no spaces
- **Include:** Your Railway domain and any custom domains

---

#### 2. Database Configuration

Railway automatically provides PostgreSQL connection variables. Use these references:

```
DB_ENGINE=django.db.backends.postgresql
```
- **What it is:** Database engine type
- **Value:** Always `django.db.backends.postgresql` for PostgreSQL

```
DB_NAME=${{Postgres.DATABASE}}
```
- **What it is:** Database name
- **Value:** Use Railway's variable reference: `${{Postgres.DATABASE}}`
- **Note:** Railway automatically creates this when you add PostgreSQL

```
DB_USER=${{Postgres.USER}}
```
- **What it is:** Database username
- **Value:** Use Railway's variable reference: `${{Postgres.USER}}`

```
DB_PASSWORD=${{Postgres.PASSWORD}}
```
- **What it is:** Database password
- **Value:** Use Railway's variable reference: `${{Postgres.PASSWORD}}`

```
DB_HOST=${{Postgres.HOST}}
```
- **What it is:** Database host address
- **Value:** Use Railway's variable reference: `${{Postgres.HOST}}`

```
DB_PORT=${{Postgres.PORT}}
```
- **What it is:** Database port
- **Value:** Use Railway's variable reference: `${{Postgres.PORT}}`

---

#### 3. CORS (Cross-Origin Resource Sharing)

```
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
```
- **What it is:** Frontend domains allowed to make API requests
- **Format:** Comma-separated URLs (no spaces)
- **Examples:**
  - If frontend on Vercel: `https://your-app.vercel.app`
  - If frontend on Railway: `https://your-frontend.railway.app`
  - If local development: `http://localhost:3000` (add this too if needed)

---

### 🟡 **OPTIONAL - Recommended to Set**

#### 4. Media Files (File Uploads)

```
MEDIA_URL=/media/
```
- **What it is:** URL path for media files
- **Default:** `/media/` (usually fine)
- **Note:** Railway's filesystem is ephemeral - files will be lost on redeploy

```
MEDIA_ROOT=media/
```
- **What it is:** Directory where uploaded files are stored
- **Default:** `media/` (usually fine)
- **Warning:** For production, consider using AWS S3 or Cloudinary instead

---

## 📝 Quick Copy-Paste Template for Railway

Copy this entire block and paste into Railway's Variables tab, then replace the placeholders:

```bash
# Django Security (REQUIRED)
SECRET_KEY=CHANGE-THIS-TO-A-RANDOM-SECRET-KEY
DEBUG=False
ALLOWED_HOSTS=*.railway.app

# Database (REQUIRED - Railway provides these automatically)
DB_ENGINE=django.db.backends.postgresql
DB_NAME=${{Postgres.DATABASE}}
DB_USER=${{Postgres.USER}}
DB_PASSWORD=${{Postgres.PASSWORD}}
DB_HOST=${{Postgres.HOST}}
DB_PORT=${{Postgres.PORT}}

# CORS (REQUIRED - Update with your frontend URL)
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com

# Media Files (OPTIONAL)
MEDIA_URL=/media/
MEDIA_ROOT=media/
```

---

## 🔧 How to Set Variables in Railway

### Method 1: Railway Dashboard (Easiest)

1. Go to your Railway project
2. Click on your **service** (backend service)
3. Click on **"Variables"** tab
4. Click **"+ New Variable"** for each variable
5. Enter the **Variable Name** and **Value**
6. Click **"Add"**

### Method 2: Bulk Import (Faster)

1. Go to **Variables** tab
2. Look for **"Raw Editor"** or **"Import"** button
3. Paste all variables at once (one per line, format: `KEY=value`)

### Method 3: Railway CLI

```bash
railway variables set SECRET_KEY=your-secret-key
railway variables set DEBUG=False
railway variables set ALLOWED_HOSTS=*.railway.app
# ... etc
```

---

## ✅ Verification Checklist

After setting all variables, verify:

- [ ] `SECRET_KEY` is set and is a random string (not the default)
- [ ] `DEBUG=False` (not `True`)
- [ ] `ALLOWED_HOSTS` includes `*.railway.app` and your Railway domain
- [ ] All database variables are set (using `${{Postgres.*}}` syntax)
- [ ] `CORS_ALLOWED_ORIGINS` includes your frontend URL
- [ ] No typos in variable names (case-sensitive!)

---

## 🚨 Common Mistakes

1. **Forgetting to set `SECRET_KEY`** → App won't start securely
2. **Leaving `DEBUG=True`** → Security risk, exposes error details
3. **Wrong `ALLOWED_HOSTS`** → 400 Bad Request errors
4. **Missing CORS origins** → Frontend can't make API requests
5. **Typo in variable names** → Django uses defaults (might not work)
6. **Not using `${{Postgres.*}}` syntax** → Database connection fails

---

## 🔍 How to Check if Variables are Set

### In Railway Dashboard:
- Go to **Variables** tab
- You should see all your variables listed

### Via Railway CLI:
```bash
railway variables
```

### In Application Logs:
- After deployment, check logs
- If variables are missing, you'll see errors like:
  - `SECRET_KEY not set`
  - `Database connection failed`

---

## 📚 Additional Notes

### Railway's Automatic Variables

Railway automatically provides these (you don't need to set them):
- `PORT` - Port your app should listen on (Railway sets this)
- `RAILWAY_ENVIRONMENT` - Environment name
- `RAILWAY_PROJECT_ID` - Your project ID
- `RAILWAY_SERVICE_ID` - Your service ID

### Database Variables Reference

When you add PostgreSQL in Railway, it automatically creates:
- `${{Postgres.DATABASE}}` - Database name
- `${{Postgres.USER}}` - Database user
- `${{Postgres.PASSWORD}}` - Database password
- `${{Postgres.HOST}}` - Database host
- `${{Postgres.PORT}}` - Database port

**Important:** Use the `${{Postgres.*}}` syntax to reference these automatically!

---

## 🆘 Need Help?

If your app isn't working:
1. Check Railway logs for errors
2. Verify all required variables are set
3. Check variable names match exactly (case-sensitive)
4. Ensure database service is running
5. Verify CORS origins match your frontend URL exactly


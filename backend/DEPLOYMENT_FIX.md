# 🔧 Fix for Railway Deployment Error

## Problem
You're getting this error during build:
```
failed to resolve host 'postgres.railway.internal': [Errno -2] Name or service not known
```

This happens because Railway is trying to run database migrations during the **build phase**, but the database is only available at **runtime**.

## ✅ Solution Applied

I've fixed the configuration to:
1. **Only collect static files during build** (no database needed)
2. **Run migrations at startup** (when database is available)
3. **Use a startup script** to handle the sequence properly

## 📁 Files Changed

1. **`Procfile`** - Updated to use startup script
2. **`start.sh`** - New startup script that runs migrations then starts server
3. **`nixpacks.toml`** - Explicit build configuration
4. **`railway.json`** - Updated start command

## 🚀 Next Steps

### 1. Commit and Push Changes
```bash
cd backend
git add Procfile start.sh nixpacks.toml railway.json
git commit -m "Fix: Move migrations to runtime, not build phase"
git push
```

### 2. In Railway Dashboard

**Option A: Clear Build Cache (Recommended)**
1. Go to your Railway service
2. Settings → Clear build cache
3. Trigger a new deployment

**Option B: Check Release Command**
1. Go to Settings tab
2. Look for "Release Command" or "Build Command"
3. Make sure it's empty or only has: `python manage.py collectstatic --noinput --skip-checks`
4. Remove any migration commands from build phase

### 3. Verify Environment Variables

Make sure these are set correctly in Railway Variables:
```
DB_HOST=${{Postgres.HOST}}
DB_NAME=${{Postgres.DATABASE}}
DB_USER=${{Postgres.USER}}
DB_PASSWORD=${{Postgres.PASSWORD}}
DB_PORT=${{Postgres.PORT}}
DB_ENGINE=django.db.backends.postgresql
```

**Important:** Use `${{Postgres.HOST}}` syntax, NOT `postgres.railway.internal` directly!

### 4. Redeploy

After pushing changes, Railway will automatically redeploy. Watch the logs:
- ✅ Build phase should only show: `collectstatic` (no migrations)
- ✅ Runtime phase should show: migrations running, then server starting

## 🔍 How to Verify It's Fixed

1. **Build Logs** should show:
   ```
   Collecting static files...
   [No database connection errors]
   ```

2. **Runtime Logs** should show:
   ```
   Running database migrations...
   Operations to perform: ...
   Starting Gunicorn server...
   ```

3. **No errors** about `postgres.railway.internal` during build

## 🆘 If Still Not Working

### Check 1: Verify Root Directory
- Settings → Root Directory = `backend`

### Check 2: Check for Cached Build
- Clear build cache in Railway settings
- Or delete and recreate the service

### Check 3: Manual Migration (if needed)
After deployment succeeds, you can manually run migrations:
```bash
railway run python manage.py migrate
```

### Check 4: Database Connection
Verify database service is running and connected to your app service.

## 📝 What Changed Technically

**Before:**
- Procfile had `release:` command running migrations during build ❌
- Database not available during build → Error ❌

**After:**
- Build phase: Only `collectstatic` (no DB needed) ✅
- Runtime phase: Migrations run via `start.sh` ✅
- Database available at runtime → Success ✅


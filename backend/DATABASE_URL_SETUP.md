# Using DATABASE_URL in Railway

## ✅ Simple Setup with DATABASE_URL

Instead of setting individual database variables, you can use Railway's `DATABASE_URL` which contains everything in one string!

## What is DATABASE_URL?

Railway automatically provides a `DATABASE_URL` environment variable when you add PostgreSQL. It looks like:
```
postgresql://postgres:password@host:port/database
```

## Setup Steps

### 1. In Railway Dashboard

Go to your **backend service** → **Variables** tab and set:

```
DATABASE_URL=postgresql://postgres:itqOTeNRtWbVbJPWXRiPgLQRBnMeTluV@hopper.proxy.rlwy.net:12092/railway
```

**OR** Railway might automatically provide this variable! Check:
1. Go to your **PostgreSQL service** → **Variables** tab
2. Look for `DATABASE_URL` or `POSTGRES_URL`
3. If it exists, Railway automatically shares it with connected services

### 2. Other Required Variables

You still need these:

```
SECRET_KEY=xoijxqoijxoiqjoiiud7798uinxqkjnxqkjnqln
DEBUG=false
ALLOWED_HOSTS=*.railway.app
CORS_ALLOWED_ORIGINS=https://your-frontend-url.com
```

### 3. That's It!

The code has been updated to automatically use `DATABASE_URL` if it's available, or fall back to individual `DB_*` variables for local development.

## Benefits

✅ **Simpler** - One variable instead of 5  
✅ **Automatic** - Railway provides it automatically  
✅ **Less error-prone** - No need to match individual variables  
✅ **Standard** - Works with most hosting platforms  

## How It Works

The updated `settings.py` now:
1. Checks for `DATABASE_URL` first
2. If found, parses it automatically using `dj-database-url`
3. Falls back to individual `DB_*` variables if `DATABASE_URL` is not set (for local dev)

## Verification

After setting `DATABASE_URL`, deploy and check logs:
- ✅ Should see successful database connection
- ✅ Migrations should run successfully
- ✅ No database connection errors

## Local Development

For local development, you can either:
1. Set individual `DB_*` variables (as before)
2. OR set `DATABASE_URL` locally too:
   ```
   DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/magmax_db
   ```


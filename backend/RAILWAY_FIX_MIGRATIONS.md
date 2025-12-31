# Fix: Database Migration Error During Build

## Problem
Railway is trying to run database migrations during the build phase, but the database isn't available until runtime. This causes the error:
```
failed to resolve host 'postgres.railway.internal': [Errno -2] Name or service not known
```

## Solution
We've updated the configuration to run migrations at **runtime** (when the app starts) instead of during the **build phase**.

## Changes Made

1. **Updated `Procfile`**: Removed `release` command that runs during build
2. **Created `start.sh`**: Startup script that runs migrations before starting the server
3. **Updated `railway.json`**: Uses the startup script

## What Happens Now

When your app starts:
1. ✅ Database is available (runtime, not build)
2. ✅ Migrations run automatically
3. ✅ Static files are collected
4. ✅ Gunicorn starts the server

## Next Steps

1. **Commit and push the changes:**
   ```bash
   git add backend/Procfile backend/start.sh backend/railway.json
   git commit -m "Fix: Move migrations to runtime instead of build phase"
   git push
   ```

2. **Redeploy on Railway:**
   - Railway will automatically detect the push and redeploy
   - Or manually trigger a new deployment

3. **Verify:**
   - Check the deployment logs
   - You should see migrations running successfully
   - App should start without errors

## Alternative: If You Still Get Errors

If Railway is still trying to run migrations during build, you can:

### Option 1: Disable Release Phase in Railway Settings
- Go to your service Settings
- Look for "Release Command" or "Build Command"
- Clear/disable any commands that run migrations

### Option 2: Make Migrations Optional During Build
Update `start.sh` to handle connection errors gracefully (but this shouldn't be needed now).

## Why This Works

- **Build Phase**: Only installs dependencies, no database needed
- **Runtime Phase**: Database is connected, migrations can run safely
- **Startup Script**: Ensures migrations run before the server starts


# Fix: Empty Database Variables in Railway

## Problem
When using `${{Postgres.*}}` syntax, the database fields show as empty strings in Railway's UI.

## Why This Happens
Railway's variable reference syntax requires:
1. PostgreSQL service to be added to your project
2. PostgreSQL service to be **linked/connected** to your backend service
3. Correct service name reference

## Solution Steps

### Step 1: Verify PostgreSQL Service is Added
1. Go to your Railway project dashboard
2. Check if you see a **PostgreSQL** service card
3. If not, add it: Click **"+ New"** → **"Database"** → **"Add PostgreSQL"**

### Step 2: Link PostgreSQL to Your Backend Service
1. Click on your **backend service** (not PostgreSQL)
2. Go to **"Settings"** tab
3. Scroll to **"Service Connections"** or **"Connected Services"**
4. Make sure **PostgreSQL** is listed and connected
5. If not connected, click **"Connect"** or **"Link Service"**

### Step 3: Check the Actual Variable Names
Railway might use different variable names. Check what Railway actually provides:

1. Go to your **PostgreSQL service**
2. Click on **"Variables"** tab
3. You'll see the actual variable names Railway created, like:
   - `PGHOST`
   - `PGDATABASE`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGPORT`

OR they might be:
   - `POSTGRES_HOST`
   - `POSTGRES_DB`
   - `POSTGRES_USER`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_PORT`

### Step 4: Use the Correct Reference Syntax

**Option A: If Railway shows variables like `PGHOST`, `PGDATABASE`, etc.**
```
DB_HOST=${{Postgres.PGHOST}}
DB_NAME=${{Postgres.PGDATABASE}}
DB_USER=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
DB_PORT=${{Postgres.PGPORT}}
```

**Option B: If Railway shows `POSTGRES_HOST`, etc.**
```
DB_HOST=${{Postgres.POSTGRES_HOST}}
DB_NAME=${{Postgres.POSTGRES_DB}}
DB_USER=${{Postgres.POSTGRES_USER}}
DB_PASSWORD=${{Postgres.POSTGRES_PASSWORD}}
DB_PORT=${{Postgres.POSTGRES_PORT}}
```

**Option C: Direct Service Reference (if service is named differently)**
If your PostgreSQL service has a custom name (not "Postgres"), use that name:
```
DB_HOST=${{YourServiceName.HOST}}
DB_NAME=${{YourServiceName.DATABASE}}
```

### Step 5: Alternative - Use Railway's Auto-Generated Variables

Railway automatically creates variables when you link services. Instead of using references, you can:

1. Go to your **backend service** → **Variables** tab
2. Look for variables that Railway **automatically added** (they might be grayed out or have a lock icon)
3. These are the actual values Railway provides
4. Use those variable names directly in your Django settings

### Step 6: Manual Method (If References Don't Work)

If the reference syntax isn't working, you can manually copy the values:

1. Go to **PostgreSQL service** → **Variables** tab
2. Copy the actual values (click the eye icon to reveal passwords)
3. Go to **Backend service** → **Variables** tab
4. Manually set:
   ```
   DB_HOST=<copy from PGHOST or POSTGRES_HOST>
   DB_NAME=<copy from PGDATABASE or POSTGRES_DB>
   DB_USER=<copy from PGUSER or POSTGRES_USER>
   DB_PASSWORD=<copy from PGPASSWORD or POSTGRES_PASSWORD>
   DB_PORT=<copy from PGPORT or POSTGRES_PORT>
   ```

**Note:** This method means you'll need to update manually if the database changes, but it's more reliable.

## Quick Diagnostic

Run this to see what Railway actually provides:
1. In Railway dashboard, go to your backend service
2. Click **"Deployments"** → Latest deployment → **"View Logs"**
3. Or use Railway CLI:
   ```bash
   railway variables
   ```
4. Look for any variables starting with `PG` or `POSTGRES`

## Recommended Solution

The most reliable approach is to check what Railway actually created and use those exact variable names. The `${{Postgres.*}}` syntax should work, but Railway's UI might not show the resolved values - they're resolved at runtime.

**Try this:**
1. Set the variables using `${{Postgres.*}}` syntax
2. Deploy the app
3. Check the **runtime logs** (not the UI) - the actual values will be used even if UI shows empty
4. If it still doesn't work, use the manual copy method above


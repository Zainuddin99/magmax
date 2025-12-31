# Fix: 400 Bad Request Error

## Problem
You're getting `400 Bad Request` errors on all requests. This happens when Django's `ALLOWED_HOSTS` doesn't include your Railway domain.

## Quick Fix

### Step 1: Get Your Railway Domain

1. Go to Railway Dashboard → Your Service
2. Check the URL shown at the top (e.g., `magmax-production.up.railway.app`)
3. Copy the full domain (without `https://`)

### Step 2: Update ALLOWED_HOSTS in Railway

1. Go to your **backend service** → **Variables** tab
2. Find `ALLOWED_HOSTS` variable
3. Update it to include your Railway domain:

**Format:**
```
ALLOWED_HOSTS=*.railway.app,your-actual-domain.railway.app
```

**Example:**
If your domain is `magmax-production.up.railway.app`, set:
```
ALLOWED_HOSTS=*.railway.app,magmax-production.up.railway.app
```

**Important:**
- Use comma-separated values (no spaces)
- Include `*.railway.app` to allow all Railway subdomains
- Include your specific domain too

### Step 3: Redeploy

After updating the variable:
1. Railway will automatically redeploy
2. Or manually trigger a new deployment
3. Wait for deployment to complete

### Step 4: Test Again

Try accessing your API:
- `https://your-domain.railway.app/api/v1/articles/`
- `https://your-domain.railway.app/admin/`

Should work now! ✅

## Alternative: If You Don't Know Your Domain

1. Go to Railway → Your Service → **Settings**
2. Look for **"Networking"** or **"Domains"** section
3. Click **"Generate Domain"** if you don't have one
4. Copy the generated domain
5. Use it in `ALLOWED_HOSTS`

## Complete ALLOWED_HOSTS Examples

**For Railway only:**
```
ALLOWED_HOSTS=*.railway.app,your-app.up.railway.app
```

**For Railway + Custom Domain:**
```
ALLOWED_HOSTS=*.railway.app,your-app.up.railway.app,api.yourdomain.com
```

**For Development + Production:**
```
ALLOWED_HOSTS=*.railway.app,your-app.up.railway.app,localhost,127.0.0.1
```

## Why This Happens

Django checks the `Host` header of incoming requests against `ALLOWED_HOSTS`. If they don't match, Django returns a 400 error for security reasons.

## Verify It's Fixed

After updating and redeploying:
- ✅ No more 400 errors
- ✅ API endpoints respond correctly
- ✅ Admin panel loads
- ✅ Frontend can make requests


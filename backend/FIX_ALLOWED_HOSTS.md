# Fix: ALLOWED_HOSTS Configuration

## ❌ Current (WRONG)
```
ALLOWED_HOSTS="https://magmax-production.up.railway.app
```

**Problems:**
- Has `https://` (should NOT include protocol)
- Has quotes (not needed)
- Has newline (breaks the value)
- Missing wildcard for Railway

## ✅ Correct Format

In Railway Variables, set `ALLOWED_HOSTS` to:

```
ALLOWED_HOSTS=*.railway.app,magmax-production.up.railway.app
```

**Important:**
- ❌ NO `https://` or `http://`
- ❌ NO quotes
- ❌ NO newlines
- ✅ Just the domain names, comma-separated
- ✅ Include `*.railway.app` for all Railway subdomains
- ✅ Include your specific domain

## Step-by-Step Fix

### 1. Go to Railway Dashboard
- Your Service → **Variables** tab

### 2. Find `ALLOWED_HOSTS`
- Click to edit it

### 3. Delete the old value completely

### 4. Enter the correct value:
```
*.railway.app,magmax-production.up.railway.app
```

**Make sure:**
- No quotes
- No `https://`
- No spaces
- No newlines
- Just: `*.railway.app,magmax-production.up.railway.app`

### 5. Save

### 6. Railway will auto-redeploy

### 7. Test
After redeploy, try:
- `https://magmax-production.up.railway.app/api/v1/articles/`
- Should work now! ✅

## Examples

**For Railway only:**
```
ALLOWED_HOSTS=*.railway.app,magmax-production.up.railway.app
```

**For Railway + Custom Domain:**
```
ALLOWED_HOSTS=*.railway.app,magmax-production.up.railway.app,api.yourdomain.com
```

**For Development + Production:**
```
ALLOWED_HOSTS=*.railway.app,magmax-production.up.railway.app,localhost,127.0.0.1
```

## Why This Matters

Django's `ALLOWED_HOSTS` is a security feature that validates the `Host` header. It expects:
- Domain names only (no protocol)
- Comma-separated list
- No special characters or formatting

If it's wrong, you get 400 Bad Request errors.


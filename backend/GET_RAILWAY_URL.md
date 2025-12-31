# How to Get Your Railway App URL

## 🎯 Quick Steps

### Method 1: Railway Dashboard (Easiest)

1. **Go to your Railway project dashboard**
2. **Click on your backend service** (the service card)
3. **Look at the top of the service page** - you'll see:
   - A section showing your service URL
   - Or click on **"Settings"** tab
   - Scroll to **"Domains"** or **"Networking"** section

4. **Your URL will look like:**
   ```
   https://your-service-name.up.railway.app
   ```
   or
   ```
   https://your-app-name.railway.app
   ```

### Method 2: Generate Domain

If you don't see a URL:

1. Go to your **service** → **Settings** tab
2. Look for **"Generate Domain"** button
3. Click it to create a public URL
4. Railway will generate a URL like: `https://your-service-production.up.railway.app`

### Method 3: Custom Domain (Optional)

1. Go to **Settings** → **Networking** or **Domains**
2. Click **"Custom Domain"**
3. Add your own domain (e.g., `api.yourdomain.com`)

## 📍 Where to Find It

The URL is usually displayed in:
- **Service overview page** (main service page)
- **Settings tab** → **Networking** section
- **Deployments tab** → Latest deployment → Shows the URL

## ✅ Test Your API

Once you have the URL, test your endpoints:

1. **API Base URL:**
   ```
   https://your-app.railway.app
   ```

2. **Test Articles API:**
   ```
   https://your-app.railway.app/api/v1/articles/
   ```

3. **Test Token Endpoint:**
   ```
   https://your-app.railway.app/api/token/
   ```

4. **Admin Panel:**
   ```
   https://your-app.railway.app/admin/
   ```

## 🔧 Update CORS Settings

After getting your backend URL, make sure to update your frontend's API URL and Railway's CORS settings:

1. **In Railway Variables**, update:
   ```
   CORS_ALLOWED_ORIGINS=https://your-frontend-url.com
   ```

2. **In your frontend**, update the API base URL to your Railway backend URL

## 📝 Example

If your Railway URL is:
```
https://magmax-backend-production.up.railway.app
```

Your API endpoints will be:
- Articles: `https://magmax-backend-production.up.railway.app/api/v1/articles/`
- Token: `https://magmax-backend-production.up.railway.app/api/token/`
- Admin: `https://magmax-backend-production.up.railway.app/admin/`


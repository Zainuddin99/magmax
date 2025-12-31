# Post-Deployment Steps

## ✅ Deployment Successful!

Your backend is now live on Railway! All migrations have been applied successfully.

## 🎯 Next Steps

### 1. Create a Superuser (Admin Account)

To access the Django admin panel, create a superuser:

**Option A: Railway Dashboard**
1. Go to your service → **Deployments** tab
2. Click on the latest deployment
3. Click **"View Logs"** or use the terminal
4. Run:
   ```bash
   python manage.py createsuperuser
   ```

**Option B: Railway CLI**
```bash
railway run python manage.py createsuperuser
```

You'll be prompted to enter:
- Username
- Email (optional)
- Password

### 2. Test Your API Endpoints

Your backend URL is: `https://your-app.railway.app`

Test these endpoints:

**Articles API:**
```bash
GET https://your-app.railway.app/api/v1/articles/
```

**JWT Token (for authentication):**
```bash
POST https://your-app.railway.app/api/token/
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

**Admin Panel:**
```
https://your-app.railway.app/admin/
```

### 3. Update CORS Settings

Make sure your frontend can access the API:

1. Go to Railway → Your Service → **Variables** tab
2. Update `CORS_ALLOWED_ORIGINS`:
   ```
   CORS_ALLOWED_ORIGINS=https://your-frontend-url.com,https://www.your-frontend-url.com
   ```
3. If testing locally, also add:
   ```
   CORS_ALLOWED_ORIGINS=https://your-frontend-url.com,http://localhost:3000
   ```

### 4. Update Frontend API URL

In your frontend code, update the API base URL to your Railway backend:

**Example (if using Next.js):**
```typescript
// src/lib/api.ts or similar
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-app.railway.app';
```

**Environment Variable:**
```env
NEXT_PUBLIC_API_URL=https://your-app.railway.app
```

### 5. Verify Everything Works

✅ **Check API is responding:**
```bash
curl https://your-app.railway.app/api/v1/articles/
```

✅ **Check admin panel loads:**
- Visit: `https://your-app.railway.app/admin/`
- Login with your superuser credentials

✅ **Test CORS:**
- Make a request from your frontend
- Check browser console for CORS errors
- If errors, update `CORS_ALLOWED_ORIGINS` variable

## 📊 Monitoring

### View Logs
- Railway Dashboard → Your Service → **Deployments** → Latest → **View Logs**

### Check Metrics
- Railway Dashboard → Your Service → **Metrics** tab
- Monitor CPU, Memory, Network usage

## 🔒 Security Checklist

- [ ] `DEBUG=False` is set (✅ should already be set)
- [ ] `SECRET_KEY` is a strong random value (✅ should already be set)
- [ ] `ALLOWED_HOSTS` includes your Railway domain (✅ should already be set)
- [ ] CORS is configured for your frontend only
- [ ] Database password is secure (Railway handles this)

## 🎉 You're All Set!

Your backend is now:
- ✅ Deployed on Railway
- ✅ Database connected
- ✅ Migrations applied
- ✅ Ready to serve API requests

## 🆘 Troubleshooting

### API Returns 404
- Check the URL path is correct
- Verify `ALLOWED_HOSTS` includes your Railway domain

### CORS Errors
- Update `CORS_ALLOWED_ORIGINS` with exact frontend URL
- Make sure no trailing slashes in the URL

### Can't Access Admin
- Create superuser first (step 1)
- Check `ALLOWED_HOSTS` includes your domain

### Database Connection Issues
- Verify `DATABASE_URL` is set correctly
- Check PostgreSQL service is running in Railway


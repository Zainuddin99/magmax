# Create Admin User - Simple Method

## Use Railway Web Terminal (Recommended)

1. Go to https://railway.app
2. Click your project → **magmax** service
3. Click **"Deployments"** tab
4. Click **latest deployment**
5. Click **"View Logs"** or **"Terminal"** button
6. Type: `python manage.py createsuperuser`
7. Enter username, email, password

**That's it!** ✅

## Alternative: Use the Script

I've created `create_superuser.py`. To use it:

1. In Railway Variables, add:
   ```
   ADMIN_USERNAME=admin
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=YourSecurePassword123!
   ```

2. Then in Railway web terminal, run:
   ```bash
   python create_superuser.py
   ```

The script will create the admin user automatically.


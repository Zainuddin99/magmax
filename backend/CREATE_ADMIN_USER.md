# How to Create Admin User (Superuser)

## Method 1: Railway Dashboard (Easiest)

### Step 1: Open Railway Terminal
1. Go to your Railway project dashboard
2. Click on your **backend service**
3. Go to **"Deployments"** tab
4. Click on the **latest deployment**
5. Look for **"View Logs"** or **"Terminal"** button
6. Click to open the terminal/console

### Step 2: Run the Command
In the terminal, type:
```bash
python manage.py createsuperuser
```

### Step 3: Enter Details
You'll be prompted to enter:
- **Username:** (choose a username, e.g., `admin`)
- **Email address:** (optional, can press Enter to skip)
- **Password:** (enter a strong password)
- **Password (again):** (confirm the password)

**Example:**
```
Username: admin
Email address: admin@example.com
Password: ********
Password (again): ********
Superuser created successfully.
```

### Step 4: Access Admin Panel
1. Go to: `https://magmax-production.up.railway.app/admin/`
2. Login with your username and password
3. You'll see the Django admin interface! ✅

---

## Method 2: Railway CLI (If You Have It Installed)

### Step 1: Install Railway CLI (if not installed)
```bash
npm i -g @railway/cli
```

### Step 2: Login
```bash
railway login
```

### Step 3: Link to Your Project
```bash
railway link
```
Select your project and service when prompted.

### Step 4: Run Createsuperuser
```bash
railway run python manage.py createsuperuser
```

### Step 5: Enter Details
Same as Method 1 - enter username, email, password.

---

## Method 3: Using Railway's One-Click Terminal

1. Go to Railway Dashboard
2. Click on your **service**
3. Look for **"Shell"** or **"Terminal"** button in the top menu
4. Click it to open a terminal
5. Run: `python manage.py createsuperuser`
6. Follow the prompts

---

## Quick Command Reference

```bash
# Create superuser (interactive)
python manage.py createsuperuser

# Create superuser with email (non-interactive)
python manage.py createsuperuser --email admin@example.com --noinput

# Note: For non-interactive, you need to set username/password via environment variables
```

---

## Accessing Admin Panel

After creating the superuser:

1. **URL:** `https://magmax-production.up.railway.app/admin/`
2. **Login with:**
   - Username: (what you entered)
   - Password: (what you entered)

---

## Troubleshooting

### "Command not found" or "python: command not found"
- Try: `python3 manage.py createsuperuser`
- Or: `python3.11 manage.py createsuperuser`

### "No such file or directory: manage.py"
- Make sure you're in the correct directory
- The Root Directory should be set to `backend` in Railway settings
- Try: `cd backend && python manage.py createsuperuser`

### Can't access admin panel (400 error)
- Check `ALLOWED_HOSTS` includes your Railway domain
- Make sure you're using `https://` in the URL

### "Superuser already exists"
- You already have a superuser
- Create a different username, or reset the existing one

---

## Creating Additional Users

You can create more admin users the same way, or:
1. Login to admin panel
2. Go to **"Users"** section
3. Click **"Add user"**
4. Fill in details and check **"Staff status"** and **"Superuser status"**

---

## Security Tips

- ✅ Use a strong password
- ✅ Don't use obvious usernames like "admin" in production
- ✅ Enable 2FA if available
- ✅ Change password regularly
- ✅ Limit number of superusers


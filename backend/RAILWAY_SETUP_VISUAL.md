# Railway Setup - Visual Guide

## Where to Set "backend" Folder in Railway

### Step-by-Step Navigation:

1. **After creating your Railway project:**
   - You'll see your project dashboard
   - There will be a service card (usually named after your repo)

2. **Click on the Service:**
   - Click anywhere on the service card/box
   - This opens the service details page

3. **Find the Settings Tab:**
   - At the top of the service page, you'll see tabs like:
     - **Deployments**
     - **Variables** 
     - **Settings** ← Click this one
     - **Metrics**
     - etc.

4. **Scroll to Root Directory:**
   - In the Settings page, scroll down
   - Look for a section called **"Root Directory"** or **"Working Directory"**
   - You'll see an input field (might be empty or show `/`)

5. **Enter "backend":**
   - Click in the Root Directory input field
   - Type: `backend` (without quotes, without slash)
   - The field should now show: `backend`

6. **Save:**
   - Changes usually auto-save
   - Or click "Save" button if available

### Alternative: If You Don't See Root Directory Option

If you can't find the Root Directory setting:

**Option 1: Use railway.json (Already Created)**
- The `railway.json` file we created should help Railway detect the backend folder
- But explicitly setting Root Directory is more reliable

**Option 2: Check Service Type**
- Make sure Railway detected it as a Python service
- If not, you might need to manually set the build command

**Option 3: Use Railway CLI**
```bash
railway link
railway variables set RAILWAY_ROOT_DIRECTORY=backend
```

### What Root Directory Does:

- **Without Root Directory set:** Railway looks for `manage.py`, `requirements.txt`, etc. at the root of your repo
- **With Root Directory = "backend":** Railway looks inside the `backend/` folder for these files

Since your structure is:
```
your-repo/
  ├── backend/          ← Your Django code is here
  │   ├── manage.py
  │   ├── requirements.txt
  │   └── ...
  ├── frontend/
  └── README.md
```

You need to tell Railway: "Look in the `backend` folder, not the root!"

### Still Can't Find It?

1. **Check Railway's latest UI:** Railway updates their interface sometimes
2. **Try the Variables tab:** Some Railway versions put this in Variables
3. **Check Build Settings:** It might be under "Build" or "Deploy" settings
4. **Contact Railway Support:** They're very helpful!

### Quick Test:

After setting Root Directory to `backend`, trigger a new deployment. In the build logs, you should see Railway running commands from the `backend/` directory, like:
```
Running: cd backend && pip install -r requirements.txt
```

If you see errors about `manage.py` not found, the Root Directory isn't set correctly.


# Telecel Play Ghana - Quick Start Deployment Guide

**Get your website live in 10 minutes!**

---

## 🚀 Fastest Way: Render.com (Recommended)

### Step 1: Extract and Push to GitHub (5 minutes)

```bash
# Extract the ZIP file
unzip telecel-play-ghana-complete.zip
cd telecel-play-complete

# Initialize git
git init
git add .
git commit -m "Initial commit: Telecel Play Ghana"

# Create new repository on GitHub
# Go to https://github.com/new
# Create repository named: telecel-play-ghana
# Make it PUBLIC

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/telecel-play-ghana.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username.**

### Step 2: Deploy to Render.com (5 minutes)

1. **Go to** https://render.com
2. **Click** "Get Started"
3. **Sign up** with GitHub (authorize when prompted)
4. **Click** "New +" → "Web Service"
5. **Click** "Connect a repository"
6. **Select** `telecel-play-ghana`
7. **Click** "Connect"

### Step 3: Configure Settings

| Setting | Value |
|---------|-------|
| Name | `telecel-play-ghana` |
| Environment | `Node` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Plan | `Free` |

**Leave other fields as default.**

### Step 4: Add Environment Variables

1. Scroll to **"Environment"** section
2. Click **"Add Environment Variable"**
3. Add:
   - Key: `NODE_ENV` → Value: `production`
   - Key: `PORT` → Value: `3000`

### Step 5: Deploy!

1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. Your URL appears: `https://telecel-play-ghana.onrender.com`

✅ **Your website is LIVE!**

---

## ✅ Verify Deployment

### Test the Website

1. Open: `https://telecel-play-ghana.onrender.com`
2. Test loan calculator
3. Try applying for a loan
4. Check confirmation page
5. Visit dashboard

### Test API Endpoint

```bash
curl https://telecel-play-ghana.onrender.com/api/health
```

Should return:
```json
{"status":"ok","timestamp":"2026-04-19T...","uptime":...}
```

---

## 🔄 Update Your Website

### Make Changes Locally

```bash
cd telecel-play-complete

# Edit files (e.g., change company name, colors, etc.)
# Edit: index.html, apply.html, confirm.html, etc.

# Commit and push
git add .
git commit -m "Update: your change description"
git push origin main
```

**Render automatically redeploys within seconds!**

---

## 🌐 Add Custom Domain (Optional)

### For Render.com

1. Go to Render dashboard
2. Click your service: `telecel-play-ghana`
3. Go to **"Settings"**
4. Scroll to **"Custom Domains"**
5. Click **"Add Custom Domain"**
6. Enter your domain (e.g., `telecelplay.com.gh`)
7. Update DNS records as shown
8. Wait 24-48 hours for propagation

Your app is now at: `https://telecelplay.com.gh`

---

## 📞 Alternative Platforms (If Render.com doesn't work)

### Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

heroku login
heroku create telecel-play-ghana
git push heroku main
heroku open
```

Your app: `https://telecel-play-ghana.herokuapp.com`

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

railway login
railway init
railway up
```

### DigitalOcean

1. Go to https://cloud.digitalocean.com/apps
2. Click "Create" → "App"
3. Select GitHub
4. Choose `telecel-play-ghana`
5. Configure and deploy

---

## 🐛 Troubleshooting

### "Build Failed" Error

**Check the logs:**
1. Render dashboard → Your service → Logs
2. Look for error messages
3. Common causes:
   - Missing `package.json`
   - Wrong start command
   - Syntax errors in code

**Fix:**
```bash
# Test locally
npm install
npm start

# If it works locally, push again
git push origin main
```

### Website Shows Blank Page

1. Check browser console (F12 → Console)
2. Look for JavaScript errors
3. Check API health: `https://your-url.com/api/health`

### Port Already in Use (Local Testing)

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

---

## 📊 Monitor Your Website

### Render.com Dashboard

- Shows uptime and status
- View logs in real-time
- See deployment history
- Monitor performance

### Check Uptime

```bash
# Manual check
curl -I https://your-url.com

# Should return: HTTP/1.1 200 OK
```

### View Logs

```bash
# Render.com
# Dashboard → Logs tab

# Heroku
heroku logs --tail

# Railway
railway logs
```

---

## 🎯 Next Steps

### 1. Customize Your Website

Edit these files:
- `index.html` - Home page
- `apply.html` - Application form
- `confirm.html` - Confirmation page
- `dashboard.html` - User dashboard
- `assets/style.css` - Colors and styling
- `assets/main.js` - Functionality

### 2. Add Features

- Database integration
- Email notifications
- SMS integration
- Payment processing
- User authentication

### 3. Promote Your Website

- Share the URL
- Add to social media
- Email to contacts
- Advertise on Telecel channels

---

## 📋 Deployment Checklist

- [ ] GitHub account created
- [ ] Repository created and public
- [ ] Code pushed to GitHub
- [ ] Render.com account created
- [ ] Web Service deployed
- [ ] Environment variables set
- [ ] Website is live
- [ ] All pages tested
- [ ] API endpoints working
- [ ] Mobile responsive verified

---

## 💡 Pro Tips

1. **Auto-Deploy**: Every GitHub push automatically deploys
2. **Free Tier**: Render.com free tier is sufficient for testing
3. **Custom Domain**: Add your domain for professionalism
4. **Monitoring**: Set up email alerts for crashes
5. **Backups**: Always commit to GitHub before making changes

---

## 📞 Support

### If Something Goes Wrong

1. **Check logs** in Render dashboard
2. **Test locally**: `npm start`
3. **Verify files** are committed to GitHub
4. **Try redeploying** manually
5. **Check documentation**: See `DEPLOYMENT.md` for detailed guide

### Get Help

- Render.com Docs: https://render.com/docs
- GitHub Docs: https://docs.github.com
- Node.js Docs: https://nodejs.org/docs
- Express.js Docs: https://expressjs.com

---

## 🎉 Congratulations!

Your Telecel Play Ghana website is now **LIVE** and accessible to the world!

**Your Website URL:** `https://telecel-play-ghana.onrender.com`

Share it with others and start processing loans! 🚀

---

**Questions?** Check `README.md` and `DEPLOYMENT.md` for more details.

**Last Updated:** April 19, 2026

# Telecel Play Ghana - Complete Deployment Guide

This guide covers deploying the Telecel Play Ghana application to various hosting platforms.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Render.com (Recommended)](#rendercom-recommended)
3. [Heroku](#heroku)
4. [Railway](#railway)
5. [DigitalOcean](#digitalocean)
6. [AWS](#aws)
7. [Vercel](#vercel)
8. [Post-Deployment](#post-deployment)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account (https://github.com)
- ✅ Git installed locally
- ✅ Node.js v14+ installed
- ✅ This project cloned locally
- ✅ All files committed to Git

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/telecel-play-ghana.git
cd telecel-play-ghana

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Telecel Play Ghana"

# Create GitHub repository
# Go to https://github.com/new and create a new repository

# Push to GitHub
git remote add origin https://github.com/yourusername/telecel-play-ghana.git
git branch -M main
git push -u origin main
```

---

## Render.com (Recommended)

**Why Render.com?**
- Free tier available
- Automatic deployments from GitHub
- HTTPS included
- Easy environment variables
- No credit card required for free tier

### Step-by-Step

#### 1. Create Render Account

1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render to access your repositories

#### 2. Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Click **"Connect a repository"**
3. Search for `telecel-play-ghana`
4. Click **"Connect"**

#### 3. Configure Service

| Field | Value |
|-------|-------|
| **Name** | `telecel-play-ghana` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` |
| **Region** | `Frankfurt` (or closest to you) |

#### 4. Environment Variables

1. Scroll to **"Environment"** section
2. Add these variables:

```
NODE_ENV=production
PORT=3000
```

#### 5. Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (2-3 minutes)
3. Your URL: `https://telecel-play-ghana.onrender.com`

#### 6. Verify Deployment

```bash
curl https://telecel-play-ghana.onrender.com/api/health
```

Should return:
```json
{"status":"ok","timestamp":"...","uptime":...}
```

### Auto-Deployment

Any push to GitHub automatically triggers deployment:

```bash
git add .
git commit -m "Update: new feature"
git push origin main
# Render automatically deploys!
```

---

## Heroku

### Prerequisites

- Heroku account: https://www.heroku.com
- Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

### Deployment Steps

#### 1. Login to Heroku

```bash
heroku login
```

#### 2. Create Heroku App

```bash
heroku create telecel-play-ghana
```

#### 3. Set Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=3000
```

#### 4. Deploy

```bash
git push heroku main
```

#### 5. View Logs

```bash
heroku logs --tail
```

#### 6. Get App URL

```bash
heroku open
```

Your app is live at: `https://telecel-play-ghana.herokuapp.com`

### Troubleshooting

**App crashes on startup:**
```bash
heroku logs --tail
# Check for errors and fix locally
git push heroku main
```

**Port binding error:**
```bash
# Ensure server uses process.env.PORT
# Already configured in server/index.js
```

---

## Railway

### Prerequisites

- Railway account: https://railway.app
- Railway CLI: `npm i -g @railway/cli`

### Deployment Steps

#### 1. Login to Railway

```bash
railway login
```

#### 2. Initialize Railway Project

```bash
railway init
```

#### 3. Deploy

```bash
railway up
```

#### 4. Set Environment Variables

```bash
railway variables set NODE_ENV=production
railway variables set PORT=3000
```

#### 5. View Deployment

```bash
railway open
```

Your app URL will be displayed.

---

## DigitalOcean

### Prerequisites

- DigitalOcean account: https://www.digitalocean.com
- GitHub connected to DigitalOcean

### Deployment Steps

#### 1. Create App

1. Go to https://cloud.digitalocean.com/apps
2. Click **"Create"** → **"App"**
3. Select **"GitHub"**
4. Choose `telecel-play-ghana` repository
5. Click **"Next"**

#### 2. Configure

1. **Name**: `telecel-play-ghana`
2. **Region**: Choose closest to you
3. **Branch**: `main`

#### 3. Resource Configuration

1. **Component Type**: `Web Service`
2. **Build Command**: `npm install`
3. **Run Command**: `npm start`
4. **HTTP Port**: `3000`

#### 4. Environment Variables

Add:
```
NODE_ENV=production
PORT=3000
```

#### 5. Deploy

1. Click **"Create Resources"**
2. Wait for deployment
3. Your URL will be provided

---

## AWS

### Using Elastic Beanstalk

#### Prerequisites

- AWS account
- AWS CLI installed
- EB CLI: `pip install awsebcli`

#### Deployment Steps

##### 1. Initialize EB

```bash
eb init -p node.js-18 telecel-play-ghana --region us-east-1
```

##### 2. Create Environment

```bash
eb create production
```

##### 3. Deploy

```bash
git add .
git commit -m "Deploy to AWS"
eb deploy
```

##### 4. Open App

```bash
eb open
```

Your app is live!

### Using EC2 (Manual)

1. Launch EC2 instance (Ubuntu 22.04)
2. SSH into instance
3. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
4. Clone repository:
   ```bash
   git clone https://github.com/yourusername/telecel-play-ghana.git
   cd telecel-play-ghana
   ```
5. Install dependencies:
   ```bash
   npm install
   ```
6. Start server:
   ```bash
   npm start
   ```
7. Use PM2 for process management:
   ```bash
   sudo npm install -g pm2
   pm2 start server/index.js --name "telecel-play"
   pm2 startup
   pm2 save
   ```

---

## Vercel

**Note**: Vercel is optimized for static sites and serverless functions. For full Node.js support, use other platforms.

### Deployment Steps

#### 1. Install Vercel CLI

```bash
npm i -g vercel
```

#### 2. Deploy

```bash
vercel
```

#### 3. Follow Prompts

- Confirm project settings
- Set environment variables
- Deploy

Your app is live at: `https://telecel-play-ghana.vercel.app`

---

## Post-Deployment

### 1. Verify Deployment

Test all endpoints:

```bash
# Health check
curl https://your-app-url.com/api/health

# Test application submission
curl -X POST https://your-app-url.com/api/submit-application \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "telecelNumber": "0501234567",
    "idType": "ghana-card",
    "idNumber": "GHA-XXXXXXXXX-X",
    "employment": "employed"
  }'
```

### 2. Set Up Custom Domain

#### Render.com
1. Go to Service Settings
2. Click "Custom Domains"
3. Add your domain
4. Update DNS records

#### Heroku
```bash
heroku domains:add yourdomain.com
```

#### Others
Follow platform-specific domain documentation.

### 3. Enable HTTPS

Most platforms include HTTPS by default. Verify:
- ✅ All URLs use `https://`
- ✅ No mixed content warnings
- ✅ SSL certificate is valid

### 4. Set Up Monitoring

#### Render.com
- Dashboard shows uptime
- Email alerts for crashes
- Log viewer available

#### Heroku
```bash
heroku logs --tail
```

#### Others
Use platform-specific monitoring tools.

### 5. Configure Analytics (Optional)

Add Google Analytics to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 6. Set Up Error Tracking (Optional)

Add Sentry for error monitoring:

```bash
npm install @sentry/node
```

Add to `server/index.js`:

```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

app.use(Sentry.Handlers.errorHandler());
```

---

## Troubleshooting

### Application Won't Start

**Check logs:**
```bash
# Render.com
# Dashboard → Logs tab

# Heroku
heroku logs --tail

# Railway
railway logs
```

**Common issues:**
- Missing `package.json` in root
- Wrong start command
- Port already in use
- Missing dependencies

### Deployment Hangs

**Solution:**
1. Cancel deployment
2. Check `package.json` for errors
3. Verify all files are committed
4. Try deploying again

### CORS Errors

**Update `.env`:**
```
CORS_ORIGIN=https://yourdomain.com
```

**Or allow all origins:**
```
CORS_ORIGIN=*
```

### Database Connection Issues

If adding database later:
1. Add connection string to `.env`
2. Update `server/index.js` with DB logic
3. Redeploy

---

## Performance Optimization

### 1. Enable Gzip Compression

Already configured in Express.

### 2. Minify Assets

```bash
npm install -g terser
terser assets/main.js -o assets/main.min.js -c -m
```

### 3. Cache Static Files

Update `server/index.js`:

```javascript
app.use(express.static(path.join(__dirname, '../'), {
  maxAge: '1d'
}));
```

### 4. Monitor Performance

- Use Lighthouse: https://developers.google.com/web/tools/lighthouse
- Check PageSpeed: https://pagespeed.web.dev
- Monitor uptime: https://uptimerobot.com

---

## Scaling

### When to Scale Up

- Free tier limitations reached
- High traffic (>1000 requests/day)
- Need database
- Need SSL certificate

### Upgrade Steps

1. **Render.com**: Settings → Plan → Upgrade
2. **Heroku**: Resources → Dyno Type → Upgrade
3. **Railway**: Project Settings → Plan → Upgrade
4. **DigitalOcean**: App Settings → Upgrade

---

## Maintenance

### Regular Tasks

- [ ] Monitor error logs weekly
- [ ] Check uptime monthly
- [ ] Update dependencies quarterly
- [ ] Review performance metrics
- [ ] Test all features after updates

### Update Dependencies

```bash
npm outdated
npm update
npm audit fix
git push origin main
```

---

## Support

For deployment issues:

- **Render.com**: https://render.com/docs
- **Heroku**: https://devcenter.heroku.com
- **Railway**: https://docs.railway.app
- **DigitalOcean**: https://docs.digitalocean.com
- **AWS**: https://docs.aws.amazon.com

---

## Checklist

Before going live:

- [ ] All files committed to GitHub
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Custom domain set up (optional)
- [ ] Monitoring enabled
- [ ] Error tracking configured
- [ ] Analytics set up (optional)
- [ ] All pages tested
- [ ] API endpoints working
- [ ] Mobile responsive verified
- [ ] Performance optimized
- [ ] Backup strategy in place

---

**Deployment Complete! 🎉**

Your Telecel Play Ghana application is now live and ready for users!

For support: support@telecelplay.com | Dial 100 on Telecel line

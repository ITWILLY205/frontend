# GitHub Setup Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click the "+" button in the top right corner
3. Select "New repository"
4. Repository name: `portfolio-website` (or your preferred name)
5. Description: `Professional portfolio website with admin dashboard`
6. Make it **Public** (or Private if you prefer)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you a page with commands. Use these commands:

```bash
# Add remote repository (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git

# Push to GitHub
git push -u origin master
```

## Step 3: Alternative Push Commands

If the above doesn't work, try these alternatives:

### Option A: Using main branch (GitHub default)
```bash
git branch -M main
git push -u origin main
```

### Option B: Force push (if needed)
```bash
git push -f origin master
```

## Step 4: Verify Upload

1. Go to your GitHub repository page
2. Refresh the page
3. You should see all your project files

## Project Features Included

✅ **Frontend (React)**
- Responsive portfolio website
- Hero section with animations
- About section
- Projects showcase with 2-column layout
- Skills section
- Contact form with fallback system
- Admin dashboard with authentication

✅ **Backend (Node.js/Express)**
- RESTful API for projects and contacts
- JWT authentication system
- Admin middleware for protected routes
- CRUD operations for projects
- Contact message management
- Error handling and validation

✅ **Database**
- JSON file-based database
- User management system
- Project storage
- Contact messages storage

✅ **Features**
- Responsive design (mobile, tablet, desktop)
- Admin authentication (admin@example.com / Admin123!)
- Project management (create, read, update, delete)
- Contact form with email notification support
- Message management in admin dashboard
- Error handling and validation
- Modern UI with gradients and animations

## Next Steps After Upload

1. **Deploy to Netlify/Vercel** (for frontend)
2. **Deploy to Heroku/Railway** (for backend)
3. **Configure environment variables** in production
4. **Set up custom domain** (optional)

## Environment Variables Needed

For backend deployment:
```
NODE_ENV=production
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
CLIENT_URL=your_frontend_url
```

## Deployment Options

### Frontend (Netlify)
1. Connect your GitHub repo to Netlify
2. Set build command: `cd frontend && npm run build`
3. Set publish directory: `frontend/build`

### Backend (Heroku)
1. Connect your GitHub repo to Heroku
2. Set build command: `cd backend && npm install`
3. Set start command: `cd backend && node server.js`
4. Add all environment variables

---

**Your portfolio is ready to be deployed!** 🚀

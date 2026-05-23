# GitHub Setup Guide for Night Fury Website

## Prerequisites

1. **Install Git** (if not already installed)
   - Download from: https://git-scm.com/download/win
   - Install with default settings

2. **Create GitHub Account** (if you don't have one)
   - Go to: https://github.com/signup
   - Create your account

## Step-by-Step Instructions

### Step 1: Initialize Git Repository

Open Command Prompt or PowerShell in your project folder and run:

```bash
cd C:\Users\Kunal\Desktop\nightfury
git init
```

### Step 2: Configure Git (First Time Only)

Replace with your GitHub username and email:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Add All Files to Git

```bash
git add .
```

### Step 4: Create First Commit

```bash
git commit -m "Initial commit: Night Fury Racing Team Website"
```

### Step 5: Create GitHub Repository

1. Go to GitHub: https://github.com
2. Click the **"+"** icon in top-right corner
3. Select **"New repository"**
4. Fill in details:
   - **Repository name**: `nightfury-racing-team`
   - **Description**: `Official website for Night Fury College Go-Kart Racing Team`
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README (we already have one)
5. Click **"Create repository"**

### Step 6: Connect Local Repository to GitHub

Replace `YOUR-USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR-USERNAME/nightfury-racing-team.git
git branch -M main
git push -u origin main
```

### Step 7: Enter GitHub Credentials

When prompted:
- Enter your GitHub username
- For password, use a **Personal Access Token** (not your account password)

#### How to Create Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `Night Fury Website`
4. Select scopes: Check **"repo"** (full control of private repositories)
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)
7. Use this token as your password when pushing to GitHub

## Verify Upload

1. Go to your GitHub repository URL
2. You should see all your files uploaded
3. The README.md will be displayed on the repository homepage

## Future Updates

Whenever you make changes to your website:

```bash
# Check what files changed
git status

# Add all changed files
git add .

# Commit with a message describing changes
git commit -m "Updated team section with new members"

# Push to GitHub
git push
```

## Common Commands

```bash
# Check repository status
git status

# View commit history
git log

# View remote repository URL
git remote -v

# Pull latest changes from GitHub
git pull
```

## Enable GitHub Pages (Free Hosting)

To host your website for free on GitHub:

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll to **"Pages"** section (left sidebar)
4. Under **"Source"**, select **"main"** branch
5. Click **"Save"**
6. Wait 1-2 minutes
7. Your site will be live at: `https://YOUR-USERNAME.github.io/nightfury-racing-team/`

## Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/nightfury-racing-team.git
```

### Error: "failed to push"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Error: "Permission denied"
- Make sure you're using Personal Access Token, not password
- Check if token has correct permissions

## Need Help?

- GitHub Documentation: https://docs.github.com
- Git Documentation: https://git-scm.com/doc
- Contact team members for assistance

---

**Good luck with your GitHub upload! 🚀**

# 📬 How to Receive Contact Form Messages in Your Gmail Inbox

Your portfolio's contact form is powered by **Web3Forms** — a free, lightweight service that forwards form entries straight to your contact inbox (`your-public-contact-email@example.com`) with zero server setup required.

---

## ⚡ Quick 3-Step Setup (Takes 1 Minute)

### Step 1: Get Your Free Access Key
1. Go to **[https://web3forms.com](https://web3forms.com)** in your browser.
2. Type your email: `your-public-contact-email@example.com`
3. Click **"Create Access Key"**.
4. Check your Gmail inbox — Web3Forms will instantly send you an Access Key (a long string like `a1b2c3d4-e5f6-7890-abcd-ef1234567890`).

---

### Step 2: Add Your Key to the Project

You can add your key in **one of two ways**:

#### Option A: Direct in Code (Quickest for GitHub Pages)
Open `src/components/Contact.jsx` and replace line 9:
```javascript
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE';
```

#### Option B: Environment Variable (Recommended for Vercel / Netlify)
Create a `.env` file in the project root:
```env
VITE_WEB3FORMS_KEY=your_access_key_here
```

---

### Step 3: Test Your Form
1. Open your portfolio in the browser.
2. Scroll to **"Let's Work Together"** (Contact section).
3. Fill out First Name, Last Name, Email, Message, check the consent box, and click **Send Message**.
4. Check your Gmail inbox (`your-public-contact-email@example.com`) — the message will land in your inbox immediately!

---

## 🚀 GitHub Pages & Universal Deployment Guide

### Deploying to GitHub Pages
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Build portfolio for GitHub Pages"
   git push origin main
   ```
2. In your GitHub Repository, go to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. Your website will be live automatically at `https://YOUR-GITHUB-USERNAME.github.io/WebPortfolio/`!

### Deploying to Vercel or Netlify
1. Connect your GitHub repository to Vercel or Netlify.
2. Set Build Command to `npm run build` and Output Directory to `dist`.
3. Add Environment Variable: `VITE_WEB3FORMS_KEY` = `your_key_here`.
4. Click **Deploy**!


> **Important:** create the Web3Forms access key with the email address you want messages delivered to
> (the public contact address), then add it as `VITE_WEB3FORMS_KEY` in your hosting provider's environment
> variables (Vercel: Project Settings → Environment Variables). Never commit the key to the repository.
> Without the key the contact form opens the visitor's mail app instead.

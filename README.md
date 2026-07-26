# 🧠 Sumanth Mamidi — AI/ML Engineer & Developer Portfolio

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Build Status](https://img.shields.io/badge/Build-Passing-10B981?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/SumanthMamidi-MNS)
[![License](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)](LICENSE)

> **Neural Studio v2.5** — A high-performance, deep-intelligence portfolio showcasing multi-agent AI systems, interactive quantum visualizers, computer vision gesture workspaces, and full-stack engineering tools.

---

## ✨ Feature Highlights

- ⚡ **Interactive Terminal & Hero Section**: Live interactive terminal emulator with real-time command execution, interactive audio intro player, and dynamic profile stats.
- 🤖 **AI Playground & Live Tools**: Real-time AI agent workflow simulator, RAG pipeline inspector, and interactive model performance visualizers.
- 🌌 **Featured Projects & Custom Modals**: Filterable project gallery (`AI & ML`, `Interactive`, `Systems`) with dedicated details modal, smooth backdrop blur, and scroll lock.
- 🎨 **Deep Intelligence Design System**: Built with a unified deep navy palette (`#070B14` → `#141E36`), glassmorphic panels, electric indigo/violet gradients, and smooth custom cursor mix-blend inversion.
- ⚡ **Lenis Smooth Scroll & Dot Grid Effects**: Silky smooth momentum scrolling with background scroll prevention (`data-lenis-prevent`) inside modals.
- 📬 **Live Contact System**: Zero-backend form delivery powered by Web3Forms — messages land directly in `sumanthmamidi77@gmail.com`.
- 🌐 **Universal Deployment Ready**: Native support for **Vercel**, **GitHub Pages**, **Netlify**, and custom domains out-of-the-box.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Core** | React 19, JavaScript (ESNext), Vite 8 |
| **Styling & Design System** | Tailwind CSS v4, Vanilla CSS Design Tokens, Glassmorphism |
| **Animations & FX** | Framer Motion 12, Lenis Smooth Scroll, Canvas WebGL |
| **Icons & Typography** | Lucide React, Bricolage Grotesque, Plus Jakarta Sans, Martian Mono |
| **Form Backend** | Web3Forms API |
| **Deployment & CI/CD** | GitHub Actions (`deploy.yml`), Vercel, Netlify |

---

## 📁 Repository Structure

```
WebPortfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Actions deployment to GitHub Pages
├── public/
│   ├── assets/                 # Certificates, profile avatar, video media
│   └── data/
│       ├── certificates.json   # Certifications data schema
│       ├── profile.json        # Profile, bio, and social links
│       ├── projects.json       # Projects gallery & features
│       └── skills.json         # Technical skill categories
├── src/
│   ├── components/
│   │   ├── effects/            # Custom cursor, dot grid, background meshes
│   │   ├── layout/             # SmoothScroll, Navbar, Footer
│   │   ├── ui/                 # SpotlightCard, TiltCard, SectionHeader, Skeleton
│   │   ├── AIPlayground.jsx
│   │   ├── About.jsx
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx
│   │   ├── Expertise.jsx
│   │   ├── Hero.jsx
│   │   ├── Preloader.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── hooks/                  # Data fetching hooks (useProfile, useProjects)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # Design system tokens & utility layer resets
├── .env.example                # Environment variable configuration template
├── SETUP_CONTACT_FORM.md       # Step-by-step contact form setup guide
├── vite.config.js              # Vite bundler configuration (base: './')
└── package.json
```

---

## 🚀 Quick Start (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/SumanthMamidi-MNS/WebPortfolio.git
cd WebPortfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 📬 Setting Up Contact Form Submissions

The contact form sends messages directly to `sumanthmamidi77@gmail.com` using **Web3Forms**:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Add your Web3Forms Access Key:
   ```env
   VITE_WEB3FORMS_KEY=51babd9f-f8ac-4f39-93fa-f61c63d57ece
   ```
3. Test your contact form! Submissions will immediately arrive in your Gmail inbox.

For detailed instructions, see **[SETUP_CONTACT_FORM.md](./SETUP_CONTACT_FORM.md)**.

---

## 🌐 Deploying to Production

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub.
2. Import your repository into [Vercel](https://vercel.com).
3. Vercel will automatically detect Vite. Click **Deploy**!

### Deploying to GitHub Pages (Automated)
This repository includes a pre-configured GitHub Actions workflow:
1. Go to your GitHub Repository **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Push any commit to `main` — GitHub will build and publish your site automatically!

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👤 Author & Contact

**Sumanth Mamidi**  
*AI/ML Engineer & Developer* — Chennai, India (Remote Worldwide)

- 📧 **Email**: [sumanthmamidi77@gmail.com](mailto:sumanthmamidi77@gmail.com)
- 🐙 **GitHub**: [@SumanthMamidi-MNS](https://github.com/SumanthMamidi-MNS)
- 💼 **LinkedIn**: [mns-sumanth](https://www.linkedin.com/in/mns-sumanth)
- 📸 **Instagram**: [@_m_n_s_sumanth_](https://www.instagram.com/_m_n_s_sumanth_)


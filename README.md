<div align="center">

# ✦ Sumanth's Portfolio
### *AI/ML Engineer & Full-Stack Developer*

**An interactive portfolio bridging intelligent AI systems with modern full-stack web engineering.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black&labelColor=020617)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-FA541C?style=for-the-badge&logo=vite&logoColor=white&labelColor=020617)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=020617)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-EC4899?style=for-the-badge&logo=framer&logoColor=white&labelColor=020617)](https://www.framer.com/motion/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black&labelColor=020617)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-8B5CF6?style=for-the-badge&logo=safari&logoColor=white&labelColor=020617)](https://lenis.darkroom.engineering/)
[![Web3Forms](https://img.shields.io/badge/Web3Forms-Email_API-E11D48?style=for-the-badge&logo=gmail&logoColor=white&labelColor=020617)](https://web3forms.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge&logo=opensourceinitiative&logoColor=black&labelColor=020617)](./LICENSE)

[![Explore Portfolio](https://img.shields.io/badge/▶_Explore_Portfolio-Live_Site-22c55e?style=for-the-badge&logo=vercel&logoColor=white&labelColor=020617)](https://sumanth-portfolio-delta.vercel.app/)

[Overview](#overview) • [Portfolio Sections](#sections) • [Interactive Features](#features) • [Architecture](#architecture) • [Project Structure](#structure) • [Quickstart](#quickstart) • [Tech Stack](#tech-stack) • [Author & Contact](#author)

</div>

---

<a id="overview"></a>
## 📖 Overview

This repository houses the complete source code for **Sumanth's Portfolio** — an executive, high-performance personal platform engineered to demonstrate advanced machine learning pipelines, production full-stack architectures, and interactive digital experiences.

Built with **React 19**, **Vite 8**, and **Tailwind CSS v4**, the platform bridges technical depth with modern creative engineering through scroll-driven animations, a click-to-play intro video, and a dark design system.

---

<a id="sections"></a>
## 🗂️ Portfolio Sections

> **⚡ Hero**  
> Headline, short bio, resume download, and a click-to-play intro video (nothing downloads or plays until you press play).
>
> **💼 Projects**  
> Six featured projects (OceanEmbed, UrbanTrace, TrueCite, FieldCast, Auxin, CampusFlow) with measured results, plus a filterable "show all" gallery with detail modals and repository links.
>
> **📚 Publications**  
> The published SecurePatch paper (AVE Trends in Intelligent Computing Systems, 2026) with DOI and contribution note.
>
> **🧠 About & Education**  
> Short background, key numbers, and a dated education timeline.
>
> **🛠️ Skills**  
> Only tools actually used in the projects above.
>
> **📜 Certifications**  
> Certificate cards with an in-page viewer for each document.
>
> **📬 Contact**  
> Inquiry form powered by Web3Forms when `VITE_WEB3FORMS_KEY` is set, otherwise it opens the visitor's mail app.

---

<a id="features"></a>
## 🎮 Interactive Features

| Feature | Interaction | Purpose |
| :--- | :--- | :--- |
| **Command Palette** | `⌘K` or `Ctrl+K` | Jump to any section or download the resume |
| **Click-to-Play Intro** | Press the play button in the hero | Plays the intro video on demand; pauses automatically when scrolled out of view |
| **Project Modals** | Click (or press Enter on) a project card | Open detailed view with feature lists, tech stack, and trapped scroll container |
| **Reduced Motion** | OS "reduce motion" setting | Animations and the intro curtain are skipped |
| **Smooth Momentum** | Mouse wheel or touch scroll | Hardware-accelerated Lenis scrolling with isolated modal containers |
| **Dynamic Cursor** | Move pointer over elements | `mix-blend-difference` custom cursor providing high-contrast inverted feedback |

---

<a id="architecture"></a>
## 🏗️ Architecture

The diagram below outlines the portfolio's component hierarchy, state flow, and external service communication:

```mermaid
flowchart TD
    %% Input
    subgraph S1 ["1. USER INTERFACE & INPUTS"]
        A["Visitor Navigation<br/>(Mouse • Keyboard • ⌘K Hotkeys • Form)"]
    end

    %% Interaction Layer
    subgraph S2 ["2. ANIMATION & INTERACTION LAYER"]
        B["Framer Motion 12<br/>(Spring Transitions & Hover Dynamics)"]
        C["Lenis Smooth Scroll<br/>(data-lenis-prevent Modal Scroll Trapping)"]
        D["Custom Cursor Engine<br/>(Coordinate Tracking & Inversion Blend)"]
    end

    %% Core App
    subgraph S3 ["3. REACT 19 CORE"]
        E["App Shell Coordinator"]
        F["Navigation Bar & Scroll Spy"]
        G["Global Command Palette (⌘K)"]
    end

    %% Sections
    subgraph S4 ["4. SECTION MODULES"]
        H["Hero & Intro Video"]
        I["Publications & Education"]
        J["Projects Gallery & Modals"]
        K["Contact Form & Validation"]
    end

    %% Delivery
    subgraph S5 ["5. DISPATCH & HOSTING"]
        L["Web3Forms API<br/>(Inquiries to the configured inbox)"]
        M["Edge Deployment<br/>(Vercel: sumanth-portfolio-delta.vercel.app)"]
    end

    %% Connections
    A --> B
    A --> C
    A --> D
    B --> E
    C --> E
    D --> E
    E --> F
    E --> G
    E --> H
    E --> I
    E --> J
    E --> K
    K --> L
    E --> M

    %% Obsidian Dark Palette
    style S1 fill:#0A0F1E,stroke:#6366F1,stroke-width:1px,color:#fff
    style S2 fill:#0A0F1E,stroke:#8B5CF6,stroke-width:1px,color:#fff
    style S3 fill:#0A0F1E,stroke:#06B6D4,stroke-width:1px,color:#fff
    style S4 fill:#0A0F1E,stroke:#10B981,stroke-width:1px,color:#fff
    style S5 fill:#070B14,stroke:#FA541C,stroke-width:1px,color:#fff
```

---

<a id="structure"></a>
## 📁 Project Structure

```
WebPortfolio/
├── public/
│   ├── assets/                 # Profile avatars, certificates, video assets
│   └── data/
│       ├── certificates.json   # Certifications dataset
│       ├── education.json      # Education timeline
│       ├── profile.json        # Bio, resume path, video, and social profiles
│       ├── projects.json       # Projects catalog & tags
│       ├── publications.json   # Published papers
│       └── skills.json         # Technical skill categories
├── src/
│   ├── components/
│   │   ├── effects/            # CustomCursor, GradientMesh, ambient effects
│   │   ├── layout/             # SmoothScroll, Navbar, Footer
│   │   ├── ui/                 # SpotlightCard, TiltCard, SectionHeader
│   │   ├── About.jsx           # Background and key numbers
│   │   ├── Certifications.jsx  # Certification cards and viewer
│   │   ├── Contact.jsx         # Contact form (Web3Forms or mail app)
│   │   ├── Education.jsx       # Education timeline
│   │   ├── Hero.jsx            # Hero banner and click-to-play intro video
│   │   ├── Preloader.jsx       # Intro curtain (once per session)
│   │   ├── Projects.jsx        # Project gallery & modal system
│   │   ├── Publications.jsx    # Published research
│   │   └── Skills.jsx          # Skills by category
│   ├── hooks/                  # Data hooks sharing one cached fetch per JSON file
│   ├── App.jsx                 # Application layout coordinator
│   ├── main.jsx                # React root mount
│   └── index.css               # Design tokens, variables & resets
├── .env.example                # Environment variables template
├── LICENSE                     # MIT License
├── package.json                # Project dependencies and scripts
├── SETUP_CONTACT_FORM.md       # Contact form configuration guide
└── vite.config.js              # Vite configuration (base: './')
```

---

<a id="quickstart"></a>
## ⚡ Quickstart

### Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/SumanthMamidi-MNS/WebPortfolio.git
cd WebPortfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

### Production Build

```bash
# Build optimized static bundle
npm run build

# Preview build locally
npm run preview
```

---

### Deployment

- **Vercel (Production)**: Live at **[sumanth-portfolio-delta.vercel.app](https://sumanth-portfolio-delta.vercel.app/)** — automatic continuous deployment connected to Git.
- **Custom Domain / Netlify**: Build command `npm run build` with publish directory `dist`.

---

<a id="tech-stack"></a>
## 🛠️ Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Component architecture, state management & concurrency |
| **Bundler** | [Vite 8](https://vitejs.dev/) | Instant HMR development and fast Rollup builds |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility engine and custom design token system |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) | Spring-based layout animations, enters & modal transitions |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) | Smooth scroll momentum with modal containment |
| **Icons** | [Lucide React](https://lucide.dev/) | Minimalist developer iconography |
| **Contact Form** | [Web3Forms API](https://web3forms.com/) | Serverless contact forwarding straight to Gmail |
| **Typography** | [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) | Modern display and interface typography |

---

<a id="author"></a>
## 👤 Author & Contact

**Sumanth Mamidi**  
*AI Systems & ML Engineering Student — Chennai, India*

- 📧 **Email**: [sumanthmamidi77@gmail.com](mailto:sumanthmamidi77@gmail.com)
- 🐙 **GitHub**: [@SumanthMamidi-MNS](https://github.com/SumanthMamidi-MNS)
- 💼 **LinkedIn**: [mns-sumanth](https://www.linkedin.com/in/mns-sumanth)
- 📸 **Instagram**: [@_m_n_s_sumanth_](https://www.instagram.com/_m_n_s_sumanth_)

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

---

<div align="center">

Designed & Developed by **[Sumanth Mamidi](https://github.com/SumanthMamidi-MNS)**

<sub>Copyright © 2026 Sumanth Mamidi. All rights reserved.</sub>

</div>

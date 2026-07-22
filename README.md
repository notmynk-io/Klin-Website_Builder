# Klin — Drag. Drop. Build. 🚀

**Klin** is a high-performance, browser-based visual website and application builder built with React 19, TypeScript, Express, and Tailwind CSS. It enables creators, developers, and designers to visually compose multi-page web layouts, inspect and customize DOM element trees, preview responsive designs, and export clean, production-ready code.

---

## 🌟 Key Features

### 🎨 Visual Canvas & Drag-and-Drop Builder
- **Interactive Element Inspector**: Hover over canvas elements to highlight, reorder, duplicate, edit text content, or delete DOM nodes.
- **Real-Time Property Editor**: Customize Tailwind utility classes, typography, padding, colors, flexbox/grid layouts, links, and HTML attributes.
- **DOM Hierarchy Tree**: Expandable left sidebar tree showing exact component nesting and layer structures.

### 📚 12 Pre-Built Starter Templates & Multi-Page Support
- **12 Industry Starter Templates**:
  1. *SaaS Launchpad & Platform*
  2. *Developer Portfolio & Resume*
  3. *E-Commerce Storefront*
  4. *Digital Agency & Creative Studio*
  5. *Mobile App Showcase*
  6. *Restaurant, Café & Bistro*
  7. *Tech Magazine & Digital Blog*
  8. *Event Summit & Conference*
  9. *Course Portal & LMS Academy*
  10. *Healthcare & Wellness Clinic*
  11. *Real Estate & Property Portal*
  12. *Financial & Analytics Dashboard*
- **Multi-Page Routing**: Create, rename, switch between, and manage individual pages within a single project.

### 🛡️ Secure Admin Control Panel
- **Role-Based Authentication**: Secure admin panel for managing platform export permissions.
- **Strict Download Approval Policy**: Enforce administrator approval workflows before users can download generated code packages.
- **Audit Logging**: Real-time security and activity audit logs tracking sessions, credential updates, and code export approvals.

### 🏷️ Global Branding & Assets
- Centralized logo asset configuration (`src/constants/logo.ts`) linked globally across header navigation, component palettes, and admin views.

---

## 📁 Project Architecture

```
├── src/
│   ├── components/         # UI Components (HeaderBar, LeftSidebar, RightSidebar, AdminModal, CodeDrawer, Canvas)
│   ├── constants/          # Global Constants (Brand logo URL and configurations)
│   ├── data/               # Component Palette and Starter Templates
│   ├── utils/              # DOM manipulation and HTML exporter helpers
│   ├── types.ts            # TypeScript Interfaces and Types
│   ├── App.tsx             # Main Application Logic & State Engine
│   ├── main.tsx            # React DOM Entry Point
│   └── index.css           # Global Styles & Tailwind Directives
├── server.ts               # Express Backend Server & Vite Dev Middleware
├── package.json            # Project Dependencies and Build Scripts
└── metadata.json           # Platform Application Metadata
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:3000`.

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Start Production Server**:
   ```bash
   npm run start
   ```

---

## 🚀 Deployment Guide

### Option 1: AI Studio One-Click Cloud Deployment
In Google AI Studio, click the **Share / Deploy** menu button at the top-right corner to instantly host the app on Google Cloud Run.

### Option 2: Docker / Container Deployment
The application includes a bundled Express server that serves static Vite assets in production.

1. **Build Container Image**:
   ```bash
   docker build -t klin-app .
   ```
2. **Run Container**:
   ```bash
   docker run -p 3000:3000 klin-app
   ```

### Option 3: Deploying to Cloud Hosts (Render / Railway / Heroku)
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Port**: `3000` (or `process.env.PORT`)

---

## 📜 License & Ownership

Created by **Mayank Kumar Gupta** © 2026. All rights reserved.

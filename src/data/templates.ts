import { Project, Page, ElementNode } from '../types';
import { generateId } from '../utils/domUtils';
import { createGlobalLogoElement } from '../constants/logo';

// Helper: Header Navigation
const createHeaderNav = (
  links: { label: string; href: string }[] = [],
  ctaText = 'Get Started',
  bgColor = 'bg-slate-900/90 border-slate-800'
): ElementNode => ({
  id: generateId('header'),
  tagName: 'header',
  name: 'Navigation Header',
  classes: `w-full py-4 px-6 border-b ${bgColor} backdrop-blur-md sticky top-0 z-50`,
  children: [
    {
      id: generateId('div'),
      tagName: 'div',
      name: 'Nav Container',
      classes: 'max-w-7xl mx-auto flex items-center justify-between gap-4',
      children: [
        createGlobalLogoElement('Header Global Logo', 'h-9'),
        {
          id: generateId('nav'),
          tagName: 'nav',
          name: 'Nav Links',
          classes: 'hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300',
          children: links.map((link) => ({
            id: generateId('a'),
            tagName: 'a',
            name: 'Link',
            classes: 'hover:text-[#E8A23D] transition',
            content: link.label,
            attributes: { href: link.href },
          })),
        },
        {
          id: generateId('button'),
          tagName: 'button',
          name: 'CTA Button',
          classes: 'px-4 py-2 bg-[#E8A23D] hover:bg-[#d8932e] text-[#1a1305] font-semibold rounded-lg text-xs transition cursor-pointer shadow-sm',
          content: ctaText,
        },
      ],
    },
  ],
});

// Helper: Page Footer
const createFooter = (bgColor = 'bg-slate-950 border-slate-800'): ElementNode => ({
  id: generateId('footer'),
  tagName: 'footer',
  name: 'Page Footer',
  classes: `w-full py-8 px-6 ${bgColor} border-t text-slate-400 text-sm text-center font-medium space-y-4`,
  children: [
    {
      id: generateId('div'),
      tagName: 'div',
      name: 'Footer Branding',
      classes: 'flex items-center justify-center gap-3',
      children: [
        createGlobalLogoElement('Footer Global Logo', 'h-8'),
      ],
    },
    {
      id: generateId('p'),
      tagName: 'p',
      name: 'Copyright Notice',
      classes: 'text-slate-400 text-xs tracking-wide',
      content: 'Mayank Kumar Gupta © 2026 All Rights Reserved.',
    },
  ],
});

// ==========================================
// 12 COMPREHENSIVE STARTER TEMPLATES
// ==========================================

export const STARTER_PROJECTS: Project[] = [
  // 1. TEMPLATE: SaaS Launchpad & Platform
  {
    id: 'proj-saas-platform',
    name: '1. SaaS Launchpad & Platform',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activePageId: 'saas-home',
    pages: [
      {
        id: 'saas-home',
        name: 'Home',
        slug: '/',
        title: 'SaaS Launchpad - Build & Scale',
        root: {
          id: generateId('root'),
          tagName: 'div',
          name: 'Page Root',
          classes: 'min-h-screen bg-slate-900 text-slate-100 font-sans antialiased',
          children: [
            createHeaderNav([
              { label: 'Features', href: '#features' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Integrations', href: '#integrations' },
            ], 'Start Free Trial'),
            // Hero
            {
              id: generateId('hero'),
              tagName: 'section',
              name: 'Hero Section',
              classes: 'py-20 px-6 text-center bg-radial from-indigo-900/30 via-slate-900 to-slate-900 space-y-6',
              children: [
                {
                  id: generateId('span'),
                  tagName: 'span',
                  name: 'Badge',
                  classes: 'inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
                  content: '🚀 Cloud Native SaaS Architecture',
                },
                {
                  id: generateId('h1'),
                  tagName: 'h1',
                  name: 'Headline',
                  classes: 'text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto',
                  content: 'Accelerate Your Product Growth with Intelligent Workflows',
                },
                {
                  id: generateId('p'),
                  tagName: 'p',
                  name: 'Subtitle',
                  classes: 'text-lg text-slate-400 max-w-2xl mx-auto',
                  content: 'Automate tasks, analyze real-time data metrics, and deploy web experiences effortlessly.',
                },
                {
                  id: generateId('div'),
                  tagName: 'div',
                  name: 'CTA Buttons',
                  classes: 'flex justify-center gap-4 pt-2',
                  children: [
                    { id: generateId('button'), tagName: 'button', name: 'Primary CTA', classes: 'px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition', content: 'Get Started Now' },
                    { id: generateId('button'), tagName: 'button', name: 'Secondary CTA', classes: 'px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl border border-slate-700 transition', content: 'Book Live Demo' },
                  ],
                },
              ],
            },
            // Features Grid
            {
              id: generateId('section'),
              tagName: 'section',
              name: 'Features Grid',
              classes: 'py-16 px-6 bg-slate-950/60 border-t border-slate-800',
              children: [
                {
                  id: generateId('div'),
                  tagName: 'div',
                  name: 'Grid Container',
                  classes: 'max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6',
                  children: [
                    { title: '⚡ Real-time Analytics', desc: 'Instant telemetry data visualization with customizable dashboards.' },
                    { title: '🔒 Enterprise Security', desc: 'End-to-end encryption, role-based controls, and SOC2 compliance.' },
                    { title: '🤖 AI Automation Engine', desc: 'Automate repetitive operations with custom machine learning pipelines.' },
                  ].map((f) => ({
                    id: generateId('card'),
                    tagName: 'div',
                    name: 'Feature Card',
                    classes: 'p-6 bg-slate-900 rounded-xl border border-slate-800 space-y-2',
                    children: [
                      { id: generateId('h3'), tagName: 'h3', name: 'Title', classes: 'text-lg font-bold text-white', content: f.title },
                      { id: generateId('p'), tagName: 'p', name: 'Desc', classes: 'text-sm text-slate-400', content: f.desc },
                    ],
                  })),
                },
              ],
            },
            createFooter(),
          ],
        },
      },
      {
        id: 'saas-pricing',
        name: 'Pricing Plans',
        slug: '/pricing',
        title: 'SaaS Launchpad - Pricing Plans',
        root: {
          id: generateId('root'),
          tagName: 'div',
          name: 'Page Root',
          classes: 'min-h-screen bg-slate-900 text-slate-100 font-sans',
          children: [
            createHeaderNav([{ label: 'Home', href: '/' }, { label: 'Features', href: '/#features' }], 'Get Started'),
            {
              id: generateId('section'),
              tagName: 'section',
              name: 'Pricing Tier Section',
              classes: 'py-20 px-6 max-w-6xl mx-auto text-center space-y-12',
              children: [
                {
                  id: generateId('div'),
                  tagName: 'div',
                  name: 'Header',
                  classes: 'space-y-3',
                  children: [
                    { id: generateId('h1'), tagName: 'h1', name: 'Title', classes: 'text-4xl font-extrabold text-white', content: 'Simple, Transparent Pricing' },
                    { id: generateId('p'), tagName: 'p', name: 'Sub', classes: 'text-slate-400 text-base', content: 'Choose the plan that fits your growth stage.' },
                  ],
                },
                {
                  id: generateId('div'),
                  tagName: 'div',
                  name: 'Cards Grid',
                  classes: 'grid grid-cols-1 md:grid-cols-3 gap-8 text-left',
                  children: [
                    { plan: 'Starter', price: '$29/mo', desc: 'Ideal for small projects & startups.' },
                    { plan: 'Pro Business', price: '$99/mo', desc: 'For growing teams requiring advanced analytics.' },
                    { plan: 'Enterprise', price: '$299/mo', desc: 'Dedicated support, custom SLA, and unlimited scale.' },
                  ].map((p) => ({
                    id: generateId('card'),
                    tagName: 'div',
                    name: 'Pricing Card',
                    classes: 'p-8 bg-slate-950 border border-slate-800 rounded-2xl space-y-6 flex flex-col justify-between',
                    children: [
                      {
                        id: generateId('div'),
                        tagName: 'div',
                        name: 'Top',
                        classes: 'space-y-3',
                        children: [
                          { id: generateId('h3'), tagName: 'h3', name: 'Plan Name', classes: 'text-xl font-bold text-white', content: p.plan },
                          { id: generateId('div'), tagName: 'div', name: 'Price', classes: 'text-3xl font-extrabold text-[#E8A23D]', content: p.price },
                          { id: generateId('p'), tagName: 'p', name: 'Desc', classes: 'text-sm text-slate-400', content: p.desc },
                        ],
                      },
                      { id: generateId('button'), tagName: 'button', name: 'Plan Button', classes: 'w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-sm text-center transition cursor-pointer', content: 'Select Plan' },
                    ],
                  })),
                },
              ],
            },
            createFooter(),
          ],
        },
      },
    ],
  },

  // 2. TEMPLATE: Developer Portfolio & Resume
  {
    id: 'proj-dev-portfolio',
    name: '2. Developer Portfolio & Resume',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activePageId: 'port-home',
    pages: [
      {
        id: 'port-home',
        name: 'Portfolio Home',
        slug: '/',
        title: 'Alex Rivera - Senior Full Stack Engineer',
        root: {
          id: generateId('root'),
          tagName: 'div',
          name: 'Page Root',
          classes: 'min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased',
          children: [
            createHeaderNav([
              { label: 'Projects', href: '#projects' },
              { label: 'Experience', href: '#experience' },
              { label: 'Skills', href: '#skills' },
            ], 'Contact Me', 'bg-zinc-900/90 border-zinc-800'),
            {
              id: generateId('hero'),
              tagName: 'section',
              name: 'Developer Hero',
              classes: 'py-24 px-6 max-w-5xl mx-auto space-y-6 text-left',
              children: [
                { id: generateId('span'), tagName: 'span', name: 'Status Badge', classes: 'inline-flex items-center px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono rounded-md', content: '🟢 Available for Senior Engineering Roles' },
                { id: generateId('h1'), tagName: 'h1', name: 'Title', classes: 'text-4xl sm:text-6xl font-black text-white tracking-tight', content: 'Crafting High-Performance Web Applications & Cloud Systems' },
                { id: generateId('p'), tagName: 'p', name: 'Bio', classes: 'text-lg text-zinc-400 max-w-2xl', content: 'Specializing in React, TypeScript, Node.js, and Distributed Systems with 8+ years of production engineering experience.' },
              ],
            },
            {
              id: generateId('section'),
              tagName: 'section',
              name: 'Projects Showcase',
              classes: 'py-16 px-6 max-w-5xl mx-auto border-t border-zinc-800 space-y-8',
              children: [
                { id: generateId('h2'), tagName: 'h2', name: 'Section Title', classes: 'text-2xl font-bold text-white', content: 'Featured Projects' },
                {
                  id: generateId('div'),
                  tagName: 'div',
                  name: 'Project Cards',
                  classes: 'grid grid-cols-1 md:grid-cols-2 gap-6',
                  children: [
                    { title: 'OmniStream Engine', tech: 'React • WebSockets • Go', desc: 'Real-time collaborative workspace canvas supporting 10k+ active users.' },
                    { title: 'Nexus DB Visualizer', tech: 'TypeScript • Tailwind • D3', desc: 'Interactive visual query editor and database architecture schema renderer.' },
                  ].map((proj) => ({
                    id: generateId('card'),
                    tagName: 'div',
                    name: 'Project Card',
                    classes: 'p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-3 hover:border-zinc-700 transition',
                    children: [
                      { id: generateId('h3'), tagName: 'h3', name: 'Title', classes: 'text-lg font-bold text-white', content: proj.title },
                      { id: generateId('span'), tagName: 'span', name: 'Tech Tag', classes: 'inline-block text-xs font-mono text-amber-400', content: proj.tech },
                      { id: generateId('p'), tagName: 'p', name: 'Desc', classes: 'text-sm text-zinc-400', content: proj.desc },
                    ],
                  })),
                },
              ],
            },
            createFooter('bg-zinc-950 border-zinc-800'),
          ],
        },
      },
    ],
  },

  // 3. TEMPLATE: E-Commerce Storefront
  {
    id: 'proj-ecommerce-store',
    name: '3. E-Commerce Storefront',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activePageId: 'shop-home',
    pages: [
      {
        id: 'shop-home',
        name: 'Storefront Home',
        slug: '/',
        title: 'Luxe Apparel & Accessories',
        root: {
          id: generateId('root'),
          tagName: 'div',
          name: 'Page Root',
          classes: 'min-h-screen bg-stone-900 text-stone-100 font-sans',
          children: [
            createHeaderNav([
              { label: 'New Arrivals', href: '#new' },
              { label: 'Collections', href: '#collections' },
              { label: 'Sale', href: '#sale' },
            ], 'Cart (0)', 'bg-stone-900/90 border-stone-800'),
            {
              id: generateId('hero'),
              tagName: 'section',
              name: 'Shop Hero Banner',
              classes: 'py-20 px-6 text-center bg-stone-950 border-b border-stone-800 space-y-4',
              children: [
                { id: generateId('span'), tagName: 'span', name: 'Badge', classes: 'text-xs font-bold text-[#E8A23D] uppercase tracking-widest', content: 'Summer 2026 Collection' },
                { id: generateId('h1'), tagName: 'h1', name: 'Headline', classes: 'text-4xl sm:text-5xl font-serif text-stone-100', content: 'Timeless Elegance & Modern Essentials' },
                { id: generateId('p'), tagName: 'p', name: 'Sub', classes: 'text-stone-400 text-sm max-w-xl mx-auto', content: 'Discover hand-crafted apparel designed with premium sustainable fabrics.' },
              ],
            },
            {
              id: generateId('section'),
              tagName: 'section',
              name: 'Product Catalog Grid',
              classes: 'py-16 px-6 max-w-6xl mx-auto space-y-8',
              children: [
                { id: generateId('h2'), tagName: 'h2', name: 'Title', classes: 'text-2xl font-serif text-stone-100', content: 'Trending Collection' },
                {
                  id: generateId('div'),
                  tagName: 'div',
                  name: 'Grid',
                  classes: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6',
                  children: [
                    { name: 'Minimalist Cotton Hoodie', price: '$120.00', cat: 'Apparel' },
                    { name: 'Crafted Leather Sneakers', price: '$210.00', cat: 'Footwear' },
                    { name: 'Architectural Sunglasses', price: '$150.00', cat: 'Accessories' },
                    { name: 'Matte Ceramic Chronograph', price: '$340.00', cat: 'Watches' },
                  ].map((p) => ({
                    id: generateId('item'),
                    tagName: 'div',
                    name: 'Product Card',
                    classes: 'p-4 bg-stone-950 border border-stone-800 rounded-xl space-y-3 group hover:border-[#E8A23D]/60 transition',
                    children: [
                      { id: generateId('div'), tagName: 'div', name: 'Image Box', classes: 'h-48 bg-stone-900 rounded-lg flex items-center justify-center text-stone-600 text-xs font-mono', content: '[ PRODUCT IMAGE ]' },
                      { id: generateId('div'), tagName: 'div', name: 'Meta', classes: 'space-y-1', children: [
                        { id: generateId('p'), tagName: 'p', name: 'Cat', classes: 'text-[10px] text-amber-500 uppercase font-semibold', content: p.cat },
                        { id: generateId('h4'), tagName: 'h4', name: 'Name', classes: 'text-sm font-medium text-stone-200 group-hover:text-stone-100', content: p.name },
                        { id: generateId('p'), tagName: 'p', name: 'Price', classes: 'text-xs font-bold text-stone-100', content: p.price },
                      ]},
                      { id: generateId('button'), tagName: 'button', name: 'Buy Button', classes: 'w-full py-1.5 bg-stone-900 hover:bg-[#E8A23D] hover:text-stone-950 text-stone-300 font-semibold rounded text-xs transition cursor-pointer', content: 'Add to Cart' },
                    ],
                  })),
                },
              ],
            },
            createFooter('bg-stone-950 border-stone-800'),
          ],
        },
      },
    ],
  },

  // 4. TEMPLATE: Digital Agency & Creative Studio
  {
    id: 'proj-creative-agency',
    name: '4. Digital Agency & Creative Studio',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activePageId: 'agency-home',
    pages: [
      {
        id: 'agency-home',
        name: 'Agency Home',
        slug: '/',
        title: 'Kinetix Studio - Digital Agency',
        root: {
          id: generateId('root'),
          tagName: 'div',
          name: 'Page Root',
          classes: 'min-h-screen bg-neutral-950 text-neutral-100 font-sans',
          children: [
            createHeaderNav([
              { label: 'Work', href: '#work' },
              { label: 'Services', href: '#services' },
              { label: 'Studio', href: '#studio' },
            ], 'Start a Project', 'bg-neutral-900/90 border-neutral-800'),
            {
              id: generateId('hero'),
              tagName: 'section',
              name: 'Agency Hero',
              classes: 'py-28 px-6 max-w-5xl mx-auto space-y-6 text-left',
              children: [
                { id: generateId('h1'), tagName: 'h1', name: 'Headline', classes: 'text-5xl sm:text-7xl font-black text-white tracking-tight leading-none', content: 'We Build Iconic Digital Brands & Products' },
                { id: generateId('p'), tagName: 'p', name: 'Sub', classes: 'text-xl text-neutral-400 max-w-2xl', content: 'An independent creative studio specializing in brand strategy, interactive UI/UX, and full-stack engineering.' },
              ],
            },
            createFooter('bg-neutral-950 border-neutral-800'),
          ],
        },
      },
    ],
  },

  // 5. TEMPLATE: Mobile App Showcase
  {
    id: 'proj-mobile-app',
    name: '5. Mobile App Showcase',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activePageId: 'app-home',
    pages: [
      {
        id: 'app-home',
        name: 'App Overview',
        slug: '/',
        title: 'Pulse - Smart Productivity Mobile App',
        root: {
          id: generateId('root'),
          tagName: 'div',
          name: 'Page Root',
          classes: 'min-h-screen bg-slate-900 text-slate-100 font-sans',
          children: [
            createHeaderNav([
              { label: 'Features', href: '#features' },
              { label: 'Screenshots', href: '#screens' },
              { label: 'Reviews', href: '#reviews' },
            ], 'Download iOS / Android'),
            {
              id: generateId('hero'),
              tagName: 'section',
              name: 'Mobile Hero',
              classes: 'py-20 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center',
              children: [
                {
                  id: generateId('div'),
                  tagName: 'div',
                  name: 'Text Side',
                  classes: 'space-y-6',
                  children: [
                    { id: generateId('span'), tagName: 'span', name: 'Badge', classes: 'px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full', content: '★ 4.9 Rating on App Store' },
                    { id: generateId('h1'), tagName: 'h1', name: 'Headline', classes: 'text-4xl sm:text-5xl font-extrabold text-white leading-tight', content: 'Master Your Daily Routine with AI Focus' },
                    { id: generateId('p'), tagName: 'p', name: 'Sub', classes: 'text-slate-400 text-base', content: 'Track habits, sync calendar schedules, and organize tasks seamlessly.' },
                  ],
                },
                {
                  id: generateId('div'),
                  tagName: 'div',
                  name: 'Mockup Side',
                  classes: 'h-96 bg-slate-950 border-4 border-slate-800 rounded-3xl p-6 flex flex-col justify-between items-center shadow-2xl text-slate-500 text-xs font-mono',
                  content: '[ APP MOBILE SCREEN MOCKUP ]',
                },
              ],
            },
            createFooter(),
          ],
        },
      },
    ],
  },

  // 6. TEMPLATE: Restaurant & Bistro
  {
    id: 'proj-restaurant-bistro',
    name: '6. Restaurant, Café & Bistro',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activePageId: 'bistro-home',
    pages: [
      {
        id: 'bistro-home',
        name: 'Bistro Home',
        slug: '/',
        title: 'Aura Bistro & Bar',
        root: {
          id: generateId('root'),
          tagName: 'div',
          name: 'Page Root',
          classes: 'min-h-screen bg-neutral-900 text-neutral-100 font-sans',
          children: [
            createHeaderNav([
              { label: 'Menu', href: '#menu' },
              { label: 'Story', href: '#story' },
              { label: 'Location', href: '#location' },
            ], 'Reserve Table', 'bg-neutral-900/90 border-neutral-800'),
            {
              id: generateId('hero'),
              tagName: 'section',
              name: 'Bistro Hero',
              classes: 'py-24 px-6 text-center space-y-4 max-w-3xl mx-auto',
              children: [
                { id: generateId('span'), tagName: 'span', name: 'Sub', classes: 'text-xs font-semibold text-[#E8A23D] tracking-widest uppercase', content: 'Fine Culinary Experience' },
                { id: generateId('h1'), tagName: 'h1', name: 'Title', classes: 'text-4xl sm:text-6xl font-serif text-white', content: 'Artisanal Flavors & Craft Cocktails' },
                { id: generateId('p'), tagName: 'p', name: 'Desc', classes: 'text-neutral-400 text-sm', content: 'Locally sourced organic ingredients paired with curated natural wines.' },
              ],
            },
            createFooter('bg-neutral-950 border-neutral-800'),
          ],
        },
      },
    ],
  },

  // 7. TEMPLATE: Tech Publication & Magazine
  {
    id: 'proj-tech-magazine',
    name: '7. Tech Magazine & Digital Blog',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activePageId: 'mag-home',
    pages: [
      {
        id: 'mag-home',
        name: 'Magazine Frontpage',
        slug: '/',
        title: 'The Tech Chronicle - Modern Insights',
        root: {
          id: generateId('root'),
          tagName: 'div',
          name: 'Page Root',
          classes: 'min-h-screen bg-slate-950 text-slate-100 font-sans',
          children: [
            createHeaderNav([
              { label: 'AI & ML', href: '#ai' },
              { label: 'Hardware', href: '#hardware' },
              { label: 'Startups', href: '#startups' },
            ], 'Subscribe', 'bg-slate-900/90 border-slate-800'),
            {
              id: generateId('hero'),
              tagName: 'section',
              name: 'Featured Article',
              classes: 'py-16 px-6 max-w-6xl mx-auto border-b border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-8',
              children: [
                {
                  id: generateId('div'),
                  tagName: 'div',
                  name: 'Main Featured',
                  classes: 'md:col-span-2 p-8 bg-slate-900 rounded-2xl border border-slate-800 space-y-4',
                  children: [
                    { id: generateId('span'), tagName: 'span', name: 'Cat', classes: 'text-xs font-mono text-indigo-400 font-bold', content: 'FEATURED COVER STORY' },
                    { id: generateId('h1'), tagName: 'h1', name: 'Title', classes: 'text-2xl sm:text-4xl font-extrabold text-white', content: 'The Architecture of Autonomous AI Agents in 2026' },
                    { id: generateId('p'), tagName: 'p', name: 'Desc', classes: 'text-slate-400 text-sm', content: 'Exploring how multi-agent reasoning loops and neural tools are transforming enterprise software systems.' },
                  ],
                },
                {
                  id: generateId('div'),
                  tagName: 'div',
                  name: 'Side Trending',
                  classes: 'p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4',
                  children: [
                    { id: generateId('h3'), tagName: 'h3', name: 'Title', classes: 'text-lg font-bold text-white', content: 'Trending Tech Briefs' },
                    { id: generateId('p'), tagName: 'p', name: 'Item', classes: 'text-xs text-slate-300 border-b border-slate-800 pb-2', content: '• Quantum Chips Achieve Room Temperature Coherence' },
                    { id: generateId('p'), tagName: 'p', name: 'Item', classes: 'text-xs text-slate-300 border-b border-slate-800 pb-2', content: '• Next-Gen Frameworks Ditch Virtual DOM Completely' },
                  ],
                },
              ],
            },
            createFooter('bg-slate-950 border-slate-800'),
          ],
        },
      },
    ],
  },

  // 8. TEMPLATE: Event Summit & Conference
  {
    id: 'proj-event-summit',
    name: '8. Event Summit & Conference',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activePageId: 'event-home',
    pages: [
      {
        id: 'event-home',
        name: 'Summit Home',
        slug: '/',
        title: 'Global Tech Summit 2026',
        root: {
          id: generateId('root'),
          tagName: 'div',
          name: 'Page Root',
          classes: 'min-h-screen bg-slate-950 text-slate-100 font-sans',
          children: [
            createHeaderNav([
              { label: 'Speakers', href: '#speakers' },
              { label: 'Schedule', href: '#schedule' },
              { label: 'Venue', href: '#venue' },
            ], 'Get Pass'),
            {
              id: generateId('hero'),
              tagName: 'section',
              name: 'Summit Hero',
              classes: 'py-20 px-6 text-center space-y-6 max-w-4xl mx-auto',
              children: [
                { id: generateId('span'), tagName: 'span', name: 'Date', classes: 'px-4 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono font-bold rounded-full', content: 'OCTOBER 14-16, 2026 • SAN FRANCISCO, CA' },
                { id: generateId('h1'), tagName: 'h1', name: 'Title', classes: 'text-4xl sm:text-6xl font-black text-white', content: 'The World Premier AI & Web Architecture Summit' },
                { id: generateId('p'), tagName: 'p', name: 'Sub', classes: 'text-slate-400 text-base', content: '50+ Keynote Speakers, 30 Interactive Workshops, and 3,000+ Engineers.' },
              ],
            },
            createFooter(),
          ],
        },
      },
    ],
  },

  // 9. TEMPLATE: Course Portal & LMS Academy
  {
    id: 'proj-lms-academy',
    name: '9. Course Portal & Online Academy',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activePageId: 'lms-home',
    pages: [
      {
        id: 'lms-home',
        name: 'Academy Home',
        slug: '/',
        title: 'SkillForge Academy - Master Modern Code',
        root: {
          id: generateId('root'),
          tagName: 'div',
          name: 'Page Root',
          classes: 'min-h-screen bg-slate-900 text-slate-100 font-sans',
          children: [
            createHeaderNav([
              { label: 'Courses', href: '#courses' },
              { label: 'Bootcamps', href: '#bootcamps' },
              { label: 'Pricing', href: '#pricing' },
            ], 'Student Login'),
            {
              id: generateId('hero'),
              tagName: 'section',
              name: 'LMS Hero',
              classes: 'py-20 px-6 text-center space-y-6 max-w-4xl mx-auto',
              children: [
                { id: generateId('h1'), tagName: 'h1', name: 'Title', classes: 'text-4xl sm:text-6xl font-extrabold text-white', content: 'Master Full-Stack & AI Engineering' },
                { id: generateId('p'), tagName: 'p', name: 'Sub', classes: 'text-slate-400 text-base', content: 'Project-based masterclasses taught by senior industry staff engineers.' },
              ],
            },
            createFooter(),
          ],
        },
      },
    ],
  },

  // 10. TEMPLATE: Healthcare & Wellness Clinic
  {
    id: 'proj-health-clinic',
    name: '10. Medical, Healthcare & Clinic',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activePageId: 'health-home',
    pages: [
      {
        id: 'health-home',
        name: 'Clinic Home',
        slug: '/',
        title: 'Apex Health Clinic & Wellness Center',
        root: {
          id: generateId('root'),
          tagName: 'div',
          name: 'Page Root',
          classes: 'min-h-screen bg-slate-900 text-slate-100 font-sans',
          children: [
            createHeaderNav([
              { label: 'Services', href: '#services' },
              { label: 'Doctors', href: '#doctors' },
              { label: 'Locations', href: '#locations' },
            ], 'Book Appointment'),
            {
              id: generateId('hero'),
              tagName: 'section',
              name: 'Health Hero',
              classes: 'py-20 px-6 max-w-5xl mx-auto space-y-6 text-left',
              children: [
                { id: generateId('h1'), tagName: 'h1', name: 'Title', classes: 'text-4xl sm:text-5xl font-bold text-white', content: 'Compassionate Care & Comprehensive Medical Excellence' },
                { id: generateId('p'), tagName: 'p', name: 'Sub', classes: 'text-slate-400 text-base max-w-xl', content: 'State-of-the-art diagnostic facilities and specialized medical staff dedicated to your health.' },
              ],
            },
            createFooter(),
          ],
        },
      },
    ],
  },

  // 11. TEMPLATE: Real Estate & Property Portal
  {
    id: 'proj-real-estate',
    name: '11. Real Estate & Property Portal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activePageId: 're-home',
    pages: [
      {
        id: 're-home',
        name: 'Portal Home',
        slug: '/',
        title: 'Urban Haven - Luxury Real Estate',
        root: {
          id: generateId('root'),
          tagName: 'div',
          name: 'Page Root',
          classes: 'min-h-screen bg-zinc-900 text-zinc-100 font-sans',
          children: [
            createHeaderNav([
              { label: 'Buy Properties', href: '#buy' },
              { label: 'Rentals', href: '#rent' },
              { label: 'Agents', href: '#agents' },
            ], 'List Property', 'bg-zinc-900/90 border-zinc-800'),
            {
              id: generateId('hero'),
              tagName: 'section',
              name: 'Real Estate Hero',
              classes: 'py-20 px-6 text-center space-y-6 max-w-4xl mx-auto',
              children: [
                { id: generateId('h1'), tagName: 'h1', name: 'Title', classes: 'text-4xl sm:text-6xl font-bold text-white', content: 'Find Your Sanctuary in Premier Metropolitan Locations' },
                { id: generateId('p'), tagName: 'p', name: 'Sub', classes: 'text-zinc-400 text-base', content: 'Curated architectural residences, luxury penthouses, and private estates.' },
              ],
            },
            createFooter('bg-zinc-950 border-zinc-800'),
          ],
        },
      },
    ],
  },

  // 12. TEMPLATE: Financial & SaaS Dashboard
  {
    id: 'proj-fin-dashboard',
    name: '12. Financial & Analytics Dashboard',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activePageId: 'dash-home',
    pages: [
      {
        id: 'dash-home',
        name: 'Dashboard Overview',
        slug: '/dashboard',
        title: 'Vortex Analytics & Financial Control',
        root: {
          id: generateId('root'),
          tagName: 'div',
          name: 'Page Root',
          classes: 'min-h-screen bg-slate-950 text-slate-100 font-sans',
          children: [
            createHeaderNav([
              { label: 'Overview', href: '#overview' },
              { label: 'Revenue', href: '#revenue' },
              { label: 'Transactions', href: '#tx' },
            ], 'User Account', 'bg-slate-900/90 border-slate-800'),
            {
              id: generateId('hero'),
              tagName: 'section',
              name: 'Dashboard Stats',
              classes: 'py-12 px-6 max-w-7xl mx-auto space-y-8',
              children: [
                { id: generateId('h1'), tagName: 'h1', name: 'Title', classes: 'text-2xl font-bold text-white', content: 'Financial Metrics & MRR Telemetry' },
                {
                  id: generateId('div'),
                  tagName: 'div',
                  name: 'Stats Grid',
                  classes: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6',
                  children: [
                    { label: 'Monthly Recurring Revenue', val: '$128,450.00', change: '+14.2%' },
                    { label: 'Active Subscribers', val: '4,890', change: '+8.5%' },
                    { label: 'Avg Revenue Per User', val: '$26.25', change: '+3.1%' },
                    { label: 'Net Churn Rate', val: '0.84%', change: '-0.2%' },
                  ].map((s) => ({
                    id: generateId('stat'),
                    tagName: 'div',
                    name: 'Stat Card',
                    classes: 'p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-2',
                    children: [
                      { id: generateId('p'), tagName: 'p', name: 'Label', classes: 'text-xs text-slate-400 font-medium', content: s.label },
                      { id: generateId('div'), tagName: 'div', name: 'Val', classes: 'text-2xl font-black text-white', content: s.val },
                      { id: generateId('span'), tagName: 'span', name: 'Change', classes: 'text-xs text-emerald-400 font-bold', content: s.change },
                    ],
                  })),
                },
              ],
            },
            createFooter('bg-slate-950 border-slate-800'),
          ],
        },
      },
    ],
  },
];

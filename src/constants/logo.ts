import { ElementNode } from '../types';
import { generateId } from '../utils/domUtils';

/**
 * GLOBAL LOGO CONFIGURATION
 * The actual logo image source (src) is defined ONCE here and reused globally across the entire app,
 * including HeaderBar, Inspector, LeftSidebar, Admin Modal, and all 12 Template Page Layouts.
 */

// 1. SINGLE GLOBAL LOGO IMAGE SOURCE (SVG Data URI)
export const GLOBAL_LOGO_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 54" fill="none">
  <!-- Dotted yellow border frame -->
  <rect x="3" y="3" width="48" height="48" rx="10" fill="#14161C" stroke="#E8A23D" stroke-width="2" stroke-dasharray="4 3"/>
  <!-- Bold Yellow Geometric K -->
  <path d="M16 14V40" stroke="#E8A23D" stroke-width="5.5" stroke-linecap="round"/>
  <path d="M16 27L33 14" stroke="#E8A23D" stroke-width="5.5" stroke-linecap="round"/>
  <path d="M22 23L35 40" stroke="#E8A23D" stroke-width="5.5" stroke-linecap="round"/>
  <!-- Interactive Cursor Arrow -->
  <path d="M33 30L43 42L38 44L33 35L30 38V28L40 33L33 30Z" fill="#E8A23D" stroke="#14161C" stroke-width="1.2"/>
  <!-- Wordmark 'klin' -->
  <text x="62" y="34" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" letter-spacing="-0.5">k</text>
  <text x="76" y="34" fill="#E8A23D" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" letter-spacing="-0.5">l</text>
  <text x="83" y="34" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" letter-spacing="-0.5">in</text>
  <!-- Dot on the i in yellow -->
  <circle cx="91.5" cy="15" r="2.5" fill="#E8A23D" />
  <!-- Subtitle Tagline -->
  <text x="63" y="47" fill="#A0A5B5" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="6.5" letter-spacing="1.8">DRAG. DROP. BUILD.</text>
</svg>
`)}`;

// 2. GLOBAL LOGO METADATA
export const GLOBAL_LOGO_CONFIG = {
  src: GLOBAL_LOGO_SRC,
  alt: 'Klin - Drag. Drop. Build.',
  title: 'Klin Drag & Drop Builder',
  brandName: 'Klin',
  tagline: 'DRAG. DROP. BUILD.',
};

// 3. GLOBAL LOGO ELEMENT FACTORY FOR TEMPLATES & CANVAS NODES
// Returns a structured ElementNode referencing the single GLOBAL_LOGO_SRC
export const createGlobalLogoElement = (
  customName = 'Global Brand Logo',
  heightClass = 'h-8'
): ElementNode => ({
  id: generateId('global-logo-wrapper'),
  tagName: 'div',
  name: customName,
  classes: 'flex items-center gap-2 select-none cursor-pointer group',
  children: [
    {
      id: generateId('global-logo-img'),
      tagName: 'img',
      name: 'Global Logo Image',
      classes: `${heightClass} w-auto object-contain transition-transform group-hover:scale-105`,
      attributes: {
        src: GLOBAL_LOGO_SRC,
        alt: GLOBAL_LOGO_CONFIG.alt,
        title: GLOBAL_LOGO_CONFIG.title,
      },
    },
  ],
});

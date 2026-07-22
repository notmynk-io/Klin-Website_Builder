import { ElementNode } from '../types';
import { generateId } from '../utils/domUtils';

/**
 * GLOBAL LOGO CONFIGURATION
 * The actual logo image source (src) is defined ONCE here and reused globally across the entire app,
 * including HeaderBar, Inspector, LeftSidebar, Admin Modal, and all 12 Template Page Layouts.
 */

// 1. SINGLE GLOBAL LOGO IMAGE SOURCE (SVG Data URI)
export const GLOBAL_LOGO_SRC = "/logo.png";

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

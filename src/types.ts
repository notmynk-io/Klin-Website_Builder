export type ViewportMode = 'desktop' | 'laptop' | 'tablet' | 'mobile';

export type ActiveTab = 'components' | 'tree' | 'pages' | 'templates' | 'ai';

export type InspectorTab = 'style' | 'attributes' | 'content';

export interface StyleProperties {
  // Typography
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';

  // Spacing
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;

  // Background
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  opacity?: string;

  // Layout & Flexbox / Grid
  display?: 'block' | 'flex' | 'grid' | 'inline-block' | 'inline' | 'none';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  flexWrap?: 'nowrap' | 'wrap';
  gridTemplateColumns?: string;

  // Dimensions
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;

  // Borders & Radius
  borderWidth?: string;
  borderStyle?: 'none' | 'solid' | 'dashed' | 'dotted';
  borderColor?: string;
  borderRadius?: string;

  // Effects & Misc
  boxShadow?: string;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  cursor?: string;
  [key: string]: string | undefined;
}

export interface ElementNode {
  id: string;
  tagName: string; // e.g. "div", "h1", "p", "button", "section", "img", "a", "input", "form"
  name: string; // friendly label e.g. "Hero Container", "Primary Button"
  classes: string; // Tailwind / CSS classes string
  style?: StyleProperties;
  attributes?: Record<string, string>; // e.g., src, href, placeholder, target, alt, id, type
  content?: string; // Text content for leaf nodes
  children?: ElementNode[];
  isLocked?: boolean;
  isHidden?: boolean;
}

export interface ComponentDefinition {
  id: string;
  name: string;
  category: 'Layout' | 'Typography' | 'Media & UI' | 'Forms' | 'Prebuilt Sections';
  icon: string; // Lucide icon name
  description: string;
  template: ElementNode;
}

export interface Page {
  id: string;
  name: string; // e.g. "Home", "About Us"
  slug: string; // e.g. "/", "/about"
  title: string; // meta title
  description?: string; // meta description
  root: ElementNode; // Root body container node
}

export interface Project {
  id: string;
  name: string;
  pages: Page[];
  activePageId: string;
  createdAt: string;
  updatedAt: string;
}

export interface HTMLExportOptions {
  includeTailwindCDN: boolean;
  includeGoogleFonts: boolean;
  minify: boolean;
}

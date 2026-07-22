import { ComponentDefinition } from '../types';
import { generateId } from '../utils/domUtils';
import { GLOBAL_LOGO_SRC, GLOBAL_LOGO_CONFIG } from '../constants/logo';

export const COMPONENT_PALETTE: ComponentDefinition[] = [
  // --- LAYOUT ---
  {
    id: 'layout-container',
    name: 'Container',
    category: 'Layout',
    icon: 'Box',
    description: 'Max-width centered block container',
    template: {
      id: '',
      tagName: 'div',
      name: 'Container',
      classes: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
      children: [
        {
          id: '',
          tagName: 'p',
          name: 'Text',
          classes: 'text-slate-500 italic text-center py-4 border-2 border-dashed border-slate-300 rounded-lg',
          content: 'Empty Container - Drop items here',
        },
      ],
    },
  },
  {
    id: 'layout-section',
    name: 'Section',
    category: 'Layout',
    icon: 'Maximize2',
    description: 'Full-width vertical page section with padding',
    template: {
      id: '',
      tagName: 'section',
      name: 'Section',
      classes: 'py-16 px-6 bg-white border-b border-slate-100',
      children: [
        {
          id: '',
          tagName: 'div',
          name: 'Inner Wrapper',
          classes: 'max-w-6xl mx-auto text-center',
          children: [
            {
              id: '',
              tagName: 'h2',
              name: 'Section Title',
              classes: 'text-3xl font-bold text-slate-900 mb-4',
              content: 'Section Heading',
            },
            {
              id: '',
              tagName: 'p',
              name: 'Section Description',
              classes: 'text-lg text-slate-600 max-w-2xl mx-auto',
              content: 'Add your section content or drag components into this wrapper.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'layout-2col',
    name: '2 Columns',
    category: 'Layout',
    icon: 'Columns2',
    description: '50 / 50 responsive two-column grid',
    template: {
      id: '',
      tagName: 'div',
      name: '2 Column Grid',
      classes: 'grid grid-cols-1 md:grid-cols-2 gap-8 my-6',
      children: [
        {
          id: '',
          tagName: 'div',
          name: 'Column 1',
          classes: 'p-6 bg-slate-50 rounded-xl border border-slate-200/80',
          children: [
            {
              id: '',
              tagName: 'h3',
              name: 'Column 1 Title',
              classes: 'text-xl font-semibold text-slate-900 mb-2',
              content: 'Left Column',
            },
            {
              id: '',
              tagName: 'p',
              name: 'Column 1 Body',
              classes: 'text-slate-600 text-sm leading-relaxed',
              content: 'Add content to the left side of this layout.',
            },
          ],
        },
        {
          id: '',
          tagName: 'div',
          name: 'Column 2',
          classes: 'p-6 bg-slate-50 rounded-xl border border-slate-200/80',
          children: [
            {
              id: '',
              tagName: 'h3',
              name: 'Column 2 Title',
              classes: 'text-xl font-semibold text-slate-900 mb-2',
              content: 'Right Column',
            },
            {
              id: '',
              tagName: 'p',
              name: 'Column 2 Body',
              classes: 'text-slate-600 text-sm leading-relaxed',
              content: 'Add content to the right side of this layout.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'layout-3col',
    name: '3 Columns',
    category: 'Layout',
    icon: 'Columns3',
    description: '3-column responsive grid container',
    template: {
      id: '',
      tagName: 'div',
      name: '3 Column Grid',
      classes: 'grid grid-cols-1 md:grid-cols-3 gap-6 my-6',
      children: [1, 2, 3].map((num) => ({
        id: '',
        tagName: 'div',
        name: `Column ${num}`,
        classes: 'p-6 bg-white rounded-xl shadow-sm border border-slate-200/80',
        children: [
          {
            id: '',
            tagName: 'h4',
            name: 'Heading',
            classes: 'text-lg font-bold text-slate-900 mb-2',
            content: `Column ${num}`,
          },
          {
            id: '',
            tagName: 'p',
            name: 'Text',
            classes: 'text-slate-600 text-sm',
            content: 'Flexible column container ready for your content.',
          },
        ],
      })),
    },
  },
  {
    id: 'layout-flex-row',
    name: 'Flex Row',
    category: 'Layout',
    icon: 'LayoutList',
    description: 'Flexbox row with customizable alignment',
    template: {
      id: '',
      tagName: 'div',
      name: 'Flex Row',
      classes: 'flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-100/70 rounded-xl my-4',
      children: [
        {
          id: '',
          tagName: 'span',
          name: 'Flex Item 1',
          classes: 'font-medium text-slate-800',
          content: 'Flex item A',
        },
        {
          id: '',
          tagName: 'span',
          name: 'Flex Item 2',
          classes: 'font-medium text-slate-800',
          content: 'Flex item B',
        },
        {
          id: '',
          tagName: 'button',
          name: 'Flex Action',
          classes: 'px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700',
          content: 'Action Button',
        },
      ],
    },
  },

  // --- TYPOGRAPHY ---
  {
    id: 'type-h1',
    name: 'Heading 1',
    category: 'Typography',
    icon: 'Heading1',
    description: 'Main page display headline',
    template: {
      id: '',
      tagName: 'h1',
      name: 'Headline 1',
      classes: 'text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight my-4',
      content: 'Bold Main Headline',
    },
  },
  {
    id: 'type-h2',
    name: 'Heading 2',
    category: 'Typography',
    icon: 'Heading2',
    description: 'Section headline level 2',
    template: {
      id: '',
      tagName: 'h2',
      name: 'Headline 2',
      classes: 'text-2xl sm:text-3xl font-bold text-slate-900 my-3',
      content: 'Section Subheading',
    },
  },
  {
    id: 'type-paragraph',
    name: 'Paragraph',
    category: 'Typography',
    icon: 'Type',
    description: 'Standard text body block',
    template: {
      id: '',
      tagName: 'p',
      name: 'Paragraph',
      classes: 'text-slate-600 leading-relaxed my-3 text-base',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  },
  {
    id: 'type-badge',
    name: 'Badge / Pill',
    category: 'Typography',
    icon: 'Tag',
    description: 'Inline highlight badge or tag',
    template: {
      id: '',
      tagName: 'span',
      name: 'Badge',
      classes: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 tracking-wide',
      content: 'NEW FEATURE',
    },
  },

  // --- MEDIA & UI ---
  {
    id: 'ui-global-logo',
    name: 'Klin Brand Logo',
    category: 'Media & UI',
    icon: 'Sparkles',
    description: 'Global Klin logo asset linked directly to GLOBAL_LOGO_SRC',
    template: {
      id: '',
      tagName: 'img',
      name: 'Klin Global Brand Logo',
      classes: 'h-10 w-auto object-contain select-none hover:scale-105 transition-transform my-2 cursor-pointer',
      attributes: {
        src: GLOBAL_LOGO_SRC,
        alt: GLOBAL_LOGO_CONFIG.alt,
        title: GLOBAL_LOGO_CONFIG.title,
      },
    },
  },
  {
    id: 'ui-button-primary',
    name: 'Primary Button',
    category: 'Media & UI',
    icon: 'MousePointerClick',
    description: 'High emphasis action button',
    template: {
      id: '',
      tagName: 'button',
      name: 'Primary Button',
      classes: 'px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm transition-all duration-200 cursor-pointer',
      content: 'Get Started Today',
    },
  },
  {
    id: 'ui-image',
    name: 'Image',
    category: 'Media & UI',
    icon: 'Image',
    description: 'Responsive media image element',
    template: {
      id: '',
      tagName: 'img',
      name: 'Image',
      classes: 'w-full h-64 object-cover rounded-2xl shadow-md my-4',
      attributes: {
        src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
        alt: 'Team collaboration in modern workspace',
      },
    },
  },
  {
    id: 'ui-card',
    name: 'Card Container',
    category: 'Media & UI',
    icon: 'Square',
    description: 'Bordered card container with shadow',
    template: {
      id: '',
      tagName: 'div',
      name: 'Card',
      classes: 'p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow my-4',
      children: [
        {
          id: '',
          tagName: 'h3',
          name: 'Card Title',
          classes: 'text-xl font-bold text-slate-900 mb-2',
          content: 'Card Headline',
        },
        {
          id: '',
          tagName: 'p',
          name: 'Card Body',
          classes: 'text-slate-600 text-sm mb-4 leading-relaxed',
          content: 'Card descriptions provide helpful context and details about a product or topic.',
        },
        {
          id: '',
          tagName: 'button',
          name: 'Card Link',
          classes: 'text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer',
          content: 'Learn more →',
        },
      ],
    },
  },

  // --- FORMS ---
  {
    id: 'form-input',
    name: 'Text Input',
    category: 'Forms',
    icon: 'FormInput',
    description: 'Single-line form text input field',
    template: {
      id: '',
      tagName: 'div',
      name: 'Form Group',
      classes: 'space-y-1.5 my-3',
      children: [
        {
          id: '',
          tagName: 'label',
          name: 'Field Label',
          classes: 'block text-sm font-medium text-slate-700',
          content: 'Email Address',
        },
        {
          id: '',
          tagName: 'input',
          name: 'Input Field',
          classes: 'w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 placeholder-slate-400 text-sm outline-none transition',
          attributes: {
            type: 'email',
            placeholder: 'you@example.com',
          },
        },
      ],
    },
  },

  // --- PREBUILT SECTIONS ---
  {
    id: 'section-hero',
    name: 'Hero Section',
    category: 'Prebuilt Sections',
    icon: 'Sparkles',
    description: 'High conversion main landing hero section',
    template: {
      id: '',
      tagName: 'section',
      name: 'Hero Section',
      classes: 'relative py-20 px-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden',
      children: [
        {
          id: '',
          tagName: 'div',
          name: 'Hero Container',
          classes: 'max-w-5xl mx-auto text-center space-y-8',
          children: [
            {
              id: '',
              tagName: 'span',
              name: 'Announcement Pill',
              classes: 'inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 backdrop-blur-sm',
              content: '🚀 Introducing Version 3.0 Web Builder',
            },
            {
              id: '',
              tagName: 'h1',
              name: 'Hero Title',
              classes: 'text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight',
              content: 'Build Visually. Code Fast. Launch Effortlessly.',
            },
            {
              id: '',
              tagName: 'p',
              name: 'Hero Subtitle',
              classes: 'text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed',
              content: 'The drag-and-drop web builder designed for modern creators. Drag components, edit styles visually, and export pristine clean production code.',
            },
            {
              id: '',
              tagName: 'div',
              name: 'CTA Button Group',
              classes: 'flex flex-wrap items-center justify-center gap-4 pt-2',
              children: [
                {
                  id: '',
                  tagName: 'button',
                  name: 'Primary CTA',
                  classes: 'px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5',
                  content: 'Start Building Free',
                },
                {
                  id: '',
                  tagName: 'button',
                  name: 'Secondary CTA',
                  classes: 'px-8 py-4 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold rounded-2xl border border-slate-700/80 transition-all cursor-pointer',
                  content: 'Explore Components',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'section-feature-grid',
    name: 'Feature Grid',
    category: 'Prebuilt Sections',
    icon: 'LayoutGrid',
    description: '3-card feature matrix section',
    template: {
      id: '',
      tagName: 'section',
      name: 'Features Section',
      classes: 'py-20 px-6 bg-slate-50 border-y border-slate-200/60',
      children: [
        {
          id: '',
          tagName: 'div',
          name: 'Features Header',
          classes: 'max-w-3xl mx-auto text-center mb-16 space-y-3',
          children: [
            {
              id: '',
              tagName: 'h2',
              name: 'Title',
              classes: 'text-3xl font-extrabold text-slate-900',
              content: 'Everything you need to launch',
            },
            {
              id: '',
              tagName: 'p',
              name: 'Subtitle',
              classes: 'text-slate-600 text-lg',
              content: 'Engineered with precision for speed, responsiveness, and total creative control.',
            },
          ],
        },
        {
          id: '',
          tagName: 'div',
          name: 'Features Grid',
          classes: 'max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8',
          children: [
            {
              title: 'Visual Drag & Drop',
              desc: 'Move sections, columns, and elements effortlessly with visual snap targets.',
              iconBg: 'bg-indigo-100 text-indigo-600',
            },
            {
              title: 'Full Tailwind Control',
              desc: 'Tweak typography, spacing, flexbox, grid, and borders directly in inspector.',
              iconBg: 'bg-purple-100 text-purple-600',
            },
            {
              title: 'Clean Code Export',
              desc: 'Download single-file production HTML or full JSON project configurations.',
              iconBg: 'bg-emerald-100 text-emerald-600',
            },
          ].map((item) => ({
            id: '',
            tagName: 'div',
            name: 'Feature Card',
            classes: 'p-8 bg-white rounded-2xl shadow-sm border border-slate-200/80 space-y-4 hover:shadow-md transition-shadow',
            children: [
              {
                id: '',
                tagName: 'div',
                name: 'Icon Badge',
                classes: `w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${item.iconBg}`,
                content: '⚡',
              },
              {
                id: '',
                tagName: 'h3',
                name: 'Feature Title',
                classes: 'text-xl font-bold text-slate-900',
                content: item.title,
              },
              {
                id: '',
                tagName: 'p',
                name: 'Feature Desc',
                classes: 'text-slate-600 text-sm leading-relaxed',
                content: item.desc,
              },
            ],
          })),
        },
      ],
    },
  },
  {
    id: 'section-pricing',
    name: 'Pricing Cards',
    category: 'Prebuilt Sections',
    icon: 'CreditCard',
    description: '3-tier subscription pricing table',
    template: {
      id: '',
      tagName: 'section',
      name: 'Pricing Section',
      classes: 'py-20 px-6 bg-white',
      children: [
        {
          id: '',
          tagName: 'div',
          name: 'Pricing Header',
          classes: 'text-center max-w-2xl mx-auto mb-16 space-y-3',
          children: [
            {
              id: '',
              tagName: 'h2',
              name: 'Title',
              classes: 'text-3xl font-bold text-slate-900',
              content: 'Simple, Transparent Pricing',
            },
            {
              id: '',
              tagName: 'p',
              name: 'Subtitle',
              classes: 'text-slate-600',
              content: 'Choose the plan that fits your workflow. Upgrade or downgrade anytime.',
            },
          ],
        },
        {
          id: '',
          tagName: 'div',
          name: 'Pricing Matrix',
          classes: 'max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch',
          children: [
            { name: 'Starter', price: '$0', highlight: false, buttonText: 'Start Free' },
            { name: 'Pro Builder', price: '$29', highlight: true, buttonText: 'Get Pro' },
            { name: 'Enterprise', price: '$99', highlight: false, buttonText: 'Contact Sales' },
          ].map((plan) => ({
            id: '',
            tagName: 'div',
            name: `${plan.name} Plan`,
            classes: `p-8 rounded-2xl flex flex-col justify-between space-y-6 ${
              plan.highlight
                ? 'bg-indigo-900 text-white shadow-xl ring-2 ring-indigo-500 scale-105'
                : 'bg-slate-50 text-slate-900 border border-slate-200'
            }`,
            children: [
              {
                id: '',
                tagName: 'div',
                name: 'Plan Details',
                classes: 'space-y-4',
                children: [
                  {
                    id: '',
                    tagName: 'h3',
                    name: 'Plan Name',
                    classes: `text-xl font-bold ${plan.highlight ? 'text-white' : 'text-slate-900'}`,
                    content: plan.name,
                  },
                  {
                    id: '',
                    tagName: 'div',
                    name: 'Price Tag',
                    classes: 'flex items-baseline gap-1',
                    children: [
                      {
                        id: '',
                        tagName: 'span',
                        name: 'Amount',
                        classes: `text-4xl font-black ${plan.highlight ? 'text-white' : 'text-slate-900'}`,
                        content: plan.price,
                      },
                      {
                        id: '',
                        tagName: 'span',
                        name: 'Period',
                        classes: `text-sm ${plan.highlight ? 'text-indigo-200' : 'text-slate-500'}`,
                        content: '/ month',
                      },
                    ],
                  },
                ],
              },
              {
                id: '',
                tagName: 'button',
                name: 'Action Button',
                classes: `w-full py-3 rounded-xl font-semibold cursor-pointer text-center transition ${
                  plan.highlight
                    ? 'bg-white text-indigo-900 hover:bg-indigo-50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`,
                content: plan.buttonText,
              },
            ],
          })),
        },
      ],
    },
  },
  {
    id: 'section-footer',
    name: 'Footer',
    category: 'Prebuilt Sections',
    icon: 'PanelBottom',
    description: 'Multi-column site footer section',
    template: {
      id: '',
      tagName: 'footer',
      name: 'Site Footer',
      classes: 'bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800',
      children: [
        {
          id: '',
          tagName: 'div',
          name: 'Footer Container',
          classes: 'max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6',
          children: [
            {
              id: '',
              tagName: 'div',
              name: 'Brand Info',
              classes: 'text-center md:text-left space-y-1',
              children: [
                {
                  id: '',
                  tagName: 'span',
                  name: 'Logo Text',
                  classes: 'text-lg font-bold text-white tracking-wide',
                  content: 'Vvveb Builder',
                },
                {
                  id: '',
                  tagName: 'p',
                  name: 'Copyright',
                  classes: 'text-xs text-slate-500',
                  content: '© 2026 Vvveb Visual Page Builder. All rights reserved.',
                },
              ],
            },
            {
              id: '',
              tagName: 'div',
              name: 'Footer Nav',
              classes: 'flex flex-wrap items-center gap-6 text-sm',
              children: [
                { id: '', tagName: 'a', name: 'Link 1', classes: 'hover:text-white transition', content: 'Privacy Policy', attributes: { href: '#' } },
                { id: '', tagName: 'a', name: 'Link 2', classes: 'hover:text-white transition', content: 'Terms of Service', attributes: { href: '#' } },
                { id: '', tagName: 'a', name: 'Link 3', classes: 'hover:text-white transition', content: 'Support', attributes: { href: '#' } },
              ],
            },
          ],
        },
      ],
    },
  },
];

// Helper to prepare template with generated unique IDs
export function instantiateComponent(def: ComponentDefinition) {
  function prepare(node: any): any {
    return {
      ...node,
      id: generateId(node.tagName || 'el'),
      children: node.children ? node.children.map(prepare) : undefined,
    };
  }
  return prepare(def.template);
}

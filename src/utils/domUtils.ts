import { ElementNode, StyleProperties } from '../types';

export function generateId(prefix = 'node'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}-${Date.now().toString(36)}`;
}

export function cloneNode(node: ElementNode): ElementNode {
  return {
    ...node,
    id: generateId(node.tagName),
    attributes: node.attributes ? { ...node.attributes } : {},
    style: node.style ? { ...node.style } : {},
    children: node.children ? node.children.map(cloneNode) : undefined,
  };
}

export function findNodeById(root: ElementNode, id: string): ElementNode | null {
  if (root.id === id) return root;
  if (!root.children) return null;
  for (const child of root.children) {
    const found = findNodeById(child, id);
    if (found) return found;
  }
  return null;
}

export function findParentNode(root: ElementNode, targetId: string): ElementNode | null {
  if (!root.children) return null;
  for (const child of root.children) {
    if (child.id === targetId) return root;
    const foundParent = findParentNode(child, targetId);
    if (foundParent) return foundParent;
  }
  return null;
}

export function getNodeBreadcrumbs(root: ElementNode, targetId: string): ElementNode[] {
  const path: ElementNode[] = [];

  function search(current: ElementNode): boolean {
    path.push(current);
    if (current.id === targetId) return true;
    if (current.children) {
      for (const child of current.children) {
        if (search(child)) return true;
      }
    }
    path.pop();
    return false;
  }

  search(root);
  return path;
}

export function updateNodeInTree(
  root: ElementNode,
  targetId: string,
  updater: (node: ElementNode) => ElementNode
): ElementNode {
  if (root.id === targetId) {
    return updater(root);
  }
  if (!root.children) return root;

  return {
    ...root,
    children: root.children.map((child) => updateNodeInTree(child, targetId, updater)),
  };
}

export function removeNodeFromTree(root: ElementNode, targetId: string): ElementNode {
  if (!root.children) return root;

  return {
    ...root,
    children: root.children
      .filter((child) => child.id !== targetId)
      .map((child) => removeNodeFromTree(child, targetId)),
  };
}

export function insertNodeInTree(
  root: ElementNode,
  targetId: string,
  newNode: ElementNode,
  position: 'inside' | 'before' | 'after' = 'inside'
): ElementNode {
  if (position === 'inside') {
    return updateNodeInTree(root, targetId, (node) => ({
      ...node,
      children: [...(node.children || []), newNode],
    }));
  }

  // Before or after targetId requires finding parent
  const parent = findParentNode(root, targetId);
  if (!parent) {
    // Target is root, append inside
    return {
      ...root,
      children: [...(root.children || []), newNode],
    };
  }

  return updateNodeInTree(root, parent.id, (parentNode) => {
    const children = parentNode.children || [];
    const index = children.findIndex((c) => c.id === targetId);
    if (index === -1) return parentNode;

    const newChildren = [...children];
    const insertIndex = position === 'before' ? index : index + 1;
    newChildren.splice(insertIndex, 0, newNode);

    return {
      ...parentNode,
      children: newChildren,
    };
  });
}

export function moveNodeInTree(
  root: ElementNode,
  sourceId: string,
  targetId: string,
  position: 'before' | 'after' | 'inside'
): ElementNode {
  const nodeToMove = findNodeById(root, sourceId);
  if (!nodeToMove) return root;

  // Don't move if target is inside nodeToMove
  if (isDescendant(nodeToMove, targetId)) return root;

  // First remove source node
  const treeWithoutSource = removeNodeFromTree(root, sourceId);

  // Then insert in new position
  return insertNodeInTree(treeWithoutSource, targetId, nodeToMove, position);
}

export function isDescendant(parent: ElementNode, targetId: string): boolean {
  if (!parent.children) return false;
  for (const child of parent.children) {
    if (child.id === targetId) return true;
    if (isDescendant(child, targetId)) return true;
  }
  return false;
}

// Convert StyleProperties object to inline CSS string or Tailwind class string
export function styleToInlineCss(style?: StyleProperties): string {
  if (!style) return '';
  return Object.entries(style)
    .filter(([_, val]) => val !== undefined && val !== '')
    .map(([key, val]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${kebabKey}: ${val};`;
    })
    .join(' ');
}

// Convert ElementNode tree into HTML string
export function nodeToHtml(node: ElementNode, indentLevel = 0): string {
  if (node.isHidden) return '';

  const indent = '  '.repeat(indentLevel);
  const tag = node.tagName.toLowerCase();

  // Attributes
  const attrList: string[] = [];

  if (node.classes) {
    attrList.push(`class="${node.classes.trim()}"`);
  }

  const inlineStyle = styleToInlineCss(node.style);
  if (inlineStyle) {
    attrList.push(`style="${inlineStyle}"`);
  }

  if (node.attributes) {
    Object.entries(node.attributes).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        attrList.push(`${key}="${value}"`);
      }
    });
  }

  const attrString = attrList.length > 0 ? ` ${attrList.join(' ')}` : '';

  // Void HTML tags
  const voidTags = ['img', 'input', 'hr', 'br', 'meta', 'link'];
  if (voidTags.includes(tag)) {
    return `${indent}<${tag}${attrString} />\n`;
  }

  // Children or Text Content
  if (node.children && node.children.length > 0) {
    const childrenHtml = node.children
      .map((child) => nodeToHtml(child, indentLevel + 1))
      .filter(Boolean)
      .join('');
    return `${indent}<${tag}${attrString}>\n${childrenHtml}${indent}</${tag}>\n`;
  }

  const text = node.content || '';
  return `${indent}<${tag}${attrString}>${text}</${tag}>\n`;
}

// HTML Importer / Parser converting HTML string to ElementNode tree
export function htmlToNodeTree(htmlString: string): ElementNode {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  function convertElement(el: Element): ElementNode {
    const tagName = el.tagName.toLowerCase();
    const classes = el.getAttribute('class') || '';

    // Attributes map
    const attributes: Record<string, string> = {};
    Array.from(el.attributes).forEach((attr) => {
      if (attr.name !== 'class' && attr.name !== 'style') {
        attributes[attr.name] = attr.value;
      }
    });

    // Style map
    const style: StyleProperties = {};
    const inlineStyle = el.getAttribute('style');
    if (inlineStyle) {
      inlineStyle.split(';').forEach((item) => {
        const [k, v] = item.split(':').map((s) => s?.trim());
        if (k && v) {
          const camelKey = k.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
          (style as any)[camelKey] = v;
        }
      });
    }

    const children: ElementNode[] = [];
    let content = '';

    Array.from(el.childNodes).forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        children.push(convertElement(child as Element));
      } else if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent?.trim();
        if (text) {
          content += (content ? ' ' : '') + text;
        }
      }
    });

    return {
      id: generateId(tagName),
      tagName,
      name: `${tagName.toUpperCase()} (${classes.split(' ')[0] || 'Element'})`,
      classes,
      attributes: Object.keys(attributes).length ? attributes : undefined,
      style: Object.keys(style).length ? style : undefined,
      content: children.length === 0 ? content : undefined,
      children: children.length > 0 ? children : undefined,
    };
  }

  const bodyEl = doc.body;
  if (bodyEl.children.length === 1) {
    return convertElement(bodyEl.children[0]);
  }

  // Wrap multi-element HTML in main container
  return {
    id: generateId('container'),
    tagName: 'div',
    name: 'Root Container',
    classes: 'w-full min-h-screen bg-slate-50 text-slate-900',
    children: Array.from(bodyEl.children).map(convertElement),
  };
}

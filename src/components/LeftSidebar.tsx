import React, { useState } from 'react';
import {
  Boxes,
  Layers,
  FileText,
  Sparkles,
  LayoutTemplate,
  ChevronRight,
  ChevronDown,
  Plus,
  Trash2,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Copy,
  Wand2,
  Loader2,
  Box,
  Maximize2,
  Columns2,
  Columns3,
  LayoutList,
  Heading1,
  Heading2,
  Type,
  Tag,
  MousePointerClick,
  Image,
  Square,
  FormInput,
  CreditCard,
  PanelBottom,
  LayoutGrid,
} from 'lucide-react';
import {
  ActiveTab,
  ComponentDefinition,
  ElementNode,
  Page,
} from '../types';
import { COMPONENT_PALETTE, instantiateComponent } from '../data/components';
import { STARTER_PROJECTS } from '../data/templates';

interface LeftSidebarProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  rootNode: ElementNode;
  selectedNodeId: string | null;
  onSelectNode: (id: string | null) => void;
  onAddComponent: (componentNode: ElementNode) => void;
  onUpdateNode: (id: string, updater: (node: ElementNode) => ElementNode) => void;
  onDeleteNode: (id: string) => void;
  onDuplicateNode: (id: string) => void;
  pages: Page[];
  activePageId: string;
  onSelectPage: (id: string) => void;
  onAddPage: () => void;
  onDeletePage: (id: string) => void;
  onLoadTemplate: (page: Page) => void;
}

// Icon map helper for Lucide icons in palette
const ICON_MAP: Record<string, React.ReactNode> = {
  Box: <Box className="w-4 h-4 text-[#E8A23D]" />,
  Maximize2: <Maximize2 className="w-4 h-4 text-[#E8A23D]" />,
  Columns2: <Columns2 className="w-4 h-4 text-[#E8A23D]" />,
  Columns3: <Columns3 className="w-4 h-4 text-[#E8A23D]" />,
  LayoutList: <LayoutList className="w-4 h-4 text-[#E8A23D]" />,
  Heading1: <Heading1 className="w-4 h-4 text-[#4FD1C5]" />,
  Heading2: <Heading2 className="w-4 h-4 text-[#4FD1C5]" />,
  Type: <Type className="w-4 h-4 text-[#4FD1C5]" />,
  Tag: <Tag className="w-4 h-4 text-[#4FD1C5]" />,
  MousePointerClick: <MousePointerClick className="w-4 h-4 text-[#4FD1C5]" />,
  Image: <Image className="w-4 h-4 text-[#4FD1C5]" />,
  Square: <Square className="w-4 h-4 text-[#4FD1C5]" />,
  FormInput: <FormInput className="w-4 h-4 text-[#E8A23D]" />,
  Sparkles: <Sparkles className="w-4 h-4 text-[#E8A23D]" />,
  LayoutGrid: <LayoutGrid className="w-4 h-4 text-[#E8A23D]" />,
  CreditCard: <CreditCard className="w-4 h-4 text-[#E8A23D]" />,
  PanelBottom: <PanelBottom className="w-4 h-4 text-[#E8A23D]" />,
};

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activeTab,
  onChangeTab,
  rootNode,
  selectedNodeId,
  onSelectNode,
  onAddComponent,
  onUpdateNode,
  onDeleteNode,
  onDuplicateNode,
  pages,
  activePageId,
  onSelectPage,
  onAddPage,
  onDeletePage,
  onLoadTemplate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiCategory, setAiCategory] = useState<string>('Hero Section');
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const categories = ['All', 'Layout', 'Typography', 'Media & UI', 'Forms', 'Prebuilt Sections'];

  const filteredComponents = selectedCategory === 'All'
    ? COMPONENT_PALETTE
    : COMPONENT_PALETTE.filter((c) => c.category === selectedCategory);

  // Handle Drag Start from Palette
  const handleDragStart = (e: React.DragEvent, def: ComponentDefinition) => {
    const componentNode = instantiateComponent(def);
    e.dataTransfer.setData('application/json', JSON.stringify(componentNode));
    e.dataTransfer.effectAllowed = 'copy';
  };

  // AI Block Generator Call
  const handleGenerateAiBlock = async () => {
    if (!aiPrompt.trim()) return;
    setIsGeneratingAi(true);
    setAiError(null);

    try {
      const res = await fetch('/api/ai/generate-block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt, category: aiCategory }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate AI block.');
      }

      // Instantiate node with fresh IDs
      const rawBlock = data.block;
      function prepare(n: any): ElementNode {
        return {
          id: `ai-${Math.random().toString(36).substring(2, 8)}`,
          tagName: n.tagName || 'div',
          name: n.name || 'AI Component',
          classes: n.classes || 'p-6 bg-[#14161C] text-[#E7E5E0] rounded-xl',
          attributes: n.attributes || {},
          content: n.content,
          children: n.children ? n.children.map(prepare) : undefined,
        };
      }

      const generatedNode = prepare(rawBlock);
      onAddComponent(generatedNode);
      setAiPrompt('');
    } catch (err: any) {
      setAiError(err.message || 'Error communicating with AI service');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <aside className="w-72 bg-[#1B1E26] border-r border-[#2A2E39] flex flex-col shrink-0 select-none z-20 text-[#E7E5E0] font-sans">
      {/* Top Navigation Tabs */}
      <div className="grid grid-cols-5 border-b border-[#2A2E39] bg-[#14161C]/50 p-1 gap-0.5">
        <button
          onClick={() => onChangeTab('components')}
          className={`flex flex-col items-center py-2 px-1 rounded-md text-[10px] font-medium transition cursor-pointer ${
            activeTab === 'components'
              ? 'bg-[#20232C] text-[#E8A23D] border border-[#2A2E39]'
              : 'text-[#8B8F9B] hover:text-[#E7E5E0]'
          }`}
          title="Components & Blocks"
        >
          <Boxes className="w-4 h-4 mb-0.5" />
          <span>Blocks</span>
        </button>

        <button
          onClick={() => onChangeTab('tree')}
          className={`flex flex-col items-center py-2 px-1 rounded-md text-[10px] font-medium transition cursor-pointer ${
            activeTab === 'tree'
              ? 'bg-[#20232C] text-[#E8A23D] border border-[#2A2E39]'
              : 'text-[#8B8F9B] hover:text-[#E7E5E0]'
          }`}
          title="DOM Tree Layers"
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span>Layers</span>
        </button>

        <button
          onClick={() => onChangeTab('pages')}
          className={`flex flex-col items-center py-2 px-1 rounded-md text-[10px] font-medium transition cursor-pointer ${
            activeTab === 'pages'
              ? 'bg-[#20232C] text-[#E8A23D] border border-[#2A2E39]'
              : 'text-[#8B8F9B] hover:text-[#E7E5E0]'
          }`}
          title="Pages Manager"
        >
          <FileText className="w-4 h-4 mb-0.5" />
          <span>Pages</span>
        </button>

        <button
          onClick={() => onChangeTab('templates')}
          className={`flex flex-col items-center py-2 px-1 rounded-md text-[10px] font-medium transition cursor-pointer ${
            activeTab === 'templates'
              ? 'bg-[#20232C] text-[#E8A23D] border border-[#2A2E39]'
              : 'text-[#8B8F9B] hover:text-[#E7E5E0]'
          }`}
          title="Starter Templates"
        >
          <LayoutTemplate className="w-4 h-4 mb-0.5" />
          <span>Designs</span>
        </button>

        <button
          onClick={() => onChangeTab('ai')}
          className={`flex flex-col items-center py-2 px-1 rounded-md text-[10px] font-medium transition cursor-pointer ${
            activeTab === 'ai'
              ? 'bg-[#20232C] text-[#E8A23D] border border-[#2A2E39]'
              : 'text-[#8B8F9B] hover:text-[#E7E5E0]'
          }`}
          title="AI Block Generator"
        >
          <Sparkles className="w-4 h-4 mb-0.5 text-[#E8A23D]" />
          <span>AI</span>
        </button>
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
        {/* --- TAB 1: COMPONENTS PALETTE --- */}
        {activeTab === 'components' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display font-semibold text-[#8B8F9B] uppercase tracking-wider text-[10.5px]">
                Component Palette
              </span>
              <span className="text-[10px] text-[#5C606C]">Drag or click</span>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1 pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded text-[10.5px] font-medium transition cursor-pointer border ${
                    selectedCategory === cat
                      ? 'bg-[#5A431F] text-[#E8A23D] border-[#E8A23D]/60'
                      : 'bg-[#20232C] text-[#8B8F9B] border-[#2A2E39] hover:text-[#E7E5E0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Component Grid Cards */}
            <div className="grid grid-cols-1 gap-1.5">
              {filteredComponents.map((def) => (
                <div
                  key={def.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, def)}
                  onClick={() => onAddComponent(instantiateComponent(def))}
                  className="p-2 bg-[#20232C] hover:bg-[#2A2E39]/80 border border-[#2A2E39] hover:border-[#E8A23D]/50 rounded-lg flex items-center justify-between transition group cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-[#14161C] rounded-md border border-[#2A2E39] group-hover:scale-105 transition-transform">
                      {ICON_MAP[def.icon] || <Box className="w-4 h-4 text-[#E8A23D]" />}
                    </div>
                    <div>
                      <div className="font-medium text-[#E7E5E0] group-hover:text-white text-[12px]">
                        {def.name}
                      </div>
                      <div className="text-[10px] text-[#8B8F9B] line-clamp-1">
                        {def.description}
                      </div>
                    </div>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-[#5C606C] group-hover:text-[#E8A23D] transition" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 2: DOM LAYERS TREE --- */}
        {activeTab === 'tree' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display font-semibold text-[#8B8F9B] uppercase tracking-wider text-[10.5px]">
                DOM Node Tree
              </span>
              <span className="text-[10px] text-[#5C606C]">Hierarchy</span>
            </div>

            <div className="bg-[#14161C] border border-[#2A2E39] rounded-lg p-1.5 max-h-[500px] overflow-y-auto">
              <TreeNodeItem
                node={rootNode}
                selectedNodeId={selectedNodeId}
                onSelectNode={onSelectNode}
                onUpdateNode={onUpdateNode}
                onDeleteNode={onDeleteNode}
                onDuplicateNode={onDuplicateNode}
                depth={0}
              />
            </div>
          </div>
        )}

        {/* --- TAB 3: PAGES MANAGER --- */}
        {activeTab === 'pages' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display font-semibold text-[#8B8F9B] uppercase tracking-wider text-[10.5px]">
                Site Pages
              </span>
              <button
                onClick={onAddPage}
                className="px-2 py-0.5 bg-[#E8A23D] hover:bg-[#d8932e] text-[#1a1305] rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition"
              >
                <Plus className="w-3 h-3" />
                <span>New Page</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {pages.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectPage(p.id)}
                  className={`p-2.5 rounded-lg border flex items-center justify-between transition cursor-pointer ${
                    activePageId === p.id
                      ? 'bg-[#20232C] border-[#E8A23D] text-[#E8A23D]'
                      : 'bg-[#20232C]/60 border-[#2A2E39] text-[#8B8F9B] hover:text-[#E7E5E0] hover:bg-[#20232C]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-medium text-xs flex items-center gap-1.5">
                      <span>📄</span>
                      <span className="text-[#E7E5E0]">{p.name}</span>
                    </div>
                    <div className="text-[10px] text-[#5C606C] font-mono">
                      /{p.slug}
                    </div>
                  </div>

                  {pages.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePage(p.id);
                      }}
                      className="p-1 hover:bg-[#2A2E39] text-[#5C606C] hover:text-red-400 rounded transition"
                      title="Delete Page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 4: STARTER TEMPLATES --- */}
        {activeTab === 'templates' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display font-semibold text-[#8B8F9B] uppercase tracking-wider text-[10.5px]">
                12 Starter Templates & Pages
              </span>
            </div>

            <div className="space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
              {STARTER_PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3 bg-[#20232C]/80 border border-[#2A2E39] rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-xs text-[#E8A23D]">
                      {proj.name}
                    </span>
                    <span className="text-[10px] text-[#8B8F9B] bg-[#14161C] px-1.5 py-0.5 rounded border border-[#2A2E39]">
                      {proj.pages.length} {proj.pages.length === 1 ? 'Page' : 'Pages'}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {proj.pages.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => onLoadTemplate(p)}
                        className="w-full text-left p-2 bg-[#14161C] hover:bg-[#2A2E39] border border-[#2A2E39] hover:border-[#E8A23D]/50 rounded text-xs flex items-center justify-between transition cursor-pointer group"
                      >
                        <div className="flex items-center gap-1.5 overflow-hidden">
                          <LayoutTemplate className="w-3.5 h-3.5 text-[#5C606C] group-hover:text-[#E8A23D] shrink-0" />
                          <span className="text-[#E7E5E0] font-medium truncate">{p.name}</span>
                        </div>
                        <span className="text-[10px] text-[#E8A23D] font-mono group-hover:underline shrink-0">
                          Load →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 5: AI BLOCK GENERATOR --- */}
        {activeTab === 'ai' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#E8A23D] font-display font-semibold text-[11px] uppercase tracking-wider">
              <Wand2 className="w-3.5 h-3.5 text-[#E8A23D]" />
              <span>AI Block Generator</span>
            </div>

            <p className="text-[10.5px] text-[#8B8F9B] leading-relaxed">
              Describe what web component or layout block you need, and Kiln AI will generate modern Tailwind HTML components.
            </p>

            <div className="space-y-1.5">
              <label className="block text-[10.5px] font-medium text-[#8B8F9B]">
                Category
              </label>
              <select
                value={aiCategory}
                onChange={(e) => setAiCategory(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-[#14161C] border border-[#2A2E39] rounded-md text-xs text-[#E7E5E0] outline-none"
              >
                <option value="Hero Section">Hero Section</option>
                <option value="Feature Matrix">Feature Matrix</option>
                <option value="Pricing Table">Pricing Table</option>
                <option value="Testimonials">Testimonials</option>
                <option value="Contact Form">Contact Form</option>
                <option value="Header Navbar">Header Navbar</option>
                <option value="Call To Action">Call To Action Banner</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10.5px] font-medium text-[#8B8F9B]">
                Prompt Description
              </label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={4}
                placeholder="e.g. Modern dark theme hero section with gradient headline, glowing CTA buttons, and a statistics badge."
                className="w-full px-3 py-2 bg-[#14161C] border border-[#2A2E39] rounded-md text-xs text-[#E7E5E0] placeholder-[#5C606C] outline-none focus:border-[#E8A23D] resize-none"
              />
            </div>

            {aiError && (
              <div className="p-2 bg-red-950/40 border border-red-800/60 rounded-md text-[10.5px] text-red-300">
                {aiError}
              </div>
            )}

            <button
              onClick={handleGenerateAiBlock}
              disabled={isGeneratingAi || !aiPrompt.trim()}
              className="w-full py-2 bg-[#E8A23D] hover:bg-[#d8932e] disabled:bg-[#20232C] disabled:text-[#5C606C] text-[#1a1305] font-semibold text-xs rounded-md flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {isGeneratingAi ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating Block...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate & Insert</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

// --- TREE NODE ITEM COMPONENT ---
interface TreeNodeItemProps {
  node: ElementNode;
  selectedNodeId: string | null;
  onSelectNode: (id: string | null) => void;
  onUpdateNode: (id: string, updater: (node: ElementNode) => ElementNode) => void;
  onDeleteNode: (id: string) => void;
  onDuplicateNode: (id: string) => void;
  depth: number;
}

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
  node,
  selectedNodeId,
  onSelectNode,
  onUpdateNode,
  onDeleteNode,
  onDuplicateNode,
  depth,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const isSelected = selectedNodeId === node.id;
  const hasChildren = node.children && node.children.length > 0;

  const toggleHide = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateNode(node.id, (n) => ({ ...n, isHidden: !n.isHidden }));
  };

  const toggleLock = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateNode(node.id, (n) => ({ ...n, isLocked: !n.isLocked }));
  };

  return (
    <div className="space-y-0.5">
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelectNode(node.id);
        }}
        style={{ paddingLeft: `${depth * 10 + 4}px` }}
        className={`group flex items-center justify-between py-1 px-1.5 rounded text-xs transition cursor-pointer ${
          isSelected
            ? 'bg-[#20232C] text-[#E8A23D] font-medium border border-[#2A2E39]'
            : 'text-[#8B8F9B] hover:bg-[#20232C]/60 hover:text-[#E7E5E0]'
        }`}
      >
        <div className="flex items-center gap-1 min-w-0 truncate">
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="p-0.5 hover:bg-[#2A2E39] rounded text-[#8B8F9B] hover:text-[#E7E5E0]"
            >
              {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
          ) : (
            <span className="w-3" />
          )}

          <span className="text-[10px] font-mono text-[#E8A23D]/80">
            &lt;{node.tagName}&gt;
          </span>
          <span className="truncate text-[11.5px]">{node.name || node.tagName}</span>
        </div>

        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={toggleHide}
            className={`p-0.5 rounded hover:bg-[#2A2E39] ${node.isHidden ? 'text-[#E8A23D] opacity-100' : 'text-[#8B8F9B]'}`}
            title="Toggle Visibility"
          >
            {node.isHidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          </button>

          <button
            onClick={toggleLock}
            className={`p-0.5 rounded hover:bg-[#2A2E39] ${node.isLocked ? 'text-[#E8A23D] opacity-100' : 'text-[#8B8F9B]'}`}
            title="Lock Node"
          >
            {node.isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicateNode(node.id);
            }}
            className="p-0.5 rounded hover:bg-[#2A2E39] text-[#8B8F9B] hover:text-[#E7E5E0]"
            title="Duplicate"
          >
            <Copy className="w-3 h-3" />
          </button>

          {depth > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNode(node.id);
              }}
              className="p-0.5 rounded hover:bg-[#2A2E39] text-[#8B8F9B] hover:text-red-400"
              title="Delete"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="space-y-0.5">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              selectedNodeId={selectedNodeId}
              onSelectNode={onSelectNode}
              onUpdateNode={onUpdateNode}
              onDeleteNode={onDeleteNode}
              onDuplicateNode={onDuplicateNode}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};


import React, { useState, useEffect, useMemo } from 'react';
import {
  ViewportMode,
  ActiveTab,
  ElementNode,
  Project,
  Page,
} from './types';
import { HeaderBar } from './components/HeaderBar';
import { LeftSidebar } from './components/LeftSidebar';
import { Canvas } from './components/Canvas';
import { Inspector } from './components/Inspector';
import { Breadcrumbs } from './components/Breadcrumbs';
import { CodeModal } from './components/CodeModal';
import { AdminModal, DownloadRequest } from './components/AdminModal';
import { STARTER_PROJECTS } from './data/templates';
import { nodeToHtml } from './utils/domUtils';
import {
  findNodeById,
  findParentNode,
  getNodeBreadcrumbs,
  updateNodeInTree,
  removeNodeFromTree,
  insertNodeInTree,
  cloneNode,
  generateId,
  moveNodeInTree,
} from './utils/domUtils';

const STORAGE_KEY = 'vvveb_builder_project_v1';

export default function App() {
  // Load initial project from LocalStorage or Starter Templates
  const [project, setProject] = useState<Project>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load project from LocalStorage', e);
    }
    return STARTER_PROJECTS[0];
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('components');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [zoom, setZoom] = useState<number>(100);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [showGridOverlay, setShowGridOverlay] = useState<boolean>(true);
  const [codeModalOpen, setCodeModalOpen] = useState<boolean>(false);

  // Admin & Approval Queue State
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Logged out by default
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);
  const [downloadApprovalRequired, setDownloadApprovalRequired] = useState<boolean>(true);
  const [allowCodeEditing, setAllowCodeEditing] = useState<boolean>(true);
  const [downloadRequests, setDownloadRequests] = useState<DownloadRequest[]>([
    {
      id: 'req-1',
      pageName: 'Landing Page',
      requestedAt: new Date(Date.now() - 1000 * 60 * 12).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: 'Guest Contributor',
      status: 'pending',
    },
  ]);

  const handleRequestDownloadApproval = (pageName: string) => {
    const newReq: DownloadRequest = {
      id: generateId('req'),
      pageName,
      requestedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: 'External User',
      status: 'pending',
    };
    setDownloadRequests((prev) => [newReq, ...prev]);
  };

  const handleApproveRequest = (id: string) => {
    setDownloadRequests((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const approved = { ...r, status: 'approved' as const };
          // Trigger file download upon approval
          const fullHtml = nodeToHtml(rootNode);
          const blob = new Blob([fullHtml], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${approved.pageName.toLowerCase().replace(/\s+/g, '-')}-approved.html`;
          a.click();
          URL.revokeObjectURL(url);
          return approved;
        }
        return r;
      })
    );
  };

  const handleRejectRequest = (id: string) => {
    setDownloadRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejected' as const } : r))
    );
  };

  const handleClearRequests = () => {
    setDownloadRequests([]);
  };

  const handleDirectExport = () => {
    const fullHtml = nodeToHtml(rootNode);
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activePage.name.toLowerCase().replace(/\s+/g, '-')}-admin.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Active page object & root node
  const activePage = useMemo(() => {
    return (
      project.pages.find((p) => p.id === project.activePageId) || project.pages[0]
    );
  }, [project]);

  const rootNode = activePage.root;

  // History Stack for Undo/Redo
  const [history, setHistory] = useState<ElementNode[]>([rootNode]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Push new root node state into history
  const pushHistory = (newRoot: ElementNode) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newRoot);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleUndo = () => {
    if (!canUndo) return;
    const prevIndex = historyIndex - 1;
    const prevRoot = history[prevIndex];
    setHistoryIndex(prevIndex);
    updateActivePageRoot(prevRoot, false);
  };

  const handleRedo = () => {
    if (!canRedo) return;
    const nextIndex = historyIndex + 1;
    const nextRoot = history[nextIndex];
    setHistoryIndex(nextIndex);
    updateActivePageRoot(nextRoot, false);
  };

  // Helper to update active page root node
  const updateActivePageRoot = (newRoot: ElementNode, recordHistory = true) => {
    setProject((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      pages: prev.pages.map((p) =>
        p.id === prev.activePageId ? { ...p, root: newRoot } : p
      ),
    }));

    if (recordHistory) {
      pushHistory(newRoot);
    }
  };

  // Auto-save project state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
    } catch (e) {
      console.error('Failed to save project state', e);
    }
  }, [project]);

  // Currently selected node reference
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return findNodeById(rootNode, selectedNodeId);
  }, [rootNode, selectedNodeId]);

  // Node Breadcrumbs
  const breadcrumbs = useMemo(() => {
    if (!selectedNodeId) return [];
    return getNodeBreadcrumbs(rootNode, selectedNodeId);
  }, [rootNode, selectedNodeId]);

  // Select node
  const handleSelectNode = (id: string | null, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedNodeId(id);
  };

  // Select Parent Node
  const handleSelectParent = (id: string) => {
    const parent = findParentNode(rootNode, id);
    if (parent) {
      setSelectedNodeId(parent.id);
    }
  };

  // Add component to active node or append to root
  const handleAddComponent = (componentNode: ElementNode) => {
    const targetId = selectedNodeId || rootNode.id;
    const updatedRoot = insertNodeInTree(rootNode, targetId, componentNode, 'inside');
    updateActivePageRoot(updatedRoot);
    setSelectedNodeId(componentNode.id);
  };

  // Drop component on specific node
  const handleDropComponentOnNode = (
    targetNodeId: string,
    componentNode: ElementNode,
    position: 'inside' | 'before' | 'after' = 'inside'
  ) => {
    const updatedRoot = insertNodeInTree(rootNode, targetNodeId, componentNode, position);
    updateActivePageRoot(updatedRoot);
    setSelectedNodeId(componentNode.id);
  };

  // Move node Up or Down
  const handleMoveNode = (id: string, direction: 'up' | 'down') => {
    const parent = findParentNode(rootNode, id);
    if (!parent || !parent.children) return;

    const index = parent.children.findIndex((c) => c.id === id);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= parent.children.length) return;

    const targetSibling = parent.children[targetIndex];
    const position = direction === 'up' ? 'before' : 'after';

    const updatedRoot = moveNodeInTree(rootNode, id, targetSibling.id, position);
    updateActivePageRoot(updatedRoot);
  };

  // Duplicate node
  const handleDuplicateNode = (id: string) => {
    const target = findNodeById(rootNode, id);
    if (!target) return;

    const parent = findParentNode(rootNode, id);
    if (!parent) return;

    const cloned = cloneNode(target);
    const updatedRoot = insertNodeInTree(rootNode, id, cloned, 'after');
    updateActivePageRoot(updatedRoot);
    setSelectedNodeId(cloned.id);
  };

  // Delete node
  const handleDeleteNode = (id: string) => {
    if (id === rootNode.id) return; // Cannot delete root
    const updatedRoot = removeNodeFromTree(rootNode, id);
    updateActivePageRoot(updatedRoot);
    if (selectedNodeId === id) {
      setSelectedNodeId(null);
    }
  };

  // Update node in tree
  const handleUpdateNode = (
    id: string,
    updater: (node: ElementNode) => ElementNode
  ) => {
    const updatedRoot = updateNodeInTree(rootNode, id, updater);
    updateActivePageRoot(updatedRoot);
  };

  // Update content text
  const handleUpdateContent = (id: string, text: string) => {
    handleUpdateNode(id, (node) => ({ ...node, content: text }));
  };

  // Page Management
  const handleAddPage = () => {
    const pageCount = project.pages.length + 1;
    const newPage: Page = {
      id: generateId('page'),
      name: `Page ${pageCount}`,
      slug: `/page-${pageCount}`,
      title: `Page ${pageCount} - Vvveb Builder`,
      root: {
        id: generateId('root'),
        tagName: 'div',
        name: 'Page Canvas Root',
        classes: 'min-h-screen bg-slate-50 text-slate-900 p-8',
        children: [
          {
            id: generateId('h1'),
            tagName: 'h1',
            name: 'Page Title',
            classes: 'text-3xl font-bold text-slate-900 mb-4',
            content: `Welcome to Page ${pageCount}`,
          },
        ],
      },
    };

    setProject((prev) => ({
      ...prev,
      pages: [...prev.pages, newPage],
      activePageId: newPage.id,
    }));
  };

  const handleDeletePage = (pageId: string) => {
    if (project.pages.length <= 1) return;
    setProject((prev) => {
      const filtered = prev.pages.filter((p) => p.id !== pageId);
      return {
        ...prev,
        pages: filtered,
        activePageId: filtered[0].id,
      };
    });
  };

  // Load starter template
  const handleLoadTemplate = (pageTemplate: Page) => {
    const clonedPage: Page = {
      ...pageTemplate,
      id: generateId('page'),
      root: cloneNode(pageTemplate.root),
    };

    setProject((prev) => ({
      ...prev,
      pages: [...prev.pages, clonedPage],
      activePageId: clonedPage.id,
    }));
  };

  // AI Refine text callback
  const handleRefineTextWithAi = async (
    text: string,
    instruction: string
  ): Promise<string> => {
    const res = await fetch('/api/ai/refine-copy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, instruction }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to refine copy');
    }

    return data.text;
  };

  // Reset Canvas
  const handleResetCanvas = () => {
    if (confirm('Are you sure you want to reset the current canvas page?')) {
      const resetRoot: ElementNode = {
        id: generateId('root'),
        tagName: 'div',
        name: 'Page Canvas Root',
        classes: 'min-h-screen bg-white text-slate-900 p-12 text-center',
        children: [
          {
            id: generateId('h1'),
            tagName: 'h1',
            name: 'Heading',
            classes: 'text-4xl font-extrabold text-slate-900 mb-4',
            content: 'Blank Canvas',
          },
          {
            id: generateId('p'),
            tagName: 'p',
            name: 'Subtext',
            classes: 'text-slate-600 max-w-md mx-auto',
            content: 'Drag components from the left sidebar or use AI to generate new blocks.',
          },
        ],
      };
      updateActivePageRoot(resetRoot);
      setSelectedNodeId(null);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#14161C] font-sans antialiased overflow-hidden select-none">
      {/* Top Header Controls Bar */}
      <HeaderBar
        projectName={project.name}
        onUpdateProjectName={(name) => setProject((prev) => ({ ...prev, name }))}
        pages={project.pages}
        activePageId={project.activePageId}
        onSelectPage={(id) =>
          setProject((prev) => ({ ...prev, activePageId: id }))
        }
        onAddPage={handleAddPage}
        viewportMode={viewportMode}
        onChangeViewport={setViewportMode}
        zoom={zoom}
        onChangeZoom={setZoom}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        isPreviewMode={isPreviewMode}
        onTogglePreview={() => setIsPreviewMode(!isPreviewMode)}
        showGridOverlay={showGridOverlay}
        onToggleGridOverlay={() => setShowGridOverlay(!showGridOverlay)}
        onOpenCodeModal={() => setCodeModalOpen(true)}
        onExportHtml={() => setCodeModalOpen(true)}
        onResetCanvas={handleResetCanvas}
        isAdmin={isAdmin}
        pendingRequestsCount={downloadRequests.filter((r) => r.status === 'pending').length}
        onOpenAdminModal={() => setAdminModalOpen(true)}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar: Blocks, Layers, Pages, AI Generator */}
        {!isPreviewMode && (
          <LeftSidebar
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            rootNode={rootNode}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
            onAddComponent={handleAddComponent}
            onUpdateNode={handleUpdateNode}
            onDeleteNode={handleDeleteNode}
            onDuplicateNode={handleDuplicateNode}
            pages={project.pages}
            activePageId={project.activePageId}
            onSelectPage={(id) =>
              setProject((prev) => ({ ...prev, activePageId: id }))
            }
            onAddPage={handleAddPage}
            onDeletePage={handleDeletePage}
            onLoadTemplate={handleLoadTemplate}
          />
        )}

        {/* Middle Canvas Canvas Frame */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <Canvas
            rootNode={rootNode}
            selectedNodeId={selectedNodeId}
            onSelectNode={handleSelectNode}
            onSelectParent={handleSelectParent}
            onMoveNode={handleMoveNode}
            onDuplicateNode={handleDuplicateNode}
            onDeleteNode={handleDeleteNode}
            onUpdateContent={handleUpdateContent}
            onDropComponentOnNode={handleDropComponentOnNode}
            viewportMode={viewportMode}
            zoom={zoom}
            showGridOverlay={showGridOverlay}
            isPreviewMode={isPreviewMode}
          />

          {/* Bottom Breadcrumbs Bar */}
          {!isPreviewMode && (
            <Breadcrumbs
              breadcrumbs={breadcrumbs}
              selectedNodeId={selectedNodeId}
              onSelectNode={setSelectedNodeId}
            />
          )}
        </div>

        {/* Right Inspector: Style, Attributes, AI Copy Refiner */}
        {!isPreviewMode && (
          <Inspector
            selectedNode={selectedNode}
            onUpdateNode={handleUpdateNode}
            onRefineTextWithAi={handleRefineTextWithAi}
          />
        )}
      </div>

      {/* Live Code Modal */}
      <CodeModal
        isOpen={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
        rootNode={rootNode}
        onImportHtmlTree={(newRoot) => updateActivePageRoot(newRoot)}
        pageName={activePage.name}
        isAdmin={isAdmin}
        downloadApprovalRequired={downloadApprovalRequired}
        allowCodeEditing={allowCodeEditing}
        onRequestDownloadApproval={handleRequestDownloadApproval}
      />

      {/* Admin Control Center Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        isAdmin={isAdmin}
        onToggleAdmin={setIsAdmin}
        downloadApprovalRequired={downloadApprovalRequired}
        onToggleDownloadApproval={setDownloadApprovalRequired}
        allowCodeEditing={allowCodeEditing}
        onToggleAllowCodeEditing={setAllowCodeEditing}
        downloadRequests={downloadRequests}
        onApproveRequest={handleApproveRequest}
        onRejectRequest={handleRejectRequest}
        onClearRequests={handleClearRequests}
        onDirectExport={handleDirectExport}
      />
    </div>
  );
}

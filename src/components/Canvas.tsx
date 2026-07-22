import React from 'react';
import { ViewportMode, ElementNode } from '../types';
import { CanvasNode } from './CanvasNode';

interface CanvasProps {
  rootNode: ElementNode;
  selectedNodeId: string | null;
  onSelectNode: (id: string | null, e?: React.MouseEvent) => void;
  onSelectParent: (id: string) => void;
  onMoveNode: (id: string, direction: 'up' | 'down') => void;
  onDuplicateNode: (id: string) => void;
  onDeleteNode: (id: string) => void;
  onUpdateContent: (id: string, text: string) => void;
  onDropComponentOnNode: (
    targetNodeId: string,
    componentNode: ElementNode,
    position: 'inside' | 'before' | 'after'
  ) => void;
  viewportMode: ViewportMode;
  zoom: number;
  showGridOverlay: boolean;
  isPreviewMode: boolean;
}

export const Canvas: React.FC<CanvasProps> = ({
  rootNode,
  selectedNodeId,
  onSelectNode,
  onSelectParent,
  onMoveNode,
  onDuplicateNode,
  onDeleteNode,
  onUpdateContent,
  onDropComponentOnNode,
  viewportMode,
  zoom,
  showGridOverlay,
  isPreviewMode,
}) => {
  // Map viewport mode to pixel container widths
  const viewportWidths: Record<ViewportMode, string> = {
    desktop: 'w-full max-w-full',
    laptop: 'w-[1024px]',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
  };

  const viewportLabels: Record<ViewportMode, string> = {
    desktop: 'Desktop (100% Full Width)',
    laptop: 'Laptop Viewport (1024 px)',
    tablet: 'Tablet Viewport (768 px)',
    mobile: 'Mobile Viewport (375 px)',
  };

  const scaleFactor = zoom / 100;

  return (
    <main
      className="flex-1 canvas-dot-grid overflow-auto p-6 flex flex-col items-center justify-start select-none relative font-sans"
      onClick={() => !isPreviewMode && onSelectNode(null)}
    >
      {/* Top Frame Label Badge */}
      {!isPreviewMode && (
        <div className="mb-3 px-3 py-1 bg-[#1B1E26] border border-[#2A2E39] rounded-full text-[11px] font-medium text-[#8B8F9B] flex items-center gap-2.5 shadow-md z-10">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8A23D]" />
            <span className="text-[#E7E5E0]">{viewportLabels[viewportMode]}</span>
          </span>
          <span className="text-[#5C606C]">|</span>
          <span className="text-[#4FD1C5] font-mono">{zoom}% Scale</span>
        </div>
      )}

      {/* Frame Container */}
      <div
        style={{
          transform: `scale(${scaleFactor})`,
          transformOrigin: 'top center',
          transition: 'width 0.3s ease-in-out, transform 0.2s ease',
        }}
        className={`bg-white text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden min-h-[850px] border border-[#2A2E39] transition-all ${viewportWidths[viewportMode]}`}
      >
        <CanvasNode
          node={rootNode}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          onSelectParent={onSelectParent}
          onMoveNode={onMoveNode}
          onDuplicateNode={onDuplicateNode}
          onDeleteNode={onDeleteNode}
          onUpdateContent={onUpdateContent}
          onDropComponentOnNode={onDropComponentOnNode}
          showGridOverlay={showGridOverlay}
          isPreviewMode={isPreviewMode}
        />
      </div>
    </main>
  );
};

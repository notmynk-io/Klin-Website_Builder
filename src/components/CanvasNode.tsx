import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronUp,
  ChevronDown,
  Copy,
  Trash2,
  CornerLeftUp,
  Plus,
  GripVertical,
} from 'lucide-react';
import { ElementNode } from '../types';
import { styleToInlineCss } from '../utils/domUtils';

interface CanvasNodeProps {
  node: ElementNode;
  selectedNodeId: string | null;
  onSelectNode: (id: string | null, e?: React.MouseEvent) => void;
  onSelectParent: (id: string) => void;
  onMoveNode: (id: string, direction: 'up' | 'down') => void;
  onDuplicateNode: (id: string) => void;
  onDeleteNode: (id: string) => void;
  onUpdateContent: (id: string, text: string) => void;
  onDropComponentOnNode: (targetNodeId: string, componentNode: ElementNode, position: 'inside' | 'before' | 'after') => void;
  showGridOverlay: boolean;
  isPreviewMode: boolean;
}

export const CanvasNode: React.FC<CanvasNodeProps> = ({
  node,
  selectedNodeId,
  onSelectNode,
  onSelectParent,
  onMoveNode,
  onDuplicateNode,
  onDeleteNode,
  onUpdateContent,
  onDropComponentOnNode,
  showGridOverlay,
  isPreviewMode,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isEditingText, setIsEditingText] = useState<boolean>(false);
  const contentRef = useRef<HTMLElement>(null);

  const isSelected = selectedNodeId === node.id;
  const isHidden = node.isHidden;

  if (isHidden && isPreviewMode) return null;

  // Handle Drag & Drop onto canvas node
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    try {
      const rawJson = e.dataTransfer.getData('application/json');
      if (rawJson) {
        const droppedNode: ElementNode = JSON.parse(rawJson);
        onDropComponentOnNode(node.id, droppedNode, 'inside');
      }
    } catch (err) {
      console.error('Failed to parse dropped component', err);
    }
  };

  const Tag = (node.tagName || 'div') as any;

  // Attributes
  const attributes: Record<string, any> = { ...node.attributes };

  // Inline CSS
  const inlineStyleString = styleToInlineCss(node.style);

  // Outline / Border styling for editor state
  let editorOutlineClasses = '';
  if (!isPreviewMode) {
    if (isSelected) {
      editorOutlineClasses = 'ring-2 ring-[#E8A23D] ring-offset-1 relative z-10';
    } else if (isDragOver) {
      editorOutlineClasses = 'ring-2 ring-[#4FD1C5] ring-dashed bg-[#4FD1C5]/10 z-20';
    } else if (isHovered) {
      editorOutlineClasses = 'outline-1 outline-dashed outline-[#E8A23D]/80';
    } else if (showGridOverlay) {
      editorOutlineClasses = 'outline-1 outline-dotted outline-slate-300/50';
    }
  }

  const combinedClasses = `${node.classes || ''} ${editorOutlineClasses}`.trim();

  // Click handler
  const handleClick = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    onSelectNode(node.id, e);
  };

  // Double Click handler for inline text editing
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    if (!node.children || node.children.length === 0) {
      setIsEditingText(true);
    }
  };

  const handleBlurText = () => {
    setIsEditingText(false);
    if (contentRef.current) {
      onUpdateContent(node.id, contentRef.current.innerText || '');
    }
  };

  // Void elements (img, input, hr, etc.)
  const isVoidElement = ['img', 'input', 'hr', 'br'].includes(node.tagName.toLowerCase());

  return (
    <div className="relative inline-block w-full font-sans">
      {/* Floating Control Toolbar for Active Node */}
      {isSelected && !isPreviewMode && (
        <div
          className="absolute -top-7 left-0 z-50 flex items-center bg-[#E8A23D] text-[#1a1305] rounded-t-md px-2 py-0.5 text-[10.5px] font-semibold gap-1.5 shadow-md select-none pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="font-mono text-[#4a320c]">
            &lt;{node.tagName}&gt; {node.name || ''}
          </span>

          <div className="flex items-center gap-0.5 pl-1.5 border-l border-[#c9791f]">
            <button
              onClick={() => onSelectParent(node.id)}
              className="p-0.5 hover:bg-[#d8932e] rounded transition"
              title="Select Parent Container"
            >
              <CornerLeftUp className="w-3 h-3" />
            </button>

            <button
              onClick={() => onMoveNode(node.id, 'up')}
              className="p-0.5 hover:bg-[#d8932e] rounded transition"
              title="Move Node Up"
            >
              <ChevronUp className="w-3 h-3" />
            </button>

            <button
              onClick={() => onMoveNode(node.id, 'down')}
              className="p-0.5 hover:bg-[#d8932e] rounded transition"
              title="Move Node Down"
            >
              <ChevronDown className="w-3 h-3" />
            </button>

            <button
              onClick={() => onDuplicateNode(node.id)}
              className="p-0.5 hover:bg-[#d8932e] rounded transition"
              title="Duplicate Element"
            >
              <Copy className="w-3 h-3" />
            </button>

            <button
              onClick={() => onDeleteNode(node.id)}
              className="p-0.5 hover:bg-red-700 hover:text-white rounded transition text-[#611212]"
              title="Delete Element"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Actual Element Node Render */}
      {isVoidElement ? (
        <Tag
          className={combinedClasses}
          style={node.style as React.CSSProperties}
          onClick={handleClick}
          onMouseEnter={() => !isPreviewMode && setIsHovered(true)}
          onMouseLeave={() => !isPreviewMode && setIsHovered(false)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          {...attributes}
        />
      ) : (
        <Tag
          ref={contentRef as any}
          className={combinedClasses}
          style={node.style as React.CSSProperties}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onMouseEnter={() => !isPreviewMode && setIsHovered(true)}
          onMouseLeave={() => !isPreviewMode && setIsHovered(false)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          contentEditable={isEditingText}
          suppressContentEditableWarning={true}
          onBlur={handleBlurText}
          {...attributes}
        >
          {/* Children or Text Content */}
          {node.children && node.children.length > 0 ? (
            node.children.map((childNode) => (
              <CanvasNode
                key={childNode.id}
                node={childNode}
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
            ))
          ) : (
            node.content || (
              !isPreviewMode && (
                <span className="text-slate-400 italic text-xs border border-dashed border-slate-300 p-1 rounded">
                  Empty {node.tagName}
                </span>
              )
            )
          )}
        </Tag>
      )}
    </div>
  );
};

import React from 'react';
import { ChevronRight, Layers } from 'lucide-react';
import { ElementNode } from '../types';

interface BreadcrumbsProps {
  breadcrumbs: ElementNode[];
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadcrumbs,
  selectedNodeId,
  onSelectNode,
}) => {
  return (
    <div className="h-7 bg-[#1B1E26] border-t border-[#2A2E39] flex items-center justify-between px-4 text-xs select-none z-30 shrink-0 text-[#8B8F9B] font-sans">
      <div className="flex items-center gap-1 overflow-x-auto">
        <Layers className="w-3.5 h-3.5 text-[#5C606C] mr-1" />

        {breadcrumbs && breadcrumbs.length > 0 ? (
          breadcrumbs.map((node, index) => {
            const isSelected = selectedNodeId === node.id;

            return (
              <React.Fragment key={node.id}>
                {index > 0 && <ChevronRight className="w-3 h-3 text-[#5C606C] shrink-0" />}

                <button
                  onClick={() => onSelectNode(node.id)}
                  className={`px-1.5 py-0.5 rounded transition cursor-pointer font-mono text-[10.5px] shrink-0 ${
                    isSelected
                      ? 'bg-[#E8A23D] text-[#1a1305] font-semibold'
                      : 'hover:bg-[#20232C] text-[#8B8F9B] hover:text-[#E7E5E0]'
                  }`}
                >
                  &lt;{node.tagName}&gt; {node.name || ''}
                </button>
              </React.Fragment>
            );
          })
        ) : (
          <span className="text-[10.5px] text-[#5C606C] font-mono">&lt;body&gt; Canvas Root</span>
        )}
      </div>

      <div className="text-[10.5px] text-[#8B8F9B] font-medium shrink-0 pl-4 tracking-wide">
        Mayank Kumar Gupta © 2026 All Rights Reserved
      </div>
    </div>
  );
};

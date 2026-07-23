import React from 'react';
import {
  Undo2,
  Redo2,
  Eye,
  EyeOff,
  Code2,
  Download,
  Grid,
  Plus,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { ViewportMode, Page } from '../types';
import { GLOBAL_LOGO_SRC, GLOBAL_LOGO_CONFIG } from '../constants/logo';

interface HeaderBarProps {
  projectName: string;
  onUpdateProjectName: (name: string) => void;
  pages: Page[];
  activePageId: string;
  onSelectPage: (id: string) => void;
  onAddPage: () => void;
  viewportMode: ViewportMode;
  onChangeViewport: (mode: ViewportMode) => void;
  zoom: number;
  onChangeZoom: (zoom: number) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  isPreviewMode: boolean;
  onTogglePreview: () => void;
  showGridOverlay: boolean;
  onToggleGridOverlay: () => void;
  onOpenCodeModal: () => void;
  onExportHtml: () => void;
  onResetCanvas: () => void;
  isAdmin: boolean;
  pendingRequestsCount: number;
  onOpenAdminModal: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  projectName,
  onUpdateProjectName,
  pages,
  activePageId,
  onSelectPage,
  onAddPage,
  viewportMode,
  onChangeViewport,
  zoom,
  onChangeZoom,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  isPreviewMode,
  onTogglePreview,
  showGridOverlay,
  onToggleGridOverlay,
  onOpenCodeModal,
  onExportHtml,
  onResetCanvas,
  isAdmin,
  pendingRequestsCount,
  onOpenAdminModal,
}) => {
  const activePage = pages.find((p) => p.id === activePageId) || pages[0];

  return (
    <header className="h-[52px] bg-[#1B1E26] border-b border-[#2A2E39] flex items-center px-4 gap-5 text-[#E7E5E0] select-none z-30 shrink-0 font-sans">
      {/* Brand Logo & Breadcrumbs */}
      <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 shrink-0 min-w-fit">
        <img
          src={GLOBAL_LOGO_SRC}
          alt={GLOBAL_LOGO_CONFIG.alt}
          title={GLOBAL_LOGO_CONFIG.title}
          className="h-11 w-11 object-contain flex-shrink-0"
        />
      </div>

        {/* Breadcrumb / Project & Page switch */}
        <div className="flex items-center gap-1.5 text-[12.5px] text-[#8B8F9B]">
          <input
            type="text"
            value={projectName}
            onChange={(e) => onUpdateProjectName(e.target.value)}
            className="bg-transparent hover:bg-[#20232C] focus:bg-[#20232C] px-1.5 py-0.5 rounded text-[#8B8F9B] focus:text-[#E7E5E0] outline-none font-medium text-[12.5px] transition border border-transparent focus:border-[#2A2E39] max-w-[100px] truncate"
            title="Click to rename project"
          />
          <span className="text-[#5C606C]">/</span>
          
          <div className="flex items-center gap-1">
            <select
              value={activePageId}
              onChange={(e) => onSelectPage(e.target.value)}
              className="bg-transparent text-[#E7E5E0] font-medium outline-none cursor-pointer text-[12.5px]"
            >
              {pages.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#1B1E26] text-[#E7E5E0]">
                  {p.name}
                </option>
              ))}
            </select>
            <button
              onClick={onAddPage}
              className="p-1 hover:bg-[#20232C] text-[#8B8F9B] hover:text-[#E7E5E0] rounded transition cursor-pointer"
              title="Add New Page"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1" />

      {/* Undo / Redo Group */}
      <div className="flex items-center gap-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`w-[30px] h-[30px] rounded-md flex items-center justify-center transition border border-transparent ${
            canUndo
              ? 'text-[#8B8F9B] hover:bg-[#20232C] hover:text-[#E7E5E0] cursor-pointer'
              : 'text-[#5C606C] cursor-not-allowed'
          }`}
          title="Undo"
        >
          <Undo2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`w-[30px] h-[30px] rounded-md flex items-center justify-center transition border border-transparent ${
            canRedo
              ? 'text-[#8B8F9B] hover:bg-[#20232C] hover:text-[#E7E5E0] cursor-pointer'
              : 'text-[#5C606C] cursor-not-allowed'
          }`}
          title="Redo"
        >
          <Redo2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Device Viewport Toggle */}
      <div className="flex bg-[#20232C] border border-[#2A2E39] rounded-[7px] p-[2px] gap-[2px]">
        <button
          onClick={() => onChangeViewport('desktop')}
          className={`w-7 h-6 rounded-[5px] flex items-center justify-center text-xs transition cursor-pointer ${
            viewportMode === 'desktop' ? 'bg-[#14161C] text-[#E8A23D]' : 'text-[#8B8F9B] hover:text-[#E7E5E0]'
          }`}
          title="Desktop View (100% full)"
        >
          ▭
        </button>
        <button
          onClick={() => onChangeViewport('tablet')}
          className={`w-7 h-6 rounded-[5px] flex items-center justify-center text-xs transition cursor-pointer ${
            viewportMode === 'tablet' ? 'bg-[#14161C] text-[#E8A23D]' : 'text-[#8B8F9B] hover:text-[#E7E5E0]'
          }`}
          title="Tablet View (768px)"
        >
          ▯
        </button>
        <button
          onClick={() => onChangeViewport('mobile')}
          className={`w-7 h-6 rounded-[5px] flex items-center justify-center text-xs transition cursor-pointer ${
            viewportMode === 'mobile' ? 'bg-[#14161C] text-[#E8A23D]' : 'text-[#8B8F9B] hover:text-[#E7E5E0]'
          }`}
          title="Mobile View (375px)"
        >
          ▮
        </button>
      </div>

    {/* Kiln Dial Zoom Control */}
    <div>
      <button
        onClick={() => {
          const zooms = [50, 75, 86, 100, 125];
          const currIdx = zooms.indexOf(zoom);
          const nextZoom = zooms[(currIdx + 1) % zooms.length];
          onChangeZoom(nextZoom);
        }}
        title="Click to cycle Zoom"
        className="flex items-center gap-2 shrink-0 min-w-fit cursor-pointer"
      >
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center relative shadow-inner"
          style={{
            background: `conic-gradient(#E8A23D 0deg ${Math.round((zoom / 100) * 250)}deg, #2A2E39 ${Math.round((zoom / 100) * 250)}deg 360deg)`,
          }}
        >
      <div className="w-[16px] h-[16px] rounded-full bg-[#20232C]" />
      </div>

          <span className="text-[11.5px] text-[#8B8F9B] font-mono">
            {zoom}%
          </span>
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenAdminModal}
          className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs font-semibold font-display border transition cursor-pointer relative ${
            isAdmin
              ? 'bg-[#5A431F] text-[#E8A23D] border-[#E8A23D]/50 hover:bg-[#E8A23D]/30'
              : 'bg-[#20232C] text-[#8B8F9B] border-[#2A2E39] hover:text-[#E7E5E0]'
          }`}
          title="Admin Control Panel & Download Approvals"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin</span>
          {pendingRequestsCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9.5px] font-bold flex items-center justify-center animate-pulse">
              {pendingRequestsCount}
            </span>
          )}
        </button>

        <button
          onClick={onToggleGridOverlay}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition border ${
            showGridOverlay
              ? 'bg-[#20232C] border-[#E8A23D]/50 text-[#E8A23D]'
              : 'border-transparent text-[#8B8F9B] hover:bg-[#20232C] hover:text-[#E7E5E0]'
          }`}
          title="Toggle Grid Outlines"
        >
          <Grid className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onOpenCodeModal}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8B8F9B] hover:text-[#E7E5E0] hover:bg-[#20232C] transition cursor-pointer"
          title="HTML Source & Code"
        >
          <Code2 className="w-4 h-4 text-[#4FD1C5]" />
        </button>

        <button
          onClick={onTogglePreview}
          className={`font-display text-[12.5px] font-semibold px-3.5 py-1.5 rounded-md border border-[#2A2E39] bg-[#20232C] text-[#E7E5E0] hover:bg-[#2A2E39] transition cursor-pointer flex items-center gap-1.5 ${
            isPreviewMode ? 'border-[#E8A23D] text-[#E8A23D]' : ''
          }`}
        >
          {isPreviewMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{isPreviewMode ? 'Edit' : 'Preview'}</span>
        </button>

        <button
          onClick={onExportHtml}
          className="font-display text-[12.5px] font-semibold px-3.5 py-1.5 rounded-md border border-[#E8A23D] bg-[#E8A23D] text-[#1a1305] hover:bg-[#d8932e] transition cursor-pointer flex items-center gap-1.5 shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Publish</span>
        </button>

        <button
          onClick={onResetCanvas}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5C606C] hover:text-red-400 hover:bg-[#20232C] transition"
          title="Reset Canvas"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};


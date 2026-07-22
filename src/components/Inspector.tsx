import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Link2,
  Type,
  Sparkles,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Maximize,
  Palette,
  Box,
  Layers,
  Wand2,
  Loader2,
  Plus,
  X,
  Tag,
} from 'lucide-react';
import { InspectorTab, ElementNode, StyleProperties } from '../types';

interface InspectorProps {
  selectedNode: ElementNode | null;
  onUpdateNode: (id: string, updater: (node: ElementNode) => ElementNode) => void;
  onRefineTextWithAi: (text: string, instruction: string) => Promise<string>;
}

export const Inspector: React.FC<InspectorProps> = ({
  selectedNode,
  onUpdateNode,
  onRefineTextWithAi,
}) => {
  const [activeTab, setActiveTab] = useState<InspectorTab>('style');
  const [newClassInput, setNewClassInput] = useState<string>('');
  const [aiInstruction, setAiInstruction] = useState<string>('Make catchy and professional');
  const [isRefineLoading, setIsRefineLoading] = useState<boolean>(false);

  if (!selectedNode) {
    return (
      <aside className="w-80 bg-[#1B1E26] border-l border-[#2A2E39] flex flex-col items-center justify-center p-6 text-center select-none z-20 text-[#8B8F9B] font-sans">
        <SlidersHorizontal className="w-7 h-7 mb-3 text-[#5C606C]" />
        <span className="font-display font-medium text-xs text-[#E7E5E0]">No Element Selected</span>
        <p className="text-[11px] text-[#8B8F9B] mt-1 max-w-[200px] leading-relaxed">
          Click any component on the canvas to inspect and edit style properties.
        </p>
      </aside>
    );
  }

  const style = selectedNode.style || {};
  const attributes = selectedNode.attributes || {};

  // Update style helper
  const handleStyleChange = (key: keyof StyleProperties, value: string) => {
    onUpdateNode(selectedNode.id, (node) => ({
      ...node,
      style: {
        ...(node.style || {}),
        [key]: value,
      },
    }));
  };

  // Update attribute helper
  const handleAttributeChange = (key: string, value: string) => {
    onUpdateNode(selectedNode.id, (node) => ({
      ...node,
      attributes: {
        ...(node.attributes || {}),
        [key]: value,
      },
    }));
  };

  // Add custom class tag
  const handleAddClass = () => {
    if (!newClassInput.trim()) return;
    const existingClasses = (selectedNode.classes || '').split(' ').filter(Boolean);
    if (!existingClasses.includes(newClassInput.trim())) {
      const updatedClasses = [...existingClasses, newClassInput.trim()].join(' ');
      onUpdateNode(selectedNode.id, (node) => ({ ...node, classes: updatedClasses }));
    }
    setNewClassInput('');
  };

  // Remove class tag
  const handleRemoveClass = (clsToRemove: string) => {
    const updatedClasses = (selectedNode.classes || '')
      .split(' ')
      .filter((c) => c !== clsToRemove)
      .join(' ');
    onUpdateNode(selectedNode.id, (node) => ({ ...node, classes: updatedClasses }));
  };

  // Call AI Refine text
  const handleRefineCopy = async (presetInstruction?: string) => {
    const textToRefine = selectedNode.content || selectedNode.name;
    if (!textToRefine) return;

    setIsRefineLoading(true);
    try {
      const instruction = presetInstruction || aiInstruction;
      const refinedText = await onRefineTextWithAi(textToRefine, instruction);
      onUpdateNode(selectedNode.id, (node) => ({ ...node, content: refinedText }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefineLoading(false);
    }
  };

  return (
    <aside className="w-80 bg-[#1B1E26] border-l border-[#2A2E39] flex flex-col shrink-0 select-none z-20 text-[#E7E5E0] font-sans">
      {/* Top Header & Node Info */}
      <div className="p-3 border-b border-[#2A2E39] bg-[#14161C]/50 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2 py-0.5 bg-[#5A431F] text-[#E8A23D] border border-[#E8A23D]/50 rounded text-[10.5px] font-mono uppercase font-semibold">
              {selectedNode.tagName}
            </span>
            <input
              type="text"
              value={selectedNode.name}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, (n) => ({ ...n, name: e.target.value }))
              }
              className="bg-transparent hover:bg-[#20232C] focus:bg-[#20232C] px-1.5 py-0.5 rounded text-xs font-semibold text-[#E7E5E0] outline-none border border-transparent focus:border-[#2A2E39] truncate"
            />
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-around bg-[#20232C] p-0.5 rounded-md border border-[#2A2E39] text-xs font-medium">
          <button
            onClick={() => setActiveTab('style')}
            className={`py-1 px-3 rounded transition cursor-pointer text-[11.5px] ${
              activeTab === 'style' ? 'bg-[#E8A23D] text-[#1a1305] font-semibold' : 'text-[#8B8F9B] hover:text-[#E7E5E0]'
            }`}
          >
            Style
          </button>
          <button
            onClick={() => setActiveTab('attributes')}
            className={`py-1 px-3 rounded transition cursor-pointer text-[11.5px] ${
              activeTab === 'attributes' ? 'bg-[#E8A23D] text-[#1a1305] font-semibold' : 'text-[#8B8F9B] hover:text-[#E7E5E0]'
            }`}
          >
            Attributes
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`py-1 px-3 rounded transition cursor-pointer text-[11.5px] ${
              activeTab === 'content' ? 'bg-[#E8A23D] text-[#1a1305] font-semibold' : 'text-[#8B8F9B] hover:text-[#E7E5E0]'
            }`}
          >
            Content & AI
          </button>
        </div>
      </div>

      {/* Main Inspector Scroll Panel */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
        {/* --- STYLE TAB --- */}
        {activeTab === 'style' && (
          <div className="space-y-4">
            {/* Class Manager */}
            <div className="space-y-2">
              <span className="font-display font-semibold text-[#8B8F9B] uppercase tracking-wider text-[10.5px] flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#E8A23D]" />
                <span>Tailwind CSS Classes</span>
              </span>

              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={newClassInput}
                  onChange={(e) => setNewClassInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddClass()}
                  placeholder="e.g. bg-[#14161C] rounded-xl"
                  className="flex-1 px-2.5 py-1.5 bg-[#14161C] border border-[#2A2E39] rounded-md text-[#E7E5E0] outline-none focus:border-[#E8A23D]"
                />
                <button
                  onClick={handleAddClass}
                  className="p-1.5 bg-[#E8A23D] hover:bg-[#d8932e] text-[#1a1305] rounded-md transition cursor-pointer font-bold"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Class Chips */}
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pt-1">
                {(selectedNode.classes || '').split(' ').filter(Boolean).map((cls) => (
                  <span
                    key={cls}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#20232C] border border-[#2A2E39] rounded text-[10.5px] text-[#E8A23D]"
                  >
                    <span>{cls}</span>
                    <button
                      onClick={() => handleRemoveClass(cls)}
                      className="hover:text-red-400 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Typography Controls */}
            <div className="space-y-2 border-t border-[#2A2E39] pt-3">
              <span className="font-display font-semibold text-[#8B8F9B] uppercase tracking-wider text-[10.5px] flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-[#4FD1C5]" />
                <span>Typography</span>
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#8B8F9B] block mb-1">Font Size</label>
                  <input
                    type="text"
                    value={style.fontSize || ''}
                    onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                    placeholder="e.g. 18px / 1.25rem"
                    className="w-full px-2 py-1 bg-[#14161C] border border-[#2A2E39] rounded text-[#E7E5E0] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#8B8F9B] block mb-1">Color</label>
                  <input
                    type="color"
                    value={style.color || '#000000'}
                    onChange={(e) => handleStyleChange('color', e.target.value)}
                    className="w-full h-7 bg-[#14161C] border border-[#2A2E39] rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Alignment */}
              <div>
                <label className="text-[10px] text-[#8B8F9B] block mb-1">Text Alignment</label>
                <div className="flex items-center gap-1 bg-[#20232C] p-1 rounded-md border border-[#2A2E39]">
                  {(['left', 'center', 'right', 'justify'] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() => handleStyleChange('textAlign', align)}
                      className={`p-1 rounded flex-1 flex justify-center cursor-pointer transition ${
                        style.textAlign === align ? 'bg-[#E8A23D] text-[#1a1305]' : 'text-[#8B8F9B] hover:text-[#E7E5E0]'
                      }`}
                    >
                      {align === 'left' && <AlignLeft className="w-3.5 h-3.5" />}
                      {align === 'center' && <AlignCenter className="w-3.5 h-3.5" />}
                      {align === 'right' && <AlignRight className="w-3.5 h-3.5" />}
                      {align === 'justify' && <AlignJustify className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Spacing Box Model */}
            <div className="space-y-2 border-t border-[#2A2E39] pt-3">
              <span className="font-display font-semibold text-[#8B8F9B] uppercase tracking-wider text-[10.5px] flex items-center gap-1">
                <Box className="w-3.5 h-3.5 text-[#E8A23D]" />
                <span>Box Model (Spacing)</span>
              </span>

              <div className="p-3 bg-[#14161C] border border-[#2A2E39] rounded-lg space-y-2">
                <div className="text-[10px] font-mono text-[#E8A23D] text-center">MARGIN</div>
                <div className="grid grid-cols-3 gap-1 text-center">
                  <div />
                  <input
                    type="text"
                    placeholder="Top"
                    value={style.marginTop || ''}
                    onChange={(e) => handleStyleChange('marginTop', e.target.value)}
                    className="px-1 py-0.5 bg-[#20232C] border border-[#2A2E39] rounded text-center text-[10px] text-[#E7E5E0]"
                  />
                  <div />
                  <input
                    type="text"
                    placeholder="Left"
                    value={style.marginLeft || ''}
                    onChange={(e) => handleStyleChange('marginLeft', e.target.value)}
                    className="px-1 py-0.5 bg-[#20232C] border border-[#2A2E39] rounded text-center text-[10px] text-[#E7E5E0]"
                  />
                  <div className="p-2 bg-[#5A431F] border border-[#E8A23D]/50 rounded text-[10px] text-[#E8A23D] font-bold">
                    PADDING
                  </div>
                  <input
                    type="text"
                    placeholder="Right"
                    value={style.marginRight || ''}
                    onChange={(e) => handleStyleChange('marginRight', e.target.value)}
                    className="px-1 py-0.5 bg-[#20232C] border border-[#2A2E39] rounded text-center text-[10px] text-[#E7E5E0]"
                  />
                  <div />
                  <input
                    type="text"
                    placeholder="Bottom"
                    value={style.marginBottom || ''}
                    onChange={(e) => handleStyleChange('marginBottom', e.target.value)}
                    className="px-1 py-0.5 bg-[#20232C] border border-[#2A2E39] rounded text-center text-[10px] text-[#E7E5E0]"
                  />
                  <div />
                </div>
              </div>
            </div>

            {/* Layout Display */}
            <div className="space-y-2 border-t border-[#2A2E39] pt-3">
              <span className="font-display font-semibold text-[#8B8F9B] uppercase tracking-wider text-[10.5px] flex items-center gap-1">
                <Maximize className="w-3.5 h-3.5 text-[#E8A23D]" />
                <span>Display & Layout</span>
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#8B8F9B] block mb-1">Display</label>
                  <select
                    value={style.display || 'block'}
                    onChange={(e) => handleStyleChange('display', e.target.value as any)}
                    className="w-full px-2 py-1 bg-[#14161C] border border-[#2A2E39] rounded text-[#E7E5E0] outline-none"
                  >
                    <option value="block">Block</option>
                    <option value="flex">Flexbox</option>
                    <option value="grid">Grid</option>
                    <option value="inline-block">Inline Block</option>
                    <option value="none">None (Hide)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-[#8B8F9B] block mb-1">Flex Direction</label>
                  <select
                    value={style.flexDirection || 'row'}
                    onChange={(e) => handleStyleChange('flexDirection', e.target.value as any)}
                    className="w-full px-2 py-1 bg-[#14161C] border border-[#2A2E39] rounded text-[#E7E5E0] outline-none"
                  >
                    <option value="row">Row</option>
                    <option value="column">Column</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ATTRIBUTES TAB --- */}
        {activeTab === 'attributes' && (
          <div className="space-y-3">
            <span className="font-display font-semibold text-[#8B8F9B] uppercase tracking-wider text-[10.5px] flex items-center gap-1">
              <Link2 className="w-3.5 h-3.5 text-[#E8A23D]" />
              <span>HTML Attributes</span>
            </span>

            {selectedNode.tagName === 'img' && (
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] text-[#8B8F9B] block mb-1">Image Source (src)</label>
                  <input
                    type="text"
                    value={attributes.src || ''}
                    onChange={(e) => handleAttributeChange('src', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-2.5 py-1.5 bg-[#14161C] border border-[#2A2E39] rounded text-[#E7E5E0] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#8B8F9B] block mb-1">Alt Text (alt)</label>
                  <input
                    type="text"
                    value={attributes.alt || ''}
                    onChange={(e) => handleAttributeChange('alt', e.target.value)}
                    placeholder="Image description"
                    className="w-full px-2.5 py-1.5 bg-[#14161C] border border-[#2A2E39] rounded text-[#E7E5E0] outline-none"
                  />
                </div>
              </div>
            )}

            {selectedNode.tagName === 'a' && (
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] text-[#8B8F9B] block mb-1">Link Target (href)</label>
                  <input
                    type="text"
                    value={attributes.href || ''}
                    onChange={(e) => handleAttributeChange('href', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-2.5 py-1.5 bg-[#14161C] border border-[#2A2E39] rounded text-[#E7E5E0] outline-none"
                  />
                </div>
              </div>
            )}

            {selectedNode.tagName === 'input' && (
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] text-[#8B8F9B] block mb-1">Placeholder</label>
                  <input
                    type="text"
                    value={attributes.placeholder || ''}
                    onChange={(e) => handleAttributeChange('placeholder', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#14161C] border border-[#2A2E39] rounded text-[#E7E5E0] outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- CONTENT & AI TAB --- */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-display font-semibold text-[#8B8F9B] uppercase tracking-wider text-[10.5px] block">
                Direct Content Text
              </label>
              <textarea
                value={selectedNode.content || ''}
                onChange={(e) =>
                  onUpdateNode(selectedNode.id, (n) => ({ ...n, content: e.target.value }))
                }
                rows={4}
                className="w-full p-2.5 bg-[#14161C] border border-[#2A2E39] rounded-lg text-[#E7E5E0] outline-none focus:border-[#E8A23D]"
              />
            </div>

            {/* AI Refiner */}
            <div className="space-y-2 border-t border-[#2A2E39] pt-3">
              <span className="font-display font-semibold text-[#E8A23D] uppercase tracking-wider text-[10.5px] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#E8A23D]" />
                <span>AI Copy Refiner</span>
              </span>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => handleRefineCopy('Make more punchy and catchy')}
                  disabled={isRefineLoading}
                  className="p-1.5 bg-[#20232C] hover:bg-[#2A2E39] text-[10.5px] rounded border border-[#2A2E39] text-[#E7E5E0] transition cursor-pointer"
                >
                  ⚡ Make Punchy
                </button>
                <button
                  onClick={() => handleRefineCopy('Make concise and short')}
                  disabled={isRefineLoading}
                  className="p-1.5 bg-[#20232C] hover:bg-[#2A2E39] text-[10.5px] rounded border border-[#2A2E39] text-[#E7E5E0] transition cursor-pointer"
                >
                  ✂️ Shorten
                </button>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-[10px] text-[#8B8F9B] block">Custom Refine Instruction</label>
                <input
                  type="text"
                  value={aiInstruction}
                  onChange={(e) => setAiInstruction(e.target.value)}
                  placeholder="e.g. Translate to Spanish"
                  className="w-full px-2.5 py-1.5 bg-[#14161C] border border-[#2A2E39] rounded text-[#E7E5E0] outline-none"
                />
                <button
                  onClick={() => handleRefineCopy()}
                  disabled={isRefineLoading}
                  className="w-full py-2 bg-[#E8A23D] hover:bg-[#d8932e] text-[#1a1305] font-semibold rounded-md flex items-center justify-center gap-1 transition cursor-pointer"
                >
                  {isRefineLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Wand2 className="w-3.5 h-3.5" />
                  )}
                  <span>Refine Text with AI</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

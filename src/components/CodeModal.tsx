import React, { useState, useEffect } from 'react';
import {
  X,
  Code2,
  Copy,
  Check,
  Download,
  Upload,
  ShieldAlert,
  Lock,
} from 'lucide-react';
import { ElementNode } from '../types';
import { nodeToHtml, htmlToNodeTree } from '../utils/domUtils';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  rootNode: ElementNode;
  onImportHtmlTree: (importedRoot: ElementNode) => void;
  pageName: string;
  isAdmin: boolean;
  downloadApprovalRequired: boolean;
  allowCodeEditing: boolean;
  onRequestDownloadApproval: (pageName: string) => void;
}

export const CodeModal: React.FC<CodeModalProps> = ({
  isOpen,
  onClose,
  rootNode,
  onImportHtmlTree,
  pageName,
  isAdmin,
  downloadApprovalRequired,
  allowCodeEditing,
  onRequestDownloadApproval,
}) => {
  const [code, setCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [includeTailwindCdn, setIncludeTailwindCdn] = useState<boolean>(true);
  const [requestSubmitted, setRequestSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const generatedHtml = nodeToHtml(rootNode);
      setCode(generatedHtml);
      setRequestSubmitted(false);
    }
  }, [isOpen, rootNode]);

  if (!isOpen) return null;

  const handleCopy = () => {
    const fullDoc = getFullDocumentHtml();
    navigator.clipboard.writeText(fullDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFullDocumentHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageName}</title>
  ${
    includeTailwindCdn
      ? `<script src="https://cdn.tailwindcss.com"></script>`
      : ''
  }
</head>
<body class="bg-slate-50 text-slate-900 font-sans antialiased">
${code}
</body>
</html>`;
  };

  const handleDownload = () => {
    if (downloadApprovalRequired && !isAdmin) {
      onRequestDownloadApproval(pageName);
      setRequestSubmitted(true);
      return;
    }

    const fullHtml = getFullDocumentHtml();
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pageName.toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleApplyChanges = () => {
    if (!allowCodeEditing && !isAdmin) {
      alert('Direct HTML editing is restricted to Administrator (Mayank Kumar Gupta).');
      return;
    }
    try {
      const newRoot = htmlToNodeTree(code);
      onImportHtmlTree(newRoot);
      onClose();
    } catch (err) {
      alert('Error parsing HTML code into visual DOM tree.');
    }
  };

  return (
    <div className="fixed inset-0 bg-[#14161C]/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 select-none font-sans">
      <div className="bg-[#1B1E26] border border-[#2A2E39] rounded-xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl overflow-hidden text-[#E7E5E0]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2A2E39] flex items-center justify-between bg-[#14161C]/60">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#E8A23D]" />
            <h2 className="text-sm font-display font-bold text-[#E7E5E0]">
              Live HTML Source & Export ({pageName})
            </h2>
            {downloadApprovalRequired && !isAdmin && (
              <span className="px-2 py-0.5 bg-[#5A431F] text-[#E8A23D] border border-[#E8A23D]/50 rounded text-[10px] font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3" /> Admin Approval Protected
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-[#20232C] rounded-md text-[#8B8F9B] hover:text-[#E7E5E0] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Code Area */}
        <div className="flex-1 p-4 bg-[#14161C] flex flex-col font-mono text-xs relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            readOnly={!allowCodeEditing && !isAdmin}
            className={`w-full h-full bg-transparent text-[#4FD1C5] outline-none resize-none leading-relaxed ${
              !allowCodeEditing && !isAdmin ? 'cursor-not-allowed opacity-80' : ''
            }`}
            spellCheck={false}
          />
          {!allowCodeEditing && !isAdmin && (
            <div className="absolute top-3 right-5 px-2.5 py-1 bg-[#20232C] border border-[#2A2E39] text-[#8B8F9B] rounded text-[10.5px]">
              🔒 Code editing restricted to Admin
            </div>
          )}
        </div>

        {/* Footer Options & Actions */}
        <div className="px-6 py-4 border-t border-[#2A2E39] bg-[#14161C]/60 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-[#8B8F9B]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeTailwindCdn}
                onChange={(e) => setIncludeTailwindCdn(e.target.checked)}
                className="accent-[#E8A23D] rounded"
              />
              <span>Include Tailwind CDN script tag</span>
            </label>

            {requestSubmitted && (
              <span className="text-[#E8A23D] text-[11px] font-medium flex items-center gap-1">
                ⏳ Download request submitted to Mayank for approval
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-[#20232C] hover:bg-[#2A2E39] text-[#E7E5E0] font-medium rounded-md text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#4FD1C5]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy HTML'}</span>
            </button>

            {(allowCodeEditing || isAdmin) && (
              <button
                onClick={handleApplyChanges}
                className="px-4 py-2 bg-[#5A431F] hover:bg-[#E8A23D]/30 text-[#E8A23D] font-medium rounded-md text-xs flex items-center gap-1.5 border border-[#E8A23D]/50 transition cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Apply Code to Canvas</span>
              </button>
            )}

            <button
              onClick={handleDownload}
              className={`px-5 py-2 font-semibold rounded-md text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer ${
                downloadApprovalRequired && !isAdmin
                  ? 'bg-[#5A431F] hover:bg-[#E8A23D]/30 text-[#E8A23D] border border-[#E8A23D]/50'
                  : 'bg-[#E8A23D] hover:bg-[#d8932e] text-[#1a1305]'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>
                {downloadApprovalRequired && !isAdmin
                  ? 'Request Download Approval'
                  : 'Download File'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

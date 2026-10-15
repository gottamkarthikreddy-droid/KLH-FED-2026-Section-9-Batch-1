import React, { useState } from 'react';
import { FULL_SPEC_MARKDOWN, SLIDES_DATA, PROJECT_MEMBERS, INSTRUCTOR_NAME } from '../data/slidesData';
import { X, Copy, Check, Download, FileText, Users } from 'lucide-react';

interface ArchitectureSpecModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureSpecModal: React.FC<ArchitectureSpecModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'spec' | 'roster'>('spec');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(FULL_SPEC_MARKDOWN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([FULL_SPEC_MARKDOWN], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DDCA_Wireless_Access_Control_Node_Spec.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="bg-neutral-950 border border-neutral-800 rounded-xl w-full max-w-4xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-black">
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-white" />
            <div>
              <div className="font-bold text-white text-sm tracking-[-0.02em]">
                DDCA Architecture Specification Document
              </div>
              <div className="text-[11px] text-neutral-400">
                Wireless Proximity Access Control Node · ESP32 Hardware State Controller
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === 'spec' ? 'roster' : 'spec')}
              className="px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 transition-colors"
            >
              {activeTab === 'spec' ? 'View Team Roster' : 'View Spec Markdown'}
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white hover:bg-neutral-200 text-black font-semibold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5 text-black" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title="Download Markdown"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-neutral-300 leading-relaxed">
          {activeTab === 'spec' ? (
            <pre className="p-4 bg-black border border-neutral-800 rounded-lg text-neutral-200 text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed font-mono">
              {FULL_SPEC_MARKDOWN}
            </pre>
          ) : (
            <div className="space-y-4">
              <div className="bg-black border border-neutral-800 p-4 rounded-lg space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="text-white font-bold text-xs uppercase flex items-center gap-2">
                    <Users className="w-4 h-4 text-white" />
                    Computer Science &amp; Engineering Team Roster
                  </span>
                  <span className="text-neutral-400 text-xs">
                    Instructor: <strong className="text-white">{INSTRUCTOR_NAME}</strong>
                  </span>
                </div>
                <div className="divide-y divide-neutral-800">
                  {PROJECT_MEMBERS.map((m, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-500 font-mono">0{idx + 1}.</span>
                        <span className="font-bold text-white">{m.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white font-mono font-semibold">{m.rollNumber}</span>
                        <span className="bg-neutral-800 px-2 py-0.5 rounded text-[10px] text-neutral-300">
                          {m.branch}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-black border border-neutral-800 p-4 rounded-lg space-y-2">
                <div className="text-xs font-bold text-white uppercase">10-Slide Blueprint Mapping</div>
                <ul className="text-xs text-neutral-400 space-y-1">
                  {SLIDES_DATA.map((s) => (
                    <li key={s.id} className="flex items-center justify-between py-1 border-b border-neutral-800/60">
                      <span><strong className="text-white">Slide {s.slideNumber}:</strong> {s.title}</span>
                      <span className="text-neutral-400 font-mono text-[11px]">{s.category}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

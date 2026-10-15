import React from 'react';
import { FileText } from 'lucide-react';

interface HeaderProps {
  currentSlide: number;
  onNavigateToSlide: (slideNumber: number) => void;
  onOpenSpecModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSlide,
  onNavigateToSlide,
  onOpenSpecModal,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800 bg-[#0B0F17]/95 backdrop-blur-sm shrink-0 z-30">
      {/* Zone 1: Single text element wordmark */}
      <div 
        onClick={() => onNavigateToSlide(1)}
        className="text-sm font-mono font-bold tracking-tight text-white whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2 group"
      >
        <span className="w-2.5 h-2.5 rounded-sm bg-[#3B82F6] group-hover:scale-110 transition-transform"></span>
        <span>DSSC-ESP32 // DDCA CONTROLLER</span>
      </div>

      {/* Zone 2: 4–5 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-400">
        <button
          onClick={() => onNavigateToSlide(1)}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentSlide === 1 ? 'text-[#3B82F6] font-semibold' : ''
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => onNavigateToSlide(3)}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentSlide === 3 || currentSlide === 4 ? 'text-[#3B82F6] font-semibold' : ''
          }`}
        >
          Gates &amp; MUX
        </button>
        <button
          onClick={() => onNavigateToSlide(5)}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentSlide === 5 || currentSlide === 6 ? 'text-[#3B82F6] font-semibold' : ''
          }`}
        >
          Memory &amp; Flip-Flops
        </button>
        <button
          onClick={() => onNavigateToSlide(7)}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentSlide === 7 ? 'text-[#3B82F6] font-semibold' : ''
          }`}
        >
          FSM Counters
        </button>
        <button
          onClick={() => onNavigateToSlide(8)}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentSlide === 8 || currentSlide === 9 ? 'text-[#3B82F6] font-semibold' : ''
          }`}
        >
          ESP32 &amp; Testing
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenSpecModal}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium text-white bg-[#3B82F6] hover:bg-blue-600 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Architecture Spec</span>
        </button>
      </div>
    </header>
  );
};

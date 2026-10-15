import React from 'react';
import { FileText, Box } from 'lucide-react';

interface TopBarProps {
  currentSlideIndex: number;
  onNavigateToSlide: (index: number) => void;
  onOpenSpecModal: () => void;
  pixelMode: boolean;
  onTogglePixelMode: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentSlideIndex,
  onNavigateToSlide,
  onOpenSpecModal,
  pixelMode,
  onTogglePixelMode,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-md border-b border-neutral-800 px-6 sm:px-10 flex items-center justify-between gap-8 z-50">
      {/* Zone 1: Black & White Brand Wordmark */}
      <div
        onClick={() => onNavigateToSlide(0)}
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-black font-mono font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
          W
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans text-sm font-bold tracking-[-0.02em] text-white leading-tight">
            Wireless Access Controller
          </span>
          <span className="font-mono text-[10px] text-neutral-400">
            DDCA · 1st Trimester Capstone
          </span>
        </div>
      </div>

      {/* Zone 2: Monochromatic Navigation Links */}
      <nav className="hidden lg:flex items-center gap-6 text-xs font-sans font-medium text-neutral-400">
        <button
          onClick={() => onNavigateToSlide(0)}
          className={`hover:text-white transition-colors whitespace-nowrap ${
            currentSlideIndex === 0 ? 'text-white font-bold' : ''
          }`}
        >
          Big Picture
        </button>
        <button
          onClick={() => onNavigateToSlide(2)}
          className={`hover:text-white transition-colors whitespace-nowrap ${
            currentSlideIndex === 2 || currentSlideIndex === 3 ? 'text-white font-bold' : ''
          }`}
        >
          Logic Gates
        </button>
        <button
          onClick={() => onNavigateToSlide(4)}
          className={`hover:text-white transition-colors whitespace-nowrap ${
            currentSlideIndex === 4 || currentSlideIndex === 5 ? 'text-white font-bold' : ''
          }`}
        >
          Combinational
        </button>
        <button
          onClick={() => onNavigateToSlide(6)}
          className={`hover:text-white transition-colors whitespace-nowrap ${
            currentSlideIndex === 6 || currentSlideIndex === 7 ? 'text-white font-bold' : ''
          }`}
        >
          Sequential &amp; FSM
        </button>
        <button
          onClick={() => onNavigateToSlide(9)}
          className={`hover:text-white transition-colors whitespace-nowrap ${
            currentSlideIndex === 9 ? 'text-white font-bold' : ''
          }`}
        >
          RISC-V Link
        </button>
      </nav>

      {/* Zone 3: 1 primary action + Pixel Toggle */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onTogglePixelMode}
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-xl border transition-colors ${
            pixelMode
              ? 'bg-white text-black border-white font-bold'
              : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
          }`}
          title="Toggle Pixelated 3D View (Townhouse style)"
        >
          <Box className="w-3.5 h-3.5" />
          <span>{pixelMode ? 'Pixel 3D' : 'PBR 3D'}</span>
        </button>

        <button
          onClick={onOpenSpecModal}
          className="flex items-center gap-2 px-4 py-1.5 text-xs font-sans font-bold text-black bg-white hover:bg-neutral-200 rounded-xl transition-all shadow-md active:scale-95"
        >
          <FileText className="w-3.5 h-3.5 text-neutral-900" />
          <span>Spec Document</span>
        </button>
      </div>
    </header>
  );
};

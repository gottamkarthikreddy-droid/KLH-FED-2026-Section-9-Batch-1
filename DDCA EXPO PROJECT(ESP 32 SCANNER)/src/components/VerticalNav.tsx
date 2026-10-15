import React from 'react';
import { SLIDES_DATA } from '../data/slidesData';

interface VerticalNavProps {
  currentSlideIndex: number;
  onNavigateToSlide: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const VerticalNav: React.FC<VerticalNavProps> = ({
  currentSlideIndex,
  onNavigateToSlide,
}) => {
  return (
    <aside aria-label="Slide navigation" className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      {/* Townhouse.dev style rounded pill navigation container */}
      <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 rounded-2xl py-3 px-3.5 flex flex-col gap-2 shadow-2xl">
        {SLIDES_DATA.map((slide, idx) => {
          const isActive = idx === currentSlideIndex;
          return (
            <button
              key={slide.id}
              onClick={() => onNavigateToSlide(idx)}
              className={`flex items-center gap-2.5 py-1 px-2 rounded-lg text-left transition-all font-sans text-xs ${
                isActive
                  ? 'text-white font-semibold'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {/* Dot Indicator */}
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all shrink-0 ${
                  isActive
                    ? 'w-2 h-2 bg-white ring-2 ring-white/30'
                    : 'bg-neutral-700'
                }`}
              />

              {/* Slide Label (Active slide gets highlighted text like townhouse.dev) */}
              <span className={`text-[11px] whitespace-nowrap tracking-tight transition-opacity ${
                isActive ? 'opacity-100 text-white font-medium' : 'opacity-70 hover:opacity-100'
              }`}>
                {slide.title.length > 20 ? slide.title.slice(0, 18) + '...' : slide.title}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

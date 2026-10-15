/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SLIDES_DATA } from './data/slidesData';
import { TopBar } from './components/TopBar';
import { SlideSection } from './components/SlideSection';
import { VerticalNav } from './components/VerticalNav';
import { ESP32CamScene } from './components/canvas/ESP32CamScene';
import { ArchitectureSpecModal } from './components/ArchitectureSpecModal';
import { ChevronDown, Move } from 'lucide-react';

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [specModalOpen, setSpecModalOpen] = useState<boolean>(false);
  const [pixelMode, setPixelMode] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to slide
  const scrollToSlide = useCallback((index: number) => {
    if (index < 0 || index >= SLIDES_DATA.length) return;
    const targetElement = document.getElementById(`slide-${index + 1}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handlePrev = useCallback(() => {
    scrollToSlide(currentSlideIndex - 1);
  }, [currentSlideIndex, scrollToSlide]);

  const handleNext = useCallback(() => {
    scrollToSlide(currentSlideIndex + 1);
  }, [currentSlideIndex, scrollToSlide]);

  // Track active slide with IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const options = {
      root: container,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const indexAttr = entry.target.getAttribute('data-slide-index');
          if (indexAttr !== null) {
            setCurrentSlideIndex(parseInt(indexAttr, 10));
          }
        }
      });
    }, options);

    const sections = container.querySelectorAll('section[data-slide-index]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSlide(SLIDES_DATA.length - 1);
      } else if (e.key >= '1' && e.key <= '9') {
        scrollToSlide(parseInt(e.key, 10) - 1);
      } else if (e.key === '0') {
        scrollToSlide(9);
      } else if (e.key.toLowerCase() === 'd') {
        setSpecModalOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'p') {
        setPixelMode((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, scrollToSlide]);

  const currentSlide = SLIDES_DATA[currentSlideIndex] || SLIDES_DATA[0];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white selection:bg-white selection:text-black">
      {/* Townhouse.dev Style Top Bar */}
      <TopBar
        currentSlideIndex={currentSlideIndex}
        onNavigateToSlide={scrollToSlide}
        onOpenSpecModal={() => setSpecModalOpen(true)}
        pixelMode={pixelMode}
        onTogglePixelMode={() => setPixelMode(!pixelMode)}
      />

      {/* Townhouse.dev 3D Model Viewport (Center-Right in the background) */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-end">
        <div className="w-full lg:w-3/5 h-full pointer-events-auto relative">
          <ESP32CamScene currentSlideIndex={currentSlideIndex} pixelMode={pixelMode} />

          {/* Vignette Gradients for Text Contrast on the Left */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-transparent lg:w-2/5"></div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent h-28 bottom-0"></div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-transparent h-24 top-0"></div>
        </div>
      </div>

      {/* Main Vertical Slides Container with Scroll Snap (Text shifted to the Left) */}
      <main
        ref={containerRef}
        tabIndex={0}
        aria-label="Presentation slides"
        className="relative z-10 w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth focus:outline-none"
      >
        {SLIDES_DATA.map((slide, idx) => (
          <SlideSection
            key={slide.id}
            slide={slide}
            index={idx}
            onNextSlide={handleNext}
            onOpenSpec={() => setSpecModalOpen(true)}
          />
        ))}
      </main>

      {/* Townhouse.dev Right-Hand Vertical Nav Rail */}
      <VerticalNav
        currentSlideIndex={currentSlideIndex}
        onNavigateToSlide={scrollToSlide}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* Bottom Floating Telemetry & Theatrical 3D Hint */}
      <footer aria-label="Presentation status" className="fixed bottom-5 left-6 sm:left-10 lg:left-14 z-30 flex items-center gap-4 text-xs font-mono text-neutral-400 bg-neutral-950/90 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800 shadow-2xl">
        <div className="flex items-center gap-1.5 text-white font-bold">
          <span className="text-white">SLIDE {currentSlide.slideNumber}</span>
          <span className="text-neutral-600">/</span>
          <span>10</span>
        </div>
        <span className="text-neutral-600 hidden sm:inline">·</span>
        <span className="text-neutral-300 font-sans hidden sm:inline font-medium">
          {currentSlide.title}
        </span>
        <span className="text-neutral-600 hidden sm:inline">·</span>
        <div className="hidden sm:flex items-center gap-1.5 text-neutral-400 text-[11px]">
          <Move className="w-3 h-3 text-white" />
          <span>Drag 3D model to orbit</span>
        </div>
        {currentSlideIndex < SLIDES_DATA.length - 1 && (
          <button
            onClick={handleNext}
            className="flex items-center gap-1 text-[11px] text-white hover:text-neutral-300 transition-colors ml-2 font-medium"
          >
            <span>Scroll Down</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        )}
      </footer>

      {/* Full Architecture Specification Modal */}
      <ArchitectureSpecModal
        isOpen={specModalOpen}
        onClose={() => setSpecModalOpen(false)}
      />
    </div>
  );
}

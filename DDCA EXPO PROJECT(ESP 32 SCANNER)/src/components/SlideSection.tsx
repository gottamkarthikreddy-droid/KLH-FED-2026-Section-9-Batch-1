import React from 'react';
import { SlideContent } from '../types/slide';
import { PROJECT_MEMBERS, INSTRUCTOR_NAME } from '../data/slidesData';
import { Terminal, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SlideSectionProps {
  slide: SlideContent;
  index: number;
  onNextSlide?: () => void;
  onOpenSpec?: () => void;
}

export const SlideSection: React.FC<SlideSectionProps> = ({
  slide,
  index,
  onNextSlide,
  onOpenSpec,
}) => {
  return (
    <section
      id={`slide-${slide.id}`}
      data-slide-index={index}
      className="min-h-screen w-full snap-start snap-always flex items-center justify-start px-4 sm:px-8 lg:px-14 py-16 relative z-10 pointer-events-none"
    >
      {/* Townhouse.dev Style Left Floating Card */}
      <div className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl bg-black/90 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 sm:p-8 lg:p-9 shadow-2xl space-y-5 text-left pointer-events-auto">
        {/* Category Lead-in (like townhouse.dev START tag) */}
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[11px] text-white font-bold tracking-widest uppercase">
            {slide.category}
          </span>
          <span className="text-neutral-600 font-mono text-xs">/</span>
          <span className="font-mono text-[11px] text-neutral-400">
            Slide {slide.slideNumber} of 10
          </span>
        </div>

        {/* Big Bold Headline & Subtitle */}
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] text-white leading-tight">
            {slide.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-medium leading-relaxed">
            {slide.subtitle}
          </p>
        </div>

        {/* Slide 01 Special: CSE Team Roster & Instructor */}
        {slide.id === 1 && (
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 space-y-3 font-sans">
            <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
              <span className="text-neutral-400 flex items-center gap-1.5 font-medium">
                <Users className="w-3.5 h-3.5 text-white" />
                Project Members (CSE Branch)
              </span>
              <span className="text-neutral-300 font-mono text-[11px]">
                Instructor: <strong className="text-white font-semibold">{INSTRUCTOR_NAME}</strong>
              </span>
            </div>

            {/* 5 Members without individual roles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {PROJECT_MEMBERS.map((member, mIdx) => (
                <div
                  key={mIdx}
                  className="bg-neutral-900 px-3 py-2 rounded-xl border border-neutral-800 flex items-center justify-between"
                >
                  <span className="font-semibold text-white text-xs">{member.name}</span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span className="text-white font-bold">{member.rollNumber}</span>
                    <span className="bg-neutral-800 px-1.5 py-0.5 rounded text-[10px] text-neutral-300">
                      {member.branch}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Structural Subtext Points (Jargon-free 1st trimester topics) */}
        <div className="space-y-2.5">
          {slide.structuralPoints.map((pt, pIdx) => (
            <div
              key={pIdx}
              className="bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-3 space-y-1"
            >
              <div className="text-xs font-semibold text-neutral-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                <span>{pt.heading}</span>
              </div>
              <p className="text-[12px] text-neutral-400 leading-relaxed pl-3.5">
                {pt.details}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Callout Block (Truth Tables / Circuits / Diagrams) */}
        {slide.technicalCallout && (
          <div className="bg-black border border-neutral-800 rounded-xl p-3.5 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-800/80 pb-1 text-[11px]">
              <span className="text-white font-semibold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                {slide.technicalCallout.title}
              </span>
              <span className="text-[10px] text-neutral-500 uppercase">{slide.technicalCallout.type}</span>
            </div>

            {/* Render Table */}
            {slide.technicalCallout.type === 'table' && slide.technicalCallout.data && (
              <div className="overflow-x-auto max-h-40 overflow-y-auto">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400">
                      {Object.keys(slide.technicalCallout.data[0]).map((key) => (
                        <th key={key} className="py-1 px-2 font-bold">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60">
                    {slide.technicalCallout.data.map((row: any, rIdx: number) => (
                      <tr key={rIdx} className="hover:bg-neutral-900/40 text-neutral-300">
                        {Object.values(row).map((val: any, vIdx: number) => (
                          <td key={vIdx} className="py-1 px-2">{String(val)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Render FSM Decision Matrix */}
            {slide.technicalCallout.type === 'fsm' && slide.technicalCallout.data && (
              <div className="overflow-x-auto max-h-44 overflow-y-auto">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400">
                      <th className="py-1 px-2">Present State</th>
                      <th className="py-1 px-2">Trigger Input</th>
                      <th className="py-1 px-2">Next State</th>
                      <th className="py-1 px-2">Output Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60">
                    {slide.technicalCallout.data.map((row: any, rIdx: number) => (
                      <tr key={rIdx} className="hover:bg-neutral-900/40 text-neutral-300">
                        <td className="py-1 px-2 font-bold text-white">{row.present}</td>
                        <td className="py-1 px-2 text-neutral-300 font-mono">{row.input}</td>
                        <td className="py-1 px-2 text-white font-semibold">{row.next}</td>
                        <td className="py-1 px-2 text-neutral-400">{row.output}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Render Code or Formula */}
            {(slide.technicalCallout.type === 'code' || slide.technicalCallout.type === 'formula' || slide.technicalCallout.type === 'diagram') && (
              <pre className="text-neutral-300 text-[11px] whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-36">
                {slide.technicalCallout.content}
              </pre>
            )}
          </div>
        )}

        {/* Townhouse.dev Style Primary Action Button & Spec Badges */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          {/* Townhouse style crisp action button */}
          {slide.id < 10 ? (
            <button
              onClick={onNextSlide}
              className="bg-white hover:bg-neutral-200 text-black font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <span>Next Concept</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onOpenSpec}
              className="bg-white hover:bg-neutral-200 text-black font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <span>View Full Technical Specification</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-black" />
            </button>
          )}

          {/* Key Metric Tags */}
          <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400 overflow-x-auto">
            {slide.specBadges.slice(0, 2).map((b, idx) => (
              <span key={idx} className="bg-neutral-950 border border-neutral-800 px-2 py-1 rounded-lg shrink-0">
                <span className="text-neutral-500 mr-1">{b.label}:</span>
                <span className="text-white font-semibold">{b.value}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ArrowRight, Youtube } from 'lucide-react';

interface TechWithPatrickSectionProps {
  onVisitChannel: () => void;
}

export const TechWithPatrickSection: React.FC<TechWithPatrickSectionProps> = ({
  onVisitChannel,
}) => {
  return (
    <section id="tech-with-patrick" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Container Card */}
        <div className="relative rounded-3xl bg-[#050b18]/90 border border-cyan-950/80 overflow-hidden shadow-2xl shadow-black/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="font-mono-tag text-cyan-400 text-xs sm:text-sm tracking-wider font-medium">
                // 06. TECH WITH PATRICK
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                Explore AI. Understand technology.
                <br />
                Use it to your advantage.
              </h2>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg">
                Tech with Patrick is my personal platform where I share easy-to-understand content on AI, technology, research and digital tools. No jargon. Just practical insights.
              </p>

              <div className="pt-2">
                <button
                  onClick={onVisitChannel}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400 rounded-full transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                >
                  <span>Visit Tech with Patrick</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Right Banner Showcase */}
            <div className="lg:col-span-6">
              <div
                onClick={onVisitChannel}
                className="group relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-xl cursor-pointer aspect-[16/9] flex items-center justify-center"
              >
                {/* Background Studio Photo */}
                <img
                  src="/src/assets/images/tech_with_patrick_studio_1791242102261.jpg"
                  alt="Tech with Patrick Studio"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/75 transition-opacity group-hover:opacity-90" />

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left px-6 py-6 sm:px-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Tech with
                      <br />
                      Patrick
                    </h3>
                    <div className="w-12 h-9 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-110 transition-transform">
                      <Youtube className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 tracking-wide">
                    <span>Learn</span>
                    <span className="text-cyan-400 font-bold">·</span>
                    <span>Build</span>
                    <span className="text-cyan-400 font-bold">·</span>
                    <span>Grow</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

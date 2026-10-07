import React from 'react';
import { X, Youtube, ExternalLink, Play, ArrowRight } from 'lucide-react';

interface TechModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const topics = [
  {
    title: "AI made simple",
    desc: "Explaining what AI systems actually do, where they are useful and where the hype gets ahead of reality."
  },
  {
    title: "Building with modern technology",
    desc: "Lessons from software projects, prototypes, APIs, automation workflows and the decisions that shape a product."
  },
  {
    title: "Research without the jargon",
    desc: "Breaking down new research and technology developments so that students, business people and curious minds can understand them."
  },
  {
    title: "Technology and the real world",
    desc: "Exploring how AI and modern software affect work, business, Africa and the people who use these systems."
  }
];

export const TechModal: React.FC<TechModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#060c1c] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/40 flex flex-col max-h-[92vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#040814]/80">
          <div className="flex items-center gap-2">
            <Youtube className="w-4 h-4 text-red-500" />
            <span className="font-mono-tag text-xs text-cyan-400">// TECH WITH PATRICK</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/80 transition-colors" aria-label="Close dialog">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[250px]">
            <div className="lg:col-span-2 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85"
                alt="Technology workspace placeholder"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#060c1c] via-[#060c1c]/35 to-transparent" />
            </div>
            <div className="lg:col-span-3 p-7 sm:p-9 space-y-5">
              <div className="text-[11px] uppercase tracking-wider text-cyan-400">Explore AI. Understand technology. Use it to your advantage.</div>
              <h2 className="text-3xl font-bold text-white">Tech with Patrick</h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                I make technology easier to understand for people who do not live inside technical jargon. The content mixes AI, software engineering, research, digital tools and the practical questions behind them.
              </p>
              <a
                href="https://youtube.com/@techwithpatrick"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-full transition-colors"
              >
                Visit YouTube <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-4">
            <div className="font-mono-tag text-[11px] text-cyan-400">// CONTENT PILLARS</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.map((item) => (
                <div key={item.title} className="rounded-2xl bg-slate-900/50 border border-slate-800 p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-3">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/15 p-5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <ArrowRight className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Built to grow with the work.</div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">This space can later feature real videos, research notes, tutorials and playlists as they are published.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-slate-800/80 bg-[#040814]/90 flex items-center justify-between">
          <a href="https://youtube.com/@techwithpatrick" target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1.5">
            Open Channel <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button onClick={onClose} className="px-5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all">Close</button>
        </div>
      </div>
    </div>
  );
};

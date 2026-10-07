import React from 'react';
import { X, Youtube, ExternalLink, Play, Sparkles } from 'lucide-react';

interface TechModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechModal: React.FC<TechModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const topics = [
    {
      title: "Building Practical AI Agents: From Conception to Production",
      duration: "18 mins",
      views: "Watch Video",
      desc: "Step-by-step breakdown on designing autonomous task workers with structured reasoning and error recovery."
    },
    {
      title: "How to Automate Complex Workflows with n8n & LLMs",
      duration: "14 mins",
      views: "Watch Video",
      desc: "Connecting enterprise databases, webhooks, and AI prompt pipelines without unnecessary code overhead."
    },
    {
      title: "The Future of AI Engineering in Africa: Opportunities & Realities",
      duration: "22 mins",
      views: "Watch Video",
      desc: "Deep-dive discussion on civic tech, talent density, and localized AI infrastructure."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#060c1c] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/40 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#040814]/80">
          <div className="flex items-center gap-2">
            <Youtube className="w-4 h-4 text-red-500" />
            <span className="font-mono-tag text-xs text-cyan-400">// TECH WITH PATRICK CHANNEL</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/80 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Tech with Patrick
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Practical AI, software engineering, and digital systems insights — no jargon.
              </p>
            </div>

            <a
              href="https://youtube.com/@techwithpatrick"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-full transition-all shrink-0"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>Subscribe</span>
            </a>
          </div>

          {/* Featured Video Episodes */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Featured Sessions & Guides
            </h3>

            <div className="space-y-3">
              {topics.map((item, idx) => (
                <a
                  key={idx}
                  href="https://youtube.com/@techwithpatrick"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between p-4 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 transition-all gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Play className="w-3.5 h-3.5 text-red-400 fill-red-400 ml-0.5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[12px] text-slate-400 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-cyan-400 shrink-0">
                    {item.duration}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-800/80 bg-[#040814]/90 flex items-center justify-between">
          <a
            href="https://youtube.com/@techwithpatrick"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
          >
            <span>Open YouTube Channel</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

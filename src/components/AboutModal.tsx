import React from 'react';
import { X, MapPin, Sparkles, BookOpen, Heart, ArrowRight } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConnect: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenConnect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#060c1c] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/40 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#040814]/80">
          <div className="flex items-center gap-2">
            <span className="font-mono-tag text-xs text-cyan-400">// BIOGRAPHY & PHILOSOPHY</span>
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
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-cyan-500/40 shrink-0">
              <img
                src="/src/assets/images/patrick_hero_portrait_1791242015197.jpg"
                alt="Patrick JR Mulenga"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Patrick JR Mulenga
              </h2>
              <div className="flex items-center gap-2 text-xs text-cyan-400 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Lusaka, Zambia</span>
                <span>·</span>
                <span>Software & AI Engineer</span>
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              I am a software engineer, AI researcher, and venture builder based in Zambia. Driven by a deep curiosity about computation, systems, and human potential, I focus on turning complex technical capabilities into intuitive, impactful software.
            </p>
            <p>
              My work spans from building high-scale public sector management systems (such as the Zambia Integrated Justice & Correctional Management System) to crafting intelligent automation agent pipelines at UpleX AI.
            </p>
            <p>
              Beyond commercial engineering, I am passionate about civic technology, mentorship, and democratizing AI education through "Tech with Patrick" and youth empowerment initiatives like Gifted Life.
            </p>
          </div>

          {/* Core Tenets */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Core Principles</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-xs font-semibold text-cyan-300">1. Real Utility Over Hype</div>
                <div className="text-[12px] text-slate-400">Technology matters only when it removes real human friction and solves concrete problems.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-xs font-semibold text-cyan-300">2. Independent Compounding</div>
                <div className="text-[12px] text-slate-400">Relentless learning, daily tinkering, and disciplined craft compound exponentially over time.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-xs font-semibold text-cyan-300">3. Empowering Communities</div>
                <div className="text-[12px] text-slate-400">Knowledge isn't meant to be hoarded; sharing insights lifts everyone in the ecosystem.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-xs font-semibold text-cyan-300">4. High-Integrity Architecture</div>
                <div className="text-[12px] text-slate-400">Clean code, robust security, and intentional systems that stand the test of time.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-800/80 bg-[#040814]/90 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenConnect();
            }}
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
          >
            <span>Let's collaborate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

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

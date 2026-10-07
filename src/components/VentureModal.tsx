import React from 'react';
import { X, ExternalLink, ArrowRight } from 'lucide-react';
import { VentureItem } from '../data/portfolioData';
import { UpleXLogo, BuyShareLogo, GiftedLifeLogo } from './Icons';

interface VentureModalProps {
  venture: VentureItem | null;
  onClose: () => void;
  onOpenConnect: () => void;
}

export const VentureModal: React.FC<VentureModalProps> = ({
  venture,
  onClose,
  onOpenConnect,
}) => {
  if (!venture) return null;

  const renderLogo = (type: VentureItem['logoType']) => {
    switch (type) {
      case 'uplex':
        return <UpleXLogo className="w-14 h-14" />;
      case 'buyshare':
        return <BuyShareLogo className="w-14 h-14" />;
      case 'giftedlife':
        return <GiftedLifeLogo className="w-14 h-14" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#060c1c] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/40 flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#040814]/80">
          <div className="font-mono-tag text-xs text-cyan-400">// VENTURE SPOTLIGHT</div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/80 transition-colors" aria-label="Close dialog">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-7">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
              {renderLogo(venture.logoType)}
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-cyan-400">{venture.role}</div>
              <h3 className="text-3xl font-bold text-white tracking-tight">{venture.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{venture.status}</p>
            </div>
          </div>

          <p className="text-base text-slate-200 leading-relaxed font-medium">{venture.description}</p>

          <div className="p-5 rounded-2xl bg-slate-900/45 border border-slate-800">
            <div className="text-[10px] uppercase tracking-wider text-cyan-400 mb-2">The idea</div>
            <p className="text-sm text-slate-300 leading-relaxed">{venture.details}</p>
          </div>

          {venture.badges && venture.badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {venture.badges.map((b) => (
                <span key={b.label} className={`text-xs px-3 py-1 rounded-full border ${b.variant === 'blue' ? 'bg-blue-950/70 text-blue-300 border-blue-500/40' : 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'}`}>
                  {b.label}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="p-5 border-t border-slate-800/80 bg-[#040814]/90 flex items-center justify-between">
          <button onClick={() => { onClose(); onOpenConnect(); }} className="text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1.5">
            Talk about this venture <ArrowRight className="w-3.5 h-3.5" />
          </button>
          {venture.actionUrl ? (
            <a href={venture.actionUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all">
              <span>Visit Website</span><ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button onClick={onClose} className="px-5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all">Close</button>
          )}
        </div>
      </div>
    </div>
  );
};

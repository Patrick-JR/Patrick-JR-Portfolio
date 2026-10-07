import React from 'react';
import { X, ExternalLink, Globe } from 'lucide-react';
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
        return <UpleXLogo className="w-12 h-12" />;
      case 'buyshare':
        return <BuyShareLogo className="w-12 h-12" />;
      case 'giftedlife':
        return <GiftedLifeLogo className="w-12 h-12" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#060c1c] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/40 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#040814]/80">
          <div className="flex items-center gap-2">
            <span className="font-mono-tag text-xs text-cyan-400">VENTURE SPOTLIGHT</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/80 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4">
            {renderLogo(venture.logoType)}
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {venture.name}
              </h3>
              <p className="text-xs text-cyan-400 font-medium">
                Solution-driven venture by Patrick JR Mulenga
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              {venture.description}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {venture.details}
            </p>
          </div>

          {venture.badges && venture.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {venture.badges.map((b) => (
                <span
                  key={b.label}
                  className={`text-xs px-3 py-1 rounded-full border ${
                    b.variant === 'blue'
                      ? 'bg-blue-950/70 text-blue-300 border-blue-500/40'
                      : 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {b.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-800/80 bg-[#040814]/90 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenConnect();
            }}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
          >
            Partner on this venture →
          </button>

          {venture.actionUrl ? (
            <a
              href={venture.actionUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

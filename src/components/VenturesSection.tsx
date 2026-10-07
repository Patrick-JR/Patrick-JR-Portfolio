import React from 'react';
import { ArrowRight } from 'lucide-react';
import { VENTURES_DATA, VentureItem } from '../data/portfolioData';
import { UpleXLogo, BuyShareLogo, GiftedLifeLogo } from './Icons';

interface VenturesSectionProps {
  onSelectVenture: (venture: VentureItem) => void;
  onViewAllVentures: () => void;
}

export const VenturesSection: React.FC<VenturesSectionProps> = ({
  onSelectVenture,
  onViewAllVentures,
}) => {
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
    <section id="ventures" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="font-mono-tag text-cyan-400 text-xs sm:text-sm tracking-wider font-medium">
              // 03. VENTURES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Building businesses for a smarter future.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Through UpleX AI and other ventures, I'm working on solutions that use technology, automation and innovation to create real-world value.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onViewAllVentures}
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <span>View All Ventures</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 3 Ventures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VENTURES_DATA.map((venture) => (
            <div
              key={venture.id}
              onClick={() => onSelectVenture(venture)}
              className={`group rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer border ${
                venture.id === 'uplex-ai'
                  ? 'bg-gradient-to-b from-[#081832] to-[#040916] border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                  : 'bg-[#050b18]/80 hover:bg-[#071126] border-cyan-950/70 hover:border-cyan-500/40'
              }`}
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  {renderLogo(venture.logoType)}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {venture.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {venture.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Either Link or Badges */}
              <div className="pt-6">
                {venture.actionText ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    <span>{venture.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    {venture.badges?.map((badge) => (
                      <span
                        key={badge.label}
                        className={`text-[11px] font-medium px-3 py-1 rounded-full border ${
                          badge.variant === 'blue'
                            ? 'bg-blue-950/70 text-blue-300 border-blue-500/40'
                            : 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                        }`}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

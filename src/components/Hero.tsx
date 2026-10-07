import React from 'react';
import { ArrowRight, Linkedin, Github, Youtube, MonitorPlay } from 'lucide-react';
import { HERO_DATA } from '../data/portfolioData';

interface HeroProps {
  onExploreWork: () => void;
  onGetInTouch: () => void;
  onOpenTechPatrick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreWork,
  onGetInTouch,
  onOpenTechPatrick
}) => {
  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#030712] text-slate-100">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-32 right-10 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Monospace Kicker */}
            <div className="font-mono-tag text-cyan-400 text-sm tracking-wider font-medium">
              {HERO_DATA.kicker}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {HERO_DATA.nameFirst}{' '}
              <span className="text-[#00E5FF] neon-glow-cyan">
                {HERO_DATA.nameLast}
              </span>
            </h1>

            {/* Sub-roles with bullets */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm sm:text-base font-normal text-slate-300">
              {HERO_DATA.roles.map((role, idx) => (
                <React.Fragment key={role}>
                  <span>{role}</span>
                  {idx < HERO_DATA.roles.length - 1 && (
                    <span className="text-slate-500 select-none">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed pt-1">
              {HERO_DATA.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onExploreWork}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-95 rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onGetInTouch}
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 rounded-full transition-all active:scale-95 cursor-pointer"
              >
                <span>Get in Touch</span>
              </button>
            </div>

            {/* Social row */}
            <div className="flex flex-wrap items-center gap-4 pt-4 text-xs font-medium text-slate-400">
              <a
                href="https://linkedin.com/in/patrick-mulenga"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/patrick-mulenga"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                <span>GitHub</span>
              </a>

              <a
                href="https://youtube.com/@techwithpatrick"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5 text-cyan-400" />
                <span>YouTube</span>
              </a>

              <button
                onClick={onOpenTechPatrick}
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <MonitorPlay className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tech with Patrick</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Portrait + Floating Terminal Box */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Cyan background halo glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-600/10 to-transparent rounded-full blur-3xl" />

            <div className="relative w-full max-w-md lg:max-w-none flex items-center justify-center">
              {/* Image Frame */}
              <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)] bg-[#070d1d]">
                <img
                  src="/src/assets/images/patrick_hero_portrait_1791242015197.jpg"
                  alt="Patrick JR Mulenga"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                {/* Soft gradient bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />
              </div>

              {/* Code Terminal Box on Top-Right */}
              <div className="absolute -top-4 -right-2 sm:-right-4 lg:-right-6 bg-[#040814]/90 backdrop-blur-md border border-cyan-500/40 rounded-xl p-4 sm:p-5 shadow-[0_8px_32px_rgba(0,229,255,0.18)] min-w-[150px] sm:min-w-[170px]">
                <div className="font-mono-tag text-xs sm:text-sm text-cyan-400 space-y-1">
                  {HERO_DATA.terminalLines.map((line, idx) => (
                    <div
                      key={idx}
                      className={line === '>_' ? 'text-cyan-300 font-bold animate-pulse pt-1' : 'text-cyan-400/90'}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

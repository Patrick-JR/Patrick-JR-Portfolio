import React from 'react';
import { ArrowRight, Code2, Brain, Search, Rocket, BookOpen } from 'lucide-react';
import { ABOUT_DATA } from '../data/portfolioData';
import { usePortfolioContent } from '../data/portfolioStore';
import { useTheme } from '../context/ThemeContext';

interface AboutSectionProps {
  onLearnMore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore }) => {
  const { isDark } = useTheme();
  const { about } = usePortfolioContent();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'brain':
        return <Brain className="w-5 h-5 text-cyan-400" />;
      case 'search':
        return <Search className="w-5 h-5 text-cyan-400" />;
      case 'rocket':
        return <Rocket className="w-5 h-5 text-cyan-400" />;
      case 'book':
        return <BookOpen className="w-5 h-5 text-cyan-400" />;
      default:
        return <Code2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading and Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="font-mono-tag text-cyan-500 text-xs sm:text-sm tracking-wider font-medium">
              {about.kicker}
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {about.titlePart1}
              <br />
              {about.titlePart2}{' '}
              <span className="text-[#00E5FF]">{about.titleHighlight}</span>
            </h2>

            <div className={`space-y-4 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onLearnMore}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium rounded-full transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.15)] ${
                  isDark
                    ? 'text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400'
                    : 'text-slate-900 hover:text-cyan-600 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm'
                }`}
              >
                <span>Learn More About Me</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Column: 5 Role Cards (Cards remain black as requested) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ABOUT_DATA.roles.map((role) => (
                <div
                  key={role.title}
                  className="bg-[#050b18] hover:bg-[#071126] border border-cyan-950/70 hover:border-cyan-500/40 rounded-xl p-5 sm:p-6 transition-all duration-300 card-glow-hover flex flex-col justify-between shadow-lg shadow-black/40"
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center">
                      {getIcon(role.icon)}
                    </div>
                    <h3 className="text-base font-semibold text-white tracking-tight">
                      {role.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-normal">
                      {role.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

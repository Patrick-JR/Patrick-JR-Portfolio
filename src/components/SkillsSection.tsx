import React from 'react';
import { Code2, Brain, Database, Search } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'brain':
        return <Brain className="w-5 h-5 text-cyan-400" />;
      case 'database':
        return <Database className="w-5 h-5 text-cyan-400" />;
      case 'research':
        return <Search className="w-5 h-5 text-cyan-400" />;
      default:
        return <Code2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl pb-12">
          <div className="font-mono-tag text-cyan-400 text-xs sm:text-sm tracking-wider font-medium">
            // 04. SKILLS & TECHNOLOGIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Tools I use and technologies I work with.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            A mix of programming, AI, automation, research and product development tools.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS_DATA.map((item) => (
            <div
              key={item.category}
              className="bg-[#050b18]/80 hover:bg-[#071126] border border-cyan-950/70 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-300 card-glow-hover flex flex-col space-y-4"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center">
                {getIcon(item.icon)}
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {item.category}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.skills}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

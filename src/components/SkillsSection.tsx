import React from 'react';
import { Code2, Brain, Database, Search } from 'lucide-react';
import { usePortfolioContent } from '../data/portfolioStore';
import { useTheme } from '../context/ThemeContext';

export const SkillsSection: React.FC = () => {
  const { isDark } = useTheme();
  const { skills } = usePortfolioContent();

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
          <div className="font-mono-tag text-cyan-500 text-xs sm:text-sm tracking-wider font-medium">
            // 04. SKILLS & TECHNOLOGIES
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Tools I use and technologies I work with.
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            A mix of programming, AI, automation, research and product development tools.
          </p>
        </div>

        {/* 4 Cards Grid (Cards remain black as requested) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((item) => (
            <div
              key={item.category}
              className="bg-[#050b18] hover:bg-[#071126] border border-cyan-950/70 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-300 card-glow-hover flex flex-col space-y-4 shadow-lg shadow-black/50"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center">
                {getIcon(item.icon)}
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {item.category}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.skills.map((skill) => skill.name).join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

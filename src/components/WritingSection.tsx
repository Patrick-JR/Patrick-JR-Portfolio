import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ArticleItem } from '../data/portfolioData';
import { usePortfolioContent } from '../data/portfolioStore';
import { useTheme } from '../context/ThemeContext';

interface WritingSectionProps {
  onSelectArticle: (article: ArticleItem) => void;
  onExploreWriting: () => void;
}

export const WritingSection: React.FC<WritingSectionProps> = ({
  onSelectArticle,
  onExploreWriting,
}) => {
  const { isDark } = useTheme();
  const { articles } = usePortfolioContent();
  const visibleArticles = articles.filter((article) => article.status === 'Published').slice(0, 3);

  return (
    <section id="writing" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, description & CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="font-mono-tag text-cyan-500 text-xs sm:text-sm tracking-wider font-medium">
              // 05. WRITING & PUBLICATIONS
            </div>

            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Ideas. Research. Reflections.
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              I write to explore ideas, share what I learn, and make sense of the world through technology, philosophy and human experience.
            </p>

            <div className="pt-2">
              <button
                onClick={onExploreWriting}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium rounded-full transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.15)] ${
                  isDark
                    ? 'text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400'
                    : 'text-slate-900 hover:text-cyan-600 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm'
                }`}
              >
                <span>Explore My Writing</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Column: 3 Article Cards (Cards remain black as requested) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {visibleArticles.length === 0 ? <div className="sm:col-span-3 rounded-2xl border border-cyan-950/70 bg-[#050b18] p-6 text-sm text-slate-500">New writing will appear here when it is published.</div> : visibleArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="group bg-[#050b18] hover:bg-[#071126] border border-cyan-950/70 hover:border-cyan-500/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 cursor-pointer card-glow-hover shadow-lg shadow-black/50"
                >
                  {/* Article Thumbnail */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                    <img
                      src={article.image}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050b18] via-transparent to-transparent opacity-40" />
                  </div>

                  {/* Article Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-semibold text-cyan-400 tracking-wide uppercase">
                      {article.tag}
                    </span>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>
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

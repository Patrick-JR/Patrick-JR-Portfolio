import React from 'react';
import { ArrowRight, ExternalLink, X, BookOpen, BriefcaseBusiness, Layers3, Sparkles } from 'lucide-react';
import { ArticleItem, ProjectItem, VentureItem, ARTICLES_DATA, PROJECTS_DATA, VENTURES_DATA } from '../data/portfolioData';
import { BuyShareLogo, GiftedLifeLogo, UpleXLogo } from './Icons';

type CollectionType = 'projects' | 'ventures' | 'writing';

interface SectionOverviewModalProps {
  type: CollectionType | null;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectVenture: (venture: VentureItem) => void;
  onSelectArticle: (article: ArticleItem) => void;
  onOpenConnect: () => void;
}

export const SectionOverviewModal: React.FC<SectionOverviewModalProps> = ({
  type,
  onClose,
  onSelectProject,
  onSelectVenture,
  onSelectArticle,
  onOpenConnect
}) => {
  if (!type) return null;

  const meta = type === 'projects'
    ? { kicker: '// PROJECTS', title: 'Things I have built and explored.', desc: 'A deeper look at the software projects, prototypes and product ideas behind the homepage.', icon: <Layers3 className="w-4 h-4" /> }
    : type === 'ventures'
    ? { kicker: '// VENTURES', title: 'Things I am building beyond the code.', desc: 'Products and organisations where the work involves technology, product thinking, business and people.', icon: <BriefcaseBusiness className="w-4 h-4" /> }
    : { kicker: '// WRITING', title: 'Ideas I am working through.', desc: 'Writing is part of how I learn. These pieces can evolve from notes and drafts into published work.', icon: <BookOpen className="w-4 h-4" /> };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 p-3 sm:p-5"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl h-full max-h-[94vh] mx-auto bg-[#060c1c] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black/60 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-800/80 bg-[#040814]/95 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              {meta.icon}
            </span>
            <div>
              <div className="font-mono-tag text-[11px] text-cyan-400 tracking-wider">{meta.kicker}</div>
              <div className="text-xs text-slate-400">{meta.desc}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/80 transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-8 lg:p-10 space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{meta.title}</h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">{type === 'writing'
              ? 'I use writing to make sense of technology, people and the questions that sit underneath what we build.'
              : type === 'projects'
              ? 'Some are prototypes, some are concepts and some are products in progress. I prefer showing their real status rather than making every idea look finished.'
              : 'UpleX AI, BuyShare and Gifted Life represent different sides of my work: business, product building, community and technology.'}
            </p>
          </div>

          {type === 'projects' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {PROJECTS_DATA.map((project) => (
                <button
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="group text-left rounded-2xl overflow-hidden bg-[#050b18] border border-cyan-950/70 hover:border-cyan-500/50 transition-all"
                >
                  <div className="relative aspect-[16/8] overflow-hidden bg-slate-900">
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050b18] via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-[#050b18]/85 text-cyan-300 border-cyan-500/30">
                      {project.status || 'Project'}
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-cyan-400">{project.tag}</div>
                      <h3 className="text-lg font-semibold text-white mt-1 group-hover:text-cyan-300">{project.name}</h3>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400">View project <ArrowRight className="w-3.5 h-3.5" /></span>
                  </div>
                </button>
              ))}
              <button
                onClick={() => onSelectVenture(VENTURES_DATA.find(v => v.id === 'buyshare')!)}
                className="group text-left rounded-2xl p-5 bg-[#050b18] border border-cyan-950/70 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <BuyShareLogo className="w-12 h-12" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-cyan-400">Product / Venture</div>
                    <h3 className="text-lg font-semibold text-white">BuyShare</h3>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mt-4">A co-founded application that is approaching completion.</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 mt-4">View venture <ArrowRight className="w-3.5 h-3.5" /></span>
              </button>
              <button
                onClick={() => onSelectVenture(VENTURES_DATA.find(v => v.id === 'gifted-life')!)}
                className="group text-left rounded-2xl p-5 bg-[#050b18] border border-cyan-950/70 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <GiftedLifeLogo className="w-12 h-12" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-cyan-400">Organisation / App</div>
                    <h3 className="text-lg font-semibold text-white">Gifted Life</h3>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mt-4">An organisation and digital platform focused on talent, growth, mentorship and opportunity.</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 mt-4">View venture <ArrowRight className="w-3.5 h-3.5" /></span>
              </button>
            </div>
          )}

          {type === 'ventures' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {VENTURES_DATA.map((venture) => (
                <button
                  key={venture.id}
                  onClick={() => onSelectVenture(venture)}
                  className="text-left rounded-2xl p-6 bg-[#050b18] border border-cyan-950/70 hover:border-cyan-500/50 transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-5">
                    {venture.logoType === 'uplex' ? <UpleXLogo className="w-10 h-10" /> : venture.logoType === 'buyshare' ? <BuyShareLogo className="w-10 h-10" /> : <GiftedLifeLogo className="w-10 h-10" />}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-cyan-400">{venture.role}</div>
                  <h3 className="text-xl font-semibold text-white mt-1 group-hover:text-cyan-300">{venture.name}</h3>
                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">{venture.description}</p>
                  <div className="flex items-center gap-2 mt-5">
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">{venture.status}</span>
                    <span className="text-xs text-cyan-400 ml-auto">Explore →</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {type === 'writing' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {ARTICLES_DATA.map((article) => (
                <button
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="text-left rounded-2xl overflow-hidden bg-[#050b18] border border-cyan-950/70 hover:border-cyan-500/50 transition-all group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050b18] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] uppercase px-2 py-1 rounded-full bg-[#050b18]/80 text-cyan-300 border border-cyan-500/30">{article.status || 'Draft'}</span>
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] uppercase tracking-wider text-cyan-400">{article.tag}</div>
                    <h3 className="text-lg font-semibold text-white mt-1 group-hover:text-cyan-300 leading-snug">{article.title}</h3>
                    <p className="text-sm text-slate-400 mt-3 leading-relaxed">{article.summary}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 mt-4">Read draft <ArrowRight className="w-3.5 h-3.5" /></span>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/15 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-300 text-sm font-semibold"><Sparkles className="w-4 h-4" /> Always evolving</div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">The site is intentionally built to grow with new products, published writing, screenshots and real outcomes.</p>
            </div>
            <button onClick={() => { onClose(); onOpenConnect(); }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-cyan-400 text-slate-950 text-xs font-semibold hover:bg-cyan-300 transition-colors">
              Start a conversation <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

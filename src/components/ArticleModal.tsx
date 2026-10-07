import React from 'react';
import { X, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { ArticleItem } from '../data/portfolioData';

interface ArticleModalProps {
  article: ArticleItem | null;
  onClose: () => void;
  onOpenConnect: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenConnect,
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#060c1c] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/40 flex flex-col max-h-[92vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#040814]/80">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase">{article.status || 'Draft'}</span>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
              <span>·</span>
              <span>{article.tag}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/80 transition-colors" aria-label="Close dialog">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto">
          <div className="relative aspect-[16/8] bg-slate-900">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060c1c] via-transparent to-transparent" />
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">{article.title}</h2>
              <p className="text-sm text-slate-400 mt-3">{article.date} · A piece I am developing through writing and reflection.</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-cyan-300 border-y border-slate-800 py-3">
              <BookOpen className="w-4 h-4" />
              <span>By Patrick JR Mulenga</span>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
              {article.content}
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-sm text-slate-300 leading-relaxed">
              <span className="text-cyan-400 font-semibold">Key idea: </span>{article.summary}
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-slate-800/80 bg-[#040814]/90 flex items-center justify-between">
          <button onClick={() => { onClose(); onOpenConnect(); }} className="text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1.5">
            Discuss an idea <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button onClick={onClose} className="px-5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all">Close</button>
        </div>
      </div>
    </div>
  );
};

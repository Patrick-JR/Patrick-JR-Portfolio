import React from 'react';
import { X, Clock, Calendar, BookOpen } from 'lucide-react';
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
      <div
        className="relative w-full max-w-2xl bg-[#060c1c] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/40 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#040814]/80">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase">
              {article.tag}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
              <span>·</span>
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/80 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Article Banner Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-slate-800 bg-slate-900">
            <img
              src={article.image}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
            {article.title}
          </h2>

          {/* Author Byline */}
          <div className="flex items-center gap-3 py-2 border-y border-slate-800 text-xs text-slate-400">
            <span className="text-white font-medium">By Patrick JR Mulenga</span>
            <span>·</span>
            <span>Technology & Philosophy Reflections</span>
          </div>

          {/* Body Prose */}
          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
            <span className="text-cyan-400 font-semibold">Key Takeaway:</span> {article.summary}
          </div>
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
            Discuss these ideas with Patrick →
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};

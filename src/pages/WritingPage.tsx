import React from 'react';
import { BookOpen, Calendar, Clock, PenLine } from 'lucide-react';
import { ARTICLES_DATA } from '../data/portfolioData';
import { PageShell, PageSection, PageButton } from '../components/PageShell';

export default function WritingPage() {
 return <PageShell
   kicker="// WRITING & PUBLICATIONS"
   title="Ideas, research and reflections."
   intro="Writing is another way I work. I use it to explore technology, make sense of what I am learning, question ideas and communicate things that may otherwise stay in my head."
 >
  <PageSection>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {ARTICLES_DATA.map(article => <article key={article.id} className="rounded-3xl border border-cyan-950/70 bg-[#050b18] overflow-hidden flex flex-col">
        <img src={article.image} alt={article.title} className="w-full aspect-[4/3] object-cover" />
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-wider text-cyan-400">
            <span>{article.tag}</span><span className="text-emerald-300">{article.status || 'Draft'}</span>
          </div>
          <h2 className="text-xl font-semibold text-white mt-3">{article.title}</h2>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">{article.summary}</p>
          <div className="flex items-center gap-4 text-xs text-slate-500 mt-5 pt-4 border-t border-slate-800">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{article.date}</span>
          </div>
        </div>
      </article>)}
    </div>
  </PageSection>

  {ARTICLES_DATA.map(article => <PageSection key={article.id} kicker={"// " + article.tag.toUpperCase()} title={article.title} className="border-t border-cyan-950/50">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4">
        <div className="rounded-2xl overflow-hidden border border-slate-800">
          <img src={article.image} alt={article.title} className="w-full aspect-[4/3] object-cover" />
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-5"><BookOpen className="w-4 h-4 text-cyan-400"/><span>By Patrick JR Mulenga</span><span>·</span><span>{article.status || 'Draft'}</span></div>
        <div className="space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">{article.content}</div>
        <div className="mt-7 rounded-2xl border border-cyan-500/20 bg-cyan-950/15 p-5 text-sm text-slate-300"><span className="text-cyan-300 font-semibold">Key idea: </span>{article.summary}</div>
      </div>
    </div>
  </PageSection>)}

  <PageSection className="pt-4">
    <div className="rounded-3xl border border-cyan-950/70 bg-[#050b18] p-7 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
      <div><div className="flex items-center gap-2 text-cyan-400 font-semibold"><PenLine className="w-4 h-4"/>Writing in public</div><p className="text-sm text-slate-400 mt-2 max-w-2xl">This section can grow with published essays, research notes, book projects and the lessons I keep collecting from building.</p></div>
      <PageButton href="/contact" secondary>Talk about an idea</PageButton>
    </div>
  </PageSection>
 </PageShell>
}

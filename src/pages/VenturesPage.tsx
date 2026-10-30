import React from 'react';
import { ArrowRight, Building2, HeartHandshake, ShoppingBag } from 'lucide-react';
import { PageShell, PageSection, PageButton } from '../components/PageShell';
import { usePortfolioContent } from '../data/portfolioStore';
import { BuyShareLogo, GiftedLifeLogo, UpleXLogo } from '../components/Icons';

export default function VenturesPage() {
  const { ventures } = usePortfolioContent();
  return <PageShell
    kicker="// VENTURES"
    title="Things I am building beyond the code."
    intro="My ventures sit at the intersection of technology, product building, business and people. They are different projects, but they share the same instinct: find something worth improving and build toward it."
  >
    <PageSection>
      <div className="space-y-8">
        {ventures.map((venture,index) => {
          const Logo = venture.logoType === 'uplex' ? UpleXLogo : venture.logoType === 'buyshare' ? BuyShareLogo : GiftedLifeLogo;
          return <article key={venture.id} className="rounded-3xl border border-cyan-950/70 bg-[#050b18] overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center"><Logo className="w-11 h-11"/></div>
                <div className="font-mono-tag text-cyan-400 text-[11px] mt-6">{String(index+1).padStart(2,'0')} / {venture.role || 'VENTURE'}</div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">{venture.name}</h2>
                <div className="text-sm text-slate-500 mt-2">{venture.status || 'Building'}</div>
              </div>
              <div className="lg:col-span-8 space-y-5">
                <p className="text-lg text-slate-200 leading-relaxed">{venture.description}</p>
                {venture.details && <p className="text-sm sm:text-base text-slate-400 leading-relaxed whitespace-pre-line">{venture.details}</p>}
                <div className="flex flex-wrap items-center gap-3 pt-2"><span className="px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-300 bg-emerald-950/30 text-xs">{venture.status || 'Building'}</span>{venture.actionUrl && <a href={venture.actionUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300">{venture.actionText || 'Visit website'} <ArrowRight className="w-3.5 h-3.5"/></a>}</div>
              </div>
            </div>
          </article>;
        })}
        {ventures.length===0 && <div className="rounded-2xl border border-cyan-950/70 bg-[#050b18] p-8 text-slate-400">Ventures will appear here when they are added in the admin workspace.</div>}
      </div>
    </PageSection>

    <PageSection kicker="// WHY THESE VENTURES" title="Different problems. Same instinct.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[{icon:Building2,title:'Build useful systems',body:'UpleX AI lets me work directly at the intersection of business problems, software and AI.'},{icon:ShoppingBag,title:'Finish products',body:'BuyShare is teaching me what it means to keep pushing an application from idea toward release.'},{icon:HeartHandshake,title:'Build for people',body:'Gifted Life reminds me that technology is valuable when it creates room for people to grow, connect and be seen.'}].map(({icon:Icon,title,body})=><div key={title} className="rounded-2xl border border-cyan-950/70 bg-[#050b18] p-6"><Icon className="w-6 h-6 text-cyan-400 mb-4"/><h3 className="text-lg font-semibold text-white">{title}</h3><p className="text-sm text-slate-400 leading-relaxed mt-2">{body}</p></div>)}
      </div>
    </PageSection>

    <PageSection className="pt-4"><div className="rounded-3xl border border-cyan-500/20 bg-cyan-950/15 p-7 sm:p-10"><div className="font-mono-tag text-cyan-400 text-xs mb-3">// COLLABORATION</div><h2 className="text-2xl sm:text-3xl font-bold text-white">There is room for good people and good ideas.</h2><p className="text-sm text-slate-400 mt-3 max-w-2xl leading-relaxed">Whether the conversation is about software, AI, research, a product idea or a partnership, I am interested in work that has a clear reason to exist.</p><div className="mt-6"><PageButton href="/contact">Get in touch</PageButton></div></div></PageSection>
  </PageShell>;
}

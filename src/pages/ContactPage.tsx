import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowUpRight, Link2 } from 'lucide-react';
import { PageShell, PageSection, PageButton } from '../components/PageShell';
import { usePortfolioContent } from '../data/portfolioStore';

export default function ContactPage() {
  const { links, contact } = usePortfolioContent();
  const [copied,setCopied] = useState(false);
  const email = links.find((link)=>link.href.startsWith('mailto:'));
  const copy = async () => {
    if (!email) return;
    await navigator.clipboard.writeText(email.href.replace('mailto:',''));
    setCopied(true);
    window.setTimeout(()=>setCopied(false),1800);
  };

  return <PageShell kicker="// GET IN TOUCH" title="Let's build something meaningful." intro={contact.description}>
    <PageSection>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 rounded-3xl border border-cyan-950/70 bg-[#050b18] p-7 sm:p-10">
          <div className="font-mono-tag text-cyan-400 text-xs mb-3">// START A CONVERSATION</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{contact.headline}</h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed mt-5 max-w-2xl">You do not need to have the perfect brief. A problem, idea, question or opportunity is enough to start.</p>
          <div className="mt-7 flex flex-wrap gap-3">{email&&<PageButton href={email.href}>Email Patrick</PageButton>}<PageButton href="/projects" secondary>See the work</PageButton></div>
        </div>
        <div className="lg:col-span-5 rounded-3xl border border-cyan-950/70 bg-[#050b18] p-7 sm:p-10">
          <h3 className="text-lg font-semibold text-white">Areas of collaboration</h3>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">{contact.areas.map((item)=><li key={item} className="flex items-start gap-2"><span className="text-cyan-400">✓</span>{item}</li>)}</ul>
        </div>
      </div>
    </PageSection>
    <PageSection kicker="// DIRECT LINKS" title="Find me on the internet.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link)=><div key={link.id} className="rounded-2xl border border-cyan-950/70 bg-[#050b18] p-5 flex items-center justify-between gap-4">
          <a href={link.href} target={link.href.startsWith('http')?'_blank':undefined} rel="noreferrer" className="flex items-center gap-4 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0"><Link2 className="w-4 h-4"/></div>
            <div className="min-w-0"><div className="text-[10px] uppercase tracking-wider text-cyan-400">{link.label}</div><div className="text-sm text-slate-300 truncate mt-1">{link.value}</div></div>
          </a>
          {link.href.startsWith('mailto:') ? <button onClick={copy} className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-cyan-300 shrink-0">{copied?<Check className="w-4 h-4"/>:<Copy className="w-4 h-4"/>}</button> : <a href={link.href} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-300 shrink-0"><ArrowUpRight className="w-4 h-4"/></a>}
        </div>)}
      </div>
    </PageSection>
  </PageShell>;
}

import React, { useState } from 'react';
import { Mail, Linkedin, Github, Youtube, Globe, Copy, Check, ArrowUpRight } from 'lucide-react';
import { PageShell, PageSection, PageButton } from '../components/PageShell';

export default function ContactPage(){
 const [copied,setCopied]=useState(false);
 const copy=()=>{navigator.clipboard.writeText('patrick@uplexai.com'); setCopied(true); setTimeout(()=>setCopied(false),1800);};
 return <PageShell
  kicker="// GET IN TOUCH"
  title="Let's build something meaningful."
  intro="I am open to conversations, collaborations, partnerships, research opportunities and technology work where there is a clear problem worth solving."
 >
  <PageSection>
   <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div className="lg:col-span-7 rounded-3xl border border-cyan-950/70 bg-[#050b18] p-7 sm:p-10">
      <div className="font-mono-tag text-cyan-400 text-xs mb-3">// START A CONVERSATION</div>
      <h2 className="text-3xl sm:text-4xl font-bold text-white">Tell me what you are trying to build.</h2>
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed mt-5 max-w-2xl">You do not need to have the perfect brief. A problem, idea, question or opportunity is enough to start.</p>
      <div className="mt-7 flex flex-wrap gap-3"><PageButton href="mailto:patrick@uplexai.com">Email Patrick</PageButton><PageButton href="/projects" secondary>See the work</PageButton></div>
    </div>
    <div className="lg:col-span-5 rounded-3xl border border-cyan-950/70 bg-[#050b18] p-7 sm:p-10">
      <h3 className="text-lg font-semibold text-white">Good conversations for me include</h3>
      <ul className="mt-5 space-y-3 text-sm text-slate-300">
        {['Software products and engineering','AI applications and automation','Research and technology innovation','Business systems and digital transformation','Product ideas and partnerships'].map(x=><li key={x} className="flex items-start gap-2"><span className="text-cyan-400">✓</span>{x}</li>)}
      </ul>
    </div>
   </div>
  </PageSection>

  <PageSection kicker="// DIRECT LINKS" title="Find me on the internet.">
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      {icon:Mail,label:'Email',value:'patrick@uplexai.com',href:'mailto:patrick@uplexai.com'},
      {icon:Linkedin,label:'LinkedIn',value:'linkedin.com/in/patrick-mulenga',href:'https://linkedin.com/in/patrick-mulenga'},
      {icon:Github,label:'GitHub',value:'github.com/Patrick-JR',href:'https://github.com/Patrick-JR'},
      {icon:Youtube,label:'YouTube',value:'Tech with Patrick',href:'https://youtube.com/@techwithpatrick'},
      {icon:Globe,label:'UpleX AI',value:'www.uplexai.com',href:'https://www.uplexai.com'}
    ].map(({icon:Icon,label,value,href})=><div key={label} className="rounded-2xl border border-cyan-950/70 bg-[#050b18] p-5 flex items-center justify-between gap-4">
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-4 min-w-0">
       <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0"><Icon className="w-4 h-4"/></div>
       <div className="min-w-0"><div className="text-[10px] uppercase tracking-wider text-cyan-400">{label}</div><div className="text-sm text-slate-300 truncate mt-1">{value}</div></div>
      </a>
      {label==='Email' ? <button onClick={copy} className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-cyan-300 shrink-0">{copied?<Check className="w-4 h-4"/>:<Copy className="w-4 h-4"/>}</button> : <a href={href} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-300 shrink-0"><ArrowUpRight className="w-4 h-4"/></a>}
    </div>)}
   </div>
  </PageSection>
 </PageShell>
}

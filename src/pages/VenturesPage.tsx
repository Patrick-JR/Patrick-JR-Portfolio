import React from 'react';
import { ArrowRight, Building2, HeartHandshake, ShoppingBag } from 'lucide-react';
import { VENTURES_DATA } from '../data/portfolioData';
import { PageShell, PageSection, PageButton } from '../components/PageShell';
import { BuyShareLogo, GiftedLifeLogo, UpleXLogo } from '../components/Icons';

const details = {
  'uplex-ai': {
    eyebrow: 'Technology company',
    heading: 'UpleX AI',
    body: 'I founded UpleX AI around a simple belief: businesses should be able to use technology to do what they already do, only better. The work is centred on understanding a business problem first, then deciding where AI, automation or custom software actually makes sense.',
    paragraphs: [
      'UpleX AI works across AI agents and automation, smart business systems, intelligent websites, custom software and AI consultation.',
      'The company is intentionally practical. A client does not need another list of tools. They need to understand the problem, the opportunity, the risks, the system that could help and what it will take to implement it.'
    ],
    role: 'Founder & CEO'
  },
  'buyshare': {
    eyebrow: 'Co-founded product',
    heading: 'BuyShare',
    body: 'BuyShare is an application I am building with a friend. The product is approaching completion, and it represents a different side of my work: building a product together from idea to usable software.',
    paragraphs: [
      'The platform is being developed around buying and selling products and services with an emphasis on making the experience simple and trustworthy.',
      'As the product gets closer to release, this portfolio will be updated with the final product story, interface, technology choices and live link.'
    ],
    role: 'Co-founder & Product Builder'
  },
  'gifted-life': {
    eyebrow: 'Organisation + digital platform',
    heading: 'Gifted Life',
    body: 'Gifted Life is a people-focused initiative built around talent, growth, mentorship and opportunity. I created it because I believe many people have ability that needs a place, a platform and the right people around them before it can become visible.',
    paragraphs: [
      'The initiative includes community activities, storytelling, mentorship and opportunities for people to express their gifts. It is not only a software project.',
      'The Gifted Life app extends that idea into a digital space where people can showcase their talents, build a presence, connect with communities and discover opportunities. The app and the wider organisation are still being shaped.'
    ],
    role: 'Founder'
  }
};

export default function VenturesPage() {
  return (
    <PageShell
      kicker="// VENTURES"
      title="Things I am building beyond the code."
      intro="My ventures sit at the intersection of technology, product building, business and people. They are different projects, but they share the same instinct: find something worth improving and build toward it."
    >
      <PageSection>
        <div className="space-y-8">
          {VENTURES_DATA.map((venture, index) => {
            const item = details[venture.id as keyof typeof details];
            const Logo = venture.logoType === 'uplex' ? UpleXLogo : venture.logoType === 'buyshare' ? BuyShareLogo : GiftedLifeLogo;
            return (
              <article key={venture.id} className="rounded-3xl border border-cyan-950/70 bg-[#050b18] overflow-hidden">
                <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center"><Logo className="w-11 h-11" /></div>
                    <div className="font-mono-tag text-cyan-400 text-[11px] mt-6">{String(index + 1).padStart(2,'0')} / {item.eyebrow}</div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">{item.heading}</h2>
                    <div className="text-sm text-slate-500 mt-2">{item.role}</div>
                  </div>
                  <div className="lg:col-span-8 space-y-5">
                    <p className="text-lg text-slate-200 leading-relaxed">{item.body}</p>
                    {item.paragraphs.map((p,i) => <p key={i} className="text-sm sm:text-base text-slate-400 leading-relaxed">{p}</p>)}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <span className="px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-300 bg-emerald-950/30 text-xs">{venture.status || 'Building'}</span>
                      {venture.actionUrl && <a href={venture.actionUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300">Visit website <ArrowRight className="w-3.5 h-3.5" /></a>}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </PageSection>

      <PageSection kicker="// WHY THESE VENTURES" title="Different problems. Same instinct.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {icon: Building2,title:'Build useful systems',body:'UpleX AI lets me work directly at the intersection of business problems, software and AI.'},
            {icon: ShoppingBag,title:'Finish products',body:'BuyShare is teaching me what it means to keep pushing an application from idea toward release.'},
            {icon: HeartHandshake,title:'Build for people',body:'Gifted Life reminds me that technology is valuable when it creates room for people to grow, connect and be seen.'}
          ].map(({icon:Icon,title,body}) => (
            <div key={title} className="rounded-2xl border border-cyan-950/70 bg-[#050b18] p-6">
              <Icon className="w-6 h-6 text-cyan-400 mb-4" />
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mt-2">{body}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection className="pt-4">
        <div className="rounded-3xl border border-cyan-500/20 bg-cyan-950/15 p-7 sm:p-10">
          <div className="font-mono-tag text-cyan-400 text-xs mb-3">// COLLABORATION</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">There is room for good people and good ideas.</h2>
          <p className="text-sm text-slate-400 mt-3 max-w-2xl leading-relaxed">Whether the conversation is about software, AI, research, a product idea or a partnership, I am interested in work that has a clear reason to exist.</p>
          <div className="mt-6"><PageButton href="/contact">Get in touch</PageButton></div>
        </div>
      </PageSection>
    </PageShell>
  );
}

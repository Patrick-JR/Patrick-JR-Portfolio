import React from 'react';
import { ArrowRight, Play, Youtube, BookOpen, Lightbulb } from 'lucide-react';
import { PageShell, PageSection, PageButton } from '../components/PageShell';

const pillars=[
 ['AI made understandable','Break down AI concepts, research and new developments without turning every explanation into a wall of jargon.'],
 ['Building with technology','Share lessons from software projects, prototypes, APIs, automation and product decisions.'],
 ['Research and reality','Look at what current technology claims, what the evidence actually says and where uncertainty remains.'],
 ['Technology in context','Explore what AI and modern software mean for businesses, students, builders, Africa and ordinary users.']
];

export default function TechWithPatrickPage(){
 return <PageShell
  kicker="// TECH WITH PATRICK"
  title="Explore AI. Understand technology. Use it to your advantage."
  intro="Tech with Patrick is my public learning and education platform. It is where I share what I am learning about AI and modern technology and make those ideas easier to follow for people who do not live inside technical language."
 >
  <PageSection>
   <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
    <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-cyan-950/70 bg-[#050b18]">
      <img src="/src/assets/images/tech_with_patrick_studio_1791242102261.jpg" alt="Tech with Patrick" className="w-full h-full min-h-[320px] object-cover"/>
    </div>
    <div className="lg:col-span-7 rounded-3xl border border-cyan-950/70 bg-[#050b18] p-7 sm:p-10 flex flex-col justify-center">
      <div className="flex items-center gap-2 text-cyan-400 font-mono-tag text-xs"><Youtube className="w-4 h-4"/> @techwithpatrick</div>
      <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">Learning in public, without the jargon.</h2>
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed mt-5">
        I want Tech with Patrick to be a place where someone can hear about a new AI model, an interesting research paper, a software concept or a new technology trend and leave with a clearer understanding of what it actually means.
      </p>
      <div className="mt-7"><PageButton href="https://youtube.com/@techwithpatrick">Visit YouTube</PageButton></div>
    </div>
   </div>
  </PageSection>

  <PageSection kicker="// CONTENT PILLARS" title="What you will find here.">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {pillars.map(([title,body],i)=><article key={title} className="rounded-2xl border border-cyan-950/70 bg-[#050b18] p-7">
        <div className="font-mono-tag text-cyan-400 text-xs">0{i+1}</div>
        <h3 className="text-xl font-semibold text-white mt-3">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed mt-3">{body}</p>
      </article>)}
    </div>
  </PageSection>

  <PageSection kicker="// WHY IT EXISTS" title="Because technology should not be a private language.">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-3xl border border-cyan-950/70 bg-[#050b18] p-7">
        <Lightbulb className="w-6 h-6 text-cyan-400 mb-4"/>
        <h3 className="text-2xl font-bold text-white">For people who want to understand.</h3>
        <p className="text-sm text-slate-400 leading-relaxed mt-3">Students, business people, creators and curious minds should be able to follow what is happening in technology even when they are not programmers.</p>
      </div>
      <div className="rounded-3xl border border-cyan-950/70 bg-[#050b18] p-7">
        <BookOpen className="w-6 h-6 text-cyan-400 mb-4"/>
        <h3 className="text-2xl font-bold text-white">For me, it is also a learning system.</h3>
        <p className="text-sm text-slate-400 leading-relaxed mt-3">Explaining a concept forces me to understand it. Researching a claim forces me to check it. Teaching helps the learning stick.</p>
      </div>
    </div>
  </PageSection>

  <PageSection className="pt-4">
   <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
    <div><div className="font-mono-tag text-cyan-400 text-xs mb-2">// KEEP WATCHING</div><h2 className="text-2xl font-bold text-white">The channel grows with the journey.</h2></div>
    <a href="https://youtube.com/@techwithpatrick" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">Visit Tech with Patrick <ArrowRight className="w-4 h-4"/></a>
   </div>
  </PageSection>
 </PageShell>
}

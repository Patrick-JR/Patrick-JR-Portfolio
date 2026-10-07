import React from 'react';
import { Code2, Brain, Database, Search, Layers3, Terminal } from 'lucide-react';
import { PageShell, PageSection } from '../components/PageShell';

const groups = [
  {icon:Code2,title:'Software development',desc:'The foundation of my work is building and understanding software.',items:['HTML','CSS','JavaScript','Python','Web applications','Full-stack development','API integration','UI prototyping']},
  {icon:Brain,title:'AI & automation',desc:'I am interested in what happens when AI becomes part of an actual workflow.',items:['AI agents','LLM integration','Prompt and system design','n8n','Make.com','Relevance AI','Chatbase','AI-powered workflows']},
  {icon:Database,title:'Data & backend',desc:'I work with data as the layer that makes digital systems useful.',items:['SQLite','Firebase','Airtable','Google Sheets','APIs','Data processing','Structured data','Document extraction']},
  {icon:Search,title:'Research & product',desc:'Technology choices only matter when they serve a clear product or research question.',items:['Technical research','Product prototyping','Business analysis','AI solution design','Problem discovery','Documentation','Source-grounded thinking']},
];

export default function SkillsPage() {
 return <PageShell
   kicker="// SKILLS & TECHNOLOGIES"
   title="What I use, what I understand, and what I am still learning."
   intro="I do not want this page to read like a catalogue of technologies. These are tools and areas that have appeared in my learning and building journey, with room for the list to change as my engineering grows."
 >
   <PageSection>
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       {groups.map(({icon:Icon,title,desc,items}) => <article key={title} className="rounded-3xl border border-cyan-950/70 bg-[#050b18] p-7 sm:p-8">
         <div className="w-11 h-11 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400"><Icon className="w-5 h-5" /></div>
         <h2 className="text-2xl font-bold text-white mt-5">{title}</h2>
         <p className="text-sm text-slate-400 mt-2 leading-relaxed">{desc}</p>
         <div className="flex flex-wrap gap-2 mt-6">{items.map(item => <span key={item} className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">{item}</span>)}</div>
       </article>)}
     </div>
   </PageSection>

   <PageSection kicker="// ENGINEERING MINDSET" title="The skill I am trying to compound is not a framework.">
     <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
       {[['Understand the problem','Before choosing a tool, I want to understand the person, business or system the software is supposed to help.'],['Learn the underlying idea','A framework changes. The concepts underneath it are what keep paying dividends.'],['Build and explain','I learn fastest when I can make something work and then explain what I built clearly.']].map(([t,b]) => <div key={t} className="rounded-2xl border border-cyan-950/70 bg-[#050b18] p-6"><Terminal className="w-5 h-5 text-cyan-400 mb-4"/><h3 className="text-lg font-semibold text-white">{t}</h3><p className="text-sm text-slate-400 mt-2 leading-relaxed">{b}</p></div>)}
     </div>
   </PageSection>

   <PageSection kicker="// CURRENT LEARNING" title="What is next in the engineering stack.">
     <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#07152b] to-[#04101e] p-7 sm:p-10">
       <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
         I am continuing to deepen my full-stack engineering skills while building stronger foundations in modern JavaScript ecosystems, backend engineering and AI application architecture. React, Node.js, Next.js, Flask and Flutter are part of that learning direction rather than technologies I want to pretend I have already mastered.
       </p>
     </div>
   </PageSection>
 </PageShell>
}

import React from 'react';
import { Code2, Brain, Database, Search, Terminal } from 'lucide-react';
import { PageShell, PageSection } from '../components/PageShell';
import { usePortfolioContent } from '../data/portfolioStore';

const iconMap: Record<string, React.ElementType> = { code: Code2, brain: Brain, database: Database, research: Search };

export default function SkillsPage() {
  const { skills } = usePortfolioContent();

  return (
    <PageShell
      kicker="// SKILLS & TECHNOLOGIES"
      title="What I use, what I understand, and what I am still learning."
      intro="I do not want this page to read like a catalogue of technologies. These are tools and areas that have appeared in my learning and building journey, with room for the list to change as my engineering grows."
    >
      <PageSection>
        {skills.length === 0 ? <div className="rounded-2xl border border-cyan-950/70 bg-[#050b18] p-8 text-slate-400">Skills will appear here as they are added in the admin workspace.</div> :
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {skills.map((group) => {
              const Icon = iconMap[group.icon] || Code2;
              return <article key={group.id} className="rounded-3xl border border-cyan-950/70 bg-[#050b18] p-7 sm:p-8">
                <div className="w-11 h-11 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400"><Icon className="w-5 h-5"/></div>
                <h2 className="text-2xl font-bold text-white mt-5">{group.category}</h2>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">Tools and abilities I am developing and applying through practical work.</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {group.skills.map((skill) => <span key={skill.id} className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">{skill.name}<span className="ml-2 text-[9px] text-cyan-300/70">{skill.level}</span></span>)}
                </div>
              </article>;
            })}
          </div>
        }
      </PageSection>

      <PageSection kicker="// ENGINEERING MINDSET" title="The skill I am trying to compound is not a framework.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            ['Understand the problem','Before choosing a tool, I want to understand the person, business or system the software is supposed to help.'],
            ['Learn the underlying idea','A framework changes. The concepts underneath it are what keep paying dividends.'],
            ['Build and explain','I learn fastest when I can make something work and then explain what I built clearly.']
          ].map(([title,body]) => <div key={title} className="rounded-2xl border border-cyan-950/70 bg-[#050b18] p-6"><Terminal className="w-5 h-5 text-cyan-400 mb-4"/><h3 className="text-lg font-semibold text-white">{title}</h3><p className="text-sm text-slate-400 mt-2 leading-relaxed">{body}</p></div>)}
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
  );
}

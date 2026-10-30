import React from 'react';
import { ArrowUpRight, Code2, Eye, Layers3 } from 'lucide-react';
import { usePortfolioContent } from '../data/portfolioStore';
import { PageShell, PageSection, PageButton } from '../components/PageShell';

const extraProjects = [
  {
    name: 'Redox',
    tag: 'Business Intelligence / Product Concept',
    description: 'An executive dashboard concept designed to give a growing multi-branch business a quick view of shops, employees, logins, sales activity and alerts, with an AI layer that can answer questions about what is happening.',
    status: 'Demo concept',
    note: 'The current direction is intentionally phased, starting with the main executive and branch experience before regional management and deeper operational features.'
  },
  {
    name: 'Jelumu / Jelo Digital Showroom',
    tag: 'Automotive / Product Prototype',
    description: 'A digital showroom and administration concept for a Zambian car company, combining vehicle inventory, pricing, mileage, condition, imagery and an AI-assisted customer experience.',
    status: 'Prototype',
    note: 'The aim is to demonstrate how a modern vehicle company could present inventory and answer customer questions digitally.'
  }
];

export default function ProjectsPage() {
  const { projects } = usePortfolioContent();
  return (
    <PageShell
      kicker="// PROJECTS"
      title="Things I have built, explored and prototyped."
      intro="This is the deeper project archive. Some projects are prototypes, some are product ideas and some are works in progress. I prefer showing their real stage rather than making every project look finished."
    >
      <PageSection kicker="// FEATURED WORK" title="The projects behind the homepage.">
        <div className="space-y-10">
          {PROJECTS_DATA.map((project, index) => (
            <article key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start rounded-3xl border border-cyan-950/70 bg-[#050b18] p-5 sm:p-7">
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
                  <img src={project.image} alt={project.name} className="w-full aspect-[16/9] object-cover object-top" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#030712]/85 border border-cyan-500/30 text-[10px] uppercase tracking-wider text-cyan-300">{project.status || 'Project'}</div>
                </div>
              </div>
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <div className="font-mono-tag text-cyan-400 text-[11px]">{String(index + 1).padStart(2,'0')} / {project.tag}</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">{project.name}</h2>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{project.fullOverview || project.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-4"><div className="text-[10px] uppercase tracking-wider text-cyan-400">My role</div><div className="text-sm text-white mt-1">{project.role || 'Builder / product work'}</div></div>
                  <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-4"><div className="text-[10px] uppercase tracking-wider text-cyan-400">Status</div><div className="text-sm text-white mt-1">{project.status || 'In progress'}</div></div>
                </div>
                {project.techStack && <div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2"><Code2 className="w-3.5 h-3.5" /> Technologies / areas</div><div className="flex flex-wrap gap-2">{project.techStack.map(t => <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">{t}</span>)}</div></div>}
                {project.notes && <p className="text-xs text-slate-500 leading-relaxed border-l-2 border-cyan-900 pl-3">{project.notes}</p>}
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection kicker="// OTHER BUILDS" title="Projects that are still taking shape.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {extraProjects.map(project => (
            <article key={project.name} className="rounded-3xl border border-cyan-950/70 bg-[#050b18] p-7">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400"><Layers3 className="w-5 h-5" /></div>
                <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-emerald-500/30 text-emerald-300 bg-emerald-950/30">{project.status}</span>
              </div>
              <div className="font-mono-tag text-[11px] text-cyan-400">{project.tag}</div>
              <h3 className="text-2xl font-bold text-white mt-2">{project.name}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mt-4">{project.description}</p>
              <p className="text-xs text-slate-500 leading-relaxed mt-5">{project.note}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection kicker="// HOW I THINK ABOUT PROJECTS" title="A project is more than a screenshot.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            ['01', 'Problem', 'What needs to change, and for whom?'],
            ['02', 'System', 'What software, data, workflow or interface could make that change possible?'],
            ['03', 'Reality', 'What is actually implemented today, what is uncertain, and what would it take to make it real?']
          ].map(([n,t,b]) => (
            <div key={n} className="rounded-2xl border border-cyan-950/70 bg-[#050b18] p-6">
              <div className="font-mono-tag text-cyan-400 text-xs">{n}</div>
              <h3 className="text-xl font-semibold text-white mt-3">{t}</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection className="pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div><div className="font-mono-tag text-cyan-400 text-xs mb-2">// KEEP EXPLORING</div><h2 className="text-2xl font-bold text-white">The work continues.</h2></div>
          <div className="flex flex-wrap gap-3"><PageButton href="/ventures">See my ventures</PageButton><PageButton href="/contact" secondary>Start a conversation</PageButton></div>
        </div>
      </PageSection>
    </PageShell>
  );
}

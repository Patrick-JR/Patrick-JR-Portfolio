import React from 'react';
import { Code2, Brain, Search, Rocket, PenLine, BookOpen, GraduationCap, Lightbulb, Target } from 'lucide-react';
import { PageShell, PageSection, PageButton } from '../components/PageShell';

const focus = [
  { icon: Code2, title: 'Software engineering', body: 'I build web applications, digital products and systems. I enjoy understanding the problem first, then choosing the simplest architecture that can carry the idea forward.' },
  { icon: Brain, title: 'Artificial intelligence', body: 'I explore AI agents, LLM integrations, automation and practical AI applications, especially where intelligence can be connected to real workflows.' },
  { icon: Search, title: 'Research', body: 'I spend time studying emerging technology, current research and the question underneath the technology: what does this actually change in the real world?' },
  { icon: Rocket, title: 'Entrepreneurship', body: 'I build ventures where technology, product thinking and business meet. UpleX AI, BuyShare and Gifted Life each represent a different part of that journey.' },
  { icon: PenLine, title: 'Writing', body: 'Writing helps me think. I use it to explain technology, document ideas, question assumptions and reflect on the process of becoming a better builder.' }
];

export default function AboutPage() {
  return (
    <PageShell
      kicker="// ABOUT PATRICK"
      title="A curious mind. A builder at heart."
      intro="I’m Patrick JR Mulenga, a software and AI engineer, researcher, entrepreneur and writer. This page is a fuller picture of who I am, how I learn, what I build and what keeps me interested."
    >
      <PageSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-cyan-950/70 bg-[#050b18] sticky top-28">
              <img
                src="/src/assets/images/patrick_hero_portrait_1791242015197.jpg"
                alt="Patrick JR Mulenga"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="p-5 border-t border-slate-800">
                <div className="font-mono-tag text-xs text-cyan-400">patrick.jr.mulenga</div>
                <p className="text-sm text-slate-400 mt-2">Software Engineer · AI Engineer · Researcher · Entrepreneur · Writer</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 text-slate-300 leading-relaxed">
            <p className="text-xl text-white leading-relaxed">
              I became interested in technology because I wanted to understand how things work and, eventually, how to build things myself.
            </p>
            <p>
              My path into engineering has been largely self-directed. I have learned through courses, documentation, experiments, prototypes, failed attempts and the practical pressure of trying to make an idea work. That process has taught me something I still carry into every project: knowing a tool is not the same as understanding a problem.
            </p>
            <p>
              I’m especially interested in the space where software becomes useful outside the screen. That might mean an AI workflow that saves a business from repetitive work, a civic system that makes information easier to follow, a school platform that removes administrative friction, or a product that gives people a new way to transact and connect.
            </p>
            <p>
              I also care about the ideas around technology. I want to understand not only what we can build, but what we should build, who benefits, what assumptions are hidden inside a system, and what happens when technology meets real institutions, real businesses and real people.
            </p>

            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/15 p-6">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold"><Lightbulb className="w-4 h-4" /> A simple principle</div>
              <p className="text-base text-slate-200 mt-3">
                Technology is a tool. Human potential is the reason.
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection kicker="// HOW I WORK" title="The things I keep coming back to.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            ['Curiosity', 'I ask questions before I rush into implementation. Understanding why something matters usually changes what should be built.'],
            ['Independent learning', 'My engineering journey depends heavily on teaching myself, testing what I learn and turning knowledge into something tangible.'],
            ['Practical usefulness', 'I’m more interested in a working solution to a meaningful problem than a flashy demo with no place in the real world.'],
            ['Clear communication', 'I enjoy making technical ideas easier to understand, whether I’m talking to another developer, a business owner or someone with no technical background.'],
            ['Ownership', 'When I take on an idea, I want to understand the product, not only my piece of the code.'],
            ['Continuous growth', 'I see this portfolio as a record of the journey. It should show what I have built, what I am still learning and how the work changes over time.']
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-cyan-950/70 bg-[#050b18] p-6 hover:border-cyan-500/30 transition-colors">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mt-3">{body}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection kicker="// WHERE I FOCUS" title="Five parts of the same journey.">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {focus.map(({icon:Icon,title,body}) => (
            <div key={title} className="rounded-2xl border border-cyan-950/70 bg-[#050b18] p-5">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">{title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection kicker="// THE LEARNING JOURNEY" title="I am still becoming the engineer I want to be.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-cyan-950/70 bg-[#050b18] p-7">
            <GraduationCap className="w-6 h-6 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold text-white">Learning by building</h3>
            <p className="text-sm text-slate-400 leading-relaxed mt-3">
              My learning is not limited to courses. I use real projects to force myself to understand software architecture, APIs, databases, AI integration, user experience and the decisions that make a product maintainable.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-950/70 bg-[#050b18] p-7">
            <Target className="w-6 h-6 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold text-white">What I’m working toward</h3>
            <p className="text-sm text-slate-400 leading-relaxed mt-3">
              I want to become a stronger full-stack and AI product engineer, build companies around useful technology, contribute to meaningful research and keep creating work that is useful beyond myself.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection className="pt-4">
        <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#07152b] to-[#04101e] p-7 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="font-mono-tag text-cyan-400 text-xs mb-3">// NEXT</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">See what the ideas became.</h2>
            <p className="text-sm text-slate-400 mt-2">Explore the products, prototypes and ventures I’m working on.</p>
          </div>
          <PageButton href="/projects">Explore projects</PageButton>
        </div>
      </PageSection>
    </PageShell>
  );
}

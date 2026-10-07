import React from 'react';
import {
  X,
  MapPin,
  Sparkles,
  BookOpen,
  Heart,
  ArrowRight,
  Code2,
  Brain,
  Search,
  Rocket,
  PenLine
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConnect: () => void;
}

const values = [
  {
    title: 'Build with purpose',
    body: 'I am most interested in technology when it solves a real problem, removes friction or gives someone a new ability.'
  },
  {
    title: 'Keep learning',
    body: 'My path is strongly self-directed. I learn by studying, building, breaking things, rebuilding them and explaining what I discover.'
  },
  {
    title: 'Make complex things useful',
    body: 'I enjoy taking powerful technical ideas and turning them into products, systems and explanations that people can actually use.'
  },
  {
    title: 'Think beyond the code',
    body: 'Engineering, research, product thinking, business and communication all matter when the goal is to build something that survives in the real world.'
  }
];

const focus = [
  { title: 'Software engineering', icon: <Code2 className="w-4 h-4" />, body: 'Web products, digital systems and full-stack development.' },
  { title: 'Artificial intelligence', icon: <Brain className="w-4 h-4" />, body: 'AI agents, LLM integrations, automation and practical AI applications.' },
  { title: 'Research', icon: <Search className="w-4 h-4" />, body: 'Emerging technology, its implications and where it can create useful leverage.' },
  { title: 'Entrepreneurship', icon: <Rocket className="w-4 h-4" />, body: 'Building UpleX AI and products such as BuyShare and Gifted Life.' },
  { title: 'Writing', icon: <PenLine className="w-4 h-4" />, body: 'Ideas, essays, lessons and reflections through writing and Tech with Patrick.' }
];

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenConnect,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#060c1c] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black/60 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-800/80 bg-[#040814]/90 shrink-0">
          <div>
            <div className="font-mono-tag text-[11px] text-cyan-400 tracking-wider">// ABOUT PATRICK</div>
            <div className="text-sm text-slate-400 mt-1">Background, work, ideas and what I am building.</div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/80 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto">
          <section className="grid grid-cols-1 lg:grid-cols-5 border-b border-slate-800/70">
            <div className="lg:col-span-2 min-h-[280px] relative overflow-hidden">
              <img
                src="/src/assets/images/patrick_hero_portrait_1791242015197.jpg"
                alt="Patrick JR Mulenga"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060c1c] via-transparent to-transparent" />
            </div>

            <div className="lg:col-span-3 p-6 sm:p-9 space-y-5">
              <div className="flex items-center gap-2 text-cyan-400 text-xs">
                <MapPin className="w-3.5 h-3.5" />
                <span>Zambia</span>
                <span className="text-slate-600">•</span>
                <span>Software & AI Engineer</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">A curious mind, a builder at heart.</h2>
              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                <p>
                  I’m Patrick JR Mulenga, a software and AI engineer, researcher, entrepreneur and writer. I’m interested in the space where technology stops being a demo and becomes something useful to a person, business or institution.
                </p>
                <p>
                  I have built and explored projects across civic technology, business systems, education, logistics and AI. I also learn in public through Tech with Patrick, where I break down modern technology and explore what it could mean for people who are not necessarily technical.
                </p>
              </div>
            </div>
          </section>

          <section className="p-6 sm:p-9 border-b border-slate-800/70">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">What drives the work</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((item) => (
                <div key={item.title} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                  <h4 className="text-sm font-semibold text-cyan-300 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 sm:p-9 border-b border-slate-800/70">
            <div className="flex items-center gap-2 mb-5">
              <Heart className="w-4 h-4 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Where I focus</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {focus.map((item) => (
                <div key={item.title} className="p-4 rounded-2xl bg-[#050b18] border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="font-mono-tag text-[11px] text-cyan-400 mb-3">// CURRENTLY BUILDING</div>
              <h3 className="text-2xl font-bold text-white">Turning ideas into real products.</h3>
              <p className="text-sm text-slate-400 leading-relaxed mt-4">
                Right now my work sits across a few connected worlds: building UpleX AI, finishing BuyShare with my co-founder, continuing the Gifted Life initiative and app, and developing software prototypes that test ideas in public and civic systems.
              </p>
            </div>
            <div className="rounded-2xl bg-cyan-950/20 border border-cyan-500/20 p-6">
              <div className="flex items-center gap-2 text-cyan-300 text-sm font-semibold mb-4">
                <BookOpen className="w-4 h-4" />
                <span>One thing I am always doing</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Learning. I do not see engineering as a finished skill set. I want this portfolio to document that process honestly, from experiments and prototypes to products that actually ship.
              </p>
            </div>
          </section>
        </div>

        <div className="p-4 sm:p-5 border-t border-slate-800/80 bg-[#040814]/95 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenConnect();
            }}
            className="flex items-center gap-2 text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 font-medium"
          >
            <span>Let’s collaborate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-full transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

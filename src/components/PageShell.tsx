import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageShellProps {
  kicker: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ kicker, title, intro, children }) => (
  <div className="min-h-screen bg-[#030712] text-slate-100 pb-16 lg:pb-0">
    <Navbar onOpenConnect={() => { window.location.href = '/contact'; }} />
    <main>
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 border-b border-cyan-950/50 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-300 transition-colors mb-8">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back home
          </a>
          <div className="max-w-4xl">
            <div className="font-mono-tag text-cyan-400 text-xs sm:text-sm tracking-wider font-medium mb-4">{kicker}</div>
            <h1 className="font-mono-tag text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">{title}</h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed mt-6">{intro}</p>
          </div>
        </div>
      </section>
      {children}
    </main>
    <Footer />
  </div>
);

export const PageSection: React.FC<{
  kicker?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ kicker, title, children, className = '' }) => (
  <section className={"py-16 lg:py-24 " + className}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {kicker && <div className="font-mono-tag text-cyan-400 text-xs tracking-wider font-medium mb-4">{kicker}</div>}
      {title && <h2 className="font-mono-tag text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-8">{title}</h2>}
      {children}
    </div>
  </section>
);

export const PageButton: React.FC<{href:string; children:React.ReactNode; secondary?:boolean}> = ({href,children,secondary}) => (
  <a
    href={href}
    className={secondary
      ? "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-700 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors text-sm"
      : "inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 transition-colors text-sm shadow-[0_0_20px_rgba(6,182,212,0.25)]"}
  >
    {children}
    <ArrowRight className="w-4 h-4" />
  </a>
);

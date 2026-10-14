import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from '../context/RouterContext';

interface PageShellProps {
  kicker: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ kicker, title, intro, children }) => {
  const { isDark } = useTheme();
  const { navigate } = useRouter();

  return (
    <div className={`min-h-screen pb-16 lg:pb-0 transition-colors duration-200 ${isDark ? 'bg-[#030712] text-slate-100' : 'bg-white text-slate-900'}`}>
      <Navbar onOpenConnect={() => navigate('/contact')} />
      <main>
        <section className={`pt-32 pb-12 lg:pt-40 lg:pb-16 border-b transition-colors ${isDark ? 'border-cyan-950/50 bg-[#030712]' : 'border-slate-200 bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => navigate('/')}
              className={`inline-flex items-center gap-2 text-xs transition-colors mb-8 cursor-pointer ${isDark ? 'text-slate-400 hover:text-cyan-300' : 'text-slate-600 hover:text-cyan-600'}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back home
            </button>
            <div className="max-w-4xl">
              <div className="font-mono-tag text-cyan-500 text-xs sm:text-sm tracking-wider font-medium mb-4">{kicker}</div>
              <h1 className={`font-mono-tag text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h1>
              <p className={`text-base sm:text-lg max-w-3xl leading-relaxed mt-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{intro}</p>
            </div>
          </div>
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export const PageSection: React.FC<{
  kicker?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ kicker, title, children, className = '' }) => {
  const { isDark } = useTheme();

  return (
    <section className={"py-16 lg:py-24 " + className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {kicker && <div className="font-mono-tag text-cyan-500 text-xs tracking-wider font-medium mb-4">{kicker}</div>}
        {title && <h2 className={`font-mono-tag text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>}
        {children}
      </div>
    </section>
  );
};

export const PageButton: React.FC<{ href: string; children: React.ReactNode; secondary?: boolean }> = ({ href, children, secondary }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={secondary
        ? "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-700 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors text-sm cursor-pointer"
        : "inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 transition-colors text-sm shadow-[0_0_20px_rgba(6,182,212,0.25)] cursor-pointer"}
    >
      {children}
      <ArrowRight className="w-4 h-4" />
    </a>
  );
};

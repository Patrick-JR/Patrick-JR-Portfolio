import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowRight } from 'lucide-react';
import { PMLogo } from './Icons';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from '../context/RouterContext';

interface NavbarProps {
  onOpenConnect?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConnect }) => {
  const [scrolled, setScrolled] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const { path: currentPath, navigate } = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // These are real page routes, not homepage section anchors.
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Ventures', href: '/ventures' },
    { name: 'Skills', href: '/skills' },
    { name: 'Writing', href: '/writing' },
    { name: 'Tech with Patrick', href: '/tech-with-patrick' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (currentPath === href) {
      if (href === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate(href);
  };

  const handleConnectClick = () => {
    if (onOpenConnect) onOpenConnect();
    else navigate('/contact');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isDark
          ? scrolled
            ? 'bg-[#030712]/92 backdrop-blur-md border-b border-cyan-950/40 shadow-lg shadow-black/40'
            : 'bg-[#030712]/70 backdrop-blur-sm'
          : scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Patrick JR Mulenga Home"
        >
          <PMLogo className="w-10 h-10" />
        </a>

        <nav className="hidden lg:flex items-center space-x-5 xl:space-x-6 text-sm" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              aria-current={currentPath === link.href ? 'page' : undefined}
              className={`transition-colors whitespace-nowrap text-[13px] tracking-wide cursor-pointer ${
                currentPath === link.href
                  ? 'text-cyan-400 font-semibold'
                  : isDark
                  ? 'text-slate-300 hover:text-cyan-300'
                  : 'text-slate-900 hover:text-cyan-600 font-medium'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className={`p-2 rounded-full transition-colors cursor-pointer ${isDark ? 'text-slate-400 hover:text-cyan-300' : 'text-black hover:text-cyan-600'}`}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-black" />}
          </button>
          <button
            onClick={handleConnectClick}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-95 rounded-full transition-all shadow-[0_0_15px_rgba(6,182,212,0.35)] cursor-pointer"
          >
            <span>Let's Connect</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        <div className="flex lg:hidden items-center gap-2.5">
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className={`p-2 rounded-full border cursor-pointer transition-colors ${isDark ? 'border-slate-800 bg-slate-900/60 text-amber-300' : 'border-slate-200 bg-white text-black shadow-xs'}`}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-black" />}
          </button>
          <button
            onClick={handleConnectClick}
            className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-95 rounded-full cursor-pointer shadow-xs"
          >
            <span>Connect</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </header>
  );
};

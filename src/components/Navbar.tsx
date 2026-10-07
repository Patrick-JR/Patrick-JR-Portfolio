import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowRight } from 'lucide-react';
import { PMLogo } from './Icons';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps { onOpenConnect?: () => void; }

export const Navbar: React.FC<NavbarProps> = ({ onOpenConnect }) => {
  const [scrolled, setScrolled] = useState(false);
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const current = window.location.pathname;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isDark ? (scrolled ? 'bg-[#030712]/92 backdrop-blur-md border-b border-cyan-950/40 shadow-lg shadow-black/40' : 'bg-[#030712]/65 backdrop-blur-sm') : (scrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md' : 'bg-white/90 backdrop-blur-sm border-b border-slate-100')}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2" aria-label="Patrick JR Mulenga Home"><PMLogo className="w-10 h-10"/></a>
        <nav className="hidden lg:flex items-center space-x-6 text-sm">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className={`transition-colors whitespace-nowrap text-[13px] tracking-wide ${current===link.href ? 'text-cyan-300' : isDark ? 'text-slate-300 hover:text-cyan-300' : 'text-slate-900 hover:text-cyan-600'}`}>{link.name}</a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full text-slate-400 hover:text-cyan-300 transition-colors">
            {isDark ? <Sun className="w-4 h-4 text-amber-300"/> : <Moon className="w-4 h-4 text-black"/>}
          </button>
          <button onClick={onOpenConnect} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all shadow-[0_0_15px_rgba(6,182,212,0.35)]">
            Let's Connect <ArrowRight className="w-3.5 h-3.5"/>
          </button>
        </div>
        <div className="flex lg:hidden items-center gap-2.5">
          <button onClick={toggleTheme} className="p-2 rounded-full border border-slate-800 bg-slate-900/60">{isDark ? <Sun className="w-4 h-4 text-amber-300"/> : <Moon className="w-4 h-4 text-black"/>}</button>
          <button onClick={onOpenConnect} className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-full">Connect <ArrowRight className="w-3.5 h-3.5"/></button>
        </div>
      </div>
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowRight } from 'lucide-react';
import { PMLogo } from './Icons';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenConnect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConnect }) => {
  const [scrolled, setScrolled] = useState(false);
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Ventures', href: '#ventures' },
    { name: 'Writing', href: '#writing' },
    { name: 'Tech with Patrick', href: '#tech-with-patrick' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isDark
          ? scrolled
            ? 'bg-[#030712]/92 backdrop-blur-md border-b border-cyan-950/40 shadow-lg shadow-black/40'
            : 'bg-[#030712]/40 backdrop-blur-sm'
          : scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md shadow-slate-200/50'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Zone */}
        <a
          href="#home"
          className="flex items-center gap-2 group transition-transform active:scale-95"
          aria-label="Patrick JR Mulenga Home"
        >
          <PMLogo className="w-10 h-10 transition-transform group-hover:scale-105" />
        </a>

        {/* Center Navigation Links - Desktop Only */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-normal">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition-colors whitespace-nowrap text-[13.5px] tracking-wide ${
                isDark
                  ? 'text-slate-300 hover:text-cyan-300'
                  : 'text-black hover:text-cyan-600 font-medium'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Zone - Desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isDark
                ? 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60'
                : 'text-black hover:text-cyan-600 hover:bg-slate-100'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-300 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-black hover:scale-110 transition-transform" />
            )}
          </button>

          <button
            onClick={onOpenConnect}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-95 rounded-full transition-all shadow-[0_0_15px_rgba(6,182,212,0.35)] whitespace-nowrap cursor-pointer"
          >
            <span>Let's Connect</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] text-slate-950" />
          </button>
        </div>

        {/* Mobile Right Corner - Replaces the hamburger icon with Connect & Theme Toggle */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              isDark
                ? 'text-slate-400 hover:text-cyan-300 bg-slate-900/60 border-slate-800'
                : 'text-black hover:text-cyan-600 bg-slate-100 border-slate-200'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-black" />
            )}
          </button>

          <button
            onClick={onOpenConnect}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-95 rounded-full transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)] whitespace-nowrap cursor-pointer"
          >
            <span>Connect</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] text-slate-950" />
          </button>
        </div>
      </div>
    </header>
  );
};

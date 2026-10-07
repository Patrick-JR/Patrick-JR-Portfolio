import React from 'react';
import { Linkedin, Github, Youtube } from 'lucide-react';
import { PMLogo } from './Icons';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { isDark } = useTheme();

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
    <footer
      className={`border-t pt-14 pb-12 transition-colors ${
        isDark
          ? 'border-cyan-950/70 bg-[#02050e] text-slate-400'
          : 'border-slate-200 bg-white text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Row: Brand, Nav links, Social icons */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <PMLogo className="w-8 h-8" />
            <span
              className={`text-base font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              Patrick JR Mulenga
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-normal">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition-colors ${
                  isDark
                    ? 'text-slate-400 hover:text-cyan-300'
                    : 'text-black hover:text-cyan-600 font-medium'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Icons - In Light Mode these link icons are black */}
          <div className="flex items-center space-x-4">
            <a
              href="https://linkedin.com/in/patrick-mulenga"
              target="_blank"
              rel="noreferrer"
              className={`p-1 transition-colors ${
                isDark
                  ? 'text-slate-400 hover:text-cyan-300'
                  : 'text-black hover:text-cyan-600'
              }`}
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/patrick-mulenga"
              target="_blank"
              rel="noreferrer"
              className={`p-1 transition-colors ${
                isDark
                  ? 'text-slate-400 hover:text-cyan-300'
                  : 'text-black hover:text-cyan-600'
              }`}
              aria-label="GitHub profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com/@techwithpatrick"
              target="_blank"
              rel="noreferrer"
              className={`p-1 transition-colors ${
                isDark
                  ? 'text-slate-400 hover:text-cyan-300'
                  : 'text-black hover:text-cyan-600'
              }`}
              aria-label="YouTube channel"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Hairline Divider */}
        <div
          className={`border-t ${
            isDark ? 'border-slate-900' : 'border-slate-200'
          }`}
        />

        {/* Bottom Row */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isDark ? 'text-slate-500' : 'text-slate-500'
          }`}
        >
          <div>
            © 2025 Patrick JR Mulenga. All rights reserved.
          </div>
          <div>
            Building a better future with technology.
          </div>
        </div>

      </div>
    </footer>
  );
};

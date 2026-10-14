import React from 'react';
import { Linkedin, Github, Youtube } from 'lucide-react';
import { PMLogo } from './Icons';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from '../context/RouterContext';

export const Footer: React.FC = () => {
  const { isDark } = useTheme();
  const { path: currentPath, navigate, scrollToSection } = useRouter();

  const links = [
    { name: 'Home', sectionId: 'home' },
    { name: 'About', sectionId: 'about' },
    { name: 'Projects', sectionId: 'projects' },
    { name: 'Ventures', sectionId: 'ventures' },
    { name: 'Skills', sectionId: 'skills' },
    { name: 'Writing', sectionId: 'writing' },
    { name: 'Tech with Patrick', sectionId: 'tech-with-patrick' },
    { name: 'Contact', sectionId: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (currentPath === '/') {
      scrollToSection(sectionId);
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <footer
      className={`border-t pt-14 pb-12 transition-colors ${
        isDark
          ? 'border-cyan-950/70 bg-[#02050e] text-slate-400'
          : 'border-slate-200 bg-white text-slate-700'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (currentPath === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                navigate('/');
              }
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <PMLogo className="w-8 h-8" />
            <span className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
              Patrick JR Mulenga
            </span>
          </a>

          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm">
            {links.map(({ name, sectionId }) => (
              <a
                key={name}
                href={`#${sectionId}`}
                onClick={(e) => handleLinkClick(e, sectionId)}
                className={`transition-colors cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-cyan-300' : 'text-slate-800 hover:text-cyan-600 font-medium'
                }`}
              >
                {name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/patrick-mulenga"
              target="_blank"
              rel="noreferrer"
              className={isDark ? 'text-slate-400 hover:text-cyan-300' : 'text-black hover:text-cyan-600'}
              aria-label="LinkedIn"
            >
              <Linkedin className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-black'}`} />
            </a>
            <a
              href="https://github.com/Patrick-JR"
              target="_blank"
              rel="noreferrer"
              className={isDark ? 'text-slate-400 hover:text-cyan-300' : 'text-black hover:text-cyan-600'}
              aria-label="GitHub"
            >
              <Github className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-black'}`} />
            </a>
            <a
              href="https://youtube.com/@techwithpatrick"
              target="_blank"
              rel="noreferrer"
              className={isDark ? 'text-slate-400 hover:text-cyan-300' : 'text-black hover:text-cyan-600'}
              aria-label="YouTube"
            >
              <Youtube className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-black'}`} />
            </a>
          </div>
        </div>

        <div className={`border-t ${isDark ? 'border-slate-900' : 'border-slate-200'}`} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© 2026 Patrick JR Mulenga. All rights reserved.</div>
          <div>Technology is a tool. Human potential is the reason.</div>
        </div>
      </div>
    </footer>
  );
};

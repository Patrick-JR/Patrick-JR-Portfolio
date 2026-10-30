import React from 'react';
import { Linkedin, Github, Youtube, LockKeyhole } from 'lucide-react';
import { PMLogo } from './Icons';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from '../context/RouterContext';

export const Footer: React.FC = () => {
  const { isDark } = useTheme();
  const { path: currentPath, navigate } = useRouter();
  const links = [
    { name: 'Home', href: '/' }, { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' }, { name: 'Ventures', href: '/ventures' },
    { name: 'Skills', href: '/skills' }, { name: 'Writing', href: '/writing' },
    { name: 'Tech with Patrick', href: '/tech-with-patrick' }, { name: 'Contact', href: '/contact' },
  ];
  const handlePageClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (currentPath === href) { if (href === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    navigate(href);
  };

  return (
    <footer className={`border-t pt-14 pb-12 transition-colors ${isDark?'border-cyan-950/70 bg-[#02050e] text-slate-400':'border-slate-200 bg-white text-slate-700'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <a href="/" onClick={(e)=>handlePageClick(e,'/')} className="flex items-center gap-3 cursor-pointer" aria-label="Patrick JR Mulenga home"><PMLogo className="w-8 h-8"/><span className={`text-base font-bold tracking-tight ${isDark?'text-white':'text-black'}`}>Patrick JR Mulenga</span></a>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm" aria-label="Footer navigation">
            {links.map(({name,href})=><a key={name} href={href} onClick={(e)=>handlePageClick(e,href)} aria-current={currentPath===href?'page':undefined} className={`transition-colors cursor-pointer ${isDark?'text-slate-400 hover:text-cyan-300':'text-slate-800 hover:text-cyan-600 font-medium'}`}>{name}</a>)}
          </nav>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com/in/patrick-mulenga" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-cyan-300"><Linkedin className="w-4 h-4"/></a>
            <a href="https://github.com/Patrick-JR" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-cyan-300"><Github className="w-4 h-4"/></a>
            <a href="https://youtube.com/@techwithpatrick" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-cyan-300"><Youtube className="w-4 h-4"/></a>
            <a href="/admin" aria-label="Open admin dashboard" title="Admin dashboard" className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-slate-700/70 text-slate-500 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"><LockKeyhole className="w-4 h-4"/></a>
          </div>
        </div>
        <div className={`border-t ${isDark?'border-slate-900':'border-slate-200'}`}/>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500"><div>© 2026 Patrick JR Mulenga. All rights reserved.</div><div>Technology is a tool. Human potential is the reason.</div></div>
      </div>
    </footer>
  );
};

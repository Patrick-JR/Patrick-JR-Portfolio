import React from 'react';
import { Linkedin, Github, Youtube } from 'lucide-react';
import { PMLogo } from './Icons';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { isDark } = useTheme();
  const links = [
    ['Home','/'],['About','/about'],['Projects','/projects'],['Ventures','/ventures'],['Skills','/skills'],['Writing','/writing'],['Tech with Patrick','/tech-with-patrick'],['Contact','/contact']
  ];
  return (
    <footer className={`border-t pt-14 pb-12 ${isDark ? 'border-cyan-950/70 bg-[#02050e] text-slate-400' : 'border-slate-200 bg-white text-slate-600'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <a href="/" className="flex items-center gap-3"><PMLogo className="w-8 h-8"/><span className={`text-base font-bold tracking-tight ${isDark?'text-white':'text-black'}`}>Patrick JR Mulenga</span></a>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm">{links.map(([name,href])=><a key={name} href={href} className={`transition-colors ${isDark?'text-slate-400 hover:text-cyan-300':'text-slate-700 hover:text-cyan-600'}`}>{name}</a>)}</nav>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com/in/patrick-mulenga" target="_blank" rel="noreferrer"><Linkedin className="w-4 h-4"/></a>
            <a href="https://github.com/Patrick-JR" target="_blank" rel="noreferrer"><Github className="w-4 h-4"/></a>
            <a href="https://youtube.com/@techwithpatrick" target="_blank" rel="noreferrer"><Youtube className="w-4 h-4"/></a>
          </div>
        </div>
        <div className={`border-t ${isDark?'border-slate-900':'border-slate-200'}`}/>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© 2026 Patrick JR Mulenga. All rights reserved.</div>
          <div>Technology is a tool. Human potential is the reason.</div>
        </div>
      </div>
    </footer>
  );
};

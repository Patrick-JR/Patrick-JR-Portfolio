import React from 'react';
import { X, User, Cpu, MonitorPlay, Mail, Linkedin, Github, Youtube, Globe, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface MoreSheetProps {
  isOpen:boolean;
  onClose:()=>void;
  onOpenConnect:()=>void;
  onOpenAbout:()=>void;
  onOpenTech:()=>void;
}

export const MoreSheet: React.FC<MoreSheetProps> = ({isOpen,onClose,onOpenConnect,onOpenAbout,onOpenTech}) => {
  const {isDark,toggleTheme}=useTheme();
  if(!isOpen) return null;

  const go=(path:string)=>{ onClose(); window.location.href=path; };

  const items=[
    ['/about','About Patrick',User,'/about'],
    ['/skills','Skills & Technologies',Cpu,'/skills'],
    ['/tech-with-patrick','Tech with Patrick',MonitorPlay,'/tech-with-patrick'],
    ['/contact','Get in Touch',Mail,'/contact']
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full sm:max-w-md bg-[#050b18] border-t sm:border border-cyan-500/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="font-mono-tag text-xs text-cyan-400">// EXPLORE</div>
          <button onClick={onClose} className="p-2 text-slate-400"><X className="w-5 h-5"/></button>
        </div>
        <div className="space-y-2 py-4">
          {items.map(([_,label,Icon,href])=>(
            <button key={href} onClick={()=>go(href)} className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400"><Icon className="w-4 h-4"/></div>
                <div className="text-sm font-semibold text-white">{label}</div>
              </div>
              <span className="text-cyan-400">→</span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300">
          <span className="flex items-center gap-2">{isDark?<Moon className="w-4 h-4 text-cyan-400"/>:<Sun className="w-4 h-4 text-amber-400"/>}{isDark?'Dark theme':'Light theme'}</span>
          <button onClick={toggleTheme} className="px-3 py-1.5 border border-slate-700 rounded-lg text-cyan-300">Switch</button>
        </div>
        <div className="flex items-center justify-around pt-5 text-xs text-slate-400">
          <a href="https://linkedin.com/in/patrick-mulenga" target="_blank" rel="noreferrer"><Linkedin className="w-4 h-4"/></a>
          <a href="https://github.com/Patrick-JR" target="_blank" rel="noreferrer"><Github className="w-4 h-4"/></a>
          <a href="https://youtube.com/@techwithpatrick" target="_blank" rel="noreferrer"><Youtube className="w-4 h-4"/></a>
          <a href="https://www.uplexai.com" target="_blank" rel="noreferrer"><Globe className="w-4 h-4"/></a>
          <a href="mailto:patrick@uplexai.com"><Mail className="w-4 h-4"/></a>
        </div>
      </div>
    </div>
  );
};

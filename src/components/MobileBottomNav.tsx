import React from 'react';
import { Home, FolderKanban, Rocket, BookOpen, MoreHorizontal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface MobileBottomNavProps { onOpenMore: () => void; }

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenMore }) => {
  const { isDark } = useTheme();
  const current = window.location.pathname;
  const items = [
    ['/', 'Home', Home],
    ['/projects', 'Projects', FolderKanban],
    ['/ventures', 'Ventures', Rocket],
    ['/writing', 'Writing', BookOpen]
  ] as const;

  return (
    <nav className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 px-2 py-2 ${isDark ? 'bg-[#030712]/95 border-t border-cyan-950/70' : 'bg-white/95 border-t border-slate-200'} backdrop-blur-lg`} aria-label="Mobile Bottom Navigation">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center">
        {items.map(([href,label,Icon]) => (
          <a key={href} href={href} className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl ${current===href ? (isDark?'text-cyan-400':'text-cyan-600') : (isDark?'text-slate-400':'text-black')}`}>
            <Icon className="w-5 h-5"/>
            <span className="text-[10px] mt-1">{label}</span>
          </a>
        ))}
        <button onClick={onOpenMore} className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl ${isDark?'text-slate-400':'text-black'}`}>
          <MoreHorizontal className="w-5 h-5"/>
          <span className="text-[10px] mt-1">More</span>
        </button>
      </div>
    </nav>
  );
};

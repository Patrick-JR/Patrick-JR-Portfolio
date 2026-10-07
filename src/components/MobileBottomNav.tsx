import React, { useState, useEffect } from 'react';
import { Home, FolderKanban, Rocket, BookOpen, MoreHorizontal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface MobileBottomNavProps {
  onOpenMore: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenMore }) => {
  const [activeTab, setActiveTab] = useState('home');
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['home', 'projects', 'ventures', 'writing'];
      
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPos) {
          setActiveTab(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getTabClass = (tab: string) => {
    const isActive = activeTab === tab;
    if (isDark) {
      return isActive
        ? 'text-cyan-400 font-semibold'
        : 'text-slate-400 hover:text-slate-200';
    } else {
      // In light mode, link icons are black, active is cyan-600
      return isActive
        ? 'text-cyan-600 font-bold'
        : 'text-black hover:text-cyan-600';
    }
  };

  return (
    <nav
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 px-2 py-2 transition-colors ${
        isDark
          ? 'bg-[#030712]/95 backdrop-blur-lg border-t border-cyan-950/70 shadow-[0_-8px_25px_rgba(0,0,0,0.4)]'
          : 'bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]'
      }`}
      aria-label="Mobile Bottom Navigation"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center">
        {/* 1. Home */}
        <button
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${getTabClass('home')}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Home</span>
        </button>

        {/* 2. Projects */}
        <button
          onClick={() => handleNavClick('projects')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${getTabClass('projects')}`}
        >
          <FolderKanban className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Projects</span>
        </button>

        {/* 3. Ventures */}
        <button
          onClick={() => handleNavClick('ventures')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${getTabClass('ventures')}`}
        >
          <Rocket className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Ventures</span>
        </button>

        {/* 4. Writing */}
        <button
          onClick={() => handleNavClick('writing')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${getTabClass('writing')}`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Writing</span>
        </button>

        {/* 5. More */}
        <button
          onClick={onOpenMore}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer active:scale-95 ${
            isDark ? 'text-slate-400 hover:text-cyan-300' : 'text-black hover:text-cyan-600'
          }`}
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">More</span>
        </button>
      </div>
    </nav>
  );
};

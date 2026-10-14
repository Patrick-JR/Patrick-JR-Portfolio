import React from 'react';
import { Home, FolderKanban, Rocket, BookOpen, MoreHorizontal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from '../context/RouterContext';

interface MobileBottomNavProps {
  onOpenMore: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenMore }) => {
  const { isDark } = useTheme();
  const { path: currentPath, navigate, scrollToSection } = useRouter();

  const items = [
    { sectionId: 'home', label: 'Home', icon: Home },
    { sectionId: 'projects', label: 'Projects', icon: FolderKanban },
    { sectionId: 'ventures', label: 'Ventures', icon: Rocket },
    { sectionId: 'writing', label: 'Writing', icon: BookOpen },
  ] as const;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, sectionId: string) => {
    e.preventDefault();
    if (currentPath === '/') {
      scrollToSection(sectionId);
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <nav
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 px-2 py-2 transition-colors ${
        isDark
          ? 'bg-[#030712]/95 border-t border-cyan-950/70 shadow-lg shadow-black/80'
          : 'bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]'
      } backdrop-blur-lg`}
      aria-label="Mobile Bottom Navigation"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center">
        {items.map(({ sectionId, label, icon: Icon }) => (
          <button
            key={sectionId}
            onClick={(e) => handleClick(e, sectionId)}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl cursor-pointer transition-colors ${
              isDark
                ? 'text-slate-400 hover:text-cyan-300'
                : 'text-black hover:text-cyan-600'
            }`}
          >
            <Icon className={`w-5 h-5 ${isDark ? 'text-slate-300' : 'text-black'}`} />
            <span className={`text-[10px] mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-800'}`}>
              {label}
            </span>
          </button>
        ))}

        <button
          onClick={onOpenMore}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl cursor-pointer transition-colors ${
            isDark
              ? 'text-slate-400 hover:text-cyan-300'
              : 'text-black hover:text-cyan-600'
          }`}
        >
          <MoreHorizontal className={`w-5 h-5 ${isDark ? 'text-slate-300' : 'text-black'}`} />
          <span className={`text-[10px] mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-800'}`}>
            More
          </span>
        </button>
      </div>
    </nav>
  );
};

import React from 'react';
import { Home, FolderKanban, Rocket, BookOpen, MoreHorizontal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from '../context/RouterContext';

interface MobileBottomNavProps {
  onOpenMore: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenMore }) => {
  const { isDark } = useTheme();
  const { path: currentPath, navigate } = useRouter();

  // Mobile items navigate to full pages. They no longer scroll to homepage sections.
  const items = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/projects', label: 'Projects', icon: FolderKanban },
    { href: '/ventures', label: 'Ventures', icon: Rocket },
    { href: '/writing', label: 'Writing', icon: BookOpen },
  ];

  return (
    <nav
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 px-2 py-2 transition-colors ${
        isDark
          ? 'bg-[#030712]/95 border-t border-cyan-950/70 shadow-lg shadow-black/80'
          : 'bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]'
      } backdrop-blur-lg`}
      aria-label="Mobile page navigation"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center">
        {items.map(({ href, label, icon: Icon }) => {
          const active = currentPath === href;
          return (
            <a
              key={href}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                if (currentPath !== href) navigate(href);
                else if (href === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl cursor-pointer transition-colors ${
                active
                  ? isDark ? 'text-cyan-400 font-semibold' : 'text-cyan-600 font-bold'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-black hover:text-cyan-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-1 tracking-tight">{label}</span>
            </a>
          );
        })}

        <button
          onClick={onOpenMore}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl cursor-pointer transition-colors ${
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

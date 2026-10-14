import React from 'react';
import { X, User, Cpu, MonitorPlay, Mail, Linkedin, Github, Youtube, Globe, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from '../context/RouterContext';

interface MoreSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConnect: () => void;
  onOpenAbout: () => void;
  onOpenTech: () => void;
}

export const MoreSheet: React.FC<MoreSheetProps> = ({ isOpen, onClose }) => {
  const { isDark, toggleTheme } = useTheme();
  const { path: currentPath, navigate, scrollToSection } = useRouter();

  if (!isOpen) return null;

  const handleSelectSection = (sectionId: string) => {
    onClose();
    if (currentPath === '/') {
      scrollToSection(sectionId);
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const items = [
    { sectionId: 'about', label: 'About Patrick', icon: User },
    { sectionId: 'skills', label: 'Skills & Technologies', icon: Cpu },
    { sectionId: 'tech-with-patrick', label: 'Tech with Patrick', icon: MonitorPlay },
    { sectionId: 'contact', label: 'Get in Touch', icon: Mail },
  ] as const;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-[#050b18] border-t sm:border border-cyan-500/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="font-mono-tag text-xs text-cyan-400">// EXPLORE</div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white cursor-pointer"
            aria-label="Close sheet"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 py-4">
          {items.map(({ sectionId, label, icon: Icon }) => (
            <button
              key={sectionId}
              onClick={() => handleSelectSection(sectionId)}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-sm font-semibold text-white">{label}</div>
              </div>
              <span className="text-cyan-400">→</span>
            </button>
          ))}
        </div>

        {/* Theme Switcher in Sheet */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300">
          <span className="flex items-center gap-2">
            {isDark ? (
              <Moon className="w-4 h-4 text-cyan-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
            {isDark ? 'Dark theme' : 'Light theme'}
          </span>
          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 border border-slate-700 rounded-lg text-cyan-300 hover:text-white transition-colors cursor-pointer"
          >
            Switch
          </button>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-around pt-5 text-xs text-slate-400">
          <a
            href="https://linkedin.com/in/patrick-mulenga"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/Patrick-JR"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-300"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com/@techwithpatrick"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-300"
            aria-label="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href="https://www.uplexai.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-300"
            aria-label="UpleX AI Website"
          >
            <Globe className="w-4 h-4" />
          </a>
          <a
            href="mailto:patrick@uplexai.com"
            className="hover:text-cyan-300"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, User, Cpu, MonitorPlay, Mail, Linkedin, Github, Youtube, Globe, Sun, Moon, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from '../context/RouterContext';

interface MoreSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConnect: () => void;
  onOpenAbout: () => void;
  onOpenTech: () => void;
}

export const MoreSheet: React.FC<MoreSheetProps> = ({
  isOpen,
  onClose,
  onOpenConnect,
  onOpenAbout,
  onOpenTech,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const { navigate } = useRouter();

  if (!isOpen) return null;

  const items = [
    { label: 'About Patrick', description: 'Background, philosophy and story', icon: User, action: onOpenAbout },
    { label: 'Skills & Technologies', description: 'Languages, tools and engineering focus', icon: Cpu, action: () => navigate('/skills') },
    { label: 'Tech with Patrick', description: 'Technology education and content', icon: MonitorPlay, action: onOpenTech },
    { label: 'Get in Touch', description: 'Contact and collaboration', icon: Mail, action: onOpenConnect },
  ];

  const select = (action: () => void) => {
    onClose();
    action();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-[#050b18] border-t sm:border border-cyan-500/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="font-mono-tag text-xs text-cyan-400 font-semibold">// MORE PAGES</div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/80" aria-label="Close sheet">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {items.map(({ label, description, icon: Icon, action }) => (
            <button
              key={label}
              onClick={() => select(action)}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{description}</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300">
          <span className="flex items-center gap-2">
            {isDark ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
            {isDark ? 'Dark theme' : 'Light theme'}
          </span>
          <button onClick={toggleTheme} className="px-3 py-1.5 border border-slate-700 rounded-lg text-cyan-300 hover:text-white transition-colors cursor-pointer">
            Switch
          </button>
        </div>

        <div className="flex items-center justify-around pt-2 text-slate-400">
          <a href="https://linkedin.com/in/patrick-mulenga" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-cyan-300"><Linkedin className="w-4 h-4" /></a>
          <a href="https://github.com/Patrick-JR" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-cyan-300"><Github className="w-4 h-4" /></a>
          <a href="https://youtube.com/@techwithpatrick" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-cyan-300"><Youtube className="w-4 h-4" /></a>
          <a href="https://www.uplexai.com" target="_blank" rel="noreferrer" aria-label="UpleX AI website" className="hover:text-cyan-300"><Globe className="w-4 h-4" /></a>
          <a href="mailto:patrick@uplexai.com" aria-label="Email" className="hover:text-cyan-300"><Mail className="w-4 h-4" /></a>
        </div>
      </div>
    </div>
  );
};

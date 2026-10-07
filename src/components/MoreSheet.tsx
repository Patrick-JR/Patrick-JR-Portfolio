import React from 'react';
import {
  X,
  User,
  Cpu,
  MonitorPlay,
  Mail,
  Linkedin,
  Github,
  Youtube,
  Globe,
  Sun,
  Moon,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('patrick@uplexai.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScroll = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-mono-tag text-xs text-cyan-400 font-semibold">// MORE EXPLORATION</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/80 transition-colors"
            aria-label="Close sheet"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Links Menu */}
        <div className="space-y-2">
          {/* About Me */}
          <button
            onClick={() => {
              onClose();
              onOpenAbout();
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">About Patrick</div>
                <div className="text-xs text-slate-400">Background, philosophy & story</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Skills & Technologies */}
          <button
            onClick={() => handleScroll('skills')}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Skills & Technologies</div>
                <div className="text-xs text-slate-400">Languages, AI tools & stack</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Tech with Patrick */}
          <button
            onClick={() => {
              onClose();
              onOpenTech();
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400">
                <MonitorPlay className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Tech with Patrick</div>
                <div className="text-xs text-slate-400">YouTube sessions & insights</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Contact / Collaborate */}
          <button
            onClick={() => {
              onClose();
              onOpenConnect();
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Get in Touch</div>
                <div className="text-xs text-slate-400">Start collaboration or inquiry</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* Theme Mode Toggle row */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800">
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            {isDark ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
            <span>Interface Mode: <strong>{isDark ? 'Dark Theme' : 'Light Theme'}</strong></span>
          </div>

          <button
            onClick={toggleTheme}
            className="px-3 py-1 text-xs font-medium text-cyan-300 hover:text-white bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Switch to {isDark ? 'Light' : 'Dark'}
          </button>
        </div>

        {/* Direct Email Copy */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-mono text-cyan-300">patrick@uplexai.com</span>
          </div>
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-cyan-300 bg-slate-900 border border-cyan-500/40 rounded-md cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-around pt-2 text-slate-400 text-xs">
          <a
            href="https://linkedin.com/in/patrick-mulenga"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/patrick-mulenga"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href="https://youtube.com/@techwithpatrick"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Youtube className="w-4 h-4" />
            <span>YouTube</span>
          </a>
          <a
            href="https://www.uplexai.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Globe className="w-4 h-4" />
            <span>UpleX</span>
          </a>
        </div>
      </div>
    </div>
  );
};

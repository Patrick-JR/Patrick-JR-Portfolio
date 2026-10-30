import React from 'react';
import { ArrowRight, Check, Link2 } from 'lucide-react';
import { usePortfolioContent } from '../data/portfolioStore';
import { useTheme } from '../context/ThemeContext';

interface ContactSectionProps { onOpenConnectModal: () => void; }

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenConnectModal }) => {
  const { isDark } = useTheme();
  const { contact, links } = usePortfolioContent();

  return (
    <section id="contact" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="font-mono-tag text-cyan-500 text-xs sm:text-sm tracking-wider font-medium mb-6">// 07. GET IN TOUCH</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          <div className="space-y-5">
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight leading-snug ${isDark?'text-white':'text-slate-900'}`}>{contact.headline}</h2>
            <p className={`text-sm leading-relaxed ${isDark?'text-slate-400':'text-slate-600'}`}>{contact.description}</p>
            <button onClick={onOpenConnectModal} className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400 rounded-full transition-all cursor-pointer"><span>Get in Touch</span><ArrowRight className="w-4 h-4 text-cyan-400"/></button>
          </div>
          <div className="space-y-4">
            <h3 className={`text-base sm:text-lg font-semibold tracking-tight ${isDark?'text-white':'text-slate-900'}`}>Areas of collaboration</h3>
            <ul className="space-y-3">{contact.areas.map((area)=><li key={area} className={`flex items-start gap-2.5 text-xs sm:text-sm ${isDark?'text-slate-300':'text-slate-700'}`}><Check className="w-4 h-4 text-cyan-500 shrink-0"/><span>{area}</span></li>)}</ul>
          </div>
          <div className="space-y-4">
            <h3 className={`text-base sm:text-lg font-semibold tracking-tight ${isDark?'text-white':'text-slate-900'}`}>Connect with me</h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              {links.map((link)=><li key={link.id}><a href={link.href} target={link.href.startsWith('http')?'_blank':undefined} rel="noreferrer" className={`flex items-center gap-2 hover:text-cyan-500 transition-colors ${isDark?'text-slate-300':'text-slate-800'}`}><Link2 className="w-4 h-4 text-cyan-400 shrink-0"/><span>{link.label}: <span className={isDark?'text-slate-400':'text-slate-600'}>{link.value}</span></span></a></li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Mail,
  Linkedin,
  Github,
  Youtube,
  Globe,
  Copy
} from 'lucide-react';
import { CONTACT_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface ContactSectionProps {
  onOpenConnectModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenConnectModal,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { isDark } = useTheme();

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('patrick@uplexai.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const iconClass = isDark ? 'w-4 h-4 text-cyan-400 shrink-0' : 'w-4 h-4 text-black shrink-0';

  return (
    <section id="contact" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Kicker */}
        <div className="font-mono-tag text-cyan-500 text-xs sm:text-sm tracking-wider font-medium mb-6">
          {CONTACT_DATA.kicker}
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          
          {/* Column 1: Headline & CTA */}
          <div className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
              {CONTACT_DATA.headline}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {CONTACT_DATA.description}
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenConnectModal}
                className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400 rounded-full transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Column 2: Areas of Collaboration */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold tracking-tight">
              Areas of collaboration
            </h3>
            <ul className="space-y-3">
              {CONTACT_DATA.areas.map((area) => (
                <li key={area} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <span className="text-cyan-500 font-bold mt-0.5 select-none">
                    <Check className="w-4 h-4" />
                  </span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect with me */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold tracking-tight">
              Connect with me
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              
              {/* Email */}
              <li className="flex items-center justify-between group">
                <a
                  href="mailto:patrick@uplexai.com"
                  className="flex items-center gap-2 hover:text-cyan-600 transition-colors"
                >
                  <Mail className={iconClass} />
                  <span>
                    Email: <span className={isDark ? "text-slate-400 group-hover:text-cyan-300" : "text-slate-700 group-hover:text-cyan-600 font-medium"}>patrick@uplexai.com</span>
                  </span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className={`p-1 rounded cursor-pointer ${isDark ? 'text-slate-500 hover:text-cyan-300' : 'text-slate-700 hover:text-black'}`}
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </li>

              {/* LinkedIn */}
              <li>
                <a
                  href="https://linkedin.com/in/patrick-mulenga"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-600 transition-colors group"
                >
                  <Linkedin className={iconClass} />
                  <span>
                    LinkedIn: <span className={isDark ? "text-slate-400 group-hover:text-cyan-300" : "text-slate-700 group-hover:text-cyan-600 font-medium"}>linkedin.com/in/patrick-mulenga</span>
                  </span>
                </a>
              </li>

              {/* GitHub */}
              <li>
                <a
                  href="https://github.com/patrick-mulenga"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-600 transition-colors group"
                >
                  <Github className={iconClass} />
                  <span>
                    GitHub: <span className={isDark ? "text-slate-400 group-hover:text-cyan-300" : "text-slate-700 group-hover:text-cyan-600 font-medium"}>github.com/patrick-mulenga</span>
                  </span>
                </a>
              </li>

              {/* YouTube */}
              <li>
                <a
                  href="https://youtube.com/@techwithpatrick"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-600 transition-colors group"
                >
                  <Youtube className={iconClass} />
                  <span>
                    YouTube: <span className={isDark ? "text-slate-400 group-hover:text-cyan-300" : "text-slate-700 group-hover:text-cyan-600 font-medium"}>Tech with Patrick</span>
                  </span>
                </a>
              </li>

              {/* UpleX AI */}
              <li>
                <a
                  href="https://www.uplexai.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-600 transition-colors group"
                >
                  <Globe className={iconClass} />
                  <span>
                    UpleX AI: <span className={isDark ? "text-slate-400 group-hover:text-cyan-300" : "text-slate-700 group-hover:text-cyan-600 font-medium"}>www.uplexai.com</span>
                  </span>
                </a>
              </li>

            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};

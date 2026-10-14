import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowRight } from 'lucide-react';
import { PMLogo } from './Icons';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from '../context/RouterContext';

interface NavbarProps {
  onOpenConnect?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConnect }) => {
  const [scrolled, setScrolled] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const { path: currentPath, navigate, scrollToSection } = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', sectionId: 'home' },
    { name: 'About', href: '/about', sectionId: 'about' },
    { name: 'Projects', href: '/projects', sectionId: 'projects' },
    { name: 'Ventures', href: '/ventures', sectionId: 'ventures' },
    { name: 'Skills', href: '/skills', sectionId: 'skills' },
    { name: 'Writing', href: '/writing', sectionId: 'writing' },
    { name: 'Tech with Patrick', href: '/tech-with-patrick', sectionId: 'tech-with-patrick' },
    { name: 'Contact', href: '/contact', sectionId: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();
    if (currentPath === '/') {
      scrollToSection(link.sectionId);
    } else {
      // If on another page, navigate back to home and scroll to section
      navigate(`/#${link.sectionId}`);
    }
  };

  const handleConnectClick = () => {
    if (onOpenConnect) {
      onOpenConnect();
    } else if (currentPath === '/') {
      scrollToSection('contact');
    } else {
      navigate('/contact');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isDark
          ? scrolled
            ? 'bg-[#030712]/92 backdrop-blur-md border-b border-cyan-950/40 shadow-lg shadow-black/40'
            : 'bg-[#030712]/70 backdrop-blur-sm'
          : scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-white backdrop-blur-sm border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Monogram */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (currentPath === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate('/');
            }
          }}
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Patrick JR Mulenga Home"
        >
          <PMLogo className="w-10 h-10" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href || (currentPath === '/' && link.name === 'Home');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`transition-colors whitespace-nowrap text-[13px] tracking-wide cursor-pointer ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : isDark
                    ? 'text-slate-300 hover:text-cyan-300'
                    : 'text-slate-900 hover:text-cyan-600 font-medium'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Desktop Right Controls: Light/Dark Toggle + Connect CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-cyan-300' : 'text-black hover:text-cyan-600'
            }`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-black stroke-[2.2]" />
            )}
          </button>

          <button
            onClick={handleConnectClick}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-95 rounded-full transition-all shadow-[0_0_15px_rgba(6,182,212,0.35)] cursor-pointer"
          >
            <span>Let's Connect</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile Top Right: Theme Toggle + Connect Button (Hamburger icon replaced as requested) */}
        <div className="flex lg:hidden items-center gap-2.5">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`p-2 rounded-full border cursor-pointer transition-colors ${
              isDark
                ? 'border-slate-800 bg-slate-900/60 text-amber-300'
                : 'border-slate-200 bg-white text-black shadow-xs'
            }`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-black stroke-[2.2]" />
            )}
          </button>

          <button
            onClick={handleConnectClick}
            className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-95 rounded-full cursor-pointer shadow-xs"
          >
            <span>Connect</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { VenturesSection } from './components/VenturesSection';
import { SkillsSection } from './components/SkillsSection';
import { WritingSection } from './components/WritingSection';
import { TechWithPatrickSection } from './components/TechWithPatrickSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MoreSheet } from './components/MoreSheet';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import VenturesPage from './pages/VenturesPage';
import SkillsPage from './pages/SkillsPage';
import WritingPage from './pages/WritingPage';
import TechWithPatrickPage from './pages/TechWithPatrickPage';
import ContactPage from './pages/ContactPage';

function HomePreview() {
  const { isDark } = useTheme();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const go = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className={`min-h-screen selection:bg-cyan-500/30 selection:text-cyan-300 relative pb-16 lg:pb-0 transition-colors duration-200 ${isDark ? 'bg-[#030712] text-slate-100' : 'bg-white text-slate-900'}`}>
      <Navbar onOpenConnect={() => go('/contact')} />
      <main>
        <Hero
          onExploreWork={() => go('/projects')}
          onGetInTouch={() => go('/contact')}
          onOpenTechPatrick={() => go('/tech-with-patrick')}
        />
        <AboutSection onLearnMore={() => go('/about')} />
        <ProjectsSection
          onSelectProject={() => go('/projects')}
          onViewAllProjects={() => go('/projects')}
        />
        <VenturesSection
          onSelectVenture={() => go('/ventures')}
          onViewAllVentures={() => go('/ventures')}
        />
        <SkillsSection />
        <WritingSection
          onSelectArticle={() => go('/writing')}
          onExploreWriting={() => go('/writing')}
        />
        <TechWithPatrickSection onVisitChannel={() => go('/tech-with-patrick')} />
        <ContactSection onOpenConnectModal={() => go('/contact')} />
      </main>
      <Footer />
      <MobileBottomNav onOpenMore={() => setIsMoreOpen(true)} />
      <MoreSheet
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        onOpenConnect={() => go('/contact')}
        onOpenAbout={() => go('/about')}
        onOpenTech={() => go('/tech-with-patrick')}
      />
    </div>
  );
}

function RouterView() {
  const [path, setPath] = useState(window.location.pathname);

  React.useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  React.useEffect(() => {
    const titles: Record<string,string> = {
      '/': 'Patrick JR Mulenga | Software & AI Engineer',
      '/about': 'About Patrick JR Mulenga',
      '/projects': 'Projects | Patrick JR Mulenga',
      '/ventures': 'Ventures | Patrick JR Mulenga',
      '/skills': 'Skills & Technologies | Patrick JR Mulenga',
      '/writing': 'Writing | Patrick JR Mulenga',
      '/tech-with-patrick': 'Tech with Patrick | Patrick JR Mulenga',
      '/contact': 'Contact | Patrick JR Mulenga'
    };
    document.title = titles[path] || titles['/'];
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [path]);

  if (path === '/about') return <AboutPage />;
  if (path === '/projects') return <ProjectsPage />;
  if (path === '/ventures') return <VenturesPage />;
  if (path === '/skills') return <SkillsPage />;
  if (path === '/writing') return <WritingPage />;
  if (path === '/tech-with-patrick') return <TechWithPatrickPage />;
  if (path === '/contact') return <ContactPage />;
  return <HomePreview />;
}

export default function App() {
  return <ThemeProvider><RouterView /></ThemeProvider>;
}

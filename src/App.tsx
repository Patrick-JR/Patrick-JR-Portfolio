import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { RouterProvider, useRouter } from './context/RouterContext';
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
  const { navigate, scrollToSection } = useRouter();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <div
      className={`min-h-screen selection:bg-cyan-500/30 selection:text-cyan-300 relative pb-16 lg:pb-0 transition-colors duration-200 ${
        isDark ? 'bg-[#030712] text-slate-100' : 'bg-white text-slate-900'
      }`}
    >
      <Navbar onOpenConnect={() => scrollToSection('contact')} />
      <main>
        <Hero
          onExploreWork={() => scrollToSection('projects')}
          onGetInTouch={() => scrollToSection('contact')}
          onOpenTechPatrick={() => scrollToSection('tech-with-patrick')}
        />
        <AboutSection onLearnMore={() => navigate('/about')} />
        <ProjectsSection
          onSelectProject={() => navigate('/projects')}
          onViewAllProjects={() => navigate('/projects')}
        />
        <VenturesSection
          onSelectVenture={() => navigate('/ventures')}
          onViewAllVentures={() => navigate('/ventures')}
        />
        <SkillsSection />
        <WritingSection
          onSelectArticle={() => navigate('/writing')}
          onExploreWriting={() => navigate('/writing')}
        />
        <TechWithPatrickSection onVisitChannel={() => navigate('/tech-with-patrick')} />
        <ContactSection onOpenConnectModal={() => scrollToSection('contact')} />
      </main>
      <Footer />
      <MobileBottomNav onOpenMore={() => setIsMoreOpen(true)} />
      <MoreSheet
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        onOpenConnect={() => scrollToSection('contact')}
        onOpenAbout={() => scrollToSection('about')}
        onOpenTech={() => scrollToSection('tech-with-patrick')}
      />
    </div>
  );
}

function RouterView() {
  const { path } = useRouter();

  React.useEffect(() => {
    const titles: Record<string, string> = {
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
  return (
    <ThemeProvider>
      <RouterProvider>
        <RouterView />
      </RouterProvider>
    </ThemeProvider>
  );
}

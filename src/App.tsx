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
import NotFoundPage from './pages/NotFoundPage';

function HomePreview() {
  const { isDark } = useTheme();
  const { navigate } = useRouter();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const openPage = (route: string) => navigate(route);

  return (
    <div
      className={`min-h-screen selection:bg-cyan-500/30 selection:text-cyan-300 relative pb-16 lg:pb-0 transition-colors duration-200 ${
        isDark ? 'bg-[#030712] text-slate-100' : 'bg-white text-slate-900'
      }`}
    >
      <Navbar onOpenConnect={() => openPage('/contact')} />

      <main>
        <Hero
          onExploreWork={() => openPage('/projects')}
          onGetInTouch={() => openPage('/contact')}
          onOpenTechPatrick={() => openPage('/tech-with-patrick')}
        />

        <AboutSection onLearnMore={() => openPage('/about')} />

        <ProjectsSection
          onSelectProject={() => openPage('/projects')}
          onViewAllProjects={() => openPage('/projects')}
        />

        <VenturesSection
          onSelectVenture={() => openPage('/ventures')}
          onViewAllVentures={() => openPage('/ventures')}
        />

        <SkillsSection />

        <WritingSection
          onSelectArticle={() => openPage('/writing')}
          onExploreWriting={() => openPage('/writing')}
        />

        <TechWithPatrickSection onVisitChannel={() => openPage('/tech-with-patrick')} />

        <ContactSection onOpenConnectModal={() => openPage('/contact')} />
      </main>

      <Footer />

      <MobileBottomNav onOpenMore={() => setIsMoreOpen(true)} />

      <MoreSheet
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        onOpenConnect={() => openPage('/contact')}
        onOpenAbout={() => openPage('/about')}
        onOpenTech={() => openPage('/tech-with-patrick')}
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
      '/contact': 'Contact | Patrick JR Mulenga',
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
  if (path === '/') return <HomePreview />;

  return <NotFoundPage />;
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

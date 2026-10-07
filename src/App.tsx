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
import { ProjectModal } from './components/ProjectModal';
import { VentureModal } from './components/VentureModal';
import { ArticleModal } from './components/ArticleModal';
import { ConnectModal } from './components/ConnectModal';
import { AboutModal } from './components/AboutModal';
import { TechModal } from './components/TechModal';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import VenturesPage from './pages/VenturesPage';
import SkillsPage from './pages/SkillsPage';
import WritingPage from './pages/WritingPage';
import TechWithPatrickPage from './pages/TechWithPatrickPage';
import ContactPage from './pages/ContactPage';
import { ProjectItem, VentureItem, ArticleItem } from './data/portfolioData';

function HomePreview() {
  const { isDark } = useTheme();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedVenture, setSelectedVenture] = useState<VentureItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <div className={`min-h-screen selection:bg-cyan-500/30 selection:text-cyan-300 relative pb-16 lg:pb-0 transition-colors duration-200 ${isDark ? 'bg-[#030712] text-slate-100' : 'bg-white text-slate-900'}`}>
      <Navbar onOpenConnect={() => { window.location.href = '/contact'; }} />
      <main>
        <Hero
          onExploreWork={() => { window.location.href = '/projects'; }}
          onGetInTouch={() => { window.location.href = '/contact'; }}
          onOpenTechPatrick={() => { window.location.href = '/tech-with-patrick'; }}
        />
        <AboutSection onLearnMore={() => { window.location.href = '/about'; }} />
        <ProjectsSection
          onSelectProject={setSelectedProject}
          onViewAllProjects={() => { window.location.href = '/projects'; }}
        />
        <VenturesSection
          onSelectVenture={setSelectedVenture}
          onViewAllVentures={() => { window.location.href = '/ventures'; }}
        />
        <SkillsSection />
        <WritingSection
          onSelectArticle={setSelectedArticle}
          onExploreWriting={() => { window.location.href = '/writing'; }}
        />
        <TechWithPatrickSection onVisitChannel={() => { window.location.href = '/tech-with-patrick'; }} />
        <ContactSection onOpenConnectModal={() => { window.location.href = '/contact'; }} />
      </main>
      <Footer />
      <MobileBottomNav onOpenMore={() => setIsMoreOpen(true)} />
      <MoreSheet
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        onOpenConnect={() => { window.location.href = '/contact'; }}
        onOpenAbout={() => { window.location.href = '/about'; }}
        onOpenTech={() => { window.location.href = '/tech-with-patrick'; }}
      />
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenConnect={() => { window.location.href = '/contact'; }}
      />
      <VentureModal
        venture={selectedVenture}
        onClose={() => setSelectedVenture(null)}
        onOpenConnect={() => { window.location.href = '/contact'; }}
      />
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenConnect={() => { window.location.href = '/contact'; }}
      />
      <ConnectModal isOpen={false} onClose={() => {}} />
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

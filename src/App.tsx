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
import { SectionOverviewModal } from './components/SectionOverviewModal';

import {
  ProjectItem,
  VentureItem,
  ArticleItem
} from './data/portfolioData';

function PortfolioApp() {
  const { isDark } = useTheme();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedVenture, setSelectedVenture] = useState<VentureItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [overviewType, setOverviewType] = useState<'projects' | 'ventures' | 'writing' | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openProject = (project: ProjectItem) => {
    setOverviewType(null);
    setSelectedProject(project);
  };

  const openVenture = (venture: VentureItem) => {
    setOverviewType(null);
    setSelectedVenture(venture);
  };

  const openArticle = (article: ArticleItem) => {
    setOverviewType(null);
    setSelectedArticle(article);
  };

  return (
    <div className={`min-h-screen selection:bg-cyan-500/30 selection:text-cyan-300 relative pb-16 lg:pb-0 transition-colors duration-200 ${
      isDark ? 'bg-[#030712] text-slate-100' : 'bg-white text-slate-900'
    }`}>
      <Navbar onOpenConnect={() => setIsConnectOpen(true)} />

      <main>
        <Hero
          onExploreWork={() => scrollToSection('projects')}
          onGetInTouch={() => setIsConnectOpen(true)}
          onOpenTechPatrick={() => setIsTechOpen(true)}
        />
        <AboutSection onLearnMore={() => setIsAboutOpen(true)} />
        <ProjectsSection
          onSelectProject={openProject}
          onViewAllProjects={() => setOverviewType('projects')}
        />
        <VenturesSection
          onSelectVenture={openVenture}
          onViewAllVentures={() => setOverviewType('ventures')}
        />
        <SkillsSection />
        <WritingSection
          onSelectArticle={openArticle}
          onExploreWriting={() => setOverviewType('writing')}
        />
        <TechWithPatrickSection onVisitChannel={() => setIsTechOpen(true)} />
        <ContactSection onOpenConnectModal={() => setIsConnectOpen(true)} />
      </main>

      <Footer />

      <MobileBottomNav onOpenMore={() => setIsMoreOpen(true)} />

      <MoreSheet
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        onOpenConnect={() => setIsConnectOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenTech={() => setIsTechOpen(true)}
      />

      <SectionOverviewModal
        type={overviewType}
        onClose={() => setOverviewType(null)}
        onSelectProject={openProject}
        onSelectVenture={openVenture}
        onSelectArticle={openArticle}
        onOpenConnect={() => setIsConnectOpen(true)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenConnect={() => setIsConnectOpen(true)}
      />

      <VentureModal
        venture={selectedVenture}
        onClose={() => setSelectedVenture(null)}
        onOpenConnect={() => setIsConnectOpen(true)}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenConnect={() => setIsConnectOpen(true)}
      />

      <ConnectModal isOpen={isConnectOpen} onClose={() => setIsConnectOpen(false)} />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenConnect={() => {
          setIsAboutOpen(false);
          setIsConnectOpen(true);
        }}
      />

      <TechModal isOpen={isTechOpen} onClose={() => setIsTechOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}

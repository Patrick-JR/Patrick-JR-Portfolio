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

import {
  ProjectItem,
  VentureItem,
  ArticleItem,
  PROJECTS_DATA,
  VENTURES_DATA,
  ARTICLES_DATA
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen selection:bg-cyan-500/30 selection:text-cyan-300 relative pb-16 lg:pb-0 transition-colors duration-200 ${
        isDark ? 'bg-[#030712] text-slate-100' : 'bg-white text-slate-900'
      }`}
    >
      {/* Top Navigation */}
      <Navbar onOpenConnect={() => setIsConnectOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section - Always remains dark */}
        <Hero
          onExploreWork={() => scrollToSection('projects')}
          onGetInTouch={() => setIsConnectOpen(true)}
          onOpenTechPatrick={() => setIsTechOpen(true)}
        />

        {/* 01. About Me - Background white in light mode, cards remain black */}
        <AboutSection onLearnMore={() => setIsAboutOpen(true)} />

        {/* 02. Featured Projects - Background white in light mode, cards remain black */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
          onViewAllProjects={() => setSelectedProject(PROJECTS_DATA[0])}
        />

        {/* 03. Ventures - Background white in light mode, cards remain black */}
        <VenturesSection
          onSelectVenture={(venture) => setSelectedVenture(venture)}
          onViewAllVentures={() => setSelectedVenture(VENTURES_DATA[0])}
        />

        {/* 04. Skills & Technologies - Background white in light mode, cards remain black */}
        <SkillsSection />

        {/* 05. Writing & Publications - Background white in light mode, cards remain black */}
        <WritingSection
          onSelectArticle={(article) => setSelectedArticle(article)}
          onExploreWriting={() => setSelectedArticle(ARTICLES_DATA[0])}
        />

        {/* 06. Tech with Patrick - Background white in light mode, card remains black */}
        <TechWithPatrickSection
          onVisitChannel={() => setIsTechOpen(true)}
        />

        {/* 07. Get In Touch - Background white in light mode, link icons black */}
        <ContactSection
          onOpenConnectModal={() => setIsConnectOpen(true)}
        />
      </main>

      {/* Footer - White in light mode, link icons black */}
      <Footer />

      {/* Mobile Bottom Navigation Dock */}
      <MobileBottomNav onOpenMore={() => setIsMoreOpen(true)} />

      {/* Mobile "More" Drawer */}
      <MoreSheet
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        onOpenConnect={() => setIsConnectOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenTech={() => setIsTechOpen(true)}
      />

      {/* Modals & Dialogs */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenConnect={() => {
          setSelectedProject(null);
          setIsConnectOpen(true);
        }}
      />

      <VentureModal
        venture={selectedVenture}
        onClose={() => setSelectedVenture(null)}
        onOpenConnect={() => {
          setSelectedVenture(null);
          setIsConnectOpen(true);
        }}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenConnect={() => {
          setSelectedArticle(null);
          setIsConnectOpen(true);
        }}
      />

      <ConnectModal
        isOpen={isConnectOpen}
        onClose={() => setIsConnectOpen(false)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenConnect={() => {
          setIsAboutOpen(false);
          setIsConnectOpen(true);
        }}
      />

      <TechModal
        isOpen={isTechOpen}
        onClose={() => setIsTechOpen(false)}
      />
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

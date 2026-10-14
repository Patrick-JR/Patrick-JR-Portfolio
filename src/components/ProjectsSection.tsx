import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onViewAllProjects: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onViewAllProjects,
}) => {
  const { isDark } = useTheme();

  return (
    <section id="projects" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="font-mono-tag text-cyan-500 text-xs sm:text-sm tracking-wider font-medium">
              // 02. FEATURED PROJECTS
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Ideas into real solutions.
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Here are some of the projects I've worked on. Each one represents a step towards building technology that solves real problems and creates impact.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onViewAllProjects}
              className={`group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700 font-bold'
              }`}
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 4 Projects Grid (Cards remain black as requested) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group bg-[#050b18] hover:bg-[#071126] border border-cyan-950/70 hover:border-cyan-500/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 cursor-pointer shadow-lg shadow-black/50 hover:-translate-y-1 hover:shadow-cyan-950/30"
            >
              {/* Image Preview with Tag Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Category Pill Tag Overlay at bottom-right */}
                <div className="absolute bottom-3 right-3">
                  <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border backdrop-blur-md ${project.tagColor}`}>
                    {project.tag}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed line-clamp-4">
                    {project.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

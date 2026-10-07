import React from 'react';
import { X, ExternalLink, Cpu, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenConnect: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenConnect,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#060c1c] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/40 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#040814]/80">
          <div className="flex items-center gap-2.5">
            <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${project.tagColor}`}>
              {project.tag}
            </span>
            <span className="font-mono-tag text-xs text-slate-400">PROJECT ARCHITECTURE</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/80 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Project Image */}
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-slate-800 bg-slate-900">
            <img
              src={project.image}
              alt={project.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Title & Core Overview */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {project.name}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.fullOverview || project.description}
            </p>
          </div>

          {/* Tech Stack */}
          {project.techStack && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Technologies & Frameworks</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-lg bg-slate-900/90 text-slate-200 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Impact Metric */}
          {project.metrics && (
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1">
              <div className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Impact & Delivery</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {project.metrics}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-800/80 bg-[#040814]/90 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenConnect();
            }}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
          >
            Inquire about this project →
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

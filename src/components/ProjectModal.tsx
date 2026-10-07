import React from 'react';
import { X, Cpu, ArrowRight } from 'lucide-react';
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
        className="relative w-full max-w-3xl bg-[#060c1c] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/40 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#040814]/80">
          <div className="flex items-center gap-2.5">
            <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${project.tagColor}`}>
              {project.tag}
            </span>
            <span className="font-mono-tag text-xs text-slate-400">{project.status || 'PROJECT'}</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/80 transition-colors" aria-label="Close dialog">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto">
          <div className="relative aspect-[16/7] bg-slate-900">
            <img src={project.image} alt={project.name} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060c1c] via-transparent to-transparent" />
          </div>

          <div className="p-6 sm:p-8 space-y-7">
            <div>
              <h3 className="text-3xl font-bold text-white tracking-tight">{project.name}</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-3">{project.fullOverview || project.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl bg-slate-900/55 border border-slate-800 p-4">
                <div className="text-[10px] uppercase tracking-wider text-cyan-400">My role</div>
                <div className="text-sm text-white mt-1">{project.role || 'Builder'}</div>
              </div>
              <div className="rounded-xl bg-slate-900/55 border border-slate-800 p-4">
                <div className="text-[10px] uppercase tracking-wider text-cyan-400">Status</div>
                <div className="text-sm text-white mt-1">{project.status || 'In progress'}</div>
              </div>
              <div className="rounded-xl bg-slate-900/55 border border-slate-800 p-4">
                <div className="text-[10px] uppercase tracking-wider text-cyan-400">Category</div>
                <div className="text-sm text-white mt-1">{project.tag}</div>
              </div>
            </div>

            {project.techStack && project.techStack.length > 0 && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" /> Technologies & areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs px-3 py-1 rounded-lg bg-slate-900/90 text-slate-200 border border-slate-800">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {project.notes && (
              <div className="p-4 rounded-xl bg-cyan-950/25 border border-cyan-500/25 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="text-cyan-300 font-semibold">Portfolio note: </span>{project.notes}
              </div>
            )}
          </div>
        </div>

        <div className="p-5 border-t border-slate-800/80 bg-[#040814]/90 flex items-center justify-between">
          <button onClick={() => { onClose(); onOpenConnect(); }} className="text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1.5">
            Discuss this project <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button onClick={onClose} className="px-5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all">Close</button>
        </div>
      </div>
    </div>
  );
};

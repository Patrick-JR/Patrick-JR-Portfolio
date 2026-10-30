import React, { useMemo, useState } from 'react';
import {
  Activity, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, BarChart3, Bell, BookOpen,
  BriefcaseBusiness, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft,
  ChevronsRight, CircleHelp, Code2, Copy, ExternalLink, Eye, FileImage, FileText,
  FolderKanban, Globe, ImagePlus, LayoutDashboard, Link2, ListOrdered, LockKeyhole,
  LogOut, Menu, Monitor, MoreHorizontal, Pencil, Plus, Search, Settings, ShieldCheck,
  Sparkles, Trash2, Upload, UserRound, Users, X, Zap
} from 'lucide-react';
import {
  ActivityItem, ArticleItem, PortfolioContent, PortfolioLink, ProjectItem, SkillEntry,
  SkillGroup, VentureItem, addActivity, readActivity, readPageViews, resetPortfolioContent,
  savePortfolioContent, updatePortfolioContent, useActivity, usePageViews, usePortfolioContent
} from '../data/portfolioStore';
import { useRouter } from '../context/RouterContext';
import { PMLogo } from '../components/Icons';

type Section = 'overview' | 'about' | 'projects' | 'ventures' | 'skills' | 'writing' | 'media' | 'links' | 'settings';
type DraftKind = 'project' | 'post' | 'venture';

const navGroups: { label: string; items: { id: Section; label: string; icon: React.ElementType }[] }[] = [
  { label: 'WORKSPACE', items: [{ id: 'overview', label: 'Dashboard', icon: LayoutDashboard }] },
  { label: 'CONTENT', items: [
    { id: 'about', label: 'About', icon: UserRound },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'ventures', label: 'Ventures', icon: BriefcaseBusiness },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'writing', label: 'Writing', icon: BookOpen },
  ] },
  { label: 'MANAGE', items: [
    { id: 'media', label: 'Media library', icon: FileImage },
    { id: 'links', label: 'Links & socials', icon: Link2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] },
];

const sectionMeta: Record<Section, { title: string; subtitle: string }> = {
  overview: { title: 'Dashboard', subtitle: 'A quick overview of your portfolio and recent activity.' },
  about: { title: 'About page', subtitle: 'Manage your introduction, biography and personal philosophy.' },
  projects: { title: 'Projects', subtitle: 'Create, edit, feature, reorder and remove portfolio projects.' },
  ventures: { title: 'Ventures', subtitle: 'Manage the organisations and products you are building.' },
  skills: { title: 'Skills & technologies', subtitle: 'Add skills, update proficiency and organise them by category.' },
  writing: { title: 'Writing & publications', subtitle: 'Write articles, save drafts and publish them to your portfolio.' },
  media: { title: 'Media library', subtitle: 'Review the images currently attached to projects and articles.' },
  links: { title: 'Links & socials', subtitle: 'Manage the links visitors use to find and contact you.' },
  settings: { title: 'Settings', subtitle: 'Back up local content and manage this browser-based workspace.' },
};

const emptyProject = (): ProjectItem => ({
  id: `project-${Date.now()}`,
  name: '',
  tag: 'Software',
  tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  description: '',
  image: '',
  fullOverview: '',
  techStack: [],
  role: 'Builder',
  status: 'In progress',
  notes: '',
});

const emptyPost = (): ArticleItem => ({
  id: `post-${Date.now()}`,
  tag: 'Technology',
  title: '',
  image: '',
  readTime: '5 min',
  date: new Date().toLocaleDateString(),
  summary: '',
  content: '',
  status: 'Draft',
});

const emptyVenture = (): VentureItem => ({
  id: `venture-${Date.now()}`,
  name: '',
  description: '',
  logoType: 'uplex',
  role: '',
  status: 'Building',
  details: '',
});

function relativeTime(value: string) {
  const elapsed = Math.max(0, Date.now() - new Date(value).getTime());
  const minutes = Math.floor(elapsed / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function IconButton({ title, onClick, children, danger = false }: { title: string; onClick: () => void; children: React.ReactNode; danger?: boolean }) {
  return (
    <button type="button" title={title} aria-label={title} onClick={onClick}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border transition-colors ${danger ? 'border-rose-500/20 text-slate-400 hover:text-rose-300 hover:bg-rose-500/10' : 'border-slate-700/70 text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10'}`}>
      {children}
    </button>
  );
}

function StatusPill({ value }: { value: string }) {
  const live = /published|live|active/i.test(value);
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold border ${live ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-200 bg-amber-500/10 border-amber-500/20'}`}>{value || 'Draft'}</span>;
}

function MetricCard({ label, value, hint, icon: Icon, tone }: { label: string; value: string | number; hint: string; icon: React.ElementType; tone: string }) {
  return (
    <div className="rounded-2xl bg-[#071326] border border-[#17304e] p-4 xl:p-5 min-w-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-slate-400">{label}</div>
          <div className="text-2xl xl:text-3xl font-semibold text-white mt-2 tabular-nums">{value}</div>
          <div className="text-[10px] text-slate-500 mt-2">{hint}</div>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tone}`}><Icon className="w-5 h-5"/></div>
      </div>
    </div>
  );
}

function ProjectEditor({ value, onClose, onSave }: { value: ProjectItem; onClose: () => void; onSave: (value: ProjectItem) => void }) {
  const [draft, setDraft] = useState<ProjectItem>({ ...value, techStack: [...(value.techStack || [])] });
  const [techText, setTechText] = useState((value.techStack || []).join(', '));
  const update = (key: keyof ProjectItem, next: string) => setDraft((current) => ({ ...current, [key]: next } as ProjectItem));
  return (
    <div className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center" onClick={onClose}>
      <form onSubmit={(e) => { e.preventDefault(); onSave({ ...draft, techStack: techText.split(',').map((item) => item.trim()).filter(Boolean) }); }}
        onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl border border-cyan-500/25 bg-[#071326] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 sm:px-7 py-4 bg-[#071326]/95 backdrop-blur border-b border-slate-800">
          <div><div className="font-mono-tag text-[10px] text-cyan-400">// PROJECT EDITOR</div><h3 className="text-lg font-semibold text-white mt-1">{value.name ? 'Edit project' : 'Add a project'}</h3></div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"><X className="w-5 h-5"/></button>
        </div>
        <div className="p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Project name" value={draft.name} onChange={(v) => update('name', v)} required placeholder="e.g. BuyShare"/>
          <Field label="Category" value={draft.tag} onChange={(v) => update('tag', v)} placeholder="e.g. Marketplace"/>
          <Field label="Status" value={draft.status || ''} onChange={(v) => update('status', v)} placeholder="In progress / Prototype / Live"/>
          <Field label="Your role" value={draft.role || ''} onChange={(v) => update('role', v)} placeholder="Founder, builder, engineer..."/>
          <div className="sm:col-span-2"><Field label="Short description" value={draft.description} onChange={(v) => update('description', v)} required placeholder="A short overview for project cards."/></div>
          <div className="sm:col-span-2"><TextField label="Full project overview" value={draft.fullOverview || ''} onChange={(v) => update('fullOverview', v)} rows={4} placeholder="Explain the problem, approach and what you built."/></div>
          <div className="sm:col-span-2"><Field label="Image URL" value={draft.image} onChange={(v) => update('image', v)} placeholder="/src/assets/images/... or https://..."/><ImagePicker label="Or choose a small image from this device" value={draft.image} onChange={(v) => update('image', v)}/></div>
          <Field label="Live project URL" value={draft.liveUrl || ''} onChange={(v) => update('liveUrl', v)} placeholder="https://..."/>
          <div className="sm:col-span-2"><Field label="Technology stack (comma separated)" value={techText} onChange={setTechText} placeholder="React, TypeScript, Firebase"/></div>
          <div className="sm:col-span-2"><TextField label="Additional notes" value={draft.notes || ''} onChange={(v) => update('notes', v)} rows={2} placeholder="Prototype limitations, collaborators, future direction..."/></div>
        </div>
        <div className="px-5 sm:px-7 py-4 border-t border-slate-800 flex justify-end gap-2"><button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800">Cancel</button><button type="submit" className="px-5 py-2 rounded-lg bg-cyan-400 text-slate-950 text-sm font-semibold hover:bg-cyan-300">Save project</button></div>
      </form>
    </div>
  );
}

function PostEditor({ value, onClose, onSave }: { value: ArticleItem; onClose: () => void; onSave: (value: ArticleItem) => void }) {
  const [draft, setDraft] = useState<ArticleItem>({ ...value });
  const update = (key: keyof ArticleItem, next: string) => setDraft((current) => ({ ...current, [key]: next }));
  return (
    <div className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center" onClick={onClose}>
      <form onSubmit={(e) => { e.preventDefault(); onSave({ ...draft, readTime: `${Math.max(1, Math.ceil(draft.content.trim().split(/\s+/).filter(Boolean).length / 220))} min` }); }}
        onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl border border-cyan-500/25 bg-[#071326] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 sm:px-7 py-4 bg-[#071326]/95 backdrop-blur border-b border-slate-800">
          <div><div className="font-mono-tag text-[10px] text-cyan-400">// WRITING STUDIO</div><h3 className="text-lg font-semibold text-white mt-1">{value.title ? 'Edit article' : 'Write a new post'}</h3></div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"><X className="w-5 h-5"/></button>
        </div>
        <div className="p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><Field label="Article title" value={draft.title} onChange={(v) => update('title', v)} required placeholder="Give your article a clear title"/></div>
          <Field label="Category" value={draft.tag} onChange={(v) => update('tag', v)} placeholder="Technology, Research, Philosophy..."/>
          <SelectField label="Publication status" value={draft.status || 'Draft'} onChange={(v) => update('status', v)} options={['Draft','Published']}/>
          <div className="sm:col-span-2"><Field label="Cover image URL" value={draft.image} onChange={(v) => update('image', v)} placeholder="https://... or /src/assets/..."/><ImagePicker label="Or choose a small cover image" value={draft.image} onChange={(v) => update('image', v)}/></div>
          <Field label="Publication date" value={draft.date} onChange={(v) => update('date', v)} placeholder="e.g. 31 Oct 2026"/>
          <div className="sm:col-span-2"><Field label="Short summary" value={draft.summary} onChange={(v) => update('summary', v)} required placeholder="A short excerpt shown on the writing page."/></div>
          <div className="sm:col-span-2"><TextField label="Article content" value={draft.content} onChange={(v) => update('content', v)} rows={12} required placeholder="Start writing your article here..."/></div>
        </div>
        <div className="px-5 sm:px-7 py-4 border-t border-slate-800 flex justify-between items-center gap-3"><span className="text-[11px] text-slate-500">Reading time is estimated from the content.</span><div className="flex gap-2"><button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800">Cancel</button><button type="submit" className="px-5 py-2 rounded-lg bg-cyan-400 text-slate-950 text-sm font-semibold hover:bg-cyan-300">Save post</button></div></div>
      </form>
    </div>
  );
}

function VentureEditor({ value, onClose, onSave }: { value: VentureItem; onClose: () => void; onSave: (value: VentureItem) => void }) {
  const [draft, setDraft] = useState<VentureItem>({ ...value });
  const update = (key: keyof VentureItem, next: string) => setDraft((current) => ({ ...current, [key]: next } as VentureItem));
  return (
    <div className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center" onClick={onClose}>
      <form onSubmit={(e) => { e.preventDefault(); onSave(draft); }} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-500/25 bg-[#071326] shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800"><div><div className="font-mono-tag text-[10px] text-cyan-400">// VENTURE EDITOR</div><h3 className="text-lg font-semibold text-white mt-1">{value.name ? 'Edit venture' : 'Add a venture'}</h3></div><button type="button" onClick={onClose}><X className="w-5 h-5 text-slate-400"/></button></div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Name" value={draft.name} onChange={(v) => update('name', v)} required/>
          <Field label="Your role" value={draft.role || ''} onChange={(v) => update('role', v)}/>
          <Field label="Status" value={draft.status || ''} onChange={(v) => update('status', v)}/>
          <SelectField label="Logo style" value={draft.logoType} onChange={(v) => update('logoType', v)} options={['uplex','buyshare','giftedlife']}/>
          <div className="sm:col-span-2"><Field label="Short description" value={draft.description} onChange={(v) => update('description', v)} required/></div>
          <div className="sm:col-span-2"><TextField label="Full details" value={draft.details || ''} onChange={(v) => update('details', v)} rows={5}/></div>
          <Field label="Website URL" value={draft.actionUrl || ''} onChange={(v) => update('actionUrl', v)}/>
          <Field label="Button label" value={draft.actionText || ''} onChange={(v) => update('actionText', v)}/>
        </div>
        <div className="px-6 py-4 border-t border-slate-800 flex justify-end gap-2"><button type="button" onClick={onClose} className="px-4 py-2 text-sm text-slate-300">Cancel</button><button type="submit" className="px-5 py-2 rounded-lg bg-cyan-400 text-slate-950 text-sm font-semibold">Save venture</button></div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, required = false, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean; type?: string }) {
  return <label className="block min-w-0"><span className="block text-xs font-medium text-slate-300 mb-1.5">{label}</span><input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} className="w-full rounded-lg bg-[#030d1c] border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/10 outline-none px-3 py-2.5 text-sm text-white placeholder:text-slate-600"/></label>;
}

function TextField({ label, value, onChange, rows = 4, placeholder }: { label: string; value: string; onChange: (value: string) => void; rows?: number; placeholder?: string }) {
  return <label className="block"><span className="block text-xs font-medium text-slate-300 mb-1.5">{label}</span><textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder} className="w-full rounded-lg bg-[#030d1c] border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/10 outline-none px-3 py-2.5 text-sm leading-relaxed text-white placeholder:text-slate-600 resize-y"/></label>;
}


function ImagePicker({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [error, setError] = useState('');
  const handleFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Choose an image file.'); return; }
    if (file.size > 350 * 1024) { setError('Keep local images under 350 KB. Larger images should use a hosted URL.'); return; }
    const reader = new FileReader();
    reader.onload = () => { onChange(String(reader.result || '')); setError(''); };
    reader.onerror = () => setError('Could not read this image.');
    reader.readAsDataURL(file);
  };
  return <div className="mt-2 flex flex-wrap items-center gap-3">
    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 text-[11px] text-slate-300 hover:border-cyan-500/50 cursor-pointer">
      <ImagePlus className="w-4 h-4 text-cyan-300"/>{label}
      <input type="file" accept="image/*" className="hidden" onChange={(event) => handleFile(event.target.files?.[0])}/>
    </label>
    {value && <span className="text-[10px] text-emerald-300">Image selected</span>}
    {error && <span className="text-[10px] text-rose-300">{error}</span>}
  </div>;
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <label className="block"><span className="block text-xs font-medium text-slate-300 mb-1.5">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg bg-[#030d1c] border border-slate-700/80 focus:border-cyan-400 outline-none px-3 py-2.5 text-sm text-white">{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

export default function AdminPage() {
  const { navigate } = useRouter();
  const content = usePortfolioContent();
  const activity = useActivity();
  const pageViews = usePageViews();
  const [section, setSection] = useState<Section>('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [editor, setEditor] = useState<{ kind: DraftKind; value: ProjectItem | ArticleItem | VentureItem } | null>(null);
  const [aboutDraft, setAboutDraft] = useState<PortfolioContent['about'] | null>(null);
  const [heroDraft, setHeroDraft] = useState<PortfolioContent['hero'] | null>(null);
  const [linkDrafts, setLinkDrafts] = useState<PortfolioLink[] | null>(null);
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Software Development', level: 'Working' as SkillEntry['level'] });
  const [newCategory, setNewCategory] = useState('');
  const [notice, setNotice] = useState('');

  const skillsCount = content.skills.reduce((sum, group) => sum + group.skills.length, 0);
  const publishedPosts = content.articles.filter((post) => post.status === 'Published').length;
  const viewsLast30Days = pageViews.length;

  const dayStats = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setHours(0,0,0,0);
      date.setDate(date.getDate() - (6 - index));
      const key = date.toLocaleDateString();
      return { label: date.toLocaleDateString(undefined, { weekday: 'short' }), count: pageViews.filter((view) => new Date(view.at).toLocaleDateString() === key).length };
    });
    return days;
  }, [pageViews]);
  const maxDayCount = Math.max(1, ...dayStats.map((day) => day.count));

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2600);
  };

  const changeSection = (next: Section) => {
    setSection(next);
    setMobileSidebarOpen(false);
    setSearch('');
  };

  const saveProject = (project: ProjectItem) => {
    const exists = content.projects.some((item) => item.id === project.id);
    updatePortfolioContent((current) => ({
      ...current,
      projects: exists ? current.projects.map((item) => item.id === project.id ? project : item) : [...current.projects, project],
    }), { action: exists ? 'Project updated' : 'Project added', detail: project.name });
    setEditor(null);
    notify(exists ? 'Project updated.' : 'Project added.');
  };

  const savePost = (post: ArticleItem) => {
    const exists = content.articles.some((item) => item.id === post.id);
    updatePortfolioContent((current) => ({
      ...current,
      articles: exists ? current.articles.map((item) => item.id === post.id ? post : item) : [post, ...current.articles],
    }), { action: post.status === 'Published' ? 'Post published' : exists ? 'Draft updated' : 'Draft created', detail: post.title });
    setEditor(null);
    notify(post.status === 'Published' ? 'Post saved and published to this browser.' : 'Draft saved.');
  };

  const saveVenture = (venture: VentureItem) => {
    const exists = content.ventures.some((item) => item.id === venture.id);
    updatePortfolioContent((current) => ({
      ...current,
      ventures: exists ? current.ventures.map((item) => item.id === venture.id ? venture : item) : [...current.ventures, venture],
    }), { action: exists ? 'Venture updated' : 'Venture added', detail: venture.name });
    setEditor(null);
    notify('Venture saved.');
  };

  const deleteItem = (kind: 'project' | 'post' | 'venture', id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone in this browser.`)) return;
    updatePortfolioContent((current) => ({
      ...current,
      projects: kind === 'project' ? current.projects.filter((item) => item.id !== id) : current.projects,
      articles: kind === 'post' ? current.articles.filter((item) => item.id !== id) : current.articles,
      ventures: kind === 'venture' ? current.ventures.filter((item) => item.id !== id) : current.ventures,
    }), { action: `${kind[0].toUpperCase() + kind.slice(1)} deleted`, detail: name });
    notify(`${name} deleted.`);
  };

  const moveProject = (id: string, direction: -1 | 1) => {
    updatePortfolioContent((current) => {
      const next = [...current.projects];
      const index = next.findIndex((item) => item.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...current, projects: next };
    }, { action: 'Project order changed', detail: content.projects.find((item) => item.id === id)?.name || 'Project list' });
  };

  const saveAbout = () => {
    if (!aboutDraft) return;
    updatePortfolioContent((current) => ({
      ...current,
      about: { ...current.about, ...aboutDraft },
      hero: heroDraft ? { ...current.hero, ...heroDraft } : current.hero,
    }), { action: 'Profile updated', detail: 'Homepage introduction and About biography' });
    setAboutDraft(null);
    setHeroDraft(null);
    notify('About page saved.');
  };

  const updateSkill = (groupId: string, skillId: string, patch: Partial<SkillEntry>) => {
    updatePortfolioContent((current) => ({
      ...current,
      skills: current.skills.map((group) => group.id !== groupId ? group : ({
        ...group,
        skills: group.skills.map((skill) => skill.id === skillId ? { ...skill, ...patch } : skill),
      })),
    }));
  };

  const addSkill = () => {
    if (!newSkill.name.trim()) return;
    const group = content.skills.find((item) => item.category === newSkill.category);
    const skill: SkillEntry = { id: `skill-${Date.now()}`, name: newSkill.name.trim(), level: newSkill.level };
    updatePortfolioContent((current) => ({
      ...current,
      skills: group
        ? current.skills.map((item) => item.id === group.id ? { ...item, skills: [...item.skills, skill] } : item)
        : [...current.skills, { id: `group-${Date.now()}`, category: newSkill.category, icon: 'code', skills: [skill] }],
    }), { action: 'Skill added', detail: skill.name });
    setNewSkill((current) => ({ ...current, name: '' }));
    notify('Skill added.');
  };

  const deleteSkill = (groupId: string, skill: SkillEntry) => {
    updatePortfolioContent((current) => ({
      ...current,
      skills: current.skills.map((group) => group.id === groupId ? { ...group, skills: group.skills.filter((item) => item.id !== skill.id) } : group),
    }), { action: 'Skill removed', detail: skill.name });
  };

  const saveLinks = () => {
    const next = (linkDrafts || []).filter((link) => link.label.trim() && link.href.trim());
    updatePortfolioContent((current) => ({ ...current, links: next }), { action: 'Links updated', detail: `${next.length} links saved` });
    setLinkDrafts(null);
    notify('Links updated.');
  };

  const exportContent = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patrick-portfolio-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    notify('Portfolio backup downloaded.');
  };

  const importContent = async (file?: File) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as PortfolioContent;
      if (!parsed.projects || !parsed.articles || !parsed.skills) throw new Error('Invalid backup');
      savePortfolioContent(parsed);
      addActivity('Backup restored', 'Portfolio content imported from JSON.');
      notify('Backup restored.');
    } catch {
      notify('Could not read that backup file.');
    }
  };

  const filteredProjects = content.projects.filter((item) => `${item.name} ${item.tag} ${item.description}`.toLowerCase().includes(search.toLowerCase()));
  const filteredPosts = content.articles.filter((item) => `${item.title} ${item.tag}`.toLowerCase().includes(search.toLowerCase()));

  const renderSidebar = () => (
    <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen shrink-0 flex flex-col border-r border-[#18304d] bg-[#041021] transition-all duration-200 ${collapsed ? 'w-[78px]' : 'w-[252px]'} ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className={`h-[76px] flex items-center gap-3 px-5 border-b border-[#18304d] ${collapsed ? 'justify-center px-2' : ''}`}>
        <PMLogo className="w-9 h-9 shrink-0"/>
        {!collapsed && <div className="min-w-0"><div className="font-mono-tag text-[12px] text-white font-bold">Patrick JR Mulenga</div><div className="text-[10px] text-slate-500 mt-0.5">Portfolio Admin</div></div>}
        <button onClick={() => setMobileSidebarOpen(false)} className="lg:hidden ml-auto text-slate-400"><X className="w-5 h-5"/></button>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && <div className="px-3 mb-2 text-[9px] font-semibold tracking-[0.18em] text-slate-600">{group.label}</div>}
            <div className="space-y-1">
              {group.items.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => changeSection(id)} title={collapsed ? label : undefined}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] transition-colors ${collapsed ? 'justify-center px-2' : ''} ${section === id ? 'bg-[#0b4773] text-cyan-200 shadow-inner shadow-cyan-900/30' : 'text-slate-400 hover:text-white hover:bg-slate-900/80'}`}>
                  <Icon className="w-[17px] h-[17px] shrink-0"/>{!collapsed && <span>{label}</span>}
                  {!collapsed && section === id && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-300"/>}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-[#18304d] space-y-2">
        <button onClick={() => setCollapsed((value) => !value)} className={`hidden lg:flex w-full items-center gap-3 px-3 py-2 text-[11px] text-slate-500 hover:text-cyan-300 ${collapsed ? 'justify-center' : ''}`}>
          {collapsed ? <ChevronsRight className="w-4 h-4"/> : <><ChevronsLeft className="w-4 h-4"/><span>Collapse sidebar</span></>}
        </button>
        <button onClick={() => navigate('/')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-slate-900/80 ${collapsed ? 'justify-center' : ''}`}>
          <LockKeyhole className="w-5 h-5 text-emerald-300 shrink-0"/>{!collapsed && <span><span className="block text-[11px] text-white">View portfolio</span><span className="block text-[9px] text-slate-500">Return to public site</span></span>}
        </button>
      </div>
    </aside>
  );

  const renderOverview = () => (
    <div className="space-y-5">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <MetricCard label="Total projects" value={content.projects.length} hint="Manage your portfolio work" icon={FolderKanban} tone="bg-blue-500/15 text-blue-300"/>
        <MetricCard label="Published posts" value={publishedPosts} hint={`${content.articles.length - publishedPosts} drafts saved`} icon={FileText} tone="bg-violet-500/15 text-violet-300"/>
        <MetricCard label="Skills listed" value={skillsCount} hint={`${content.skills.length} skill categories`} icon={Zap} tone="bg-emerald-500/15 text-emerald-300"/>
        <MetricCard label="Social links" value={content.links.length} hint="Links shown on your site" icon={Link2} tone="bg-amber-500/15 text-amber-300"/>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.85fr)] gap-4">
        <div className="rounded-2xl border border-[#17304e] bg-[#061326] p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div><div className="flex items-center gap-2 text-white font-semibold text-sm"><Activity className="w-4 h-4 text-cyan-400"/> Portfolio analytics</div><p className="text-[11px] text-slate-500 mt-1">Page views recorded in this browser only · Last 7 days</p></div>
            <span className="text-[10px] px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">Local preview data</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_130px] gap-5 mt-6 items-center">
            <div>
              <div className="flex justify-between text-[10px] text-slate-500 mb-2"><span>Page visits</span><span>7 day activity</span></div>
              <div className="h-40 flex items-end gap-2 border-b border-l border-slate-800 px-2">
                {dayStats.map((day) => <div key={day.label} className="flex-1 h-full flex flex-col justify-end items-center gap-2 group">
                  <div className="w-full rounded-t-md bg-gradient-to-t from-cyan-700 to-cyan-300/90 min-h-[3px] transition-all group-hover:brightness-125" style={{ height: `${Math.max(2, day.count / maxDayCount * 100)}%` }} title={`${day.label}: ${day.count} page views`}/>
                  <span className="text-[9px] text-slate-500 -mb-5">{day.label}</span>
                </div>)}
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              <div><div className="text-[10px] text-slate-500">Last 30 days</div><div className="text-2xl font-semibold text-white tabular-nums">{viewsLast30Days}</div><div className="text-[10px] text-slate-500">Local page views</div></div>
              <div><div className="text-[10px] text-slate-500">Content items</div><div className="text-2xl font-semibold text-white tabular-nums">{content.projects.length + content.articles.length + content.ventures.length}</div><div className="text-[10px] text-slate-500">Projects, posts, ventures</div></div>
            </div>
          </div>
          <p className="text-[10px] text-slate-600 mt-8 leading-relaxed">This chart only counts page views from this browser. It is not shared visitor analytics. Connect a backend analytics service for real site-wide visitor reporting.</p>
        </div>

        <div className="rounded-2xl border border-[#17304e] bg-[#061326] p-5">
          <div className="flex items-center gap-2 text-white font-semibold text-sm mb-4"><Zap className="w-4 h-4 text-cyan-400"/> Quick actions</div>
          <div className="space-y-2">
            <QuickAction icon={Plus} label="Add new project" color="blue" onClick={() => setEditor({ kind: 'project', value: emptyProject() })}/>
            <QuickAction icon={FileText} label="Write a new post" color="green" onClick={() => setEditor({ kind: 'post', value: emptyPost() })}/>
            <QuickAction icon={Zap} label="Add a skill" color="amber" onClick={() => changeSection('skills')}/>
            <QuickAction icon={UserRound} label="Update About page" color="blue" onClick={() => { setAboutDraft({ ...content.about }); changeSection('about'); }}/>
            <QuickAction icon={Link2} label="Manage links" color="violet" onClick={() => { setLinkDrafts(content.links.map((item) => ({ ...item }))); changeSection('links'); }}/>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.85fr)] gap-4">
        <div className="rounded-2xl border border-[#17304e] bg-[#061326] overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-800"><div><div className="text-sm font-semibold text-white">Recent content</div><div className="text-[10px] text-slate-500 mt-1">Your latest portfolio updates</div></div><button onClick={() => changeSection('projects')} className="text-[11px] text-cyan-300 hover:text-white">Manage content <ArrowRight className="inline w-3 h-3 ml-1"/></button></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[640px]">
              <thead className="text-[10px] uppercase tracking-wider text-slate-500 bg-[#07182c]"><tr><th className="px-5 py-3 font-medium">Title</th><th className="px-4 py-3 font-medium">Type</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium text-right">Manage</th></tr></thead>
              <tbody>
                {[...content.projects.slice(0,4).map((item) => ({ id: item.id, title: item.name, kind: 'Project', status: item.status || 'In progress' })), ...content.articles.slice(0,3).map((item) => ({ id: item.id, title: item.title, kind: 'Post', status: item.status || 'Draft' }))].slice(0,6).map((item) => (
                  <tr key={item.kind + item.id} className="border-t border-slate-800/70 hover:bg-white/[0.02]">
                    <td className="px-5 py-3 text-xs text-slate-200 font-medium max-w-[240px] truncate">{item.title}</td><td className="px-4 py-3 text-[11px] text-slate-400">{item.kind}</td><td className="px-4 py-3"><StatusPill value={item.status}/></td>
                    <td className="px-4 py-3 text-right"><button onClick={() => changeSection(item.kind === 'Project' ? 'projects' : 'writing')} className="text-[11px] text-cyan-300 hover:text-white">Open editor</button></td>
                  </tr>
                ))}
                {content.projects.length + content.articles.length === 0 && <tr><td colSpan={4} className="px-5 py-8 text-sm text-slate-500 text-center">No content yet. Create your first project or article.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-[#17304e] bg-[#061326] p-5">
          <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-white font-semibold text-sm"><Activity className="w-4 h-4 text-cyan-400"/> Recent activity</div><span className="text-[10px] text-slate-500">{activity.length} events</span></div>
          <div className="mt-4 space-y-4">
            {(activity.length ? activity.slice(0,5) : [{ id:'welcome', action:'Workspace ready', detail:'Your local portfolio manager is ready to use.', at:new Date().toISOString() } as ActivityItem]).map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center"><Activity className="w-4 h-4 text-cyan-300"/></div>
                <div className="min-w-0 flex-1"><div className="text-xs text-slate-200">{item.action}</div><div className="text-[10px] text-slate-500 truncate mt-1">{item.detail}</div></div>
                <span className="text-[9px] text-slate-600 whitespace-nowrap">{relativeTime(item.at)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#17304e] bg-[#061326] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-300"><Eye className="w-5 h-5"/></div><div><div className="text-sm font-semibold text-white">Preview your public portfolio</div><div className="text-[11px] text-slate-500 mt-1">Review changes in this browser before connecting a live database.</div></div></div>
        <button onClick={() => navigate('/')} className="px-4 py-2 rounded-lg border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 text-xs font-semibold">Open website <ExternalLink className="inline w-3.5 h-3.5 ml-1"/></button>
      </div>
    </div>
  );

  const renderAbout = () => {
    const draft = aboutDraft || content.about;
    const profile = heroDraft || content.hero;
    const set = (key: keyof PortfolioContent['about'], value: string | string[]) => setAboutDraft((current) => ({ ...(current || content.about), [key]: value }));
    const setProfile = (key: keyof PortfolioContent['hero'], value: string | string[]) => setHeroDraft((current) => ({ ...(current || content.hero), [key]: value }));
    return <div className="max-w-4xl space-y-5">
      <Panel title="Homepage profile" description="These details appear in the homepage hero.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First name" value={profile.nameFirst} onChange={(v) => setProfile('nameFirst', v)} />
          <Field label="Last name" value={profile.nameLast} onChange={(v) => setProfile('nameLast', v)} />
        </div>
        <div className="mt-4"><Field label="Professional roles (comma separated)" value={profile.roles.join(', ')} onChange={(v) => setProfile('roles', v.split(',').map((role) => role.trim()).filter(Boolean))} /></div>
        <div className="mt-4"><TextField label="Hero introduction" value={profile.bio} onChange={(v) => setProfile('bio', v)} rows={3}/></div>
      </Panel>
      <Panel title="Main introduction" description="This content feeds the About page and its homepage preview.">
        <Field label="First headline line" value={draft.titlePart1} onChange={(v) => set('titlePart1',v)}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"><Field label="Second headline line" value={draft.titlePart2} onChange={(v) => set('titlePart2',v)}/><Field label="Highlighted words" value={draft.titleHighlight} onChange={(v) => set('titleHighlight',v)}/></div>
        <div className="mt-4"><TextField label="Homepage introduction paragraph" value={draft.paragraphs.join('\n\n')} onChange={(v) => set('paragraphs',v.split('\n').map((line) => line.trim()).filter(Boolean))} rows={4}/></div>
      </Panel>
      <Panel title="Full biography" description="Write a longer biography. Separate paragraphs with a blank line.">
        <TextField label="Biography" value={draft.biography} onChange={(v) => set('biography',v)} rows={14} placeholder="Tell your story..."/>
      </Panel>
      <Panel title="Personal philosophy"><TextField label="Statement" value={draft.principle} onChange={(v) => set('principle',v)} rows={2}/></Panel>
      <div className="flex justify-end"><button onClick={saveAbout} className="px-5 py-2.5 rounded-lg bg-cyan-400 text-slate-950 text-sm font-semibold hover:bg-cyan-300">Save About page</button></div>
    </div>;
  };

  const renderProjects = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between"><div className="relative flex-1 max-w-md"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search projects..." className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg bg-[#071326] border border-slate-700 text-white outline-none focus:border-cyan-400"/></div><button onClick={() => setEditor({kind:'project',value:emptyProject()})} className="px-4 py-2.5 rounded-lg bg-cyan-400 text-slate-950 text-xs font-semibold hover:bg-cyan-300"><Plus className="inline w-4 h-4 mr-1"/>Add project</button></div>
      <div className="rounded-2xl border border-[#17304e] bg-[#061326] overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 text-xs text-slate-400">{content.projects.length} projects · Use arrows to change the order displayed on your website.</div>
        <div className="divide-y divide-slate-800/70">
          {filteredProjects.map((item) => {
            const index = content.projects.findIndex((project) => project.id === item.id);
            return <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center gap-4 hover:bg-white/[0.02]">
              <div className="w-20 h-14 rounded-lg bg-slate-900 overflow-hidden shrink-0">{item.image && <img src={item.image} alt="" className="w-full h-full object-cover"/>}</div>
              <div className="min-w-0 flex-1"><div className="text-sm text-white font-semibold">{item.name}</div><div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{item.description}</div><div className="flex gap-2 items-center mt-2"><span className="text-[10px] text-cyan-300">{item.tag}</span><StatusPill value={item.status || 'In progress'}/></div></div>
              <div className="flex items-center gap-1.5 self-end md:self-auto"><IconButton title="Move up" onClick={()=>moveProject(item.id,-1)}><ArrowUp className="w-4 h-4"/></IconButton><IconButton title="Move down" onClick={()=>moveProject(item.id,1)}><ArrowDown className="w-4 h-4"/></IconButton><IconButton title="Edit project" onClick={()=>setEditor({kind:'project',value:item})}><Pencil className="w-4 h-4"/></IconButton><IconButton title="Delete project" danger onClick={()=>deleteItem('project',item.id,item.name)}><Trash2 className="w-4 h-4"/></IconButton></div>
            </div>;
          })}
          {filteredProjects.length===0 && <div className="p-10 text-center text-sm text-slate-500">No matching projects.</div>}
        </div>
      </div>
    </div>
  );

  const renderVentures = () => <div className="space-y-4">
    <div className="flex justify-end"><button onClick={()=>setEditor({kind:'venture',value:emptyVenture()})} className="px-4 py-2.5 rounded-lg bg-cyan-400 text-slate-950 text-xs font-semibold hover:bg-cyan-300"><Plus className="inline w-4 h-4 mr-1"/>Add venture</button></div>
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">{content.ventures.map((item)=> <div key={item.id} className="rounded-2xl border border-[#17304e] bg-[#061326] p-5">
      <div className="flex items-start justify-between gap-3"><div><div className="font-mono-tag text-[10px] text-cyan-400">{item.role || 'Venture'}</div><h3 className="text-lg text-white font-semibold mt-1">{item.name}</h3></div><StatusPill value={item.status || 'Building'}/></div>
      <p className="text-xs text-slate-400 leading-relaxed mt-3">{item.description}</p>
      <div className="flex items-center justify-end gap-2 mt-5"><IconButton title="Edit venture" onClick={()=>setEditor({kind:'venture',value:item})}><Pencil className="w-4 h-4"/></IconButton><IconButton title="Delete venture" danger onClick={()=>deleteItem('venture',item.id,item.name)}><Trash2 className="w-4 h-4"/></IconButton></div>
    </div>)}</div>
  </div>;

  const renderSkills = () => (
    <div className="space-y-5">
      <Panel title="Add a skill" description="Skills are saved under a category and shown on your public Skills page.">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_160px_auto] gap-3 items-end">
          <Field label="Skill name" value={newSkill.name} onChange={(v)=>setNewSkill((s)=>({...s,name:v}))} placeholder="e.g. TypeScript"/>
          <SelectField label="Category" value={newSkill.category} onChange={(v)=>setNewSkill((s)=>({...s,category:v}))} options={[...content.skills.map((g)=>g.category),'New category']}/>
          <SelectField label="Proficiency" value={newSkill.level} onChange={(v)=>setNewSkill((s)=>({...s,level:v as SkillEntry['level']}))} options={['Learning','Familiar','Working','Advanced']}/>
          <button onClick={()=>{if(newSkill.category==='New category'){const category=window.prompt('New skill category name?');if(category?.trim())setNewSkill((s)=>({...s,category:category.trim()}));return;}addSkill();}} className="px-4 py-2.5 bg-cyan-400 text-slate-950 text-xs font-semibold rounded-lg hover:bg-cyan-300"><Plus className="inline w-4 h-4 mr-1"/>Add</button>
        </div>
      </Panel>
      <div className="space-y-4">{content.skills.map((group)=> <div key={group.id} className="rounded-2xl border border-[#17304e] bg-[#061326] p-5">
        <div className="flex flex-wrap justify-between gap-3 mb-4"><div><div className="text-sm font-semibold text-white">{group.category}</div><div className="text-[10px] text-slate-500 mt-1">{group.skills.length} skills</div></div><button onClick={()=>{const name=window.prompt('Rename this category',group.category);if(name?.trim())updatePortfolioContent((current)=>({...current,skills:current.skills.map((item)=>item.id===group.id?{...item,category:name.trim()}:item)}),{action:'Skill category renamed',detail:name.trim()});}} className="text-[11px] text-cyan-300 hover:text-white">Rename category</button></div>
        <div className="space-y-2">{group.skills.map((skill)=> <div key={skill.id} className="grid grid-cols-1 sm:grid-cols-[1fr_160px_auto] gap-2 items-center p-2 rounded-lg bg-[#041021] border border-slate-800/70">
          <input aria-label="Skill name" value={skill.name} onChange={(e)=>updateSkill(group.id,skill.id,{name:e.target.value})} className="min-w-0 bg-transparent outline-none px-2 py-1.5 text-xs text-slate-200"/>
          <select aria-label="Skill proficiency" value={skill.level} onChange={(e)=>updateSkill(group.id,skill.id,{level:e.target.value as SkillEntry['level']})} className="bg-[#071326] border border-slate-700 rounded-md px-2 py-1.5 text-xs text-slate-300">{['Learning','Familiar','Working','Advanced'].map((level)=><option key={level}>{level}</option>)}</select>
          <IconButton title="Remove skill" danger onClick={()=>deleteSkill(group.id,skill)}><Trash2 className="w-4 h-4"/></IconButton>
        </div>)}</div>
      </div>)}</div>
    </div>
  );

  const renderWriting = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between"><div className="relative flex-1 max-w-md"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search writing..." className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg bg-[#071326] border border-slate-700 text-white outline-none focus:border-cyan-400"/></div><button onClick={()=>setEditor({kind:'post',value:emptyPost()})} className="px-4 py-2.5 rounded-lg bg-cyan-400 text-slate-950 text-xs font-semibold hover:bg-cyan-300"><Plus className="inline w-4 h-4 mr-1"/>Write new post</button></div>
      <div className="rounded-2xl border border-[#17304e] bg-[#061326] divide-y divide-slate-800/70">
        {filteredPosts.map((post)=> <div key={post.id} className="p-4 flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-20 h-14 rounded-lg bg-slate-900 overflow-hidden shrink-0">{post.image&&<img src={post.image} alt="" className="w-full h-full object-cover"/>}</div>
          <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-white">{post.title}</div><div className="text-[11px] text-slate-500 mt-1">{post.tag} · {post.readTime} · {post.date}</div><p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{post.summary}</p></div>
          <StatusPill value={post.status || 'Draft'}/>
          <div className="flex gap-2 self-end md:self-auto"><IconButton title="Edit post" onClick={()=>setEditor({kind:'post',value:post})}><Pencil className="w-4 h-4"/></IconButton><IconButton title={post.status==='Published'?'Move to draft':'Publish post'} onClick={()=>savePost({...post,status:post.status==='Published'?'Draft':'Published'})}>{post.status==='Published'?<Eye className="w-4 h-4"/>:<Check className="w-4 h-4"/>}</IconButton><IconButton title="Delete post" danger onClick={()=>deleteItem('post',post.id,post.title)}><Trash2 className="w-4 h-4"/></IconButton></div>
        </div>)}
        {filteredPosts.length===0 && <div className="p-10 text-center text-sm text-slate-500">No posts found. Start with a new draft.</div>}
      </div>
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-[11px] text-amber-100/80 leading-relaxed">Only posts marked Published appear on the public Writing page. Drafts remain in the admin workspace.</div>
    </div>
  );

  const renderLinks = () => {
    const rows = linkDrafts || content.links;
    const change = (id: string, patch: Partial<PortfolioLink>) => setLinkDrafts((current) => (current || content.links).map((item) => item.id === id ? { ...item, ...patch } : item));
    return <div className="space-y-4">
      <Panel title="Your public links" description="These links appear in the contact section of your portfolio.">
        <div className="space-y-3">{rows.map((item)=> <div key={item.id} className="grid grid-cols-1 md:grid-cols-[.8fr_1fr_1.4fr_auto] gap-3 items-end rounded-xl border border-slate-800 bg-[#041021] p-3">
          <Field label="Label" value={item.label} onChange={(v)=>change(item.id,{label:v})}/>
          <Field label="Display text" value={item.value} onChange={(v)=>change(item.id,{value:v})}/>
          <Field label="URL" value={item.href} onChange={(v)=>change(item.id,{href:v})}/>
          <IconButton title="Remove link" danger onClick={()=>setLinkDrafts(rows.filter((link)=>link.id!==item.id))}><Trash2 className="w-4 h-4"/></IconButton>
        </div>)}</div>
        <div className="flex flex-wrap justify-between gap-3 mt-5">
          <button onClick={()=>setLinkDrafts([...rows,{id:`link-${Date.now()}`,label:'New link',value:'',href:'https://',type:'website'}])} className="px-3 py-2 rounded-lg border border-slate-700 text-xs text-slate-300 hover:text-white"><Plus className="inline w-3.5 h-3.5 mr-1"/>Add link</button>
          <button onClick={saveLinks} className="px-5 py-2 rounded-lg bg-cyan-400 text-slate-950 text-xs font-semibold hover:bg-cyan-300">Save links</button>
        </div>
      </Panel>
    </div>;
  };

  const renderMedia = () => {
    const images = [
      ...content.projects.map((item)=>({id:item.id,title:item.name,image:item.image,kind:'Project',edit:()=>setEditor({kind:'project',value:item})})),
      ...content.articles.map((item)=>({id:item.id,title:item.title,image:item.image,kind:'Writing',edit:()=>setEditor({kind:'post',value:item})})),
    ];
    return <div className="space-y-4">
      <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-xs text-slate-300 leading-relaxed">The media library currently lists images connected to your portfolio items. Uploading large media files is not enabled in this local-storage version; use image URLs or files already in the repository. A future database and object-storage connection will support a proper upload library.</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">{images.map((item)=> <div key={item.kind+item.id} className="rounded-2xl overflow-hidden border border-[#17304e] bg-[#061326]">
        <div className="aspect-[16/9] bg-[#030d1c]">{item.image?<img src={item.image} alt={item.title} className="w-full h-full object-cover"/>:<div className="h-full flex items-center justify-center text-slate-600"><ImagePlus className="w-8 h-8"/></div>}</div>
        <div className="p-4 flex items-center justify-between gap-2"><div className="min-w-0"><div className="text-xs text-white font-semibold truncate">{item.title}</div><div className="text-[10px] text-slate-500 mt-1">{item.kind}</div></div><button onClick={item.edit} className="text-[10px] text-cyan-300 hover:text-white whitespace-nowrap">Edit image URL</button></div>
      </div>)}</div>
    </div>;
  };

  const renderSettings = () => (
    <div className="max-w-3xl space-y-4">
      <Panel title="Portfolio backup" description="Export your content before making large changes, or restore a previous JSON backup.">
        <div className="flex flex-wrap gap-3"><button onClick={exportContent} className="px-4 py-2.5 rounded-lg bg-cyan-400 text-slate-950 text-xs font-semibold hover:bg-cyan-300"><Upload className="inline w-4 h-4 mr-1"/>Export backup</button><label className="px-4 py-2.5 rounded-lg border border-slate-700 text-xs text-slate-200 hover:border-cyan-500 cursor-pointer">Import backup<input type="file" accept="application/json,.json" className="hidden" onChange={(e)=>importContent(e.target.files?.[0])}/></label></div>
      </Panel>
      <Panel title="Local workspace" description="Your current content is stored in this browser using localStorage.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-800 bg-[#041021] p-4"><div className="text-xs text-slate-400">Storage mode</div><div className="text-sm text-white font-semibold mt-1">Browser local storage</div><div className="text-[10px] text-slate-500 mt-2">No database connected yet</div></div>
          <div className="rounded-xl border border-slate-800 bg-[#041021] p-4"><div className="text-xs text-slate-400">Authentication</div><div className="text-sm text-amber-200 font-semibold mt-1">Not protected yet</div><div className="text-[10px] text-slate-500 mt-2">Connect server-side authentication before public launch</div></div>
        </div>
        <p className="text-xs text-slate-400 mt-4 leading-relaxed">Changes are persistent in this browser and visible on this browser's public portfolio. They are not uploaded to GitHub or shared with visitors on other devices. A database/API and secure authentication are required for multi-device publishing.</p>
      </Panel>
      <Panel title="Reset portfolio content" description="Restore the starter content shipped with your portfolio. This replaces your locally edited content.">
        <button onClick={()=>{if(window.confirm('Reset all portfolio content in this browser to the starter version?')){resetPortfolioContent();notify('Starter content restored.');}}} className="px-4 py-2.5 rounded-lg border border-rose-500/30 text-rose-300 text-xs font-semibold hover:bg-rose-500/10"><Trash2 className="inline w-4 h-4 mr-1"/>Reset local content</button>
      </Panel>
    </div>
  );

  const renderSection = () => {
    switch(section) {
      case 'overview': return renderOverview();
      case 'about': return renderAbout();
      case 'projects': return renderProjects();
      case 'ventures': return renderVentures();
      case 'skills': return renderSkills();
      case 'writing': return renderWriting();
      case 'media': return renderMedia();
      case 'links': return renderLinks();
      case 'settings': return renderSettings();
    }
  };

  const searchItems = [
    ...content.projects.map((item)=>({label:item.name,section:'projects' as Section,sub:'Project'})),
    ...content.articles.map((item)=>({label:item.title,section:'writing' as Section,sub:'Writing'})),
    ...content.ventures.map((item)=>({label:item.name,section:'ventures' as Section,sub:'Venture'})),
  ].filter((item)=>search && item.label.toLowerCase().includes(search.toLowerCase())).slice(0,6);

  return (
    <div className="min-h-screen bg-[#030b18] text-slate-100 flex font-sans selection:bg-cyan-500/30">
      {renderSidebar()}
      {mobileSidebarOpen && <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-black/70 lg:hidden" onClick={()=>setMobileSidebarOpen(false)}/>}

      <div className="min-w-0 flex-1 flex flex-col min-h-screen">
        <header className="h-[76px] px-4 sm:px-6 xl:px-8 flex items-center justify-between gap-4 border-b border-[#17304e] bg-[#041021]/95 sticky top-0 z-30 backdrop-blur">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={()=>setMobileSidebarOpen(true)} className="lg:hidden p-2 text-slate-300 hover:bg-slate-800 rounded-lg"><Menu className="w-5 h-5"/></button>
            <div className="relative w-full max-w-[340px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
              <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search content..." className="w-full pl-9 pr-12 py-2.5 rounded-xl border border-[#1b3858] bg-[#07182c] text-xs text-slate-200 outline-none focus:border-cyan-500/50 placeholder:text-slate-600"/>
              {searchItems.length>0 && <div className="absolute top-full mt-2 left-0 right-0 rounded-xl bg-[#071326] border border-slate-700 shadow-2xl overflow-hidden z-50">{searchItems.map((item)=><button key={item.section+item.label} onClick={()=>{changeSection(item.section);setSearch('');}} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-slate-800"><span className="text-xs text-white truncate">{item.label}</span><span className="text-[10px] text-cyan-300">{item.sub}</span></button>)}</div>}
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden md:flex items-center gap-2 text-[10px] text-emerald-300"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/> Local workspace</div>
            <button onClick={()=>navigate('/')} className="inline-flex items-center gap-2 text-[11px] text-slate-400 hover:text-cyan-300"><Eye className="w-4 h-4"/> <span className="hidden sm:inline">View site</span></button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-700 flex items-center justify-center text-[10px] font-bold text-slate-950">PM</div><div className="hidden sm:block"><div className="text-[11px] text-white font-semibold">Patrick JR Mulenga</div><div className="text-[9px] text-slate-500">Administrator workspace</div></div></div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 xl:p-8 space-y-6 max-w-[1680px] w-full mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div><div className="font-mono-tag text-cyan-400 text-xs mb-2">// WELCOME BACK, PATRICK</div><h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{sectionMeta[section].title}</h1><p className="text-xs text-slate-500 mt-2">{sectionMeta[section].subtitle}</p></div>
            <div className="text-[10px] text-slate-500">{new Date().toLocaleDateString(undefined,{weekday:'short',day:'numeric',month:'short',year:'numeric'})} · {new Date().toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'})}</div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] text-[11px] text-amber-100/80 leading-relaxed">
            <ShieldCheck className="w-4 h-4 shrink-0 text-amber-300 mt-0.5"/>
            <div><strong className="text-amber-200">Local admin preview.</strong> Changes save in this browser and update the public pages only here. This route has no server-side login yet; add authentication and a shared database before treating it as a secured live CMS.</div>
          </div>

          {renderSection()}
        </main>

        <footer className="px-5 sm:px-8 py-4 border-t border-[#17304e] text-[10px] text-slate-600 flex flex-col sm:flex-row gap-2 justify-between"><span>© 2026 Patrick JR Mulenga · Portfolio Admin</span><span className="font-mono-tag">LOCAL_CONTENT_STORE = ACTIVE</span></footer>
      </div>

      {editor?.kind === 'project' && <ProjectEditor value={editor.value as ProjectItem} onClose={()=>setEditor(null)} onSave={saveProject}/>}
      {editor?.kind === 'post' && <PostEditor value={editor.value as ArticleItem} onClose={()=>setEditor(null)} onSave={savePost}/>}
      {editor?.kind === 'venture' && <VentureEditor value={editor.value as VentureItem} onClose={()=>setEditor(null)} onSave={saveVenture}/>}
      {notice && <div className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl bg-[#092139] border border-cyan-500/30 shadow-2xl text-xs text-cyan-100"><Check className="w-4 h-4 text-emerald-300"/>{notice}</div>}
    </div>
  );
}

function QuickAction({ icon: Icon, label, onClick, color }: { icon: React.ElementType; label: string; onClick: () => void; color: string }) {
  const tones: Record<string,string> = { blue:'bg-blue-500/15 text-blue-300',green:'bg-emerald-500/15 text-emerald-300',amber:'bg-amber-500/15 text-amber-300',violet:'bg-violet-500/15 text-violet-300' };
  return <button onClick={onClick} className="w-full flex items-center justify-between gap-3 p-3 rounded-xl bg-[#071a30] border border-[#183653] hover:border-cyan-500/50 hover:bg-[#0a2039] transition-colors text-left"><span className="flex items-center gap-3"><span className={`w-8 h-8 rounded-lg flex items-center justify-center ${tones[color]||tones.blue}`}><Icon className="w-4 h-4"/></span><span className="text-xs text-slate-200">{label}</span></span><ChevronRight className="w-4 h-4 text-slate-500"/></button>;
}

function Panel({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return <section className="rounded-2xl border border-[#17304e] bg-[#061326] p-5 sm:p-6"><div className="mb-5"><h3 className="text-sm font-semibold text-white">{title}</h3>{description&&<p className="text-[11px] text-slate-500 mt-1">{description}</p>}</div>{children}</section>;
}

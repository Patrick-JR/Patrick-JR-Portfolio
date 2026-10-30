import { useEffect, useState } from 'react';
import {
  ABOUT_DATA,
  ARTICLES_DATA,
  CONTACT_DATA,
  HERO_DATA,
  PROJECTS_DATA,
  SKILLS_DATA,
  VENTURES_DATA,
  ArticleItem,
  ProjectItem,
  VentureItem,
} from './portfolioData';

export interface SkillEntry {
  id: string;
  name: string;
  level: 'Learning' | 'Familiar' | 'Working' | 'Advanced';
}

export interface SkillGroup {
  id: string;
  category: string;
  icon: string;
  skills: SkillEntry[];
}

export interface PortfolioLink {
  id: string;
  label: string;
  value: string;
  href: string;
  type: string;
}

export interface PortfolioContent {
  hero: {
    nameFirst: string;
    nameLast: string;
    roles: string[];
    bio: string;
  };
  about: {
    kicker: string;
    titlePart1: string;
    titlePart2: string;
    titleHighlight: string;
    paragraphs: string[];
    biography: string;
    principle: string;
  };
  projects: ProjectItem[];
  ventures: VentureItem[];
  skills: SkillGroup[];
  articles: ArticleItem[];
  links: PortfolioLink[];
  contact: {
    headline: string;
    description: string;
    areas: string[];
  };
}

export interface ActivityItem {
  id: string;
  action: string;
  detail: string;
  at: string;
}

export interface PageViewItem {
  path: string;
  at: string;
}

const CONTENT_KEY = 'patrick-portfolio-content-v1';
const ACTIVITY_KEY = 'patrick-portfolio-activity-v1';
const PAGEVIEWS_KEY = 'patrick-portfolio-pageviews-v1';

const makeId = (prefix: string, index: number) => `${prefix}-${index + 1}`;

export const DEFAULT_PORTFOLIO_CONTENT: PortfolioContent = {
  hero: {
    nameFirst: HERO_DATA.nameFirst,
    nameLast: HERO_DATA.nameLast,
    roles: [...HERO_DATA.roles],
    bio: HERO_DATA.bio,
  },
  about: {
    ...ABOUT_DATA,
    biography: [
      "I'm Patrick JR Mulenga, a software and AI engineer, researcher, entrepreneur and writer from Zambia.",
      "My interest in technology goes beyond writing code. I'm fascinated by how software, artificial intelligence and digital systems can change the way people live, businesses operate and organisations deliver services.",
      "My path into engineering has been largely self-directed. I learn through structured courses, documentation, experiments, prototypes and the practical work of trying to make an idea function. I care about understanding the problem before choosing the technology.",
      "I build across different areas: AI and automation for businesses, civic technology, education systems, digital products and platforms designed to help people connect with opportunities. I also enjoy researching complex ideas and explaining technology through Tech with Patrick.",
      "My goal is to keep learning, keep building and contribute to a future where technology creates meaningful opportunities and solves real problems."
    ].join('\n\n'),
    principle: 'Technology is a tool. Human potential is the reason.',
  },
  projects: [
    ...PROJECTS_DATA.map((item) => ({ ...item, techStack: item.techStack ? [...item.techStack] : [] })),
    {
      id: 'redox',
      name: 'Redox',
      tag: 'Business Intelligence',
      tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      description: 'An executive dashboard concept for a multi-branch business, bringing operational visibility, sales activity and AI-assisted questions into one workspace.',
      image: '',
      fullOverview: 'Redox explores an executive view across shops, employees, access activity, sales signals and operational alerts. The product direction is to help leadership understand what is happening across locations and ask useful questions about the data.',
      role: 'Product concept and dashboard prototyping',
      status: 'Demo concept',
      techStack: ['Dashboard design', 'Operational analytics', 'AI-assisted insights'],
      notes: 'A product concept and demo direction, not a live business intelligence deployment.'
    },
    {
      id: 'jelumu-showroom',
      name: 'Jelumu Digital Showroom',
      tag: 'Automotive',
      tagColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      description: 'A digital showroom concept for presenting vehicle inventory and helping customers explore cars online.',
      image: '',
      fullOverview: 'The showroom concept explores a modern digital experience for vehicle listings, including inventory details, pricing, mileage, condition, photographs and an AI-assisted customer enquiry experience.',
      role: 'Software design and product prototyping',
      status: 'Prototype',
      techStack: ['Web application', 'Vehicle inventory', 'AI-assisted enquiries'],
      notes: 'Prototype direction; confirm deployment and live capabilities before describing this as a production showroom.'
    }
  ],
  ventures: VENTURES_DATA.map((item) => ({ ...item })),
  skills: SKILLS_DATA.map((group, groupIndex) => ({
    id: makeId('skill-group', groupIndex),
    category: group.category,
    icon: group.icon,
    skills: group.skills.split(',').map((name, index) => ({
      id: `${makeId('skill', groupIndex)}-${index + 1}`,
      name: name.trim(),
      level: 'Working' as const,
    })).filter((skill) => skill.name.length > 0),
  })),
  articles: ARTICLES_DATA.map((item) => ({ ...item })),
  links: CONTACT_DATA.links.map((item, index) => ({ ...item, id: makeId('link', index) })),
  contact: {
    headline: CONTACT_DATA.headline,
    description: CONTACT_DATA.description,
    areas: [...CONTACT_DATA.areas],
  },
};

const cloneDefaults = (): PortfolioContent => JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_CONTENT));

export function readPortfolioContent(): PortfolioContent {
  if (typeof window === 'undefined') return cloneDefaults();
  try {
    const raw = window.localStorage.getItem(CONTENT_KEY);
    if (!raw) return cloneDefaults();
    const parsed = JSON.parse(raw) as Partial<PortfolioContent>;
    const defaults = cloneDefaults();
    return {
      ...defaults,
      ...parsed,
      hero: { ...defaults.hero, ...(parsed.hero || {}) },
      about: { ...defaults.about, ...(parsed.about || {}) },
      projects: Array.isArray(parsed.projects) ? parsed.projects : defaults.projects,
      ventures: Array.isArray(parsed.ventures) ? parsed.ventures : defaults.ventures,
      skills: Array.isArray(parsed.skills) ? parsed.skills : defaults.skills,
      articles: Array.isArray(parsed.articles) ? parsed.articles : defaults.articles,
      links: Array.isArray(parsed.links) ? parsed.links : defaults.links,
      contact: { ...defaults.contact, ...(parsed.contact || {}) },
    };
  } catch {
    return cloneDefaults();
  }
}

export function savePortfolioContent(content: PortfolioContent) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event('patrick-portfolio-content-updated'));
}

export function resetPortfolioContent() {
  savePortfolioContent(cloneDefaults());
  addActivity('Restored default content', 'Portfolio content was reset to its starter version.');
}

export function usePortfolioContent() {
  const [content, setContent] = useState<PortfolioContent>(() => readPortfolioContent());

  useEffect(() => {
    const refresh = () => setContent(readPortfolioContent());
    window.addEventListener('patrick-portfolio-content-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('patrick-portfolio-content-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  return content;
}

export function addActivity(action: string, detail: string) {
  if (typeof window === 'undefined') return;
  try {
    const existing = JSON.parse(window.localStorage.getItem(ACTIVITY_KEY) || '[]') as ActivityItem[];
    const next: ActivityItem[] = [{
      id: `activity-${Date.now()}`,
      action,
      detail,
      at: new Date().toISOString(),
    }, ...existing].slice(0, 40);
    window.localStorage.setItem(ACTIVITY_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('patrick-portfolio-activity-updated'));
  } catch {
    // Activity history is optional; content saving should never depend on it.
  }
}

export function readActivity(): ActivityItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(ACTIVITY_KEY) || '[]') as ActivityItem[];
  } catch {
    return [];
  }
}

export function useActivity() {
  const [items, setItems] = useState<ActivityItem[]>(() => readActivity());
  useEffect(() => {
    const refresh = () => setItems(readActivity());
    window.addEventListener('patrick-portfolio-activity-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('patrick-portfolio-activity-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);
  return items;
}

export function trackPageView(path: string) {
  if (typeof window === 'undefined' || path === '/admin') return;
  try {
    const existing = JSON.parse(window.localStorage.getItem(PAGEVIEWS_KEY) || '[]') as PageViewItem[];
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recent = existing.filter((view) => new Date(view.at).getTime() >= cutoff);
    recent.push({ path, at: new Date().toISOString() });
    window.localStorage.setItem(PAGEVIEWS_KEY, JSON.stringify(recent.slice(-1500)));
    window.dispatchEvent(new Event('patrick-portfolio-analytics-updated'));
  } catch {
    // Local analytics are optional.
  }
}

export function readPageViews(): PageViewItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const views = JSON.parse(window.localStorage.getItem(PAGEVIEWS_KEY) || '[]') as PageViewItem[];
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return views.filter((view) => new Date(view.at).getTime() >= cutoff);
  } catch {
    return [];
  }
}

export function usePageViews() {
  const [views, setViews] = useState<PageViewItem[]>(() => readPageViews());
  useEffect(() => {
    const refresh = () => setViews(readPageViews());
    window.addEventListener('patrick-portfolio-analytics-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('patrick-portfolio-analytics-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);
  return views;
}

export function updatePortfolioContent(
  updater: (current: PortfolioContent) => PortfolioContent,
  activity?: { action: string; detail: string },
) {
  const next = updater(readPortfolioContent());
  savePortfolioContent(next);
  if (activity) addActivity(activity.action, activity.detail);
  return next;
}

// Portfolio data for Patrick JR Mulenga
export interface ProjectItem {
  id: string;
  name: string;
  tag: string;
  tagColor: string;
  description: string;
  image: string;
  fullOverview?: string;
  techStack?: string[];
  metrics?: string;
  linkText?: string;
  liveUrl?: string;
}

export interface VentureItem {
  id: string;
  name: string;
  description: string;
  logoType: 'uplex' | 'buyshare' | 'giftedlife';
  badges?: { label: string; variant: 'blue' | 'green' }[];
  actionText?: string;
  actionUrl?: string;
  details?: string;
}

export interface ArticleItem {
  id: string;
  tag: string;
  title: string;
  image: string;
  readTime: string;
  date: string;
  summary: string;
  content: string;
}

export const HERO_DATA = {
  kicker: "// Hi, I'm",
  nameFirst: "Patrick JR",
  nameLast: "Mulenga",
  roles: [
    "Software Engineer",
    "AI Engineer",
    "Researcher",
    "Entrepreneur",
    "Writer"
  ],
  bio: "I build software, explore artificial intelligence, and turn ideas into practical solutions for real-world problems.",
  terminalLines: [
    "// build",
    "// automate",
    "// solve",
    "// create",
    "// impact",
    ">_"
  ],
  socials: [
    { name: "LinkedIn", href: "https://linkedin.com/in/patrick-mulenga", icon: "linkedin" },
    { name: "GitHub", href: "https://github.com/patrick-mulenga", icon: "github" },
    { name: "YouTube", href: "https://youtube.com/@techwithpatrick", icon: "youtube" },
    { name: "Tech with Patrick", href: "#tech-with-patrick", icon: "screen" }
  ]
};

export const ABOUT_DATA = {
  kicker: "// 01. ABOUT ME",
  titlePart1: "Curious mind.",
  titlePart2: "Builder",
  titleHighlight: "at heart.",
  paragraphs: [
    "I'm Patrick JR Mulenga, a software and AI engineer, researcher, entrepreneur and writer from Zambia.",
    "My journey has been shaped by curiosity, independent learning and a desire to build solutions that create real value. I'm passionate about technology, automation and using AI to solve meaningful problems."
  ],
  roles: [
    {
      title: "Software Engineer",
      description: "Building modern web and mobile applications.",
      icon: "code"
    },
    {
      title: "AI Engineer",
      description: "Exploring AI agents, automation and intelligent systems.",
      icon: "brain"
    },
    {
      title: "Researcher",
      description: "Studying emerging technologies and their real-world impact.",
      icon: "search"
    },
    {
      title: "Entrepreneur & Founder",
      description: "Building UpleX AI and other solution-driven ventures.",
      icon: "rocket"
    },
    {
      title: "Writer",
      description: "Sharing ideas, insights and lessons from the journey.",
      icon: "book"
    }
  ]
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "zijcms",
    name: "ZIJCMS",
    tag: "Public Sector",
    tagColor: "bg-teal-500/20 text-teal-300 border-teal-500/40",
    description: "Zambia Integrated Justice & Correctional Management System. A unified justice management platform connecting police, judiciary and correctional services.",
    image: "/src/assets/images/zijcms_dashboard_preview_1791242025994.jpg",
    fullOverview: "The Zambia Integrated Justice & Correctional Management System (ZIJCMS) addresses critical fragmentation across justice sector agencies. It unifies docket tracking, court hearing scheduling, inmate registration, and automated status notifications across police departments, judicial registries, and correctional facilities.",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Role-Based Access Control", "Encrypted Document Vault"],
    metrics: "Integrates 3 key government ministries with real-time status synchronization and secure audit logging."
  },
  {
    id: "smart-national-planning",
    name: "Smart National Planning Portal",
    tag: "Civic Tech",
    tagColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    description: "AI-powered platform for managing national development and CDF project data with search and AI insights.",
    image: "/src/assets/images/smart_planning_preview_1791242039275.jpg",
    fullOverview: "A national development intelligence portal built to provide transparency and actionable monitoring for Constituency Development Fund (CDF) and macro-development projects. Includes AI semantic search and anomaly detection on budget allocations.",
    techStack: ["Next.js", "Python / FastAPI", "AI Semantic Search", "Vector Embeddings", "Data Visualization", "GIS Mapping"],
    metrics: "Enables multi-constituency data tracking, AI budget variance flags, and citizen inquiry interfaces."
  },
  {
    id: "rabtrash-kk",
    name: "Rabtrash KK",
    tag: "Logistics",
    tagColor: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    description: "Waste collection platform connecting households and businesses with collection companies and drivers.",
    image: "/src/assets/images/rabtrash_map_preview_1791242048186.jpg",
    fullOverview: "An on-demand smart logistics platform revolutionizing urban waste management. Households request timely pick-ups while private waste companies optimize vehicle routes, track driver dispatch in real-time, and automate monthly recurring invoicing.",
    techStack: ["React Native", "Geolocation & Routing", "Express.js", "Firebase Realtime DB", "Mobile Money API"],
    metrics: "Reduced pickup turnaround delays by over 40% with automated cluster routing."
  },
  {
    id: "schoontex",
    name: "Schoontex",
    tag: "Education",
    tagColor: "bg-teal-500/20 text-teal-300 border-teal-500/40",
    description: "School management system for student records, fees, receipts and administration.",
    image: "/src/assets/images/schoontex_school_preview_1791242057777.jpg",
    fullOverview: "A comprehensive institutional ERP engineered specifically for primary and secondary educational institutions. Automates fee payments, generates digital tamper-evident receipts, and streamlines academic grade books and student attendance.",
    techStack: ["React", "Tailwind CSS", "REST API", "PDF Generation Engine", "SMS Notification Gateway"],
    metrics: "Deployed across multiple schools to process tens of thousands in fee reconciliations without manual paper ledgers."
  }
];

export const VENTURES_DATA: VentureItem[] = [
  {
    id: "uplex-ai",
    name: "UpleX AI",
    description: "AI, intelligent automation, and digital business systems.",
    logoType: "uplex",
    actionText: "Visit Website",
    actionUrl: "https://www.uplexai.com",
    details: "UpleX AI develops autonomous agent workflows, enterprise LLM integration architectures, and bespoke business automation pipelines helping forward-thinking enterprises save thousands of manual operational hours."
  },
  {
    id: "buyshare",
    name: "BuyShare",
    description: "A platform for buying and selling products and services, built for a simple and trusted experience.",
    logoType: "buyshare",
    badges: [
      { label: "Co-founder", variant: "blue" },
      { label: "In Development", variant: "green" }
    ],
    details: "BuyShare is an upcoming peer-to-peer commerce and escrow-backed exchange engine engineered to provide secure transaction guarantees, merchant reputation scores, and streamlined local payment fulfillment."
  },
  {
    id: "gifted-life",
    name: "Gifted Life",
    description: "An organisation and app empowering young people through mentorship, skills and opportunity.",
    logoType: "giftedlife",
    badges: [
      { label: "Founder", variant: "blue" },
      { label: "In Development", variant: "green" }
    ],
    details: "Gifted Life is dedicated to bridging the digital divide for Zambian youth. By pairing aspiring builders with vetted tech and business mentors, Gifted Life accelerates vocational skill acquisition and tech career pathways."
  }
];

export const SKILLS_DATA = [
  {
    category: "Software Development",
    icon: "code",
    skills: "HTML, CSS, JavaScript, Full-stack, Web Applications"
  },
  {
    category: "AI & Automation",
    icon: "brain",
    skills: "AI Agents, LLM Integration, n8n, Make.com, Relevance AI, Chatbase"
  },
  {
    category: "Data & Backend",
    icon: "database",
    skills: "SQLite, Firebase, Airtable, Google Sheets, APIs, Data Processing"
  },
  {
    category: "Research & Product",
    icon: "research",
    skills: "Technical Research, Product Prototyping, Business Analysis, AI Solution Design"
  }
];

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: "real-power-of-ai",
    tag: "Technology",
    title: "The Real Power of AI Isn't in the Models",
    image: "/src/assets/images/article_power_of_ai_1791242071605.jpg",
    readTime: "5 min read",
    date: "October 2024",
    summary: "Why model benchmarks alone don't create enterprise value: the true leverage lies in agentic workflows, contextual memory, and robust integration pipelines.",
    content: "Every month brings a new frontier model benchmark with slight gains on abstract academic evaluations. Yet in enterprise and real-world deployment, the gap between model capability and practical value remains enormous.\n\nThe real breakthrough isn't simply querying a larger parameter model—it is building intelligent harnesses: structured agent workflows, resilient error handling, domain-specific memory layers, and deep business data integrations.\n\nWhen we treat AI as an autonomous collaborator embedded inside operational systems rather than an isolated conversational novelty, real leverage begins."
  },
  {
    id: "build-meaningful-life",
    tag: "Philosophy",
    title: "What It Means to Build a Meaningful Life",
    image: "/src/assets/images/article_meaningful_life_1791242083184.jpg",
    readTime: "7 min read",
    date: "September 2024",
    summary: "Reflections on self-directed learning, compounding craftsmanship, and orienting one's energy around solving problems that genuinely matter.",
    content: "In a world saturated with ephemeral metrics and performative milestones, clarity is rare. Building a meaningful life requires deliberate detachment from superficial prestige.\n\nFor me, meaning comes from curiosity, disciplined craft, and the direct impact of technology on people's everyday realities. Whether writing code at midnight or designing an educational initiative, the question is always the same: does this reduce friction, empower someone else, and withstand the test of time?"
  },
  {
    id: "future-of-work-africa",
    tag: "Research",
    title: "AI and the Future of Work in Africa",
    image: "/src/assets/images/article_future_work_africa_1791242092829.jpg",
    readTime: "6 min read",
    date: "August 2024",
    summary: "Analyzing leapfrog opportunities in African talent, automated public infrastructure, and localized intelligence systems.",
    content: "Africa stands at a unique technological inflection point. Just as mobile money bypassed traditional branch banking infrastructure across the continent, artificial intelligence offers an unprecedented opportunity to leapfrog legacy administrative and institutional bottlenecks.\n\nBy democratizing high-level engineering capabilities and providing intelligent automation for healthcare triage, civic planning, and agricultural supply chains, African developers are poised to become architects of localized, high-impact intelligent systems."
  }
];

export const CONTACT_DATA = {
  kicker: "// 07. GET IN TOUCH",
  headline: "Let's build something meaningful.",
  description: "I'm open to collaboration, partnerships and opportunities in software engineering, AI, research and technology-driven innovation.",
  areas: [
    "Software development & product engineering",
    "AI applications & automation",
    "Research & technology innovation",
    "Business systems & digital transformation"
  ],
  links: [
    { label: "Email", value: "patrick@uplexai.com", href: "mailto:patrick@uplexai.com", type: "email" },
    { label: "LinkedIn", value: "linkedin.com/in/patrick-mulenga", href: "https://linkedin.com/in/patrick-mulenga", type: "linkedin" },
    { label: "GitHub", value: "github.com/patrick-mulenga", href: "https://github.com/patrick-mulenga", type: "github" },
    { label: "YouTube", value: "Tech with Patrick", href: "https://youtube.com/@techwithpatrick", type: "youtube" },
    { label: "UpleX AI", value: "www.uplexai.com", href: "https://www.uplexai.com", type: "website" }
  ]
};

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
  role?: string;
  status?: string;
  notes?: string;
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
  role?: string;
  status?: string;
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
  status?: string;
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
    { name: "GitHub", href: "https://github.com/Patrick-JR", icon: "github" },
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
    "My journey has been shaped by curiosity, independent learning and a desire to build solutions that create real value. I'm interested in software engineering, artificial intelligence, automation and the systems that connect technology with real human needs."
  ],
  roles: [
    {
      title: "Software Engineer",
      description: "Designing and building practical web applications and digital products.",
      icon: "code"
    },
    {
      title: "AI Engineer",
      description: "Exploring AI agents, LLM integrations, automation and intelligent systems.",
      icon: "brain"
    },
    {
      title: "Researcher",
      description: "Studying emerging technologies and thinking about their real-world impact.",
      icon: "search"
    },
    {
      title: "Entrepreneur & Founder",
      description: "Building UpleX AI and working on products and ventures with practical purpose.",
      icon: "rocket"
    },
    {
      title: "Writer",
      description: "Using writing to explore ideas, communicate what I learn and reflect on the journey.",
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
    description: "A unified justice management platform concept connecting police, judiciary and correctional services.",
    image: "/src/assets/images/zijcms_dashboard_preview_1791242025994.jpg",
    fullOverview: "The Zambia Integrated Justice & Correctional Management System is a proposed digital platform built around one connected justice flow. The concept explores how case, custody and correctional information could move through a more coherent digital system instead of remaining fragmented across institutions.",
    role: "Concept, product thinking and prototype development",
    status: "Prototype",
    techStack: ["Frontend prototyping", "Data modelling", "Role-based workflow design"],
    notes: "This is a prototype and policy-facing concept, not a deployed national system."
  },
  {
    id: "smart-national-planning",
    name: "Smart National Planning Portal",
    tag: "Civic Tech",
    tagColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    description: "An AI-assisted platform for organising national development and CDF project information.",
    image: "/src/assets/images/smart_planning_preview_1791242039275.jpg",
    fullOverview: "A civic technology concept for turning large development documents into structured, searchable information. The project explores document extraction with OpenAI, SQLite-based storage, project monitoring, and source-cited question answering so users can ask about the information rather than manually search through long documents.",
    role: "Builder and product designer",
    status: "Prototype / ongoing build",
    techStack: ["OpenAI", "SQLite", "Document extraction", "Source-cited Q&A", "Web application"],
    notes: "The current work is a prototype intended to demonstrate the product direction."
  },
  {
    id: "rabtrash-kk",
    name: "Rabtrash KK",
    tag: "Logistics",
    tagColor: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    description: "A waste collection and routing platform concept connecting customers, collectors and operational planning.",
    image: "/src/assets/images/rabtrash_map_preview_1791242048186.jpg",
    fullOverview: "Rabtrash KK explores how waste collection could be coordinated through a digital platform. The idea brings service requests, collection operations and route planning into one workflow so that waste pickup becomes easier to manage for both customers and collection businesses.",
    role: "Product concept and software design",
    status: "Concept / prototype",
    notes: "Routing, dispatch, payments and operational workflows are part of the product direction and should be presented according to what is actually implemented."
  },
  {
    id: "schoontex",
    name: "Schoontex",
    tag: "Education",
    tagColor: "bg-teal-500/20 text-teal-300 border-teal-500/40",
    description: "A school management software concept for student records, fees, receipts and administration.",
    image: "/src/assets/images/schoontex_school_preview_1791242057777.jpg",
    fullOverview: "Schoontex is a school software concept focused on making routine school administration easier to manage digitally. The direction includes student records, fee tracking, receipts and core school workflows in a system that can grow with a school.",
    role: "Product concept and software development",
    status: "Concept / MVP development",
    notes: "Only publish specific school deployments or integrations once they are verified."
  }
];

export const VENTURES_DATA: VentureItem[] = [
  {
    id: "uplex-ai",
    name: "UpleX AI",
    description: "AI, intelligent automation and smart business systems.",
    logoType: "uplex",
    actionText: "Visit Website",
    actionUrl: "https://www.uplexai.com",
    role: "Founder & CEO",
    status: "Building",
    details: "UpleX AI helps businesses understand where AI can actually fit, then designs and builds practical AI agents, automation and smart digital systems. The goal is to move businesses from ideas about AI to useful systems they can actually operate."
  },
  {
    id: "buyshare",
    name: "BuyShare",
    description: "A co-founded application for buying and selling products and services.",
    logoType: "buyshare",
    badges: [
      { label: "Co-founder", variant: "blue" },
      { label: "Near Completion", variant: "green" }
    ],
    role: "Co-founder & Product Builder",
    status: "Near completion",
    details: "BuyShare is a product Patrick is building with a friend. The application is approaching completion, and the portfolio should be updated with its final product story, screenshots and live link once the release is ready."
  },
  {
    id: "gifted-life",
    name: "Gifted Life",
    description: "An organisation and digital platform centred on talent, growth, mentorship and opportunity.",
    logoType: "giftedlife",
    badges: [
      { label: "Founder", variant: "blue" },
      { label: "Building", variant: "green" }
    ],
    role: "Founder",
    status: "Building",
    details: "Gifted Life is a people-focused initiative built around helping people discover, develop and express their gifts. The wider initiative includes the Gifted Life app, which is being shaped as a place where people can showcase their talents, build a presence and connect with communities and opportunities."
  }
];

export const SKILLS_DATA = [
  {
    category: "Software Development",
    icon: "code",
    skills: "HTML, CSS, JavaScript, Python, Full-stack development, Web applications"
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
    readTime: "5 min",
    date: "Writing draft",
    status: "Draft",
    summary: "A reflection on why useful AI depends on the systems around the model, not only the model itself.",
    content: `Every new model creates another wave of excitement. But the part that interests me most is what happens after the model is connected to real work.

Useful AI needs context, reliable workflows, clear boundaries and a way to interact with the systems people already use. That is where engineering becomes important.

I keep coming back to a simple idea: a powerful model is only one part of a useful product. The real value appears when intelligence is connected to a problem that actually matters.`
  },
  {
    id: "build-meaningful-life",
    tag: "Philosophy",
    title: "What It Means to Build a Meaningful Life",
    image: "/src/assets/images/article_meaningful_life_1791242083184.jpg",
    readTime: "7 min",
    date: "Writing draft",
    status: "Draft",
    summary: "A personal reflection on curiosity, craftsmanship, learning and building things that matter.",
    content: `I think a meaningful life is less about collecting impressive labels and more about becoming useful through the things we learn and build.

For me, curiosity is a major part of that process. It pushes me to learn, question, experiment and keep moving even when the path is not obvious.

Building meaningful things also means accepting that not everything will work. What matters is learning from the work, improving the craft and choosing problems worth spending your time on.`
  },
  {
    id: "future-of-work-africa",
    tag: "Research",
    title: "AI and the Future of Work in Africa",
    image: "/src/assets/images/article_future_work_africa_1791242092829.jpg",
    readTime: "6 min",
    date: "Writing draft",
    status: "Draft",
    summary: "Exploring what AI could mean for African talent, businesses, institutions and local innovation.",
    content: `AI will affect work differently across different places. In Africa, the question is not only which jobs change, but also what new products, businesses and systems become possible.

There is an opportunity for local builders to work on local problems with globally capable tools. That means building for the realities of our markets, languages, institutions and infrastructure rather than simply importing someone else's assumptions.

The interesting question is not whether Africa will use AI. It is what Africa will build with it.`
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
    { label: "GitHub", value: "github.com/Patrick-JR", href: "https://github.com/Patrick-JR", type: "github" },
    { label: "YouTube", value: "Tech with Patrick", href: "https://youtube.com/@techwithpatrick", type: "youtube" },
    { label: "UpleX AI", value: "www.uplexai.com", href: "https://www.uplexai.com", type: "website" }
  ]
};

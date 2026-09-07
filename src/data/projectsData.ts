export interface Project {
  id: string;
  title: string;
  type: string;
  architecture: string;
  description: string;
  highlights: string[];
  tags: string[];
  status: "DEPLOYED" | "DEVELOPMENT" | "ARCHIVED";
  link?: string;
  github?: string;
  domain?: string;
  confidential?: boolean;
}

export const staticProjects: Project[] = [
  {
    id: "mekai",
    title: "MEKAI",
    type: "Full-Stack Web Application",
    architecture: "OCR Pipeline • PostgreSQL RLS • Next.js Dynamic Routing",
    description:
      "OCR-assisted manga reading and translation web application that automates text extraction from untranslated comic media, paired with multi-tier user authentication.",
    highlights: [
      "Automated OCR text extraction pipeline for untranslated comic media",
      "Secured multi-tier authentication using custom PostgreSQL Row Level Security (RLS) policies",
      "Optimized dynamic routing and asset delivery on Vercel with clean responsive readers",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "RLS", "OCR", "Vercel"],
    status: "DEPLOYED",
    link: "https://mekaiscans.vercel.app",
    domain: "MEKAISCANS.VERCEL.APP",
  },
  {
    id: "sbma-jo",
    title: "SBMA-JO",
    type: "Internal Government Enterprise System",
    architecture: "Enterprise Property Tracking • Role-Based RLS • Supabase",
    description:
      "Secure internal property and job order management web system engineered for the Subic Bay Metropolitan Authority (SBMA), streamlining equipment requests and asset tracking.",
    highlights: [
      "Streamlined departmental equipment requests and asset tracking workflows across SBMA",
      "Automated inventory cycle counting and property disposition, reducing manual record discrepancies",
      "Enforced strict role-based access control (RBAC) to safeguard confidential government records",
    ],
    tags: ["Next.js", "Supabase", "PostgreSQL", "RBAC", "Government"],
    status: "DEPLOYED",
    domain: "SBMA INTERNAL NETWORK",
    confidential: true,
  },
  {
    id: "rebeat",
    title: "REBEAT",
    type: "Web Audio Sampler & Launchpad",
    architecture: "Web Audio API • Buffer Caching • 60 FPS Target",
    description:
      "Low-latency live music launchpad and audio sampler built directly in the browser, democratizing live music performance without requiring expensive physical hardware.",
    highlights: [
      "Achieved consistent 60 FPS state management with low-latency audio buffer playback",
      "Reduced initial project load times to under 2 seconds via lazy-loaded modular audio banks",
      "Direct Web Audio API gain scheduling and polyphony management",
    ],
    tags: ["React.js", "Web Audio API", "TypeScript", "Performance", "State Management"],
    status: "DEPLOYED",
    link: "https://github.com/0xriyoru",
    github: "https://github.com/0xriyoru",
    domain: "GITHUB.COM/0XRIYORU",
  },
  {
    id: "artnest",
    title: "ARTNEST",
    type: "Progressive Web App (PWA)",
    architecture: "Next.js • PWA Service Workers • Modular UI",
    description:
      "Creative portfolio showcase progressive web app with offline asset caching strategies and high-performance interactive media galleries.",
    highlights: [
      "Engineered PWA service workers for offline asset caching and cross-device responsiveness",
      "Collaborated on frontend navigation architecture and responsive media gallery components",
    ],
    tags: ["Next.js", "React", "PWA", "Service Workers", "Vercel"],
    status: "DEPLOYED",
    link: "https://artnest-hub.vercel.app",
    domain: "ARTNEST-HUB.VERCEL.APP",
  },
  {
    id: "maulam",
    title: "MAULAM",
    type: "AI & Mobile Application",
    architecture: "Python • LLM Prompt Pipelines • Heuristic Parsing",
    description:
      "AI-driven culinary meal planning and ingredient recommendation engine that generates localized recipe suggestions based on available pantry items.",
    highlights: [
      "Designed localized recipe recommendation pipelines using Python and LLM prompting workflows",
      "Implemented heuristic parsing for pantry inventory matching and meal generation",
    ],
    tags: ["Python", "AI Agents", "LLMs", "FastAPI", "Mobile"],
    status: "DEVELOPMENT",
    link: "https://github.com/0xriyoru/MaUlam",
    github: "https://github.com/0xriyoru/MaUlam",
    domain: "GITHUB.COM/0XRIYORU/MAULAM",
  },
  {
    id: "gakumon",
    title: "GAKUMON",
    type: "Gamified E-Learning Platform",
    architecture: "Health Decay Algorithms • Coin Multipliers • Admin Analytics",
    description:
      "Virtual pet e-learning platform incorporating health decay mechanics, reward economies, and an administrative dashboard for student retention tracking.",
    highlights: [
      "Formulated virtual pet health decay formulas and coin multiplier economy benchmarks",
      "Documented comprehensive admin dashboard specifications for student engagement analytics",
    ],
    tags: ["Systems Design", "Gamification", "Analytics", "Prototyping"],
    status: "ARCHIVED",
    domain: "ACADEMIC ARCHIVE",
  },
  {
    id: "joblink",
    title: "JOBLINK",
    type: "Skill-Based Employment Platform",
    architecture: "Relational ERD Schema • End-to-End Figma UI/UX",
    description:
      "Skill-based job matching platform designed to streamline employment opportunities, featuring comprehensive relational database modeling and accessible UX.",
    highlights: [
      "Coordinated cross-functional development with detailed ERD architecture and data flow diagrams",
      "Designed an intuitive end-to-end Figma UI/UX prototype focused on non-technical user onboarding",
    ],
    tags: ["ERD Schema", "Figma UI/UX", "Database Design", "User Flows"],
    status: "ARCHIVED",
    domain: "ACADEMIC ARCHIVE",
  },
];

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
  preview?: string;
}

export const staticProjects: Project[] = [
  {
    id: "sbma-jo",
    title: "SBMA-JO",
    type: "Internal Government Enterprise System",
    architecture: "Supabase RBAC / Atomic PL/pgSQL Numbering / Row-Level Locks",
    description:
      "Secure internal property and job order management web system engineered between July and August 2026 for the Subic Bay Metropolitan Authority (SBMA) Asset Management Division, digitizing hauling requests and Form PPD-CF-36 printing.",
    highlights: [
      "Engineered atomic job order sequencing (709-MMYY-CCCC) using PostgreSQL stored procedures with row-level locks to eliminate duplicate numbering (developed July to August 2026)",
      "Transitioned department from vulnerable local-host architecture to cloud web application with strict role-based access control (RBAC) and Cloudflare Turnstile",
      "Built high-fidelity printable paper slip layouts (Form PPD-CF-36) and serial tracking for accountable form booklets complying with COA audits",
    ],
    tags: ["React 19", "TypeScript", "Tailwind CSS", "PostgreSQL", "Supabase", "Zod", "Vite"],
    status: "DEPLOYED",
    domain: "RESTRICTED // SBMA AMD",
    confidential: true,
    preview: "/projects/preview-sbma-jo.png",
  },
  {
    id: "artnest",
    title: "ARTNEST",
    type: "Art Platform & PWA Marketplace",
    architecture: "Supabase RLS / PayMongo Webhook Gateway / Vision AI Reverse Search / Offline PWA Caching",
    description:
      "All-in-one web platform and progressive web app for independent Filipino artists, collectors, and gallery curators, centralizing portfolio showcases, exhibition coordination, and localized art sales.",
    highlights: [
      "Engineered localized checkout and webhook payment processing via PayMongo supporting GCash, Maya, QR Ph, and credit/debit cards",
      "Built a Python FastAPI service with Google Cloud Vision for reverse image search and dynamic watermark generation",
      "Implemented Vite PWA with offline caching, interactive media galleries, and role-scoped dashboards for artists, collectors, and gallery curators",
    ],
    tags: ["React 19", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "Supabase", "PayMongo", "PWA", "Vite"],
    status: "DEPLOYED",
    link: "https://artnest-hub.vercel.app",
    domain: "ARTNEST-HUB.VERCEL.APP",
    preview: "/projects/preview-artnest.png",
  },
  {
    id: "mekai",
    title: "MEKAI",
    type: "Full-Stack OCR Reader Platform",
    architecture: "Dual-Layer OCR Pipeline / OPUS-MT Translation / Canvas Coordinate Mapping / Supabase RLS",
    description:
      "OCR-assisted manga reading and translation web application that automates selective text extraction from untranslated comic media via custom user bounding boxes, paired with a persistent Word Vault.",
    highlights: [
      "Engineered selective bounding-box OCR with HTML5 Canvas ink pre-flight checks and dual-layer extraction (Railway PaddleOCR microservice & client-side Tesseract.js fallback)",
      "Built a Japanese-to-English translation pipeline pairing OPUS-MT on Railway with Google Gemini API",
      "Secured multi-tier authentication, chapter storage, and reader state using PostgreSQL Row Level Security (RLS) policies and TanStack Query",
    ],
    tags: ["React 19", "TypeScript", "Python", "FastAPI", "Supabase", "Gemini AI", "PaddleOCR", "Tailwind CSS", "Vite"],
    status: "DEPLOYED",
    link: "https://mekaiscans.vercel.app",
    github: "https://github.com/0xriyoru/Mekai",
    domain: "MEKAISCANS.VERCEL.APP",
    preview: "/projects/preview-mekai.png",
  },
  {
    id: "maulam",
    title: "MAULAM",
    type: "AI Mobile Companion App",
    architecture: "Serverless Deno Edge Functions / Gemini Multimodal Vision / Offline AsyncStorage Caching / Notification Scheduling",
    description:
      "Cross-platform mobile kitchen companion and pantry manager that uses on-device camera capture and Gemini Vision to scan ingredients, track food expiration, and generate localized Filipino recipes, deployed with a production Android APK build.",
    highlights: [
      "Built and deployed mobile companion application using Expo, React Native, and React 19, shipped as an installable Android APK build",
      "Deployed serverless Supabase Edge Functions (Deno / TypeScript) orchestrating Google Gemini Vision for ingredient photo recognition and AI Chef chat",
      "Integrated Expo Notifications for proactive ingredient shelf-life reminders and AsyncStorage for offline-first pantry caching",
    ],
    tags: ["React Native", "Expo", "TypeScript", "Deno", "Supabase", "Gemini AI", "Android"],
    status: "DEPLOYED",
    link: "https://github.com/0xriyoru/MaUlam",
    github: "https://github.com/0xriyoru/MaUlam",
    domain: "GITHUB.COM/0XRIYORU/MAULAM",
  },
  {
    id: "rebeat",
    title: "REBEAT",
    type: "Web Audio Sampler & Live Launchpad",
    architecture: "Sample-Accurate 1-Bar Quantization / Buffer Preload Engine / Polyphonic Scheduler / Anti-Click Fades",
    description:
      "Browser-based audio clip launcher and sampler inspired by Novation Launchpad Arcade, featuring sample-accurate loop scheduling, polyphonic layered playback, and an interactive memory game.",
    highlights: [
      "Engineered Tone.js audio engine with sample-accurate 1-bar musical quantization ('1m' @ 130 BPM) and anti-click fade ramps",
      "Implemented preloaded ToneAudioBuffer caching for instant zero-latency pad triggers and polyphonic layering",
      "Created dual-mode architecture: Brazilian Funk freestyle loop sequencing and Simon Says audio memory game",
    ],
    tags: ["React", "TypeScript", "Tone.js", "Web Audio API", "Tailwind CSS", "Vite"],
    status: "DEPLOYED",
    preview: "/projects/preview-rebeat.png",
    link: "https://rebeat-launchpad.vercel.app",
    github: "https://github.com/riyod3v/rebeat",
    domain: "REBEAT-LAUNCHPAD.VERCEL.APP",
  },
  {
    id: "uma-helper",
    title: "UMA COMMAND CENTER",
    type: "Game Analytics & Team Builder",
    architecture: "Sub-50ms Optimistic UI / Dynamic Import Splitting / Zustand Multi-Session Persistence / Supabase RLS",
    description:
      "Analytical companion and deck builder for Uma Musume Pretty Derby, featuring optimistic local state management, inheritance parent tracking, and offline game database indexing.",
    highlights: [
      "Built with Next.js 14 (App Router) and Tailwind CSS with sub-50ms optimistic UI updates for deck inventory manipulation",
      "Separated dynamic user decks in Supabase from static game reference datasets loaded through dynamic imports",
      "Implemented Zustand state management with persistent storage for multi-session training deck compositions",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "Supabase"],
    status: "DEPLOYED",
    link: "https://github.com/0xriyoru/uma-helper",
    github: "https://github.com/0xriyoru/uma-helper",
    domain: "GITHUB.COM/0XRIYORU/UMA-HELPER",
  },
  {
    id: "gakumon",
    title: "GAKUMON",
    type: "Pet-Based Gamified E-Learning Platform",
    architecture: "24-Hour Decay Algorithm / Multiplier Economy Engine / Instructor Telemetry Dashboard",
    description:
      "E-learning web application with virtual pet mechanics. Students keep a pet alive by completing daily quiz modules, with a 24-hour health decay algorithm and an instructor dashboard.",
    highlights: [
      "Designed pet care mechanics where daily quiz scores replenish pet health points and unlock cosmetic badges",
      "Programmed time-based health decay formulas (24-hour cycle) and quiz reward coin multipliers",
      "Built the instructor dashboard to view class quiz completion rates, student activity logs, and pet health stats",
    ],
    tags: ["Systems Design", "Gamification", "State Modeling", "Analytics"],
    status: "ARCHIVED",
    domain: "ACADEMIC ARCHIVE",
  },
  {
    id: "joblink",
    title: "JOBLINK",
    type: "Skill-Based Job Matching Web Platform",
    architecture: "Multi-Param Skill Filtering / 12-Table Relational Schema / Role-Scoped Workflows",
    description:
      "Centralized employment web platform connecting job seekers and employers through dynamic keyword and tech-stack filtering (HTML, CSS, JS, Python) with structured relational database architecture.",
    highlights: [
      "Engineered multi-criteria search filtering enabling applicants to match job postings by keywords and specific technical skill sets (HTML, CSS, JS, Python)",
      "Designed a normalized 12-table relational database schema and data flow architecture for applicant tracking and recruiter management",
      "Built responsive, accessible web interfaces and user onboarding flows from custom Figma prototypes with strict client-side validation",
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Python", "Database Design", "UI/UX Design"],
    status: "ARCHIVED",
    domain: "ACADEMIC ARCHIVE",
    preview: "/projects/preview-joblink.png",
  },
];

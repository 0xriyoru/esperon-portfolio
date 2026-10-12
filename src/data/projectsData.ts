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
    id: "sbma-jo",
    title: "SBMA-JO",
    type: "Internal Government Enterprise System",
    architecture: "React 19 / Vite 8 / Supabase RBAC / Atomic PL/pgSQL Numbering",
    description:
      "Secure internal property and job order management web system engineered between July and August 2026 for the Subic Bay Metropolitan Authority (SBMA) Asset Management Division, digitizing hauling requests and Form PPD-CF-36 printing.",
    highlights: [
      "Engineered atomic job order sequencing (709-MMYY-CCCC) using PostgreSQL stored procedures with row-level locks to eliminate duplicate numbering (developed July to August 2026)",
      "Transitioned department from vulnerable local-host architecture to cloud web application with strict role-based access control (RBAC) and Cloudflare Turnstile",
      "Built high-fidelity printable paper slip layouts (Form PPD-CF-36) and serial tracking for accountable form booklets complying with COA audits",
    ],
    tags: ["React 19", "Vite", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Zod", "Government"],
    status: "DEPLOYED",
    domain: "RESTRICTED // SBMA AMD",
    confidential: true,
  },
  {
    id: "artnest",
    title: "ARTNEST",
    type: "Art Platform & PWA Marketplace",
    architecture: "React 19 / Vite 8 / Supabase RLS / PayMongo Gateway / Vision AI Microservice",
    description:
      "All-in-one web platform and progressive web app for independent Filipino artists, collectors, and gallery curators, centralizing portfolio showcases, exhibition coordination, and localized art sales.",
    highlights: [
      "Engineered localized checkout and webhook payment processing via PayMongo supporting GCash, Maya, QR Ph, and credit/debit cards",
      "Built a Python FastAPI service with Google Cloud Vision for reverse image search and dynamic watermark generation",
      "Implemented Vite PWA with offline caching, interactive media galleries, and role-scoped dashboards for artists, collectors, and gallery curators",
    ],
    tags: ["React 19", "Vite", "TypeScript", "Tailwind CSS", "Supabase", "PayMongo", "FastAPI", "PWA"],
    status: "DEPLOYED",
    link: "https://artnest-hub.vercel.app",
    domain: "ARTNEST-HUB.VERCEL.APP",
  },
  {
    id: "mekai",
    title: "MEKAI",
    type: "Full-Stack OCR Reader Platform",
    architecture: "React 19 / Vite 7 / PaddleOCR Microservice / Supabase RLS / Gemini AI",
    description:
      "OCR-assisted manga reading and translation web application that automates selective text extraction from untranslated comic media via custom user bounding boxes, paired with a persistent Word Vault.",
    highlights: [
      "Engineered selective bounding-box OCR with HTML5 Canvas ink pre-flight checks and dual-layer extraction (Railway PaddleOCR microservice & client-side Tesseract.js fallback)",
      "Built a Japanese-to-English translation pipeline pairing OPUS-MT on Railway with Google Gemini API",
      "Secured multi-tier authentication, chapter storage, and reader state using PostgreSQL Row Level Security (RLS) policies and TanStack Query",
    ],
    tags: ["React 19", "Vite", "TypeScript", "Tailwind CSS", "Supabase", "FastAPI", "PaddleOCR", "Gemini AI"],
    status: "DEPLOYED",
    link: "https://mekaiscans.vercel.app",
    github: "https://github.com/0xriyoru/Mekai",
    domain: "MEKAISCANS.VERCEL.APP",
  },
  {
    id: "maulam",
    title: "MAULAM",
    type: "AI Mobile Companion App",
    architecture: "Expo React Native / Supabase Edge Functions / Gemini Multimodal AI / Android APK",
    description:
      "Cross-platform mobile kitchen companion and pantry manager that uses on-device camera capture and Gemini Vision to scan ingredients, track food expiration, and generate localized Filipino recipes, deployed with a production Android APK build.",
    highlights: [
      "Built and deployed mobile companion application using Expo, React Native, and React 19, shipped as an installable Android APK build",
      "Deployed serverless Supabase Edge Functions (Deno / TypeScript) orchestrating Google Gemini Vision for ingredient photo recognition and AI Chef chat",
      "Integrated Expo Notifications for proactive ingredient shelf-life reminders and AsyncStorage for offline-first pantry caching",
    ],
    tags: ["React Native", "Expo", "Android APK", "TypeScript", "Supabase", "Gemini AI", "Mobile"],
    status: "DEPLOYED",
    link: "https://github.com/0xriyoru/MaUlam",
    github: "https://github.com/0xriyoru/MaUlam",
    domain: "GITHUB.COM/0XRIYORU/MAULAM",
  },
  {
    id: "rebeat",
    title: "REBEAT",
    type: "Web Audio Sampler & Live Launchpad",
    architecture: "Tone.js Audio Engine / 1-Bar Musical Quantization / React 18 / Vite",
    description:
      "Browser-based audio clip launcher and sampler inspired by Novation Launchpad Arcade, featuring sample-accurate loop scheduling, polyphonic layered playback, and an interactive memory game.",
    highlights: [
      "Engineered Tone.js audio engine with sample-accurate 1-bar musical quantization ('1m' @ 130 BPM) and anti-click fade ramps",
      "Implemented preloaded ToneAudioBuffer caching for instant zero-latency pad triggers and polyphonic layering",
      "Created dual-mode architecture: Brazilian Funk freestyle loop sequencing and Simon Says audio memory game",
    ],
    tags: ["React.js", "Tone.js", "Web Audio API", "Vite", "Supabase", "Audio Engineering"],
    status: "DEPLOYED",
    link: "https://github.com/0xriyoru/rebeat",
    github: "https://github.com/0xriyoru/rebeat",
    domain: "GITHUB.COM/0XRIYORU/REBEAT",
  },
  {
    id: "uma-helper",
    title: "UMA COMMAND CENTER",
    type: "Game Analytics & Team Builder",
    architecture: "Next.js 14 App Router / Zustand Persistence / Supabase RLS",
    description:
      "Analytical companion and deck builder for Uma Musume Pretty Derby, featuring optimistic local state management, inheritance parent tracking, and offline game database indexing.",
    highlights: [
      "Built with Next.js 14 (App Router) and Tailwind CSS with sub-50ms optimistic UI updates for deck inventory manipulation",
      "Separated dynamic user decks in Supabase from static game reference datasets loaded through dynamic imports",
      "Implemented Zustand state management with persistent storage for multi-session training deck compositions",
    ],
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Zustand", "Supabase", "Analytics"],
    status: "DEPLOYED",
    link: "https://github.com/0xriyoru/uma-helper",
    github: "https://github.com/0xriyoru/uma-helper",
    domain: "GITHUB.COM/0XRIYORU/UMA-HELPER",
  },
  {
    id: "gakumon",
    title: "GAKUMON",
    type: "Pet-Based Gamified E-Learning Platform",
    architecture: "Virtual Pet Mechanics / Virtual Economy / Analytics Dashboard",
    description:
      "E-learning web application with virtual pet mechanics. Students keep a pet alive by completing daily quiz modules, with a 24-hour health decay algorithm and an instructor dashboard.",
    highlights: [
      "Designed pet care mechanics where daily quiz scores replenish pet health points and unlock cosmetic badges",
      "Programmed time-based health decay formulas (24-hour cycle) and quiz reward coin multipliers",
      "Built the instructor dashboard to view class quiz completion rates, student activity logs, and pet health stats",
    ],
    tags: ["Systems Design", "Gamification", "System Architecture", "Admin Analytics"],
    status: "ARCHIVED",
    domain: "ACADEMIC ARCHIVE",
  },
  {
    id: "joblink",
    title: "JOBLINK",
    type: "Skill-Based Job Matching Web Platform",
    architecture: "Full-Stack Architecture / Relational ERD Modeling / Accessible UI/UX",
    description:
      "Centralized employment web platform connecting local job seekers and employers through structured relational database modeling, cross-functional ERD alignment, and accessible UI/UX.",
    highlights: [
      "Designed the 12-table relational database schema and data flow diagrams for applicant tracking and job category matching",
      "Designed end-to-end Figma UI/UX prototype focused on non-technical user onboarding and accessible mobile interaction",
      "Wrote the 45-page system manual and API endpoint specification for the development team",
    ],
    tags: ["Figma UI/UX", "Database Design", "ERD Architecture", "Systems Design"],
    status: "ARCHIVED",
    domain: "ACADEMIC ARCHIVE",
  },
];

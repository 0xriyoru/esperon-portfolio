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
    highlights: [],
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
    highlights: [],
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
    highlights: [],
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
    highlights: [],
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
    highlights: [],
    tags: ["React", "TypeScript", "Tone.js", "Web Audio API", "Tailwind CSS", "Vite"],
    status: "DEPLOYED",
    preview: "/projects/preview-rebeat.png",
    link: "https://rebeat-launchpad.vercel.app",
    github: "https://github.com/riyod3v/rebeat",
    domain: "REBEAT-LAUNCHPAD.VERCEL.APP",
  },
  {
    id: "gakumon",
    title: "GAKUMON",
    type: "Pet-Based Gamified E-Learning Platform",
    architecture: "DeepSeek R1 OpenRouter AI / PHP & MySQL Engine / Bootstrap Responsive Client",
    description:
      "Gamified e-learning web platform combining PHP, MySQL, and DeepSeek R1 AI via OpenRouter with client-side JavaScript and Bootstrap. Integrates virtual pet health mechanics, AI-generated quiz validation, and instructor telemetry.",
    highlights: [],
    tags: ["PHP", "MySQL", "DeepSeek R1", "Bootstrap", "JavaScript", "Gamification"],
    status: "ARCHIVED",
    domain: "ACADEMIC ARCHIVE",
    preview: "/projects/preview-gakumon.png",
  },
  {
    id: "joblink",
    title: "JOBLINK",
    type: "Skill-Based Job Matching Web Platform",
    architecture: "Multi-Param Skill Filtering / 12-Table Relational Schema / Role-Scoped Workflows",
    description:
      "Centralized employment web platform connecting job seekers and employers through dynamic keyword and tech-stack filtering (HTML, CSS, JS, Python) with structured relational database architecture.",
    highlights: [],
    tags: ["HTML5", "CSS3", "JavaScript", "Python", "Database Design", "UI/UX Design"],
    status: "ARCHIVED",
    domain: "ACADEMIC ARCHIVE",
    preview: "/projects/preview-joblink.png",
  },
];

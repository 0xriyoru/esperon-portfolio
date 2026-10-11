import type { ComponentType } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiPwa,
  SiHtml5,
  SiBootstrap,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiPython,
  SiPhp,
  SiMysql,
  SiLaravel,
  SiFigma,
  SiGithub,
  SiGit,
  SiVercel,
  SiPostman,
  SiDocker,
  SiOpenjdk,
} from "@icons-pack/react-simple-icons";
import {
  Robot,
  Sparkle,
  Scan,
  Waveform,
  PlugsConnected,
  Database,
  SquaresFour,
  DeviceMobile,
  BookOpenText,
  Code,
  Globe,
} from "@phosphor-icons/react";

export interface SkillMeta {
  name: string;
  url: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  tag?: string;
}

export interface SkillCategoryGroup {
  id: string;
  category: string;
  skill_list: string[];
}

export const staticSkills: SkillCategoryGroup[] = [
  {
    id: "cat-uiux",
    category: "UI/UX Design",
    skill_list: [
      "Figma",
      "Wireframing",
      "High-Fidelity Prototyping",
    ],
  },
  {
    id: "cat-frontend",
    category: "Front-End",
    skill_list: [
      "HTML",
      "CSS",
      "Javascript",
      "Typescript",
    ],
  },
  {
    id: "cat-backend",
    category: "Back-End & Database",
    skill_list: [
      "Node.js",
      "Java",
      "PHP",
      "MySQL",
      "PostgreSQL",
    ],
  },
  {
    id: "cat-frameworks",
    category: "Frameworks",
    skill_list: [
      "Bootstrap",
      "React.js",
      "Tailwind CSS",
      "Laravel",
    ],
  },
  {
    id: "cat-tools",
    category: "Developer Tools",
    skill_list: [
      "GitHub",
      "VS Code",
      "Vercel",
      "Supabase",
      "AWS DynamoDB",
    ],
  },
  {
    id: "cat-other",
    category: "Other Technical Skills",
    skill_list: [
      "Technical Research",
      "Documentation",
      "Technical Writing",
    ],
  },
];

export const skillMetaRegistry: Record<string, SkillMeta> = {
  // AI & Specialized
  "agentic ai workflows": {
    name: "Agentic AI Workflows",
    url: "https://www.anthropic.com/research/building-effective-agents",
    icon: Robot,
    tag: "Autonomous Systems",
  },
  "llm prompting & pipelines": {
    name: "LLM Prompting & Pipelines",
    url: "https://www.promptingguide.ai",
    icon: Sparkle,
    tag: "LLM Engineering",
  },
  "ocr translation engines": {
    name: "OCR Translation Engines",
    url: "https://github.com/tesseract-ocr/tesseract",
    icon: Scan,
    tag: "Computer Vision",
  },
  "web audio api": {
    name: "Web Audio API",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API",
    icon: Waveform,
    tag: "Browser Audio",
  },
  "postgresql rls policies": {
    name: "PostgreSQL RLS Policies",
    url: "https://www.postgresql.org/docs/current/ddl-rowsecurity.html",
    icon: SiPostgresql,
    tag: "Security Architecture",
  },

  // Frontend & Frameworks
  "next.js": {
    name: "Next.js",
    url: "https://nextjs.org",
    icon: SiNextdotjs,
  },
  "react.js": {
    name: "React.js",
    url: "https://react.dev",
    icon: SiReact,
  },
  "typescript": {
    name: "TypeScript",
    url: "https://www.typescriptlang.org",
    icon: SiTypescript,
  },
  "javascript (es6+)": {
    name: "JavaScript (ES6+)",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    icon: SiJavascript,
  },
  "javascript": {
    name: "JavaScript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    icon: SiJavascript,
  },
  "tailwind css": {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
    icon: SiTailwindcss,
  },
  "progressive web apps (pwa)": {
    name: "Progressive Web Apps (PWA)",
    url: "https://web.dev/explore/progressive-web-apps",
    icon: SiPwa,
  },
  "html": {
    name: "HTML",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    icon: SiHtml5,
  },
  "css": {
    name: "CSS",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    icon: Code,
  },
  "html5 / css3": {
    name: "HTML5 / CSS3",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    icon: SiHtml5,
  },
  "bootstrap": {
    name: "Bootstrap",
    url: "https://getbootstrap.com",
    icon: SiBootstrap,
  },

  // Backend & Databases
  "node.js": {
    name: "Node.js",
    url: "https://nodejs.org",
    icon: SiNodedotjs,
  },
  "postgresql (rls)": {
    name: "PostgreSQL (RLS)",
    url: "https://www.postgresql.org",
    icon: SiPostgresql,
  },
  "postgresql": {
    name: "PostgreSQL",
    url: "https://www.postgresql.org",
    icon: SiPostgresql,
  },
  "supabase realtime": {
    name: "Supabase Realtime",
    url: "https://supabase.com/docs/guides/realtime",
    icon: SiSupabase,
  },
  "supabase": {
    name: "Supabase",
    url: "https://supabase.com",
    icon: SiSupabase,
  },
  "python": {
    name: "Python",
    url: "https://www.python.org",
    icon: SiPython,
  },
  "java": {
    name: "Java",
    url: "https://dev.java",
    icon: SiOpenjdk,
  },
  "php": {
    name: "PHP",
    url: "https://www.php.net",
    icon: SiPhp,
  },
  "mysql": {
    name: "MySQL",
    url: "https://www.mysql.com",
    icon: SiMysql,
  },
  "aws dynamodb": {
    name: "AWS DynamoDB",
    url: "https://aws.amazon.com/dynamodb/",
    icon: Database,
  },
  "rest apis": {
    name: "REST APIs",
    url: "https://restfulapi.net",
    icon: PlugsConnected,
  },
  "laravel": {
    name: "Laravel",
    url: "https://laravel.com",
    icon: SiLaravel,
  },

  // UI/UX & Systems Design
  "figma (design systems)": {
    name: "Figma (Design Systems)",
    url: "https://www.figma.com",
    icon: SiFigma,
  },
  "figma": {
    name: "Figma",
    url: "https://www.figma.com",
    icon: SiFigma,
  },
  "high-fidelity prototyping": {
    name: "High-Fidelity Prototyping",
    url: "https://www.figma.com/prototyping/",
    icon: DeviceMobile,
  },
  "wireframing": {
    name: "Wireframing",
    url: "https://www.figma.com/wireframe-tool/",
    icon: SquaresFour,
  },
  "erd schema architecture": {
    name: "ERD Schema Architecture",
    url: "https://drawsql.app",
    icon: Database,
  },
  "technical documentation": {
    name: "Technical Documentation",
    url: "https://diataxis.fr",
    icon: BookOpenText,
  },
  "technical research": {
    name: "Technical Research",
    url: "https://en.wikipedia.org/wiki/Scientific_method",
    icon: BookOpenText,
  },
  "documentation": {
    name: "Documentation",
    url: "https://diataxis.fr",
    icon: BookOpenText,
  },
  "technical writing": {
    name: "Technical Writing",
    url: "https://developers.google.com/tech-writing",
    icon: BookOpenText,
  },

  // Developer Tools & Cloud
  "git & github": {
    name: "Git & GitHub",
    url: "https://github.com",
    icon: SiGithub,
  },
  "github": {
    name: "GitHub",
    url: "https://github.com",
    icon: SiGithub,
  },
  "git": {
    name: "Git",
    url: "https://git-scm.com",
    icon: SiGit,
  },
  "vs code": {
    name: "VS Code",
    url: "https://code.visualstudio.com",
    icon: Code,
  },
  "vercel deployment": {
    name: "Vercel Deployment",
    url: "https://vercel.com",
    icon: SiVercel,
  },
  "vercel": {
    name: "Vercel",
    url: "https://vercel.com",
    icon: SiVercel,
  },
  "postman": {
    name: "Postman",
    url: "https://www.postman.com",
    icon: SiPostman,
  },
  "docker": {
    name: "Docker",
    url: "https://www.docker.com",
    icon: SiDocker,
  },
  "supabase cli": {
    name: "Supabase CLI",
    url: "https://supabase.com/docs/guides/cli",
    icon: SiSupabase,
  },
};

export function getSkillMeta(skillName: string): SkillMeta {
  const normalized = skillName.trim().toLowerCase();
  if (skillMetaRegistry[normalized]) {
    return skillMetaRegistry[normalized];
  }

  // Fallback lookup by partial matching
  for (const [key, meta] of Object.entries(skillMetaRegistry)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return meta;
    }
  }

  // Generic fallback if unknown skill arrives
  return {
    name: skillName,
    url: `https://www.google.com/search?q=${encodeURIComponent(skillName)}`,
    icon: Globe,
  };
}

export type Credential = {
  id: string;
  title: string;
  organization: string;
  type: string;
  date_range: string;
  description?: string;
  certificate_url?: string;
  credential_url?: string;
  skills_acquired?: string[];
  is_featured?: boolean;
};

export const staticCredentials: Credential[] = [
  {
    id: "cred-raite-2026",
    title: "RAITE 2026 Regional Programming Challenge",
    organization: "PSITE Central Luzon",
    type: "COMPETITION",
    date_range: "OCT 2026",
    description: "Competed in the Regional Assembly on Information Technology Education (RAITE) programming challenge.",
  },
  {
    id: "cred-norde-2026",
    title: "Educational Field Trip",
    organization: "Norde International Distributors",
    type: "FIELD_TRIP",
    date_range: "SEP 2026",
    description: "Participated in an industry exposure visit exploring industrial-grade digital printing, hardware technology, and distribution logistics.",
  },
  {
    id: "cred-hytec-2026",
    title: "Educational Field Trip",
    organization: "Hytec Power, Inc.",
    type: "FIELD_TRIP",
    date_range: "SEP 2026",
    description: "Industry visit investigating industrial automation, smart engineering equipment, and technical educational systems.",
  },
  {
    id: "cred-lenovo-2026",
    title: "Lenovo Legion Campus Quest",
    organization: "Lenovo Legion",
    type: "EVENT",
    date_range: "SEP 2026",
    description: "Participated in the Lenovo Legion campus technology showcase and high-performance hardware tour.",
  },
  {
    id: "cred-aws-2026",
    title: "AWS Community Day Philippines",
    organization: "AWS User Group Philippines (Taguig City, Metro Manila)",
    type: "EVENT",
    date_range: "AUG 2026",
    description: "Explored enterprise cloud architectures, serverless design patterns, distributed databases, and scalable AWS deployment models.",
  },
  {
    id: "cred-convergence-2026",
    title: "Convergence III: From Policy to People: The Governance & Human Side of Cyber Risk",
    organization: "DEVCON Pampanga (Certificate of Recognition)",
    type: "RECOGNITION",
    date_range: "JUL 2026",
    description: "Engaged in sessions on cyber risk governance, agentic AI workflows, LLM safety, and human-centric cybersecurity operations.",
    certificate_url: "/certificates/convergence-iii-recognition.pdf",
    credential_url: "https://devcon.ph",
  },
  {
    id: "cred-sparkcon-2025",
    title: "SparkCon: The Next Wave of Innovation",
    organization: "Campus DevCon x Zellense",
    type: "SEMINAR",
    date_range: "2025",
    description: "Participated in engineering panels discussing emerging developer ecosystems, software innovation, and modern tech stacks.",
  },
  {
    id: "cred-skydevs-2025",
    title: "Skydevs Hack, Play, & Learn Summit 2025 'Masterclass'",
    organization: "Skydev Solutions, Inc.",
    type: "SEMINAR",
    date_range: "2025",
    description: "Hands-on technical masterclass focusing on full-stack application lifecycle, API engineering, and web application security.",
  },
  {
    id: "cred-unity-2025",
    title: "C# Scripting for Unity: Core Concepts and Best Practices",
    organization: "Lyceum of Subic Bay",
    type: "CERTIFICATE",
    date_range: "2025",
    description: "Core training on object-oriented C# scripting, event-driven game logic, and component-based architectures in Unity.",
  },
  {
    id: "cred-angular-2024",
    title: "Exploring the Angular Frameworks for UI Development: Enhancing your Web Application",
    organization: "Lyceum of Subic Bay",
    type: "CERTIFICATE",
    date_range: "2024",
    description: "Study of component architectures, TypeScript integration, RxJS reactive patterns, and structured frontend modules.",
  },
  {
    id: "cred-privacy-2023",
    title: "Data Privacy & IT/CS Career Development",
    organization: "Lyceum of Subic Bay",
    type: "SEMINAR",
    date_range: "2023",
    description: "Foundational seminar covering data privacy compliance regulations, information asset safeguards, and IT career pathways.",
  },
];

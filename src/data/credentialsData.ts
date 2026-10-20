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
    title: "Educational Tour",
    organization: "Norde International Distributors",
    type: "TOUR",
    date_range: "SEP 2026",
  },
  {
    id: "cred-hytec-2026",
    title: "Educational Tour",
    organization: "Hytec Power, Inc.",
    type: "TOUR",
    date_range: "SEP 2026",
  },
  {
    id: "cred-lenovo-2026",
    title: "Lenovo Legion Campus Quest",
    organization: "Lenovo Legion",
    type: "EVENT",
    date_range: "SEP 2026",
  },
  {
    id: "cred-aws-2026",
    title: "AWS Community Day Philippines",
    organization: "AWS User Group Philippines (Taguig City, Metro Manila)",
    type: "EVENT",
    date_range: "AUG 2026",
  },
  {
    id: "cred-convergence-2026",
    title: "Convergence III: From Policy to People: The Governance & Human Side of Cyber Risk",
    organization: "DEVCON Pampanga",
    type: "SEMINAR",
    date_range: "JUL 2026",
    certificate_url: "/certificates/convergence-iii-recognition.pdf",
    credential_url: "https://devcon.ph",
  },
  {
    id: "cred-topcit-2025",
    title: "TOPCIT: Test of Practical Competency in ICT (Level 2)",
    organization: "IITP (Institute for Information & Communications Technology Promotion)",
    type: "CERTIFICATION",
    date_range: "DEC 2025",
    certificate_url: "/certificates/topcit-level-2-certification.pdf",
    credential_url: "https://www.topcit.or.kr",
  },
  {
    id: "cred-sparkcon-2025",
    title: "SparkCon: The Next Wave of Innovation",
    organization: "Campus DevCon x Zellense",
    type: "SEMINAR",
    date_range: "2025",
  },
  {
    id: "cred-skydevs-2025",
    title: "Skydevs Hack, Play, & Learn Summit 2025 'Masterclass'",
    organization: "Skydev Solutions, Inc.",
    type: "SEMINAR",
    date_range: "2025",
    certificate_url: "/certificates/skydevs-hack-play-learn-summit-2025.pdf",
  },
  {
    id: "cred-unity-2025",
    title: "C# Scripting for Unity: Core Concepts and Best Practices",
    organization: "Lyceum of Subic Bay",
    type: "SEMINAR",
    date_range: "2025",
  },
  {
    id: "cred-angular-2024",
    title: "Exploring the Angular Frameworks for UI Development: Enhancing Your Web Applications",
    organization: "Lyceum of Subic Bay",
    type: "SEMINAR",
    date_range: "OCT 2024",
    certificate_url: "/certificates/angular-frameworks-ui-development.png",
  },
  {
    id: "cred-privacy-2023",
    title: "Data Privacy & IT/CS Career Development and Introduction to Dart Programming Language Seminar",
    organization: "Lyceum of Subic Bay",
    type: "SEMINAR",
    date_range: "DEC 2023",
    certificate_url: "/certificates/data-privacy-dart-seminar.png",
  },
];

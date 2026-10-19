-- ==============================================================================
-- Supabase Database Seed: Rhodge Esperon (0xriyoru) Portfolio
-- Idempotent UPSERT seed script compliant with verified CV & Postgres Best Practices
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Projects Data (Verified CV Projects)
-- ------------------------------------------------------------------------------
INSERT INTO public.projects (id, title, description, type, tags, status, link, domain, image_url, created_at)
VALUES
(
    '11111111-1111-1111-1111-111111111104',
    'SBMA-JO',
    'Engineered and deployed between July and August 2026 a modern, cloud-based Job Order Management System with an interactive analytics dashboard featuring reactive Power BI-style KPI cards for SBMA Asset Management Department to replace an outdated local server setup.',
    'Job Order Management System',
    ARRAY['NEXT.JS', 'SUPABASE', 'POSTGRESQL', 'POWER BI KPI CARDS', 'CLOUD', 'SBMA'],
    'DEPLOYED',
    NULL,
    'RESTRICTED // SBMA AMD',
    '/projects/sbma.png',
    '2026-07-01 00:00:00+00'
),
(
    '11111111-1111-1111-1111-111111111101',
    'MEKAI',
    'Streamlined the untranslated manga reading process by engineering a full-stack application with OCR-powered translation tools, multi-tier user authorization with custom PostgreSQL Row Level Security (RLS) policies, and modern Figma aesthetic.',
    'OCR-Assisted Manga Reading Platform',
    ARRAY['NEXT.JS', 'TYPESCRIPT', 'POSTGRESQL RLS', 'OCR', 'FIGMA', 'VERCEL'],
    'DEPLOYED',
    'https://mekaiscans.vercel.app',
    'MEKAISCANS.VERCEL.APP',
    '/projects/mekai.png',
    '2026-02-01 00:00:00+00'
),
(
    '11111111-1111-1111-1111-111111111102',
    'ARTNEST',
    'Architected responsive Progressive Web App (PWA) features and modular UI components using Next.js and React, enabling seamless offline caching and cross-device responsiveness for creative artists.',
    'Creative Showcase PWA',
    ARRAY['NEXT.JS', 'REACT', 'PWA', 'TAILWIND CSS', 'VERCEL'],
    'DEPLOYED',
    'https://artnest-hub.vercel.app',
    'ARTNEST-HUB.VERCEL.APP',
    '/projects/artnest.png',
    '2026-01-15 00:00:00+00'
),
(
    '11111111-1111-1111-1111-111111111103',
    'REBEAT',
    'Democratized live music performance by developing a web-based launchpad to replace expensive physical gear. Accomplished a 60 FPS UI target by implementing a low-latency web audio engine and React.js state management with audio buffer caching.',
    'User-Centered Live Music Interface',
    ARRAY['REACT.JS', 'WEB AUDIO API', 'TYPESCRIPT', 'AUDIO BUFFERING'],
    'DEPLOYED',
    'https://rebeat-launchpad.vercel.app',
    'REBEAT-LAUNCHPAD.VERCEL.APP',
    '/projects/rebeat.png',
    '2025-12-01 00:00:00+00'
),
(
    '11111111-1111-1111-1111-111111111105',
    'MAULAM',
    'Intelligent meal planning and ingredient recommendation engine leveraging Python and LLM prompting pipelines to generate localized culinary suggestions based on real-time pantry inventory.',
    'AI Mobile Companion App (Android APK)',
    ARRAY['REACT NATIVE', 'EXPO', 'ANDROID APK', 'GEMINI AI', 'EDGE FUNCTIONS'],
    'DEPLOYED',
    'https://github.com/0xriyoru/MaUlam',
    'GITHUB.COM/0XRIYORU/MAULAM',
    '/projects/maulam.png',
    '2026-06-01 00:00:00+00'
),
(
    '11111111-1111-1111-1111-111111111106',
    'GAKUMON',
    'Enhanced student engagement and knowledge retention by documenting a gamified platform with virtual pet mechanics. Increased daily user participation by defining a virtual economy featuring pet health decay and coin multipliers, and formulated admin dashboard analytics.',
    'Pet-Based Gamified E-Learning Platform',
    ARRAY['TECHNICAL DOCUMENTATION', 'GAMIFICATION', 'SYSTEM ARCHITECTURE', 'ANALYTICS'],
    'ARCHIVED',
    NULL,
    'ACADEMIC ARCHIVE',
    NULL,
    '2024-11-01 00:00:00+00'
),
(
    '11111111-1111-1111-1111-111111111107',
    'JOBLINK',
    'Accomplished a centralized employment web platform connecting local job seekers and employers by developing a full-stack solution. Achieved 100% architectural alignment through ERDs and manuals, and optimized onboarding accessibility with an end-to-end Figma interface.',
    'Skill-Based Job Matching Web Platform',
    ARRAY['FIGMA', 'UI/UX PROTOTYPING', 'ERD DESIGN', 'TECHNICAL MANUALS'],
    'ARCHIVED',
    NULL,
    'ACADEMIC ARCHIVE',
    NULL,
    '2022-12-01 00:00:00+00'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    type = EXCLUDED.type,
    tags = EXCLUDED.tags,
    status = EXCLUDED.status,
    link = EXCLUDED.link,
    domain = EXCLUDED.domain,
    image_url = EXCLUDED.image_url,
    created_at = EXCLUDED.created_at;

-- ------------------------------------------------------------------------------
-- 2. Credentials Data (Work, Recognitions, Certifications & Seminars)
-- ------------------------------------------------------------------------------
INSERT INTO public.credentials (id, title, organization, type, date_range, description, certificate_url, credential_url, skills_acquired, is_featured, created_at)
VALUES
(
    '22222222-2222-2222-2222-222222222201',
    'IT Intern / Systems Developer (OJT)',
    'Asset Management Department (AMD, formerly PPMD) at SBMA',
    'WORK',
    'MAY 2026 – SEP 2026',
    'Engineered and deployed a modern, cloud-based Job Order Management System with an interactive analytics dashboard featuring reactive Power BI-style KPI cards to replace an outdated local server setup. Centralized department workflow tracking and operational visibility with real-time metrics.',
    NULL,
    NULL,
    ARRAY['Next.js', 'Supabase', 'PostgreSQL RLS', 'System Architecture', 'Analytics Dashboard'],
    true,
    '2026-05-01 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222210',
    'Competitor, RAITE 2026 Regional Programming Challenge',
    'PSITE Central Luzon',
    'COMPETITION',
    '2026',
    'Competed in the Regional Assembly on Information Technology Education (RAITE) programming challenge organized by PSITE Central Luzon.',
    NULL,
    NULL,
    ARRAY['Competitive Programming', 'Algorithms', 'Problem Solving'],
    true,
    '2026-03-01 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222211',
    'Attendee, Educational Tour',
    'Norde International Distributors',
    'TOUR',
    '2026',
    'Participated in an industry exposure visit exploring industrial-grade digital printing, hardware technology, and distribution logistics.',
    NULL,
    NULL,
    ARRAY['Hardware Technology', 'Industrial Equipment', 'Logistics'],
    false,
    '2026-04-01 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222212',
    'Attendee, Educational Tour',
    'Hytec Power, Inc.',
    'TOUR',
    '2026',
    'Industry visit investigating industrial automation, smart engineering equipment, and technical educational systems.',
    NULL,
    NULL,
    ARRAY['Industrial Automation', 'Engineering Systems', 'Mechatronics'],
    false,
    '2026-04-15 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222213',
    'Attendee, Lenovo Legion Campus Quest',
    'Lenovo Legion',
    'EVENT',
    '2026',
    'Participated in the Lenovo Legion campus technology showcase and high-performance hardware tour.',
    NULL,
    NULL,
    ARRAY['Hardware Technology', 'Esports Hardware', 'Personal Computing'],
    false,
    '2026-05-01 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222203',
    'Attendee, AWS Community Day Philippines',
    'AWS User Group Philippines (Taguig City, Metro Manila)',
    'EVENT',
    'AUG 2026',
    'Explored enterprise cloud architectures, serverless system designs, multi-region distributed databases, and scalable cloud deployment models powered by AWS.',
    NULL,
    'https://aws.amazon.com',
    ARRAY['AWS Cloud Architecture', 'Serverless Systems', 'DynamoDB', 'Distributed Systems'],
    true,
    '2026-08-10 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222202',
    'Attendee, Convergence III: From Policy to People: The Governance & Human Side of Cyber Risk',
    'DEVCON Pampanga',
    'SEMINAR',
    'JUL 2026',
    'Awarded Certificate of Recognition. Engaged in high-level sessions on cyber risk governance, agentic AI workflows, LLM safety mechanisms, and human-centric cybersecurity operations.',
    'https://txaceigetesftgckqdcm.supabase.co/storage/v1/object/public/certificates/convergence-iii-recognition.pdf',
    'https://devcon.ph',
    ARRAY['Cyber Risk Governance', 'Agentic AI Workflows', 'LLM Safety', 'Security Engineering'],
    true,
    '2026-07-15 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222214',
    'Certified Level 2, TOPCIT (Test of Practical Competency in ICT)',
    'IITP (Institute for Information & Communications Technology Promotion)',
    'CERTIFICATION',
    'DEC 2025',
    'Achieved Level 2 certification on the Test of Practical Competency in ICT jointly administered by IITP.',
    '/certificates/topcit-level-2-certification.pdf',
    'https://www.topcit.or.kr',
    ARRAY['Software Engineering', 'Data Management', 'System Architecture', 'Information Security'],
    true,
    '2025-12-10 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222204',
    'Attendee, SparkCon: The Next Wave of Innovation',
    'Campus DevCon x Zellense',
    'SEMINAR',
    '2025',
    'Participated in engineering panels discussing emerging developer tools, web ecosystems, and modern software development pipelines.',
    NULL,
    NULL,
    ARRAY['Developer Ecosystems', 'Web Technologies', 'Software Innovation'],
    false,
    '2025-06-01 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222205',
    'Attendee, Skydevs Hack, Play, & Learn Summit 2025 "Masterclass"',
    'Skydev Solutions, Inc.',
    'SEMINAR',
    '2025',
    'Hands-on technical masterclass focusing on full-stack application lifecycle, API engineering, and modern web application security practices.',
    NULL,
    NULL,
    ARRAY['Full-Stack Development', 'API Security', 'Application Lifecycle'],
    false,
    '2025-04-12 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222206',
    'Attendee, C# Scripting for Unity: Core Concepts and Best Practices',
    'Lyceum of Subic Bay',
    'SEMINAR',
    '2025',
    'Comprehensive training on object-oriented C# scripting, event-driven programming architectures, physics simulation hooks, and memory optimization.',
    NULL,
    NULL,
    ARRAY['C#', 'Unity Engine', 'OOP', 'Event Systems'],
    false,
    '2025-02-20 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222207',
    'Attendee, Exploring the Angular Frameworks for UI Development: Enhancing Your Web Applications',
    'Lyceum of Subic Bay',
    'SEMINAR',
    'OCT 2024',
    'In-depth study of component architecture, RxJS reactive programming, dependency injection patterns, and modular frontend architectures.',
    '/certificates/angular-frameworks-ui-development.png',
    NULL,
    ARRAY['Angular', 'TypeScript', 'RxJS', 'Dependency Injection'],
    false,
    '2024-10-19 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222208',
    'Attendee, Data Privacy & IT/CS Career Development and Introduction to Dart Programming Language Seminar',
    'Lyceum of Subic Bay',
    'SEMINAR',
    'DEC 2023',
    'Examined data privacy compliance regulations, information asset protection principles, and introductory Dart programming.',
    '/certificates/data-privacy-dart-seminar.png',
    NULL,
    ARRAY['Data Privacy', 'Dart', 'Compliance', 'Information Security'],
    false,
    '2023-12-05 00:00:00+00'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    organization = EXCLUDED.organization,
    type = EXCLUDED.type,
    date_range = EXCLUDED.date_range,
    description = EXCLUDED.description,
    certificate_url = EXCLUDED.certificate_url,
    credential_url = EXCLUDED.credential_url,
    skills_acquired = EXCLUDED.skills_acquired,
    is_featured = EXCLUDED.is_featured,
    created_at = EXCLUDED.created_at;

-- ------------------------------------------------------------------------------
-- 3. Skills Data (Verified CV 6 Categories)
-- ------------------------------------------------------------------------------
INSERT INTO public.skills (id, category, skill_list, sort_order, created_at)
VALUES
(
    '33333333-3333-3333-3333-333333333301',
    'UI/UX Design',
    ARRAY['Figma', 'Wireframing', 'High-Fidelity Prototyping'],
    1,
    '2026-09-01 00:00:00+00'
),
(
    '33333333-3333-3333-3333-333333333302',
    'Front-End',
    ARRAY['HTML', 'CSS', 'Javascript', 'Typescript'],
    2,
    '2026-09-01 00:00:00+00'
),
(
    '33333333-3333-3333-3333-333333333303',
    'Back-End & Database',
    ARRAY['Node.js', 'Java', 'PHP', 'MySQL', 'PostgreSQL'],
    3,
    '2026-09-01 00:00:00+00'
),
(
    '33333333-3333-3333-3333-333333333304',
    'Frameworks',
    ARRAY['Bootstrap', 'React.js', 'Tailwind CSS', 'Laravel'],
    4,
    '2026-09-01 00:00:00+00'
),
(
    '33333333-3333-3333-3333-333333333305',
    'Developer Tools',
    ARRAY['GitHub', 'VS Code', 'Vercel', 'Supabase', 'AWS DynamoDB'],
    5,
    '2026-09-01 00:00:00+00'
),
(
    '33333333-3333-3333-3333-333333333306',
    'Other Technical Skills',
    ARRAY['Technical Research', 'Documentation', 'Technical Writing'],
    6,
    '2026-09-01 00:00:00+00'
)
ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category,
    skill_list = EXCLUDED.skill_list,
    sort_order = EXCLUDED.sort_order,
    created_at = EXCLUDED.created_at;

-- ------------------------------------------------------------------------------
-- 4. Initial Page Views Counter
-- ------------------------------------------------------------------------------
INSERT INTO public.page_views (id, count, updated_at)
VALUES (1, 128, timezone('utc'::text, now()))
ON CONFLICT (id) DO UPDATE SET count = EXCLUDED.count;

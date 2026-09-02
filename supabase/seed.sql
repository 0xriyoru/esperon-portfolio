-- ==============================================================================
-- Supabase Database Seed: Rhodge Esperon (0xriyoru) Portfolio
-- Idempotent UPSERT seed script compliant with Postgres Best Practices
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Projects Data
-- ------------------------------------------------------------------------------
INSERT INTO public.projects (id, title, description, type, tags, status, link, domain, image_url, created_at)
VALUES
(
    '11111111-1111-1111-1111-111111111101',
    'MEKAI',
    'Full-stack reading and translation application utilizing Next.js, TypeScript, and OCR-powered processing to automate text extraction from untranslated comic media. Features multi-tier authentication with PostgreSQL RLS.',
    'OCR-Assisted Web Platform',
    ARRAY['NEXT.JS', 'TYPESCRIPT', 'POSTGRESQL RLS', 'TAILWIND CSS', 'VERCEL'],
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
    'Interactive web-based sampler and music launchpad utilizing the Web Audio API and React state management. Achieves consistent 60 FPS user interface with sub-2s initial load time and low-latency audio playback.',
    'Low-Latency Audio Launchpad',
    ARRAY['REACT.JS', 'WEB AUDIO API', 'AUDIO BUFFERING', 'TAILWIND CSS'],
    'DEPLOYED',
    'https://github.com/0xriyoru',
    'GITHUB.COM/0XRIYORU',
    '/projects/rebeat.png',
    '2025-12-01 00:00:00+00'
),
(
    '11111111-1111-1111-1111-111111111104',
    'SBMA-JO',
    'Engineered and deployed an internal property and job order management web system for Subic Bay Metropolitan Authority with Next.js and Supabase, streamlining departmental equipment requests and inventory cycle counting.',
    'Internal Government System',
    ARRAY['NEXT.JS', 'SUPABASE', 'ROLE-BASED ACCESS', 'POSTGRESQL'],
    'DEPLOYED',
    NULL,
    'RESTRICTED_ACCESS // SBMA INTRANET',
    '/projects/sbma.png',
    '2026-05-15 00:00:00+00'
),
(
    '11111111-1111-1111-1111-111111111105',
    'MAULAM',
    'Intelligent meal planning and ingredient recommendation engine leveraging Python and LLM prompting pipelines to generate localized culinary suggestions based on real-time pantry inventory.',
    'AI Meal Planning Engine',
    ARRAY['PYTHON', 'AGENTIC LLM', 'PROMPT PIPELINES', 'REST API'],
    'DEVELOPMENT',
    'https://github.com/0xriyoru/MaUlam',
    'GITHUB.COM/0XRIYORU/MAULAM',
    '/projects/maulam.png',
    '2026-06-01 00:00:00+00'
),
(
    '11111111-1111-1111-1111-111111111106',
    'GAKUMON',
    'Gamified virtual pet e-learning platform incorporating health decay algorithms, coin multiplier economies, and knowledge retention benchmarks with comprehensive administrative dashboards.',
    'Gamified E-Learning Platform',
    ARRAY['SYSTEM ARCHITECTURE', 'ANALYTICS DASHBOARD', 'TECHNICAL DOCUMENTATION'],
    'ARCHIVED',
    NULL,
    'SYSTEM_SPECIFICATION // ARCHIVED',
    NULL,
    '2024-11-01 00:00:00+00'
),
(
    '11111111-1111-1111-1111-111111111107',
    'JOBLINK',
    'Centralized skill-based employment matching platform with complete ERD architecture, data flow modeling, and an intuitive end-to-end Figma UI/UX prototype focused on non-technical user onboarding.',
    'Skill-Based Job Platform',
    ARRAY['FIGMA', 'UI/UX PROTOTYPING', 'ERD DESIGN', 'TECHNICAL MANUALS'],
    'ARCHIVED',
    NULL,
    'PROTOTYPE // ARCHIVED',
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
    'IT Intern – Procurement & Property Management',
    'Subic Bay Metropolitan Authority (SBMA)',
    'WORK',
    'MAY 2026 – SEP 2026',
    'Engineered and deployed the SBMA-JO property management system using Next.js & Supabase. Automated inventory cycle counting, property disposition workflows, and enforced strict Row Level Security access policies for confidential government records.',
    NULL,
    NULL,
    ARRAY['Next.js', 'Supabase', 'PostgreSQL RLS', 'System Architecture', 'Workflow Automation'],
    true,
    '2026-05-01 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222202',
    'Convergence III: From Policy to People: The Governance & Human Side of Cyber Risk',
    'DEVCON Pampanga (Certificate of Recognition)',
    'RECOGNITION',
    'JUL 2026',
    'Awarded Certificate of Recognition. Engaged in high-level sessions on cyber risk governance, agentic AI workflows, LLM safety mechanisms, and human-centric cybersecurity operations in modern enterprise environments.',
    'https://txaceigetesftgckqdcm.supabase.co/storage/v1/object/public/certificates/convergence-iii-recognition.pdf',
    'https://devcon.ph',
    ARRAY['Cyber Risk Governance', 'Agentic AI Workflows', 'LLM Safety', 'Security Engineering'],
    true,
    '2026-07-15 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222203',
    'AWS Community Day Philippines',
    'AWS User Group Philippines (Taguig City, Metro Manila)',
    'EVENT',
    'AUG 2026',
    'Explored enterprise cloud architectures, serverless system designs, multi-region distributed databases, and scalable cloud deployment models powered by Amazon Web Services.',
    NULL,
    'https://aws.amazon.com',
    ARRAY['AWS Cloud Architecture', 'Serverless Systems', 'DynamoDB', 'Distributed Systems'],
    true,
    '2026-08-10 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222204',
    'SparkCon: The Next Wave of Innovation',
    'Campus DevCon x Zellense',
    'SEMINAR',
    '2025',
    'Participated in forward-looking engineering panels on emerging developer tools, web ecosystems, and modern software development pipelines.',
    NULL,
    NULL,
    ARRAY['Developer Ecosystems', 'Web Technologies', 'Software Innovation'],
    false,
    '2025-06-01 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222205',
    'Skydevs Hack, Play, & Learn Summit 2025 "Masterclass"',
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
    'C# Scripting for Unity: Core Concepts & Best Practices',
    'Lyceum of Subic Bay',
    'CERTIFICATE',
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
    'Exploring Angular Frameworks for UI Development',
    'Lyceum of Subic Bay',
    'CERTIFICATE',
    '2024',
    'In-depth study of component architecture, RxJS reactive programming, dependency injection patterns, and modular frontend architectures.',
    NULL,
    NULL,
    ARRAY['Angular', 'TypeScript', 'RxJS', 'Dependency Injection'],
    false,
    '2024-05-18 00:00:00+00'
),
(
    '22222222-2222-2222-2222-222222222208',
    'Data Privacy & IT/CS Career Development',
    'Lyceum of Subic Bay',
    'SEMINAR',
    '2023',
    'Examined data privacy compliance regulations, information asset protection principles, and industry engineering standards.',
    NULL,
    NULL,
    ARRAY['Data Privacy', 'Compliance', 'Information Security'],
    false,
    '2023-09-10 00:00:00+00'
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
-- 3. Skills Data
-- ------------------------------------------------------------------------------
INSERT INTO public.skills (id, category, skill_list, sort_order, created_at)
VALUES
(
    '33333333-3333-3333-3333-333333333301',
    'AI & SPECIALIZED ENGINEERING',
    ARRAY['Agentic AI Workflows', 'LLM Prompting & Pipelines', 'OCR Translation Engines', 'Web Audio API', 'PostgreSQL RLS Policies'],
    1,
    '2026-09-01 00:00:00+00'
),
(
    '33333333-3333-3333-3333-333333333302',
    'FRONTEND & FRAMEWORKS',
    ARRAY['Next.js', 'React.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Progressive Web Apps (PWA)', 'HTML5 / CSS3', 'Bootstrap'],
    2,
    '2026-09-01 00:00:00+00'
),
(
    '33333333-3333-3333-3333-333333333303',
    'BACKEND & DATABASES',
    ARRAY['Node.js', 'PostgreSQL (RLS)', 'Supabase Realtime', 'Python', 'Java', 'PHP', 'MySQL', 'AWS DynamoDB', 'REST APIs', 'Laravel'],
    3,
    '2026-09-01 00:00:00+00'
),
(
    '33333333-3333-3333-3333-333333333304',
    'UI/UX & SYSTEMS DESIGN',
    ARRAY['Figma (Design Systems)', 'High-Fidelity Prototyping', 'Wireframing', 'ERD Schema Architecture', 'Technical Documentation'],
    4,
    '2026-09-01 00:00:00+00'
),
(
    '33333333-3333-3333-3333-333333333305',
    'DEVELOPER TOOLS & CLOUD',
    ARRAY['Git & GitHub', 'VS Code', 'Vercel Deployment', 'Postman', 'Docker', 'Supabase CLI'],
    5,
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

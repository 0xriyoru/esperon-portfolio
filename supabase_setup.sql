-- Drop existing tables to allow clean re-runs without errors
DROP TABLE IF EXISTS public.credentials CASCADE;
DROP TABLE IF EXISTS public.skills CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.page_views CASCADE;

-- Create page views table
CREATE TABLE public.page_views (
  id integer PRIMARY KEY,
  views integer DEFAULT 0 NOT NULL
);

-- Insert initial row
INSERT INTO public.page_views (id, views) 
VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;

-- Turn on Row Level Security
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON public.page_views
  FOR SELECT USING (true);

-- RPC function to increment page view atomically and return the new value
CREATE OR REPLACE FUNCTION increment_page_view()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_views integer;
BEGIN
  UPDATE public.page_views
  SET views = views + 1
  WHERE id = 1
  RETURNING views INTO new_views;
  
  RETURN new_views;
END;
$$;

-- Create projects table
CREATE TABLE public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL,
  tags text[] DEFAULT '{}'::text[],
  status text DEFAULT 'DEVELOPMENT',
  link text,
  domain text,
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.projects
  FOR SELECT USING (true);

-- Insert real projects from CV and specifications
INSERT INTO public.projects (title, description, type, tags, status, domain, link) VALUES 
('MEKAI', 'OCR-assisted manga and comic reading platform with scanlation feeds, custom PostgreSQL RLS security, and modern reader UI.', 'FULL-STACK / WEB APP', ARRAY['NEXT.JS', 'TYPESCRIPT', 'TAILWIND', 'POSTGRESQL', 'VERCEL'], 'DEPLOYED', 'MEKAISCANS.VERCEL.APP', 'https://mekaiscans.vercel.app'),
('ARTNEST', 'Art showcase & creative community Progressive Web App (PWA) for digital artists. Collaborated on frontend architecture and platform features.', 'COMMUNITY PWA', ARRAY['PWA', 'NEXT.JS', 'COLLABORATOR', 'REACT'], 'DEPLOYED', 'ARTNEST-HUB.VERCEL.APP', 'https://artnest-hub.vercel.app'),
('REBEAT', 'User-centered web-based launchpad and music performance interface replacing physical gear. Engineered with a low-latency 60 FPS audio engine.', 'FRONT-END & AUDIO', ARRAY['REACT.JS', 'WEB AUDIO API', 'UI/UX', 'STATE MANAGEMENT'], 'DEPLOYED', 'GITHUB / REBEAT', 'https://github.com/0xriyoru'),
('SBMA-JO', 'Internal job order and property management system engineered for Subic Bay Metropolitan Authority (SBMA). Restricted government access.', 'GOVERNMENT SYSTEM', ARRAY['INTERNAL', 'NEXT.JS', 'SUPABASE', 'CONFIDENTIAL'], 'DEPLOYED', 'RESTRICTED / INTERNAL_GOV', NULL),
('MAULAM', 'Smart meal planning and dish suggestion app based on available ingredients.', 'AI & MOBILE', ARRAY['AI', 'PYTHON', 'MOBILE', 'FOOD-TECH'], 'DEVELOPMENT', 'GITHUB.COM/0XRIYORU/MAULAM', 'https://github.com/0xriyoru/MaUlam'),
('GAKUMON', 'Pet-based gamified e-learning platform featuring virtual pet health decay, coin multipliers, and admin analytics dashboard.', 'E-LEARNING / GAMIFIED', ARRAY['UI/UX', 'GAMIFICATION', 'ADMIN DASHBOARD', 'TECHNICAL SPECS'], 'ARCHIVED', 'GITHUB / GAKUMON', 'https://github.com/0xriyoru'),
('JOBLINK', 'Skill-based centralized employment matching web platform connecting local job seekers and employers with custom onboarding flow.', 'FULL-STACK PLATFORM', ARRAY['FULL-STACK', 'FIGMA', 'ERD DESIGN', 'UI/UX'], 'ARCHIVED', 'GITHUB / JOBLINK', 'https://github.com/0xriyoru');

-- Create credentials table (Work, Hackathons & Seminars from CV)
CREATE TABLE public.credentials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  organization text NOT NULL,
  type text NOT NULL, -- 'WORK', 'SEMINAR', 'EVENT'
  date_range text NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.credentials
  FOR SELECT USING (true);

-- Insert credentials from CV & Experience
INSERT INTO public.credentials (title, organization, type, date_range, description) VALUES
('IT Intern (Procurement and Property Management)', 'Subic Bay Metropolitan Authority (SBMA)', 'WORK', 'May 2026 - Sep 2026', 'Inventory management, process automation, and cycle counting systems.'),
('Participant', 'AWS Community Day Philippines - Metro Manila', 'EVENT', 'Aug 2026', 'Attended cloud architecture, serverless, and deployment sessions.'),
('Participant', 'Voices of AI - Angeles City', 'EVENT', 'Aug 2026', 'Explored agentic AI workflows and LLM deployments.'),
('Participant', 'eGovHackathon 2026 - SMX Convention Center', 'EVENT', 'Jul 2026', 'Developed a civic-tech AI solution.'),
('SparkCon: The Next Wave of Innovation', 'Campus DevCon x Zellense', 'SEMINAR', '2025', 'Explored emerging software development trends and tech innovation.'),
('Skydevs Hack, Play, & Learn Summit 2025 Masterclass', 'Skydev Solutions, Inc.', 'EVENT', '2025', 'Masterclass on modern software engineering and industry standards.'),
('C# Scripting for Unity: Core Concepts & Best Practices', 'Lyceum of Subic Bay', 'SEMINAR', '2025', 'Object-oriented programming and interactive game engine logic.'),
('Exploring Angular Frameworks for UI Development', 'Lyceum of Subic Bay', 'SEMINAR', '2024', 'Component architecture and enterprise web UI development.'),
('Data Privacy & IT/CS Career Development', 'Lyceum of Subic Bay', 'SEMINAR', '2023', 'Data security policies, compliance, and career planning in IT.');

-- Create skills table
CREATE TABLE public.skills (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category text NOT NULL,
  skill_list text[] NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.skills
  FOR SELECT USING (true);

-- Insert skills data from CV
INSERT INTO public.skills (category, skill_list) VALUES
('FRONT-END & FRAMEWORKS', ARRAY['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap']),
('BACK-END & DATABASES', ARRAY['Node.js', 'Java', 'PHP', 'Laravel', 'PostgreSQL', 'MySQL', 'Supabase', 'AWS DynamoDB']),
('UI/UX DESIGN & PROTOTYPING', ARRAY['Figma', 'Wireframing', 'High-Fidelity Prototyping', 'Design Systems', 'User Flows']),
('DEVELOPER TOOLS & CLOUD', ARRAY['GitHub', 'VS Code', 'Vercel', 'Postman', 'Docker', 'REST APIs']),
('SPECIALIZATIONS & METHODS', ARRAY['Agentic AI', 'OCR Translation', 'Technical Documentation', 'Web Audio API', 'Security & RLS']);

-- Enable Realtime publication for tables so updates push live to visitors
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects, public.skills, public.credentials, public.page_views;

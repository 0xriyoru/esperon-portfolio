-- Create page views table
CREATE TABLE public.page_views (
  id integer PRIMARY KEY,
  views integer DEFAULT 0 NOT NULL
);

-- Insert initial row
INSERT INTO public.page_views (id, views) VALUES (1, 0);

-- Turn on Row Level Security
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON public.page_views
  FOR SELECT USING (true);

-- RPC function to increment page view atomically and return the new value
CREATE OR REPLACE FUNCTION increment_page_view()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER -- Allows the function to bypass RLS for the update
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

-- Turn on Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON public.projects
  FOR SELECT USING (true);

-- Insert real projects
INSERT INTO public.projects (title, description, type, tags, status, domain, link) VALUES 
('MEKAI', 'Manga and comic reading web platform with scanlation feeds and modern reader UI.', 'FULL-STACK / WEB APP', ARRAY['NEXT.JS', 'TYPESCRIPT', 'TAILWIND', 'VERCEL'], 'DEPLOYED', 'MEKAISCANS.VERCEL.APP', 'https://mekaiscans.vercel.app'),
('SBMA-JO', 'Internal job order and property management system built for SBMA.', 'INTERNAL SYSTEM', ARRAY['REACT', 'NEXT.JS', 'SUPABASE', 'MANAGEMENT'], 'DEPLOYED', 'SBMA-JO.VERCEL.APP', 'https://sbma-jo.vercel.app'),
('MAULAM', 'Smart meal planning and dish suggestion app based on available ingredients.', 'AI & MOBILE', ARRAY['AI', 'PYTHON', 'MOBILE', 'FOOD-TECH'], 'DEVELOPMENT', 'GITHUB.COM/0XRIYORU/MAULAM', 'https://github.com/0xriyoru/MaUlam'),
('ARTNEST', 'Art showcase and creative community platform for digital artists and illustrators.', 'COMMUNITY PLATFORM', ARRAY['REACT', 'NEXT.JS', 'PORTFOLIO', 'VERCEL'], 'DEPLOYED', 'ART-NEST-UMBER.VERCEL.APP', 'https://art-nest-umber.vercel.app');

-- Create credentials table (Experience + Events)
CREATE TABLE public.credentials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  organization text NOT NULL,
  type text NOT NULL, -- 'WORK', 'EVENT'
  date_range text NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security
ALTER TABLE public.credentials ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON public.credentials
  FOR SELECT USING (true);

-- Insert real credentials (Experience & Hackathons)
INSERT INTO public.credentials (title, organization, type, date_range, description) VALUES
('IT Intern (Procurement and Property Management)', 'Subic Bay Metropolitan Authority (SBMA)', 'WORK', 'May 2026 - Sep 2026', 'Inventory management and cycle counting.'),
('Participant', 'AWS Community Day Philippines - Metro Manila', 'EVENT', 'Aug 2026', 'Attended cloud architecture and deployment sessions.'),
('Participant', 'Voices of AI - Angeles City', 'EVENT', 'Aug 2026', 'Explored agentic AI and LLM integrations.'),
('Participant', 'eGovHackathon 2026 - SMX Convention Center', 'EVENT', 'Jul 2026', 'Developed a civic-tech AI solution.');

-- Create skills table
CREATE TABLE public.skills (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category text NOT NULL,
  skill_list text[] NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON public.skills
  FOR SELECT USING (true);

-- Insert skills data
INSERT INTO public.skills (category, skill_list) VALUES
('DEVELOPER TOOLS', ARRAY['GitHub', 'Docker', 'VS Code', 'Postman']),
('AI & AUTOMATION', ARRAY['OpenAI API', 'LangChain', 'n8n', 'Codex']),
('FRAMEWORKS & LIBRARIES', ARRAY['Next.js', 'React', 'Framer Motion', 'Tailwind CSS']),
('BACK-END & CLOUD', ARRAY['Node.js', 'Python', 'Supabase', 'Vercel']),
('CYBERSECURITY', ARRAY['Wireshark', 'Nmap', 'Metasploit', 'Kali Linux']);

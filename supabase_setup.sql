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

-- Insert dummy data matching product.md
INSERT INTO public.projects (title, description, type, tags, status, domain, link) VALUES 
('VINCULUM', 'Capstone Research Project.', 'RESEARCH', ARRAY['NEXT.JS', 'SUPABASE', 'TYPESCRIPT'], 'DEPLOYED', 'VINCULUM.APP', 'https://example.com'),
('NETWORK TRAFFIC ANALYZER', 'Real-time packet inspection and anomaly detection.', 'CYBERSECURITY', ARRAY['PYTHON', 'AI', 'DASHBOARD'], 'TESTING', 'LOCAL_NETWORK', NULL),
('AUTOMATED PEN-TESTING AGENT', 'LLM-driven agent for automated vulnerability scanning.', 'AI + CYBER', ARRAY['LLM', 'AGENT', 'SECURITY'], 'DEVELOPMENT', 'SANDBOX', NULL);

-- Create credentials table (Experience + Certifications)
CREATE TABLE public.credentials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  organization text NOT NULL,
  type text NOT NULL, -- 'WORK', 'CERTIFICATION', 'EVENT'
  date_range text NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security
ALTER TABLE public.credentials ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON public.credentials
  FOR SELECT USING (true);

-- Insert dummy data matching product.md
INSERT INTO public.credentials (title, organization, type, date_range, description) VALUES
('IT Intern (Procurement and Property Management)', 'Subic Bay Metropolitan Authority (SBMA)', 'WORK', 'May 2026 - Sep 2026', 'Inventory management and cycle counting.'),
('Participant', 'AWS Community Day Philippines - Metro Manila', 'EVENT', 'Aug 2026', 'Attended cloud architecture and deployment sessions.'),
('Participant', 'Voices of AI - Angeles City', 'EVENT', 'Aug 2026', 'Explored agentic AI and LLM integrations.'),
('Participant', 'eGovHackathon 2026 - SMX Convention Center', 'EVENT', 'Jul 2026', 'Developed a civic-tech AI solution.'),
('ISC2 Candidate', 'ISC2', 'CERTIFICATION', 'Current', 'Pursuing official cybersecurity certification.'),
('Google Cyber Cert', 'Google', 'CERTIFICATION', 'Completed', 'Foundational cybersecurity principles and tools.');

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

-- Insert dummy data matching the screenshot style and product.md vibe
INSERT INTO public.skills (category, skill_list) VALUES
('DEVELOPER TOOLS', ARRAY['GitHub', 'Docker', 'VS Code', 'Postman']),
('AI & AUTOMATION', ARRAY['OpenAI API', 'LangChain', 'n8n', 'Codex']),
('FRAMEWORKS & LIBRARIES', ARRAY['Next.js', 'React', 'Framer Motion', 'Tailwind CSS']),
('BACK-END & CLOUD', ARRAY['Node.js', 'Python', 'Supabase', 'Vercel']),
('CYBERSECURITY', ARRAY['Wireshark', 'Nmap', 'Metasploit', 'Kali Linux']);

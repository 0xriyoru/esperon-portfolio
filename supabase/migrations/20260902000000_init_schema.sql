-- ==============================================================================
-- Initial Schema Migration: Web Portfolio & Credentials System
-- Compliant with Supabase Postgres Best Practices, PostgREST & Storage
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Table: projects
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'DEVELOPMENT',
    link TEXT,
    domain TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Ensure all columns exist if table was created previously
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS link TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS domain TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS image_url TEXT;

-- ------------------------------------------------------------------------------
-- 2. Table: credentials (Work, Recognitions, Certifications & Seminars)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    type TEXT NOT NULL,
    date_range TEXT NOT NULL,
    description TEXT,
    certificate_url TEXT,
    credential_url TEXT,
    skills_acquired TEXT[] NOT NULL DEFAULT '{}',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Ensure all columns exist if table was created previously
ALTER TABLE public.credentials ADD COLUMN IF NOT EXISTS certificate_url TEXT;
ALTER TABLE public.credentials ADD COLUMN IF NOT EXISTS credential_url TEXT;
ALTER TABLE public.credentials ADD COLUMN IF NOT EXISTS skills_acquired TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE public.credentials ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT false;

-- Ensure check constraint on credentials type
DO $$
BEGIN
    ALTER TABLE public.credentials DROP CONSTRAINT IF EXISTS credentials_type_check;
    ALTER TABLE public.credentials 
    ADD CONSTRAINT credentials_type_check 
    CHECK (type IN ('WORK', 'EVENT', 'SEMINAR', 'CERTIFICATE', 'RECOGNITION'));
END $$;

-- ------------------------------------------------------------------------------
-- 3. Table: skills
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,
    skill_list TEXT[] NOT NULL DEFAULT '{}',
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 4. Table: page_views (Single-row atomic counter)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.page_views (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    count BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 5. RPC Function: increment_page_view (Atomic & Secure)
-- ------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS public.increment_page_view();

CREATE OR REPLACE FUNCTION public.increment_page_view()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    new_count BIGINT;
BEGIN
    INSERT INTO public.page_views (id, count, updated_at)
    VALUES (1, 1, timezone('utc'::text, now()))
    ON CONFLICT (id)
    DO UPDATE SET 
        count = public.page_views.count + 1,
        updated_at = timezone('utc'::text, now())
    RETURNING count INTO new_count;

    RETURN new_count;
END;
$$;

-- ------------------------------------------------------------------------------
-- 6. Row Level Security (RLS) & Grants
-- ------------------------------------------------------------------------------
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Idempotent RLS policy creation
DROP POLICY IF EXISTS "Allow public read access on projects" ON public.projects;
CREATE POLICY "Allow public read access on projects" 
    ON public.projects FOR SELECT 
    TO anon, authenticated 
    USING (true);

DROP POLICY IF EXISTS "Allow public read access on credentials" ON public.credentials;
CREATE POLICY "Allow public read access on credentials" 
    ON public.credentials FOR SELECT 
    TO anon, authenticated 
    USING (true);

DROP POLICY IF EXISTS "Allow public read access on skills" ON public.skills;
CREATE POLICY "Allow public read access on skills" 
    ON public.skills FOR SELECT 
    TO anon, authenticated 
    USING (true);

DROP POLICY IF EXISTS "Allow public read access on page_views" ON public.page_views;
CREATE POLICY "Allow public read access on page_views" 
    ON public.page_views FOR SELECT 
    TO anon, authenticated 
    USING (true);

-- Ensure Data API roles have usage and select access
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT SELECT ON public.credentials TO anon, authenticated;
GRANT SELECT ON public.skills TO anon, authenticated;
GRANT SELECT ON public.page_views TO anon, authenticated;

-- Grant RPC execution permissions
GRANT EXECUTE ON FUNCTION public.increment_page_view() TO anon, authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 7. Realtime Publication (Safe Idempotent Registration)
-- ------------------------------------------------------------------------------
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime'
    ) THEN
        BEGIN
            ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
        EXCEPTION WHEN duplicate_object THEN NULL;
        END;

        BEGIN
            ALTER PUBLICATION supabase_realtime ADD TABLE public.credentials;
        EXCEPTION WHEN duplicate_object THEN NULL;
        END;

        BEGIN
            ALTER PUBLICATION supabase_realtime ADD TABLE public.skills;
        EXCEPTION WHEN duplicate_object THEN NULL;
        END;
    END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 8. Storage Bucket: certificates (Public bucket for PDF & image proofs)
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) 
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public read access to files in the certificates bucket
DROP POLICY IF EXISTS "Allow public read access on certificates bucket" ON storage.objects;
CREATE POLICY "Allow public read access on certificates bucket"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'certificates');

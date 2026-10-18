-- SQL Script to create the 'projects' table in Supabase
-- Run this in your Supabase Project Dashboard -> SQL Editor -> New Query -> Run

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  role TEXT DEFAULT '',
  type TEXT DEFAULT 'Personal Project',
  tagline TEXT DEFAULT '',
  problem TEXT DEFAULT '',
  approach JSONB DEFAULT '[]'::jsonb,
  architecture TEXT DEFAULT '',
  technologies JSONB DEFAULT '[]'::jsonb,
  results JSONB DEFAULT '[]'::jsonb,
  learnings TEXT DEFAULT '',
  links JSONB DEFAULT '{"live": "#", "code": "#"}'::jsonb,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast queries
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects(order_index ASC, created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 1. Allow public read access to all projects
DROP POLICY IF EXISTS "Allow public read access to projects" ON public.projects;
CREATE POLICY "Allow public read access to projects"
  ON public.projects FOR SELECT
  USING (true);

-- 2. Allow authenticated users (logged-in admin) full insert/update/delete access
DROP POLICY IF EXISTS "Allow authenticated full access to projects" ON public.projects;
CREATE POLICY "Allow authenticated full access to projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 3. Allow service_role full access (for Next.js API routes with service key)
DROP POLICY IF EXISTS "Allow service role full access to projects" ON public.projects;
CREATE POLICY "Allow service role full access to projects"
  ON public.projects FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

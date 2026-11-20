'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { JournalEntry } from '../utils/journals';
import { triggerDeploy } from '../utils/deploy';
import { getProjects, deleteProject, seedDefaultProjects } from '../utils/projects';
import { ProjectDetail, PROJECT_CATEGORIES } from '../data/projectsData';
import { 
  FolderGit2, 
  BookOpen, 
  Tags, 
  Plus, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Star, 
  Search, 
  Database, 
  Copy, 
  Check, 
  AlertCircle, 
  LogOut,
  Briefcase,
  ChevronUp,
  ChevronDown,
  X
} from 'lucide-react';
import { getExperiences, saveExperience, deleteExperience, ExperienceItem, ExperiencePoint } from '../utils/experiences';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const AdminDashboard: React.FC = () => {
  const router = useRouter();

  // Active Tab: 'projects' | 'experiences' | 'journals' | 'categories'
  const [activeTab, setActiveTab] = useState<'projects' | 'experiences' | 'journals' | 'categories'>('projects');

  // Journals State
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Projects State
  const [projects, setProjects] = useState<ProjectDetail[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectSearch, setProjectSearch] = useState('');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState('All');
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');
  const [sqlCopied, setSqlCopied] = useState(false);
  const [hasSupabaseProjectsTable, setHasSupabaseProjectsTable] = useState<boolean | null>(null);

  // Experiences State
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [experiencesLoading, setExperiencesLoading] = useState(false);
  const [experienceSearch, setExperienceSearch] = useState('');
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expCompany, setExpCompany] = useState('');
  const [expRole, setExpRole] = useState('');
  const [expPeriod, setExpPeriod] = useState('');
  const [expOrderIndex, setExpOrderIndex] = useState(0);
  const [expPoints, setExpPoints] = useState<ExperiencePoint[]>([]);
  const [isSavingExp, setIsSavingExp] = useState(false);
  const [expSqlCopied, setExpSqlCopied] = useState(false);

  // Featured post state (Journals)
  const [selectedFeaturedId, setSelectedFeaturedId] = useState<string>('');
  const [isUpdatingFeatured, setIsUpdatingFeatured] = useState<boolean>(false);

  // New category form state
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  useEffect(() => {
    // Check URL search params for tab
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam === 'journals' || tabParam === 'categories' || tabParam === 'projects' || tabParam === 'experiences') {
        setActiveTab(tabParam as any);
      }
    }

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin');
      } else {
        await Promise.all([
          fetchProjects(),
          fetchExperiences(),
          fetchJournals(),
          fetchCategories(),
        ]);
        setLoading(false);
      }
    };
    checkSession();
  }, [router]);

  const fetchProjects = async () => {
    setProjectsLoading(true);
    try {
      // Check if table exists in Supabase
      const { error: testError } = await supabase.from('projects').select('id').limit(1);
      if (testError && testError.code === 'PGRST205') {
        setHasSupabaseProjectsTable(false);
      } else {
        setHasSupabaseProjectsTable(true);
      }

      const list = await getProjects();
      setProjects(list);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setProjectsLoading(false);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (!error && data) {
      setCategories(data as Category[]);
    }
  };

  const fetchExperiences = async () => {
    setExperiencesLoading(true);
    try {
      const list = await getExperiences();
      setExperiences(list);
    } catch (err) {
      console.error('Error fetching experiences:', err);
    } finally {
      setExperiencesLoading(false);
    }
  };

  const handleOpenNewExperience = () => {
    setEditingExpId(null);
    setExpCompany('');
    setExpRole('');
    setExpPeriod('');
    setExpOrderIndex(experiences.length);
    setExpPoints([
      { bold: 'Key Responsibility:', text: '' }
    ]);
    setIsExpModalOpen(true);
  };

  const handleOpenEditExperience = (item: ExperienceItem) => {
    setEditingExpId(item.id);
    setExpCompany(item.company);
    setExpRole(item.role);
    setExpPeriod(item.period);
    setExpOrderIndex(item.order_index ?? 0);
    setExpPoints(item.points && item.points.length > 0 ? item.points : [{ bold: '', text: '' }]);
    setIsExpModalOpen(true);
  };

  const handleAddExpPoint = () => {
    setExpPoints(prev => [...prev, { bold: '', text: '' }]);
  };

  const handleRemoveExpPoint = (index: number) => {
    setExpPoints(prev => prev.filter((_, i) => i !== index));
  };

  const handleExpPointChange = (index: number, field: 'bold' | 'text', value: string) => {
    setExpPoints(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expCompany.trim() || !expRole.trim()) {
      alert('Company and Role are required.');
      return;
    }

    setIsSavingExp(true);
    try {
      const filteredPoints = expPoints.filter(p => p.bold.trim() || p.text.trim());
      const payload: ExperienceItem = {
        id: editingExpId || `exp-${Date.now()}`,
        company: expCompany.trim(),
        role: expRole.trim(),
        period: expPeriod.trim(),
        order_index: expOrderIndex,
        points: filteredPoints
      };

      await saveExperience(payload);
      await fetchExperiences();
      setIsExpModalOpen(false);
      alert('Experience successfully saved! It is now directly reflected on the Experience section.');
    } catch (err: any) {
      alert('Error saving experience: ' + (err.message || 'Unknown error'));
    } finally {
      setIsSavingExp(false);
    }
  };

  const handleDeleteExperience = async (id: string, role: string, company: string) => {
    if (window.confirm(`Are you sure you want to delete experience "${role} at ${company}"?`)) {
      setExperiences(prev => prev.filter(e => e.id !== id));
      await deleteExperience(id);
      await fetchExperiences();
    }
  };

  const handleMoveExperience = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;

    const copy = [...experiences];
    const itemA = { ...copy[index], order_index: targetIndex };
    const itemB = { ...copy[targetIndex], order_index: index };
    copy[index] = itemB;
    copy[targetIndex] = itemA;
    setExperiences(copy);

    await Promise.all([
      saveExperience(itemA),
      saveExperience(itemB)
    ]);
    await fetchExperiences();
  };

  const handleCopyExpSql = () => {
    const sql = `CREATE TABLE IF NOT EXISTS public.experiences (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  points JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow service role full access to experiences" ON public.experiences FOR ALL TO service_role USING (true) WITH CHECK (true);`;

    navigator.clipboard.writeText(sql);
    setExpSqlCopied(true);
    setTimeout(() => setExpSqlCopied(false), 2500);
  };

  const fetchJournals = async () => {
    const { data, error } = await supabase.from('journals').select('*').order('date', { ascending: false });
    if (!error && data) {
      const list = data as JournalEntry[];
      setJournals(list);

      // Find current featured post
      const currentFeatured = list.find(j => j.tag?.toUpperCase() === 'FEATURED');
      if (currentFeatured) {
        setSelectedFeaturedId(currentFeatured.id);
      } else if (typeof window !== 'undefined') {
        const storedSlug = localStorage.getItem('featured_journal_slug');
        const match = list.find(j => j.slug === storedSlug);
        if (match) setSelectedFeaturedId(match.id);
      }
    }
  };

  // Delete project handler
  const handleDeleteProject = async (id: string, slug: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete project "${title}"? This cannot be undone.`)) {
      // Optimistic instant UI update
      setProjects(prev => prev.filter(p => (id ? p.id !== id : true) && p.slug !== slug));

      try {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'delete', id, slug }),
        });
        await deleteProject(id || slug, slug);
        await fetchProjects();
      } catch (err: any) {
        alert('Error deleting project: ' + err.message);
        await fetchProjects();
      }
    }
  };

  // Seed default projects to Supabase
  const handleSeedProjects = async () => {
    if (window.confirm('This will load all default static projects into Supabase database. Existing projects with the same slug will be updated. Continue?')) {
      setIsSeeding(true);
      setSeedMessage('');
      try {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'seed' }),
        });
        const data = await res.json();
        if (res.ok) {
          setSeedMessage(`Successfully synced ${data.count} projects into Supabase!`);
          setHasSupabaseProjectsTable(true);
          await fetchProjects();
        } else {
          // Try client-side seed
          const clientRes = await seedDefaultProjects();
          if (clientRes.error) {
            setSeedMessage(`Note: ${clientRes.error}. (Please run the SQL migration in Supabase SQL editor first).`);
          } else {
            setSeedMessage(`Synced ${clientRes.count} projects!`);
            await fetchProjects();
          }
        }
      } catch (err: any) {
        setSeedMessage('Seeding failed: ' + err.message);
      } finally {
        setIsSeeding(false);
      }
    }
  };

  const handleCopySql = () => {
    const sql = `-- Run this in Supabase SQL Editor:
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
  image TEXT DEFAULT '',
  attachments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow service role full access to projects" ON public.projects FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Ensure attachments & image columns exist on existing tables:
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS image TEXT DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS attachments JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.journals ADD COLUMN IF NOT EXISTS attachments JSONB DEFAULT '[]'::jsonb;

-- Storage Buckets & Policies for Document/Media Uploads:
INSERT INTO storage.buckets (id, name, public) VALUES ('journal-images', 'journal-images', true) ON CONFLICT (id) DO UPDATE SET public = true;
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-attachments', 'portfolio-attachments', true) ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY IF NOT EXISTS "Allow public uploads to storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('journal-images', 'portfolio-attachments'));
CREATE POLICY IF NOT EXISTS "Allow public reads from storage" ON storage.objects FOR SELECT USING (bucket_id IN ('journal-images', 'portfolio-attachments'));
CREATE POLICY IF NOT EXISTS "Allow public updates to storage" ON storage.objects FOR UPDATE USING (bucket_id IN ('journal-images', 'portfolio-attachments'));`;

    navigator.clipboard.writeText(sql);
    setSqlCopied(true);
    setTimeout(() => setSqlCopied(false), 2500);
  };

  const handleSetFeatured = async (targetId: string) => {
    if (!targetId) return;
    setIsUpdatingFeatured(true);
    try {
      await supabase
        .from('journals')
        .update({ tag: 'Journal' })
        .eq('tag', 'FEATURED');

      const { error } = await supabase
        .from('journals')
        .update({ tag: 'FEATURED' })
        .eq('id', targetId);

      if (error) {
        alert("Error setting featured post: " + error.message);
      } else {
        const targetEntry = journals.find(j => j.id === targetId);
        if (targetEntry?.slug && typeof window !== 'undefined') {
          localStorage.setItem('featured_journal_slug', targetEntry.slug);
          localStorage.setItem('featured_journal_id', targetEntry.id);
        }
        setSelectedFeaturedId(targetId);
        triggerDeploy();
        await fetchJournals();
        alert(`Homepage Featured Post updated to: "${targetEntry?.title || 'Selected Post'}"`);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsUpdatingFeatured(false);
    }
  };

  const handleDeleteJournal = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this journal entry?")) {
      await supabase.from('journals').delete().eq('id', id);
      triggerDeploy();
      fetchJournals();
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName || !newCatSlug) return;
    const { error } = await supabase.from('categories').insert([
      { name: newCatName.toUpperCase(), slug: newCatSlug.toLowerCase(), description: newCatDesc }
    ]);
    if (!error) {
      setNewCatName('');
      setNewCatSlug('');
      setNewCatDesc('');
      fetchCategories();
    } else {
      alert("Error adding category: " + error.message);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm("Delete this category?")) {
      await supabase.from('categories').delete().eq('id', id);
      fetchCategories();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '1050px', margin: '80px auto', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Loading Admin Panel...</p>
      </div>
    );
  }

  // Filter projects based on search query and category
  const filteredProjects = projects.filter(p => {
    const matchesCategory = projectCategoryFilter === 'All' || p.category === projectCategoryFilter;
    const q = projectSearch.toLowerCase();
    const matchesSearch = 
      !projectSearch ||
      p.title.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.technologies.some(t => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const currentFeaturedItem = journals.find(j => j.id === selectedFeaturedId || j.tag?.toUpperCase() === 'FEATURED');

  return (
    <div style={{ maxWidth: '1140px', margin: '30px auto 80px', padding: '0 24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Top Navbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e9ecef', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#111827', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Portfolio Administration
          </h1>
          <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '14px' }}>
            Manage engineering projects, case studies, journal articles, and content categories.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {activeTab === 'projects' ? (
            <Link
              href="/admin/projects/edit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 18px',
                background: '#2563eb',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '14px',
                boxShadow: '0 1px 3px rgba(37,99,235,0.3)',
              }}
            >
              <Plus size={16} /> New Project
            </Link>
          ) : activeTab === 'experiences' ? (
            <button
              onClick={handleOpenNewExperience}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 18px',
                background: '#0284c7',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '14px',
                boxShadow: '0 1px 3px rgba(2,132,199,0.3)',
                cursor: 'pointer'
              }}
            >
              <Plus size={16} /> New Experience
            </button>
          ) : (
            <Link
              href="/admin/edit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 18px',
                background: '#16a34a',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '14px',
                boxShadow: '0 1px 3px rgba(22,163,74,0.3)',
              }}
            >
              <Plus size={16} /> New Journal Entry
            </Link>
          )}

          <button
            onClick={handleLogout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              background: '#f3f4f6',
              color: '#4b5563',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', borderBottom: '2px solid #e5e7eb', paddingBottom: '0' }}>
        <button
          onClick={() => setActiveTab('projects')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            border: 'none',
            borderBottom: activeTab === 'projects' ? '3px solid #2563eb' : '3px solid transparent',
            background: 'none',
            color: activeTab === 'projects' ? '#2563eb' : '#6b7280',
            fontWeight: activeTab === 'projects' ? 700 : 500,
            fontSize: '15px',
            cursor: 'pointer',
            marginBottom: '-2px',
          }}
        >
          <FolderGit2 size={18} />
          <span>Projects Hub</span>
          <span style={{
            background: activeTab === 'projects' ? '#dbeafe' : '#f3f4f6',
            color: activeTab === 'projects' ? '#1d4ed8' : '#6b7280',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 700,
          }}>
            {projects.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('experiences')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            border: 'none',
            borderBottom: activeTab === 'experiences' ? '3px solid #0284c7' : '3px solid transparent',
            background: 'none',
            color: activeTab === 'experiences' ? '#0284c7' : '#6b7280',
            fontWeight: activeTab === 'experiences' ? 700 : 500,
            fontSize: '15px',
            cursor: 'pointer',
            marginBottom: '-2px',
          }}
        >
          <Briefcase size={18} />
          <span>Experiences</span>
          <span style={{
            background: activeTab === 'experiences' ? '#e0f2fe' : '#f3f4f6',
            color: activeTab === 'experiences' ? '#0369a1' : '#6b7280',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 700,
          }}>
            {experiences.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('journals')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            border: 'none',
            borderBottom: activeTab === 'journals' ? '3px solid #16a34a' : '3px solid transparent',
            background: 'none',
            color: activeTab === 'journals' ? '#16a34a' : '#6b7280',
            fontWeight: activeTab === 'journals' ? 700 : 500,
            fontSize: '15px',
            cursor: 'pointer',
            marginBottom: '-2px',
          }}
        >
          <BookOpen size={18} />
          <span>Journals & Articles</span>
          <span style={{
            background: activeTab === 'journals' ? '#dcfce7' : '#f3f4f6',
            color: activeTab === 'journals' ? '#15803d' : '#6b7280',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 700,
          }}>
            {journals.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            border: 'none',
            borderBottom: activeTab === 'categories' ? '3px solid #7c3aed' : '3px solid transparent',
            background: 'none',
            color: activeTab === 'categories' ? '#7c3aed' : '#6b7280',
            fontWeight: activeTab === 'categories' ? 700 : 500,
            fontSize: '15px',
            cursor: 'pointer',
            marginBottom: '-2px',
          }}
        >
          <Tags size={18} />
          <span>Categories</span>
          <span style={{
            background: activeTab === 'categories' ? '#ede9fe' : '#f3f4f6',
            color: activeTab === 'categories' ? '#6d28d9' : '#6b7280',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 700,
          }}>
            {categories.length}
          </span>
        </button>
      </div>

      {/* TAB 1: PROJECTS MANAGEMENT */}
      {activeTab === 'projects' && (
        <div>
          {/* Missing Supabase Table Warning Helper (if table not created yet) */}
          {hasSupabaseProjectsTable === false && (
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '16px 20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <AlertCircle size={22} color="#b45309" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ margin: 0, color: '#92400e', fontSize: '15px', fontWeight: 700 }}>
                      Supabase 'projects' table not yet initialized
                    </h4>
                    <p style={{ margin: '4px 0 0 0', color: '#78350f', fontSize: '13px', lineHeight: 1.5, maxWidth: '720px' }}>
                      Projects are currently operating seamlessly using the local portfolio system. To enable cloud persistence in Supabase, run the one-click SQL migration in your Supabase dashboard SQL editor.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button
                    onClick={handleCopySql}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 14px',
                      borderRadius: '6px',
                      background: '#fff',
                      border: '1px solid #d97706',
                      color: '#b45309',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    {sqlCopied ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                    {sqlCopied ? 'Copied SQL!' : 'Copy SQL Script'}
                  </button>
                  <a
                    href="https://supabase.com/dashboard/project/ckybnpmxewthuxibqabo/sql"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 14px',
                      borderRadius: '6px',
                      background: '#d97706',
                      color: '#fff',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '13px',
                    }}
                  >
                    Open Supabase SQL Editor <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Seeding Feedback Message */}
          {seedMessage && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: 600 }}>
              {seedMessage}
            </div>
          )}

          {/* Action Bar: Search, Category Filter, New Project & Seed Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', flex: 1 }}>
              {/* Search input */}
              <div style={{ position: 'relative', minWidth: '240px', flex: 1, maxWidth: '360px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input
                  type="text"
                  placeholder="Search projects by title, tech, tagline..."
                  value={projectSearch}
                  onChange={e => setProjectSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px',
                  }}
                />
              </div>

              {/* Category Filter */}
              <select
                value={projectCategoryFilter}
                onChange={e => setProjectCategoryFilter(e.target.value)}
                style={{
                  padding: '9px 14px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  background: '#fff',
                  fontSize: '14px',
                  color: '#374151',
                  fontWeight: 500,
                }}
              >
                {PROJECT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleSeedProjects}
                disabled={isSeeding}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 15px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  background: '#ffffff',
                  color: '#374151',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: isSeeding ? 'not-allowed' : 'pointer',
                }}
                title="Populate or sync Supabase with default initial portfolio projects"
              >
                <Database size={15} color="#4b5563" />
                {isSeeding ? 'Syncing...' : 'Sync to Supabase'}
              </button>

              <Link
                href="/admin/projects/edit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  background: '#2563eb',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  boxShadow: '0 1px 3px rgba(37,99,235,0.3)',
                }}
              >
                <Plus size={16} /> Add New Project
              </Link>
            </div>
          </div>

          {/* Projects Table */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            {projectsLoading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                Loading projects...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                <FolderGit2 size={40} color="#9ca3af" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ margin: 0, color: '#374151', fontSize: '1.1rem' }}>No projects found</h3>
                <p style={{ margin: '6px 0 20px', color: '#6b7280', fontSize: '14px' }}>
                  {projectSearch ? 'Try adjusting your search criteria.' : 'Create your first project to showcase on your portfolio.'}
                </p>
                <Link
                  href="/admin/projects/edit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    background: '#2563eb',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  <Plus size={14} /> Add Project
                </Link>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb', color: '#4b5563', fontWeight: 600 }}>
                      <th style={{ padding: '14px 18px' }}>Project</th>
                      <th style={{ padding: '14px 18px' }}>Category</th>
                      <th style={{ padding: '14px 18px' }}>Role & Type</th>
                      <th style={{ padding: '14px 18px' }}>Technologies</th>
                      <th style={{ padding: '14px 18px', textAlign: 'center' }}>Home Feature</th>
                      <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((p, idx) => {
                      const categoryColors: Record<string, { bg: string; text: string }> = {
                        'AI Projects': { bg: '#ede9fe', text: '#6d28d9' },
                        'SEO Projects': { bg: '#dbeafe', text: '#1d4ed8' },
                        'Digital Marketing Projects': { bg: '#ffedd5', text: '#c2410c' },
                        'Web Development Projects': { bg: '#dcfce7', text: '#15803d' },
                      };
                      const catStyle = categoryColors[p.category] || { bg: '#f3f4f6', text: '#374151' };

                      return (
                        <tr 
                          key={p.slug || idx} 
                          style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.15s ease' }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                          onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
                        >
                          {/* Title & Tagline */}
                          <td style={{ padding: '16px 18px', maxWidth: '320px' }}>
                            <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px', marginBottom: '4px' }}>
                              {p.title}
                            </div>
                            <div style={{ color: '#6b7280', fontSize: '13px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {p.tagline}
                            </div>
                            <div style={{ marginTop: '6px', color: '#9ca3af', fontSize: '12px', fontFamily: 'monospace' }}>
                              /projects/{p.slug}
                            </div>
                          </td>

                          {/* Category Badge */}
                          <td style={{ padding: '16px 18px', verticalAlign: 'middle' }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '4px 10px',
                              borderRadius: '20px',
                              background: catStyle.bg,
                              color: catStyle.text,
                              fontSize: '12px',
                              fontWeight: 700,
                              whiteSpace: 'nowrap',
                            }}>
                              {p.category}
                            </span>
                          </td>

                          {/* Role & Type */}
                          <td style={{ padding: '16px 18px', verticalAlign: 'middle', color: '#4b5563', fontSize: '13px', whiteSpace: 'nowrap' }}>
                            <div style={{ fontWeight: 600, color: '#1f2937' }}>{p.role || '—'}</div>
                            <div style={{ color: '#9ca3af', fontSize: '12px' }}>{p.type || '—'}</div>
                          </td>

                          {/* Technologies */}
                          <td style={{ padding: '16px 18px', verticalAlign: 'middle', maxWidth: '220px' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                              {p.technologies.slice(0, 3).map((tech, i) => (
                                <span key={i} style={{ background: '#f3f4f6', color: '#4b5563', padding: '2px 7px', borderRadius: '4px', fontSize: '11px', fontWeight: 500 }}>
                                  {tech}
                                </span>
                              ))}
                              {p.technologies.length > 3 && (
                                <span style={{ color: '#9ca3af', fontSize: '11px', alignSelf: 'center' }}>
                                  +{p.technologies.length - 3}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Featured on Home */}
                          <td style={{ padding: '16px 18px', textAlign: 'center', verticalAlign: 'middle' }}>
                            {p.featured ? (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#fef3c7', color: '#92400e', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>
                                <Star size={12} fill="#d97706" color="#d97706" /> Home
                              </span>
                            ) : (
                              <span style={{ color: '#d1d5db', fontSize: '18px' }}>—</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td style={{ padding: '16px 18px', textAlign: 'right', verticalAlign: 'middle' }}>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', alignItems: 'center' }}>
                              <Link
                                href={`/projects/${p.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                title="View public project page"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  color: '#059669',
                                  textDecoration: 'none',
                                  fontWeight: 600,
                                  fontSize: '13px',
                                  padding: '5px 8px',
                                  borderRadius: '4px',
                                }}
                              >
                                <ExternalLink size={14} /> View
                              </Link>

                              <Link
                                href={`/admin/projects/edit/${p.id || p.slug}`}
                                title="Edit project"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  color: '#2563eb',
                                  textDecoration: 'none',
                                  fontWeight: 600,
                                  fontSize: '13px',
                                  padding: '5px 8px',
                                  borderRadius: '4px',
                                }}
                              >
                                <Edit3 size={14} /> Edit
                              </Link>

                              <button
                                type="button"
                                onClick={() => handleDeleteProject(p.id || '', p.slug, p.title)}
                                title="Delete project"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  background: 'none',
                                  border: 'none',
                                  color: '#dc2626',
                                  cursor: 'pointer',
                                  fontWeight: 600,
                                  fontSize: '13px',
                                  padding: '5px 8px',
                                  borderRadius: '4px',
                                }}
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: JOURNALS & ARTICLES */}
      {activeTab === 'journals' && (
        <div>
          {/* HOMEPAGE FEATURED POST CONTROLS */}
          <div style={{ background: '#fff9e6', padding: '20px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #ffeeba' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ margin: 0, color: '#856404', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                  ⭐ Homepage Featured Post
                </h3>
                <p style={{ margin: '6px 0 0 0', color: '#666', fontSize: '13px' }}>
                  Choose which post appears in the "FEATURED" card on the homepage. This choice is pinned and will <strong>not</strong> change automatically when new journals are created.
                </p>
              </div>
              {currentFeaturedItem && (
                <div style={{ background: '#fff', padding: '6px 14px', borderRadius: '6px', border: '1px solid #ffe082' }}>
                  <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', display: 'block' }}>CURRENTLY PINNED:</span>
                  <span style={{ fontWeight: 'bold', color: '#111', fontSize: '14px' }}>
                    {currentFeaturedItem.title}
                  </span>
                </div>
              )}
            </div>

            <div style={{ marginTop: '16px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <select
                value={selectedFeaturedId}
                onChange={(e) => setSelectedFeaturedId(e.target.value)}
                style={{
                  padding: '9px 12px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  flex: 1,
                  minWidth: '280px',
                  background: '#fff'
                }}
              >
                <option value="" disabled>-- Select a post to feature on homepage --</option>
                {journals.filter(j => j.status !== 'DRAFT').map(j => (
                  <option key={j.id} value={j.id}>
                    {j.title} ({j.category}) {j.tag?.toUpperCase() === 'FEATURED' ? '★ CURRENT' : ''}
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleSetFeatured(selectedFeaturedId)}
                disabled={isUpdatingFeatured || !selectedFeaturedId}
                style={{
                  padding: '9px 18px',
                  background: '#e69500',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isUpdatingFeatured ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                {isUpdatingFeatured ? 'Saving...' : 'Pin as Featured'}
              </button>
            </div>
          </div>

          {/* JOURNALS LIST */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111827' }}>All Journal Entries ({journals.length})</h3>
              <Link href="/admin/edit" style={{ padding: '7px 14px', background: '#16a34a', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px' }}>
                + New Journal Entry
              </Link>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '12px 16px' }}>Title</th>
                  <th style={{ padding: '12px 16px' }}>Category</th>
                  <th style={{ padding: '12px 16px' }}>Date</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px' }}>Featured</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {journals.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{item.title}</td>
                    <td style={{ padding: '12px 16px' }}>{item.category}</td>
                    <td style={{ padding: '12px 16px', color: '#6b7280' }}>{item.date}</td>
                    <td style={{ padding: '12px 16px' }}>
                      {item.status === 'DRAFT' ? (
                        <span style={{ background: '#fff3cd', color: '#856404', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px' }}>
                          DRAFT
                        </span>
                      ) : (
                        <span style={{ background: '#d4edda', color: '#155724', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px' }}>
                          PUBLISHED
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      {item.tag?.toUpperCase() === 'FEATURED' ? (
                        <span style={{ 
                          background: '#fff8e1', 
                          color: '#b78103', 
                          padding: '3px 8px', 
                          borderRadius: '4px', 
                          fontWeight: 'bold', 
                          fontSize: '12px',
                          border: '1px solid #ffe082',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          ⭐ Featured on Home
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSetFeatured(item.id)}
                          disabled={isUpdatingFeatured}
                          style={{
                            background: 'none',
                            border: '1px solid #ccc',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            color: '#555'
                          }}
                          title="Set as featured post on the homepage"
                        >
                          Pin to Home
                        </button>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Link 
                          href={`/journey/${item.slug}${item.status === 'DRAFT' ? '?preview=true' : ''}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: '#16a34a', textDecoration: 'none', fontWeight: 600 }}
                        >
                          View
                        </Link>
                        <Link href={`/admin/edit/${item.id}`} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>Edit</Link>
                        <button onClick={() => handleDeleteJournal(item.id)} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600, padding: 0 }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CATEGORIES MANAGEMENT */}
      {activeTab === 'categories' && (
        <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: '12px', border: '1px solid #e9ecef' }}>
          <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#111827' }}>Content Categories Management</h3>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
            Categories used across your journals and portfolio insights.
          </p>

          <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="Category Name (e.g. AI & AUTOMATION)" 
              value={newCatName} 
              onChange={e => setNewCatName(e.target.value)}
              style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }}
              required
            />
            <input 
              type="text" 
              placeholder="Slug (e.g. ai-automation)" 
              value={newCatSlug} 
              onChange={e => setNewCatSlug(e.target.value)}
              style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }}
              required
            />
            <input 
              type="text" 
              placeholder="Description (Optional)" 
              value={newCatDesc} 
              onChange={e => setNewCatDesc(e.target.value)}
              style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #ccc', flex: 1, fontSize: '14px' }}
            />
            <button type="submit" style={{ padding: '10px 20px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>Add Category</button>
          </form>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <div key={cat.id} style={{ background: 'white', padding: '8px 14px', border: '1px solid #ddd', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <strong>{cat.name}</strong> <span style={{ color: '#6b7280' }}>({cat.slug})</span>
                <button 
                  onClick={() => handleDeleteCategory(cat.id)}
                  style={{ border: 'none', background: 'transparent', color: '#dc3545', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
                  title="Delete category"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: EXPERIENCES MANAGEMENT */}
      {activeTab === 'experiences' && (
        <div>
          {/* Action Header & Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '260px', maxWidth: '400px' }}>
              <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search by role, company, or bullet point..."
                value={experienceSearch}
                onChange={e => setExperienceSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleCopyExpSql}
                title="Copy Supabase SQL script to create public.experiences table"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  background: '#fff',
                  color: '#374151',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {expSqlCopied ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                {expSqlCopied ? 'Copied SQL!' : 'Copy Supabase SQL'}
              </button>

              <Link
                href="/experience"
                target="_blank"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  background: '#fff',
                  color: '#374151',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                View Live Page <ExternalLink size={13} />
              </Link>

              <button
                onClick={handleOpenNewExperience}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#0284c7',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(2,132,199,0.3)'
                }}
              >
                <Plus size={15} /> Add Experience
              </button>
            </div>
          </div>

          {/* Experiences List Table */}
          {experiencesLoading ? (
            <div style={{ textAlign: 'center', padding: '50px 0', color: '#6b7280' }}>
              Loading experiences...
            </div>
          ) : experiences.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f9fafb', borderRadius: '12px', border: '1px dashed #d1d5db' }}>
              <Briefcase size={36} color="#9ca3af" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', color: '#111827', fontWeight: 700 }}>
                No experiences added yet
              </h3>
              <p style={{ margin: '0 0 16px 0', color: '#6b7280', fontSize: '14px' }}>
                Add your internship and professional roles so they appear directly in the experience timeline.
              </p>
              <button
                onClick={handleOpenNewExperience}
                style={{
                  padding: '8px 16px',
                  background: '#0284c7',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                + Add First Experience
              </button>
            </div>
          ) : (
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb', color: '#4b5563', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <th style={{ padding: '12px 16px', width: '80px' }}>Order</th>
                      <th style={{ padding: '12px 16px' }}>Role & Company</th>
                      <th style={{ padding: '12px 16px' }}>Period</th>
                      <th style={{ padding: '12px 16px' }}>Bullet Points</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', width: '130px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {experiences
                      .filter(e => {
                        if (!experienceSearch) return true;
                        const q = experienceSearch.toLowerCase();
                        return (
                          e.company.toLowerCase().includes(q) ||
                          e.role.toLowerCase().includes(q) ||
                          e.period.toLowerCase().includes(q) ||
                          (e.points && e.points.some(p => p.bold.toLowerCase().includes(q) || p.text.toLowerCase().includes(q)))
                        );
                      })
                      .map((exp, idx) => (
                        <tr 
                          key={exp.id} 
                          style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.15s ease' }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          {/* Reordering */}
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ fontWeight: 700, color: '#6b7280', fontSize: '13px', minWidth: '16px' }}>
                                #{idx + 1}
                              </span>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <button
                                  disabled={idx === 0}
                                  onClick={() => handleMoveExperience(idx, 'up')}
                                  title="Move Up"
                                  style={{
                                    border: 'none',
                                    background: 'none',
                                    cursor: idx === 0 ? 'default' : 'pointer',
                                    opacity: idx === 0 ? 0.25 : 1,
                                    padding: '0',
                                    color: '#4b5563'
                                  }}
                                >
                                  <ChevronUp size={14} />
                                </button>
                                <button
                                  disabled={idx === experiences.length - 1}
                                  onClick={() => handleMoveExperience(idx, 'down')}
                                  title="Move Down"
                                  style={{
                                    border: 'none',
                                    background: 'none',
                                    cursor: idx === experiences.length - 1 ? 'default' : 'pointer',
                                    opacity: idx === experiences.length - 1 ? 0.25 : 1,
                                    padding: '0',
                                    color: '#4b5563'
                                  }}
                                >
                                  <ChevronDown size={14} />
                                </button>
                              </div>
                            </div>
                          </td>

                          {/* Role & Company */}
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px' }}>
                              {exp.role}
                            </div>
                            <div style={{ color: '#0284c7', fontWeight: 600, fontSize: '13px', marginTop: '2px' }}>
                              {exp.company}
                            </div>
                          </td>

                          {/* Period */}
                          <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '3px 10px',
                              background: '#f3f4f6',
                              color: '#374151',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: 600
                            }}>
                              {exp.period}
                            </span>
                          </td>

                          {/* Bullet Points Preview */}
                          <td style={{ padding: '14px 16px', maxWidth: '380px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              {exp.points && exp.points.slice(0, 2).map((pt, pIdx) => (
                                <div key={pIdx} style={{ fontSize: '12px', color: '#4b5563', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  <strong style={{ color: '#111827' }}>{pt.bold}</strong> {pt.text}
                                </div>
                              ))}
                              {exp.points && exp.points.length > 2 && (
                                <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600 }}>
                                  +{exp.points.length - 2} more points
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Actions */}
                          <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                              <button
                                onClick={() => handleOpenEditExperience(exp)}
                                title="Edit Experience"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '6px 10px',
                                  borderRadius: '6px',
                                  border: '1px solid #d1d5db',
                                  background: '#fff',
                                  color: '#2563eb',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  cursor: 'pointer'
                                }}
                              >
                                <Edit3 size={13} /> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteExperience(exp.id, exp.role, exp.company)}
                                title="Delete Experience"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  padding: '6px 8px',
                                  borderRadius: '6px',
                                  border: '1px solid #fee2e2',
                                  background: '#fff',
                                  color: '#dc2626',
                                  fontSize: '12px',
                                  cursor: 'pointer'
                                }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* EXPERIENCE MODAL EDITOR */}
      {isExpModalOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
          onClick={e => {
            if (e.target === e.currentTarget) setIsExpModalOpen(false);
          }}
        >
          <div 
            style={{
              background: '#fff',
              borderRadius: '16px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              border: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#111827' }}>
                    {editingExpId ? 'Edit Experience' : 'Add New Experience'}
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#6b7280' }}>
                    Changes reflect immediately on your live Experience page.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsExpModalOpen(false)}
                style={{
                  border: 'none',
                  background: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '6px'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveExperience} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Row 1: Role & Company */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Job Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marketing Intern, AI Engineer"
                    value={expRole}
                    onChange={e => setExpRole(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1page.info, Brandloom"
                    value={expCompany}
                    onChange={e => setExpCompany(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Period & Order */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Timeframe / Period *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apr 2026 – Sep 2026"
                    value={expPeriod}
                    onChange={e => setExpPeriod(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Display Order Index
                  </label>
                  <input
                    type="number"
                    value={expOrderIndex}
                    onChange={e => setExpOrderIndex(parseInt(e.target.value) || 0)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Bullet Points Section */}
              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: 700, color: '#111827', display: 'block' }}>
                      Key Responsibilities & Achievements
                    </label>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      The bold text serves as the highlighted prefix (e.g. "Client SEO Strategy:").
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddExpPoint}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid #bae6fd',
                      background: '#f0f9ff',
                      color: '#0284c7',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={13} /> Add Point
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {expPoints.map((pt, pIdx) => (
                    <div 
                      key={pIdx} 
                      style={{ 
                        padding: '12px', 
                        borderRadius: '8px', 
                        background: '#f9fafb', 
                        border: '1px solid #e5e7eb',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                          type="text"
                          placeholder="Bold Prefix (e.g. Client SEO Strategy:)"
                          value={pt.bold}
                          onChange={e => handleExpPointChange(pIdx, 'bold', e.target.value)}
                          style={{
                            flex: '1',
                            padding: '8px 10px',
                            borderRadius: '6px',
                            border: '1px solid #d1d5db',
                            fontSize: '13px',
                            fontWeight: 600,
                            outline: 'none',
                            background: '#fff'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveExpPoint(pIdx)}
                          title="Remove point"
                          disabled={expPoints.length === 1}
                          style={{
                            border: 'none',
                            background: 'none',
                            color: expPoints.length === 1 ? '#d1d5db' : '#ef4444',
                            cursor: expPoints.length === 1 ? 'not-allowed' : 'pointer',
                            padding: '4px'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Detailed description of the achievement or task..."
                        value={pt.text}
                        onChange={e => handleExpPointChange(pIdx, 'text', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          fontSize: '13px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          background: '#fff',
                          resize: 'vertical'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Footer Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #f3f4f6', paddingTop: '18px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setIsExpModalOpen(false)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    background: '#fff',
                    color: '#4b5563',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingExp}
                  style={{
                    padding: '9px 24px',
                    borderRadius: '6px',
                    border: 'none',
                    background: '#0284c7',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: isSavingExp ? 'not-allowed' : 'pointer',
                    boxShadow: '0 1px 3px rgba(2,132,199,0.3)',
                    opacity: isSavingExp ? 0.7 : 1
                  }}
                >
                  {isSavingExp ? 'Saving...' : editingExpId ? 'Save Changes' : 'Create Experience'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

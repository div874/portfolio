import { supabase } from '../supabase';
import { triggerDeploy } from './deploy';

export interface ExperiencePoint {
  bold: string;
  text: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  order_index?: number;
  points: ExperiencePoint[];
  created_at?: string;
  updated_at?: string;
}

export const defaultExperiences: ExperienceItem[] = [
  {
    id: 'exp-1page-info',
    company: '1page.info',
    role: 'Marketing Intern',
    period: 'Apr 2026 – Sep 2026',
    order_index: 0,
    points: [
      { bold: 'Client SEO Strategy:', text: 'Managed SEO & keyword strategies across 30+ client websites to support organic visibility and inbound lead generation.' },
      { bold: 'Content Performance & Audits:', text: 'Improved content performance through technical SEO optimization and AI-assisted workflows, achieving SEO scores of 9.3+ across client pages.' },
      { bold: 'AI Content Pipelines:', text: 'Streamlined AI-driven content workflows, scaling keyword-to-content execution and topical authority coverage across 30+ clients.' }
    ]
  },
  {
    id: 'exp-brandloom',
    company: 'Brandloom',
    role: 'AI & Marketing Intern',
    period: 'May 2025 – Sep 2025',
    order_index: 1,
    points: [
      { bold: 'WordPress & AI Plugins:', text: 'Built and optimized WordPress websites using AI-powered plugins to enhance site functionality and user experience.' },
      { bold: 'Campaign Execution & Growth:', text: 'Applied AI-driven tools and analytical techniques to improve digital marketing performance, boosting engagement and campaign efficiency.' },
      { bold: 'Technical Schema & Speed:', text: 'Implemented structured schema markup, speed optimization, and on-page SEO best practices for client brand websites.' }
    ]
  }
];

const LOCAL_STORAGE_KEY = 'portfolio_custom_experiences_cache';

export const normalizeExperience = (item: any): ExperienceItem => {
  let pointsArr: ExperiencePoint[] = [];
  if (Array.isArray(item.points)) {
    pointsArr = item.points.map((p: any) => ({
      bold: String(p.bold || ''),
      text: String(p.text || '')
    }));
  } else if (typeof item.points === 'string') {
    try {
      const parsed = JSON.parse(item.points);
      if (Array.isArray(parsed)) {
        pointsArr = parsed.map((p: any) => ({
          bold: String(p.bold || ''),
          text: String(p.text || '')
        }));
      }
    } catch {
      pointsArr = item.points.split('\n').filter(Boolean).map((line: string) => ({
        bold: '',
        text: line.trim()
      }));
    }
  }

  return {
    id: String(item.id || `exp-${Date.now()}`),
    company: String(item.company || '').trim(),
    role: String(item.role || '').trim(),
    period: String(item.period || '').trim(),
    order_index: typeof item.order_index === 'number' ? item.order_index : 0,
    points: pointsArr,
    created_at: item.created_at || undefined,
    updated_at: item.updated_at || undefined,
  };
};

export const getExperiences = async (): Promise<ExperienceItem[]> => {
  // 1. Try Supabase
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const list = data.map(normalizeExperience);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
        } catch {}
      }
      return list;
    }
  } catch (err) {
    console.warn('Could not query Supabase experiences table, falling back to cache:', err);
  }

  // 2. Check localStorage cache
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(normalizeExperience);
        }
      }
    } catch {}
  }

  // 3. Fallback to default experiences
  return defaultExperiences;
};

export const saveExperience = async (item: Partial<ExperienceItem>): Promise<{ success: boolean; data?: ExperienceItem; error?: string }> => {
  const norm = normalizeExperience({
    ...item,
    id: item.id || `exp-${Date.now()}`,
    updated_at: new Date().toISOString(),
    created_at: item.created_at || new Date().toISOString()
  });

  // 1. Update local storage immediately for zero-lag UI
  if (typeof window !== 'undefined') {
    try {
      const current = await getExperiences();
      const existingIdx = current.findIndex(e => e.id === norm.id);
      let updated: ExperienceItem[];
      if (existingIdx >= 0) {
        updated = [...current];
        updated[existingIdx] = norm;
      } else {
        updated = [norm, ...current];
      }
      updated.sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Local storage write error:', e);
    }
  }

  // 2. Attempt save to Supabase
  try {
    const { data, error } = await supabase
      .from('experiences')
      .upsert({
        id: norm.id,
        company: norm.company,
        role: norm.role,
        period: norm.period,
        order_index: norm.order_index ?? 0,
        points: norm.points,
        updated_at: norm.updated_at
      })
      .select()
      .single();

    if (error) {
      console.warn('Supabase upsert warning for experiences:', error.message);
      // Attempt via API route as fallback
      try {
        await fetch('/api/experiences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'save', experience: norm })
        });
      } catch {}
    }
  } catch (err: any) {
    console.warn('Supabase experiences save exception:', err);
  }

  triggerDeploy();
  return { success: true, data: norm };
};

export const deleteExperience = async (id: string): Promise<{ success: boolean; error?: string }> => {
  if (!id) return { success: false, error: 'Missing experience ID' };

  // 1. Remove from local storage immediately
  if (typeof window !== 'undefined') {
    try {
      const current = await getExperiences();
      const filtered = current.filter(e => e.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    } catch {}
  }

  // 2. Delete from Supabase
  try {
    const { error } = await supabase.from('experiences').delete().eq('id', id);
    if (error) {
      console.warn('Supabase delete error:', error.message);
      try {
        await fetch('/api/experiences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'delete', id })
        });
      } catch {}
    }
  } catch (err: any) {
    console.warn('Delete experience exception:', err);
  }

  triggerDeploy();
  return { success: true };
};

export const seedDefaultExperiences = async (): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('experiences')
      .upsert(defaultExperiences.map(e => ({
        id: e.id,
        company: e.company,
        role: e.role,
        period: e.period,
        order_index: e.order_index,
        points: e.points,
        updated_at: new Date().toISOString()
      })));

    if (!error) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultExperiences));
      }
      return true;
    }
  } catch {}
  return false;
};

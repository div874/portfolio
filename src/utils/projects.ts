import { supabase } from '../supabase';
import { projectDetails, ProjectDetail } from '../data/projectsData';
import { triggerDeploy } from './deploy';
import { normalizeAttachments, DocumentAttachment } from './attachments';

const LOCAL_STORAGE_KEY = 'portfolio_custom_projects_cache';

export const normalizeProject = (item: any): ProjectDetail => {
  let approachArr: string[] = [];
  if (Array.isArray(item.approach)) {
    approachArr = item.approach;
  } else if (typeof item.approach === 'string') {
    try {
      approachArr = JSON.parse(item.approach);
    } catch {
      approachArr = item.approach.split('\n').filter(Boolean);
    }
  }

  let techArr: string[] = [];
  if (Array.isArray(item.technologies)) {
    techArr = item.technologies;
  } else if (typeof item.technologies === 'string') {
    try {
      techArr = JSON.parse(item.technologies);
    } catch {
      techArr = item.technologies.split(',').map((t: string) => t.trim()).filter(Boolean);
    }
  }

  let resultsArr: string[] = [];
  if (Array.isArray(item.results)) {
    resultsArr = item.results;
  } else if (typeof item.results === 'string') {
    try {
      resultsArr = JSON.parse(item.results);
    } catch {
      resultsArr = item.results.split('\n').filter(Boolean);
    }
  }

  let linksObj = { live: '#', code: '#' };
  if (item.links && typeof item.links === 'object') {
    linksObj = {
      live: item.links.live || '#',
      code: item.links.code || '#',
    };
  } else if (typeof item.links === 'string') {
    try {
      linksObj = JSON.parse(item.links);
    } catch {
      // keep default
    }
  }

  return {
    id: item.id ? String(item.id) : undefined,
    slug: String(item.slug || '').trim(),
    title: String(item.title || '').trim(),
    category: (item.category || 'Web Development Projects') as any,
    role: String(item.role || 'Developer'),
    type: String(item.type || 'Personal Project'),
    tagline: String(item.tagline || ''),
    problem: String(item.problem || ''),
    approach: approachArr,
    architecture: item.architecture || '',
    technologies: techArr,
    results: resultsArr,
    learnings: String(item.learnings || ''),
    links: linksObj,
    featured: Boolean(item.featured),
    order_index: typeof item.order_index === 'number' ? item.order_index : 0,
    created_at: item.created_at || undefined,
    image: item.image ? String(item.image).trim() : undefined,
    attachments: normalizeAttachments(item.attachments),
  };
};

export const getProjects = async (): Promise<ProjectDetail[]> => {
  // 1. Attempt to fetch from Supabase
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && data) {
      const list = data.map(normalizeProject);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
        } catch {
          // ignore localStorage write errors
        }
      }
      return list;
    }
  } catch (err) {
    console.warn('Could not query Supabase projects table:', err);
  }

  // Check deleted slugs filter
  const deletedSlugs = new Set<string>();
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('portfolio_deleted_slugs');
      if (stored) {
        JSON.parse(stored).forEach((s: string) => deletedSlugs.add(s));
      }
    } catch {
      // ignore
    }
  }

  // 2. Check localStorage in browser (useful for offline/preview before DB migration)
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          return parsed.filter(p => !deletedSlugs.has(p.slug)).map(normalizeProject);
        }
      }
    } catch {
      // fallback
    }
  }

  // 3. Fallback to static projectDetails (excluding any deleted slugs)
  return projectDetails
    .filter(p => !deletedSlugs.has(p.slug))
    .map(normalizeProject);
};

export const getProjectBySlug = async (slug: string): Promise<ProjectDetail | null> => {
  if (!slug) return null;

  // 1. Try Supabase
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      return normalizeProject(data);
    }
  } catch (err) {
    console.warn('Could not query Supabase for project slug:', slug, err);
  }

  // 2. Try localStorage in browser
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          const match = parsed.find((p: any) => p.slug === slug);
          if (match) return normalizeProject(match);
        }
      }
    } catch {
      // fallback
    }
  }

  // 3. Fallback to static projectDetails
  const found = projectDetails.find(p => p.slug === slug);
  return found ? normalizeProject(found) : null;
};

export const saveProject = async (
  project: Partial<ProjectDetail> & { slug: string; title: string }
): Promise<{ success: boolean; data?: ProjectDetail; error?: string }> => {
  const payload = {
    slug: project.slug.trim(),
    title: project.title.trim(),
    category: project.category || 'Web Development Projects',
    role: project.role || 'Developer',
    type: project.type || 'Personal Project',
    tagline: project.tagline || '',
    problem: project.problem || '',
    approach: project.approach || [],
    architecture: project.architecture || '',
    technologies: project.technologies || [],
    results: project.results || [],
    learnings: project.learnings || '',
    links: project.links || { live: '#', code: '#' },
    featured: Boolean(project.featured),
    order_index: project.order_index ?? 0,
    image: project.image?.trim() || '',
    attachments: project.attachments || [],
    updated_at: new Date().toISOString(),
  };

  let supabaseResult: { data: any; error: any } = { data: null, error: null };

  const executeSave = async (dataPayload: any) => {
    if (project.id) {
      return await supabase
        .from('projects')
        .update(dataPayload)
        .eq('id', project.id)
        .select()
        .single();
    } else {
      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', project.slug)
        .maybeSingle();

      if (existing?.id) {
        return await supabase
          .from('projects')
          .update(dataPayload)
          .eq('id', existing.id)
          .select()
          .single();
      } else {
        return await supabase
          .from('projects')
          .insert([dataPayload])
          .select()
          .single();
      }
    }
  };

  try {
    supabaseResult = await executeSave(payload);

    // If Supabase failed because columns 'attachments' or 'image' don't exist yet in DB, retry without them
    if (supabaseResult.error && (
      supabaseResult.error.message?.includes('attachments') ||
      supabaseResult.error.message?.includes('image') ||
      supabaseResult.error.code === 'PGRST204'
    )) {
      console.warn('Projects table may be missing attachments/image columns. Retrying without them for DB sync:', supabaseResult.error.message);
      const fallbackPayload = { ...payload };
      delete (fallbackPayload as any).attachments;
      delete (fallbackPayload as any).image;
      supabaseResult = await executeSave(fallbackPayload);
    }
  } catch (err: any) {
    supabaseResult = { data: null, error: err };
  }

  // Update client cache regardless for instant feedback
  if (typeof window !== 'undefined') {
    try {
      const currentProjects = await getProjects();
      const normalized = normalizeProject({
        ...payload,
        id: supabaseResult.data?.id || project.id || `local-${Date.now()}`,
      });

      const updated = currentProjects.filter(
        p => p.slug !== normalized.slug && p.id !== normalized.id
      );
      updated.unshift(normalized);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }

  // Trigger deploy if configured
  triggerDeploy();

  if (supabaseResult.error) {
    return {
      success: false,
      error: supabaseResult.error.message || 'Failed to save to database',
      data: normalizeProject({ ...payload, id: project.id }),
    };
  }

  return {
    success: true,
    data: normalizeProject(supabaseResult.data || payload),
  };
};

export const deleteProject = async (
  idOrSlug: string,
  slugFallback?: string
): Promise<{ success: boolean; error?: string }> => {
  let dbError: any = null;

  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
    if (isUuid && slugFallback) {
      const { error } = await supabase.from('projects').delete().or(`id.eq.${idOrSlug},slug.eq.${slugFallback}`);
      dbError = error;
    } else if (isUuid) {
      const { error } = await supabase.from('projects').delete().eq('id', idOrSlug);
      dbError = error;
    } else {
      const { error } = await supabase.from('projects').delete().eq('slug', idOrSlug);
      dbError = error;
    }
  } catch (err) {
    dbError = err;
  }

  // Also remove from local cache and track deleted slugs
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed: ProjectDetail[] = JSON.parse(cached);
        const filtered = parsed.filter(p => p.id !== idOrSlug && p.slug !== idOrSlug && p.slug !== slugFallback);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
      }

      // Record deleted slug
      const deletedSlugsJson = localStorage.getItem('portfolio_deleted_slugs') || '[]';
      const deletedList: string[] = JSON.parse(deletedSlugsJson);
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
      if (!isUuid) deletedList.push(idOrSlug);
      if (slugFallback) deletedList.push(slugFallback);
      localStorage.setItem('portfolio_deleted_slugs', JSON.stringify(Array.from(new Set(deletedList))));
    } catch {
      // ignore
    }
  }

  triggerDeploy();

  if (dbError) {
    return { success: false, error: dbError.message || 'Failed to delete from database' };
  }

  return { success: true };
};

export const seedDefaultProjects = async (): Promise<{ count: number; error?: string }> => {
  try {
    const formatted = projectDetails.map((p, idx) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      role: p.role,
      type: p.type,
      tagline: p.tagline,
      problem: p.problem,
      approach: p.approach,
      architecture: p.architecture || '',
      technologies: p.technologies,
      results: p.results,
      learnings: p.learnings,
      links: p.links,
      featured: idx < 2, // feature the first 2 by default
      order_index: idx,
    }));

    const { data, error } = await supabase
      .from('projects')
      .upsert(formatted, { onConflict: 'slug' })
      .select();

    if (error) {
      return { count: 0, error: error.message };
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formatted.map(normalizeProject)));
    }

    triggerDeploy();
    return { count: data?.length || formatted.length };
  } catch (err: any) {
    return { count: 0, error: err.message || 'Seeding failed' };
  }
};

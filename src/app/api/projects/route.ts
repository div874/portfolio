import { NextRequest, NextResponse } from 'next/server';
import { getAdminSupabase } from '@/supabase';
import { projectDetails } from '@/data/projectsData';
import { normalizeProject } from '@/utils/projects';

export async function GET() {
  try {
    const supabase = getAdminSupabase();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return NextResponse.json({
        source: 'supabase',
        projects: data.map(normalizeProject),
      });
    }

    return NextResponse.json({
      source: 'static',
      projects: projectDetails.map(normalizeProject),
    });
  } catch (err: any) {
    return NextResponse.json(
      { source: 'static', projects: projectDetails.map(normalizeProject), error: err.message },
      { status: 200 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, project, id, slug } = body;
    const supabase = getAdminSupabase();

    if (action === 'seed') {
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
        featured: idx < 2,
        order_index: idx,
      }));

      const { data, error } = await supabase
        .from('projects')
        .upsert(formatted, { onConflict: 'slug' })
        .select();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, count: data?.length || formatted.length });
    }

    if (action === 'delete') {
      const target = id || slug;
      if (!target) {
        return NextResponse.json({ error: 'Missing id or slug to delete' }, { status: 400 });
      }

      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(target);
      const query = isUuid
        ? supabase.from('projects').delete().eq('id', target)
        : supabase.from('projects').delete().eq('slug', target);

      const { error } = await query;
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }

    // Save/Update project
    if (!project || !project.title || !project.slug) {
      return NextResponse.json({ error: 'Project title and slug are required' }, { status: 400 });
    }

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
      updated_at: new Date().toISOString(),
    };

    let result;
    if (project.id) {
      result = await supabase
        .from('projects')
        .update(payload)
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
        result = await supabase
          .from('projects')
          .update(payload)
          .eq('id', existing.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from('projects')
          .insert([payload])
          .select()
          .single();
      }
    }

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, project: normalizeProject(result.data) });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

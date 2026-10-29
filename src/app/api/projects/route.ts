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

    if (!error && data) {
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

      // Delete by ID or by Slug
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(target);
      if (id && slug) {
        await supabase.from('projects').delete().or(`id.eq.${id},slug.eq.${slug}`);
      } else if (isUuid) {
        await supabase.from('projects').delete().eq('id', target);
      } else {
        await supabase.from('projects').delete().eq('slug', target);
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
      image: project.image?.trim() || '',
      attachments: project.attachments || [],
      updated_at: new Date().toISOString(),
    };

    let result;
    const runSave = async (dataPayload: any) => {
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

    result = await runSave(payload);

    // If columns do not exist yet in DB, retry without attachments & image
    if (result.error && (
      result.error.message?.includes('attachments') ||
      result.error.message?.includes('image') ||
      result.error.code === 'PGRST204'
    )) {
      const fallbackPayload = { ...payload };
      delete (fallbackPayload as any).attachments;
      delete (fallbackPayload as any).image;
      result = await runSave(fallbackPayload);
    }

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, project: normalizeProject(result.data) });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

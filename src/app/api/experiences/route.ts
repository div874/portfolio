import { NextRequest, NextResponse } from 'next/server';
import { getAdminSupabase } from '@/supabase';
import { defaultExperiences, normalizeExperience } from '@/utils/experiences';

export async function GET() {
  try {
    const supabase = getAdminSupabase();
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return NextResponse.json({
        source: 'supabase',
        experiences: data.map(normalizeExperience),
      });
    }

    return NextResponse.json({
      source: 'default',
      experiences: defaultExperiences,
    });
  } catch (err: any) {
    return NextResponse.json(
      { source: 'default', experiences: defaultExperiences, error: err.message },
      { status: 200 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, experience, id } = body;
    const supabase = getAdminSupabase();

    if (action === 'seed') {
      const { data, error } = await supabase
        .from('experiences')
        .upsert(defaultExperiences.map((e, idx) => ({
          company: e.company,
          role: e.role,
          period: e.period,
          order_index: idx,
          points: e.points,
          updated_at: new Date().toISOString()
        })))
        .select();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json({ success: true, count: data?.length || defaultExperiences.length });
    }

    if (action === 'delete') {
      if (!id) {
        return NextResponse.json({ error: 'Missing id to delete' }, { status: 400 });
      }
      const { error } = await supabase.from('experiences').delete().eq('id', id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }

    // Save/Update
    if (!experience || !experience.company || !experience.role) {
      return NextResponse.json({ error: 'Company and Role are required' }, { status: 400 });
    }

    const payload = {
      id: experience.id && !experience.id.startsWith('exp-') ? experience.id : undefined,
      company: experience.company.trim(),
      role: experience.role.trim(),
      period: experience.period.trim(),
      order_index: typeof experience.order_index === 'number' ? experience.order_index : 0,
      points: experience.points || [],
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('experiences')
      .upsert(payload)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, experience: normalizeExperience(data) });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

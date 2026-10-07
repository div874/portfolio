import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Read .env file manually or from process.env
const envPath = path.resolve('.env');
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
let supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

if (fs.existsSync(envPath) && (!supabaseUrl || !supabaseKey)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim().replace(/^"|'|"$|'/g, '');
    if (line.startsWith('VITE_SUPABASE_URL=')) supabaseUrl = supabaseUrl || line.split('=')[1].trim().replace(/^"|'|"$|'/g, '');
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim().replace(/^"|'|"$|'/g, '');
    if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) supabaseKey = supabaseKey || line.split('=')[1].trim().replace(/^"|'|"$|'/g, '');
  });
}

const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

async function generateSitemap() {
  console.log('Generating optimized sitemap with metadata (lastmod, changefreq, priority)...');

  const today = new Date().toISOString().split('T')[0];
  const urlMap = new Map();

  function addUrl(loc, priority = '0.7', changefreq = 'monthly', lastmod = today) {
    if (!urlMap.has(loc)) {
      urlMap.set(loc, { loc, priority, changefreq, lastmod });
    }
  }

  // 1. Core Homepage
  addUrl('https://www.divyanshchandra.online', '1.0', 'weekly');

  // 2. High Priority Hub Pages
  const hubPages = ['/articles', '/journey', '/projects', '/case-studies'];
  for (const route of hubPages) {
    addUrl(`https://www.divyanshchandra.online${route}`, '0.9', 'weekly');
  }

  // 3. Main Static Subpages
  const staticPages = ['/about', '/experience', '/skills', '/cv'];
  for (const route of staticPages) {
    addUrl(`https://www.divyanshchandra.online${route}`, '0.7', 'monthly');
  }

  // 4. Project Detail Pages
  const projects = [
    'wallcurry-ai-recommendation',
    'seo-reporting-automation',
    'attribution-marketing-analytics',
    'nextjs-portfolio-engine'
  ];
  for (const slug of projects) {
    addUrl(`https://www.divyanshchandra.online/projects/${slug}`, '0.8', 'monthly');
  }

  // 5. Fallback Static Content
  const staticArticles = [
    { slug: 'what-is-rag-in-ai', date: '2026-09-20' }
  ];
  const staticCaseStudies = [
    { slug: 'b2b-seo-ai-traffic-growth', date: '2026-08-15' }
  ];

  for (const item of staticArticles) {
    addUrl(`https://www.divyanshchandra.online/articles/${item.slug}`, '0.8', 'monthly', item.date);
  }
  for (const item of staticCaseStudies) {
    addUrl(`https://www.divyanshchandra.online/case-studies/${item.slug}`, '0.8', 'monthly', item.date);
  }

  // 6. Dynamic Content from Supabase (if available)
  if (supabase) {
    try {
      // Fetch published journals with dates
      const { data: journals, error: jError } = await supabase
        .from('journals')
        .select('slug, status, date, created_at');

      if (jError) {
        console.error('Error fetching journals for sitemap:', jError);
      } else if (journals) {
        for (const j of journals) {
          if (j.slug && j.status !== 'DRAFT') {
            const rawDate = j.date || j.created_at || today;
            const dateStr = typeof rawDate === 'string' ? rawDate.split('T')[0] : today;
            addUrl(`https://www.divyanshchandra.online/journey/${j.slug}`, '0.8', 'monthly', dateStr);
          }
        }
      }

      // Fetch published articles with dates
      const { data: articles, error: aError } = await supabase
        .from('articles')
        .select('slug, status, date, created_at');

      if (aError) {
        console.error('Error fetching articles for sitemap:', aError);
      } else if (articles) {
        for (const a of articles) {
          if (a.slug && a.status !== 'DRAFT') {
            const rawDate = a.date || a.created_at || today;
            const dateStr = typeof rawDate === 'string' ? rawDate.split('T')[0] : today;
            addUrl(`https://www.divyanshchandra.online/articles/${a.slug}`, '0.8', 'monthly', dateStr);
          }
        }
      }

    } catch (err) {
      console.error('Error querying Supabase for sitemap:', err);
    }
  } else {
    console.warn('Supabase credentials missing, skipped dynamic database routes in sitemap.');
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const entry of urlMap.values()) {
    xml += `
  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
  }

  xml += `\n</urlset>\n`;

  fs.writeFileSync(path.resolve('public/sitemap.xml'), xml);
  console.log(`Sitemap generated successfully at public/sitemap.xml with ${urlMap.size} URLs.`);
}

generateSitemap();

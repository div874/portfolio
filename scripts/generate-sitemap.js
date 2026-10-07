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
  console.log('Generating sitemap...');
  
  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/experience',
    '/skills',
    '/journey',
    '/articles',
    '/case-studies',
    '/cv',
    '/projects/wallcurry-ai-recommendation',
    '/projects/seo-reporting-automation'
  ];

  const urls = new Set();
  
  for (const route of staticRoutes) {
    urls.add(`https://www.divyanshchandra.online${route}`);
  }

  // Fallback static entries
  const staticArticles = ['what-is-rag-in-ai'];
  const staticCaseStudies = ['b2b-seo-ai-traffic-growth'];

  for (const slug of staticArticles) {
    urls.add(`https://www.divyanshchandra.online/articles/${slug}`);
  }
  for (const slug of staticCaseStudies) {
    urls.add(`https://www.divyanshchandra.online/case-studies/${slug}`);
  }

  // Fetch dynamic entries from Supabase if available
  if (supabase) {
    try {
      // Fetch published journals
      const { data: journals, error: jError } = await supabase
        .from('journals')
        .select('slug, status');
      
      if (jError) {
        console.error('Error fetching journals for sitemap:', jError);
      } else if (journals) {
        for (const j of journals) {
          if (j.slug && j.status !== 'DRAFT') {
            urls.add(`https://www.divyanshchandra.online/journey/${j.slug}`);
          }
        }
      }

      // Fetch published articles
      const { data: articles, error: aError } = await supabase
        .from('articles')
        .select('slug, status');
      
      if (aError) {
        console.error('Error fetching articles for sitemap:', aError);
      } else if (articles) {
        for (const a of articles) {
          if (a.slug && a.status !== 'DRAFT') {
            urls.add(`https://www.divyanshchandra.online/articles/${a.slug}`);
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

  for (const url of urls) {
    xml += `
  <url>
    <loc>${url}</loc>
  </url>`;
  }

  xml += `\n</urlset>\n`;

  fs.writeFileSync(path.resolve('public/sitemap.xml'), xml);
  console.log(`Sitemap generated successfully at public/sitemap.xml with ${urls.size} URLs.`);
}

generateSitemap();

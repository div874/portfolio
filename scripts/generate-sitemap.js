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
    '/cv',
    '/projects/wallcurry-ai-recommendation',
    '/projects/seo-reporting-automation'
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static routes
  for (const route of staticRoutes) {
    xml += `
  <url>
    <loc>https://www.divyanshchandra.online${route}</loc>
  </url>`;
  }

  // Fetch journals if Supabase client is available
  if (supabase) {
    try {
      const { data: journals, error } = await supabase.from('journals').select('slug');
      
      if (error) {
        console.error('Error fetching journals for sitemap:', error);
      } else if (journals) {
        for (const journal of journals) {
          if (journal.slug) {
            xml += `
  <url>
    <loc>https://www.divyanshchandra.online/journey/${journal.slug}</loc>
  </url>`;
          }
        }
      }
    } catch (err) {
      console.error('Error querying Supabase for sitemap:', err);
    }
  } else {
    console.warn('Supabase credentials missing, skipped dynamic journal routes in sitemap.');
  }

  xml += `\n</urlset>\n`;

  fs.writeFileSync(path.resolve('public/sitemap.xml'), xml);
  console.log('Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap();

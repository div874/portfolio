import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Read .env file manually
const envPath = path.resolve('.env');
let supabaseUrl = '';
let supabaseKey = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    if (line.startsWith('VITE_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim().replace(/^"|'|"$|'/g, '');
    if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim().replace(/^"|'|"$|'/g, '');
  });
}

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

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

  // Fetch journals
  const { data: journals, error } = await supabase.from('journals').select('slug');
  
  if (error) {
    console.error('Error fetching journals:', error);
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

  xml += `\n</urlset>\n`;

  fs.writeFileSync(path.resolve('public/sitemap.xml'), xml);
  console.log('Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap();

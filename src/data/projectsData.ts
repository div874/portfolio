export interface ProjectDetail {
  slug: string;
  title: string;
  category: string;
  role: string;
  type: string;
  tagline: string;
  problem: string;
  approach: string[];
  architecture?: string;
  technologies: string[];
  results: string[];
  learnings: string;
  links: { live: string; code: string };
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: 'wallcurry-ai-recommendation',
    title: 'Wallcurry AI Recommendation Model',
    category: 'AI & Recommendation Systems',
    role: 'AI/ML Developer',
    type: 'Personal Project',
    tagline: 'ML-powered product recommendation engine built for an art platform with 10,000+ mural listings.',
    problem:
      'Wallcurry, an art platform with 10,000+ mural listings, had no personalised discovery layer. Users browsed manually, engagement was low, and most works went unnoticed. Manual curation did not scale.',
    approach: [
      'Used ResNet-50 (pretrained on ImageNet) to extract 512-dimensional visual feature embeddings for every mural image.',
      'Built a FAISS index for fast approximate nearest-neighbour search across the embedding space.',
      'Layered collaborative filtering on top of visual similarity using implicit user behaviour signals (views, clicks, purchases).',
      'Exposed recommendations via a Flask REST API integrated into the React frontend.',
      'Validated accuracy through a user feedback loop — rating whether recommended murals matched their taste.',
    ],
    architecture:
      'Image → ResNet-50 → 512-dim embeddings → FAISS index → collaborative filtering re-ranking → Flask API → React UI',
    technologies: ['Python', 'TensorFlow', 'FAISS', 'Flask', 'React', 'ResNet-50', 'NumPy', 'Pandas'],
    results: [
      'Recommendation accuracy improved from 72% → 88% (user feedback validation)',
      '30% increase in mural purchases post-recommendation launch',
      '45% of users now discovering content through recommendations rather than manual search',
    ],
    learnings:
      'Building a recommendation engine taught me how to balance visual similarity with behavioural signals. Pure content-based filtering surfaces visually similar items but misses user intent — combining it with collaborative filtering significantly improved relevance. I also learned how FAISS enables real-time similarity search at scale without compromising latency.',
    links: { live: '#', code: '#' },
  },
  {
    slug: 'seo-reporting-automation',
    title: 'SEO Reporting Automation Dashboard',
    category: 'Automation & Data Engineering',
    role: 'Automation Developer',
    type: 'Professional Project',
    tagline: 'Automated SEO reporting pipeline that eliminated 6 hours of weekly manual work across 3 client accounts.',
    problem:
      'Manual SEO reporting consumed 6 hours per week across 3 client accounts. Reports were inconsistent, delayed, and dependent on manual data pulls from Google Search Console and GA4. Clients often received reports late, and issues were caught reactively.',
    approach: [
      'Built automated data extraction scripts in Python interfacing with Google Search Console API and GA4 Data API.',
      'Designed data aggregation and transform pipelines to calculate MoM keyword rank changes, traffic trends, and conversion shifts.',
      'Generated automated PDF client reports scheduled via Python cron to email clients every Monday.',
      'Built a Flask dashboard for internal monitoring of keyword trends and drop-off alerts in real time.',
    ],
    architecture:
      'GSC API + GA4 API → Python (Pandas) → MoM trend calculation → PDF generation → automated email delivery → Flask monitoring dashboard',
    technologies: ['Python', 'Google Search Console API', 'GA4 API', 'Pandas', 'Flask', 'SMTP', 'ReportLab'],
    results: [
      'Reporting time reduced from 6 hours → 15 minutes per week',
      'Tracked 45+ keywords across 3 accounts in real time',
      'Identified 8 ranking drop-off issues proactively — before clients noticed',
      'Client satisfaction score: 4.9/5 for faster, consistent reporting',
    ],
    learnings:
      'This project reinforced that automation\'s biggest value is not just speed — it\'s consistency. Manual reports introduce human error and delay. Once automated, the system caught issues I would have missed in manual review. I also learned how to work with OAuth2 and service account authentication for Google APIs at a production level.',
    links: { live: '#', code: '#' },
  },
];

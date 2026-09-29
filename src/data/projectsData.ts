export interface ProjectDetail {
  slug: string;
  title: string;
  category: 'AI Projects' | 'SEO Projects' | 'Digital Marketing Projects' | 'Web Development Projects';
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

export const PROJECT_CATEGORIES = [
  'All',
  'AI Projects',
  'SEO Projects',
  'Digital Marketing Projects',
  'Web Development Projects'
] as const;

export const projectDetails: ProjectDetail[] = [
  {
    slug: 'wallcurry-ai-recommendation',
    title: 'Wallcurry AI Recommendation Model',
    category: 'AI Projects',
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
    category: 'SEO Projects',
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
  {
    slug: 'attribution-marketing-analytics',
    title: 'Multi-Touch Marketing Attribution Engine',
    category: 'Digital Marketing Projects',
    role: 'Growth Marketing Engineer',
    type: 'Client Project',
    tagline: 'Custom data analytics model mapping multi-channel customer touchpoints to measure true ROI per ad channel.',
    problem:
      'Last-click attribution in Google Analytics gave 100% credit to bottom-funnel Search ads, starving top-funnel Social campaigns. The marketing team was misallocating budget without knowing true path-to-conversion performance.',
    approach: [
      'Ingested raw web interaction logs and ad spend data from Facebook Ads, Google Ads, and CRM APIs.',
      'Built Markov Chain & Data-Driven Attribution models in Python to calculate channel contribution scores.',
      'Created automated Looker Studio & Python dashboards displaying multi-touch conversion paths.',
    ],
    architecture:
      'Ad APIs & GA4 Event Stream → Python Data Pipeline → Markov Chain Model → BigQuery → Interactive Dashboards',
    technologies: ['Python', 'Pandas', 'BigQuery', 'GA4 Data API', 'Looker Studio', 'SQL'],
    results: [
      'Reallocated 22% of ad budget to high-performing mid-funnel campaigns',
      'Lowered Customer Acquisition Cost (CAC) by 18% across paid channels',
      'Enabled real-time attribution tracking for \$50k+ monthly ad spend',
    ],
    learnings:
      'Understood the mathematical limitations of single-touch attribution models and how Markov chain transition probabilities reveal hidden assist channels in B2B customer journeys.',
    links: { live: '#', code: '#' },
  },
  {
    slug: 'nextjs-portfolio-engine',
    title: 'High-Performance Web Portfolio & Content Hub',
    category: 'Web Development Projects',
    role: 'Full-Stack Developer',
    type: 'Personal Project',
    tagline: 'Lightning-fast Next.js 15 App Router web application with dark mode UI, structured JSON-LD, and dynamic hubs.',
    problem:
      'Traditional static portfolios lack rich content organization, programmatic SEO capabilities, and smooth interactive animations needed to showcase multidisciplinary expertise.',
    approach: [
      'Engineered modular UI components using Next.js, React 19, TypeScript, and Framer Motion.',
      'Implemented full OpenGraph metadata, Google-compliant JSON-LD structured schemas, and dynamic routing.',
      'Designed custom glassmorphic dark-theme design tokens in vanilla CSS for optimal visual experience.',
    ],
    architecture:
      'Next.js 15 App Router → TypeScript → Tailwind & Custom CSS → Supabase / Static Data → Vercel Edge Hosting',
    technologies: ['Next.js 15', 'React', 'TypeScript', 'Framer Motion', 'CSS3', 'Vercel'],
    results: [
      '100/100 Lighthouse performance and SEO scores',
      'Sub-50ms page transitions with zero layout shift',
      'Full mobile responsiveness and accessible keyboard navigation',
    ],
    learnings:
      'Leveraged Next.js Server Components and client hydration boundaries to deliver rich animations without compromising fast initial paint metrics.',
    links: { live: 'https://www.divyanshchandra.online', code: 'https://github.com/div874/portfolio' },
  },
];

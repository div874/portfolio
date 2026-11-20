import type { DocumentAttachment } from '../utils/attachments';

export interface ProjectDetail {
  id?: string;
  slug: string;
  title: string;
  category: 'AI Projects' | 'SEO Projects' | 'Digital Marketing Projects' | 'Web Development Projects' | 'Product Management' | string;
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
  featured?: boolean;
  order_index?: number;
  created_at?: string;
  image?: string;
  attachments?: DocumentAttachment[];
}

export const PROJECT_CATEGORIES = [
  'All',
  'AI Projects',
  'Product Management',
  'SEO Projects',
  'Digital Marketing Projects',
  'Web Development Projects'
] as const;

export const projectDetails: ProjectDetail[] = [
  {
    slug: 'customer-complaint-auto-resolver',
    title: 'Customer Complaint Auto Resolver (DL & NLP)',
    category: 'AI Projects',
    role: 'Design and Development',
    type: 'Research & Academic Project',
    tagline: 'Multilingual AI system for automated complaint classification, sentiment analysis, urgency detection, and LLM resolution.',
    problem:
      'E-commerce platforms receive high volumes of multilingual customer complaints across disparate support channels. Manual routing and resolution lead to delayed responses, inconsistent handling of high-urgency disputes, and escalations.',
    approach: [
      'Built a multilingual data preprocessing pipeline handling diverse language variations, transliterations, and colloquial expressions.',
      'Fine-tuned transformer models (XLM-RoBERTa and BERT) for multi-class complaint classification, sentiment analysis, and urgency scoring.',
      'Implemented Named Entity Recognition (NER) to automatically extract order IDs, product names, transaction amounts, and customer details.',
      'Integrated LLM-based response generation grounded in retrieved context and complaint severity to draft accurate, personalized resolutions.',
      'Published research findings in IEEE CONIT 2026 conference proceedings.'
    ],
    architecture:
      'Multilingual Ingestion → XLM-RoBERTa / BERT Classifier → NER Entity Extraction → Urgency & Sentiment Scorer → Grounded LLM Response Generator → Helpdesk API',
    technologies: ['Python', 'NLP', 'Deep Learning', 'Transformers', 'XLM-RoBERTa', 'BERT', 'LLM APIs', 'Prompt Engineering', 'VS Code'],
    results: [
      'Published IEEE Research: 2026 6th International Conference on Intelligent Technologies (CONIT), IEEE [DOI: 11621397]',
      'Accurate multi-class categorization and urgency tagging across multilingual customer text',
      'Significantly reduced first-response drafting latency with context-aware LLM resolution',
    ],
    learnings:
      'Gained deep technical understanding of cross-lingual representations using XLM-RoBERTa and BERT. Learned how to ground generative LLM responses with deterministic classifiers and extracted entities to eliminate hallucinations in sensitive customer support scenarios.',
    links: { live: 'https://ieeexplore.ieee.org/abstract/document/11621397', code: '#' },
    featured: true,
    order_index: 1,
  },
  {
    slug: 'humara-sheher',
    title: 'Humara Sheher – City Discovery Platform',
    category: 'Product Management',
    role: 'Product Development',
    type: 'Product Project',
    tagline: 'Community discovery platform for uncovering local events, eateries, and unique city experiences through curated listings.',
    problem:
      'Local city events, food spots, and community experiences are scattered across social media, ticketing apps, and forums without a unified, verified local discovery guide for residents and visitors.',
    approach: [
      'Defined user personas, product roadmap, and feature prioritization for an intuitive local discovery interface.',
      'Engineered automated event collection pipelines that aggregate listings from community hubs and social calendars.',
      'Developed categorization and smart deduplication algorithms to merge duplicate listings and maintain high data cleanliness.',
      'Implemented seamless ticket-booking redirects and Google Maps location integration to streamline user conversion.',
    ],
    architecture:
      'Event Crawlers & User Submissions → Deduplication Engine → Categorization Pipeline → Curated Discovery Database → Next.js / React UI → Ticket Redirects',
    technologies: ['Product Strategy', 'Python', 'Feature Prioritization', 'Product Analytics', 'Data Deduplication', 'REST APIs', 'Next.js', 'React'],
    results: [
      'Automated event ingestion eliminating manual data entry across city events',
      'Unified event categorization covering nightlife, workshops, eateries, and culture',
      'Optimized booking redirect flow providing zero-friction conversion for attendees',
    ],
    learnings:
      'Product thinking requires rigorous curation and deduplication before scaling. Building Humara Sheher reinforced how data cleanliness and intuitive search filtering directly dictate user retention in hyper-local discovery products.',
    links: { live: '#', code: '#' },
    featured: true,
    order_index: 2,
  },
  {
    slug: 'brand-sutra',
    title: 'Brand Sutra – AI Brand Governance Platform',
    category: 'AI Projects',
    role: 'AI Product Strategy',
    type: 'AI Product Strategy',
    tagline: 'AI-powered content governance platform reviewing marketing assets against brand guidelines, tone, facts, and approved visuals.',
    problem:
      'Marketing teams and agencies struggle to maintain consistent brand voice, factual accuracy, and regulatory compliance across high-volume digital campaigns, resulting in off-brand content and costly revisions.',
    approach: [
      'Conceptualized the product vision and PRD for automated brand guideline auditing and marketing asset verification.',
      'Designed a multi-dimensional evaluation rubric analyzing tone of voice, forbidden claims, visual guidelines, and factual accuracy.',
      'Formulated the AI product architecture combining prompt chaining, guardrails, and reference knowledge grounding.',
      'Defined intuitive reviewer workflows enabling marketing managers to approve, reject, or auto-remedy flagged violations.',
    ],
    architecture:
      'Marketing Draft Input → Brand Rule Parser → LLM Compliance Evaluator → Fact-Checking Engine → Violation Highlighting UI → Remediation Generator',
    technologies: ['AI Product Strategy', 'LLM APIs', 'Prompt Engineering', 'LangChain', 'Python', 'Product Analytics', 'Compliance Workflows'],
    results: [
      'Established deterministic brand compliance scoring system for written and visual content',
      'Automated violation detection across tone, claim verification, and visual styling',
      'Reduced manual content review turnaround time for marketing teams',
    ],
    learnings:
      'Effective AI governance requires combining probabilistic model outputs with deterministic, rule-based criteria so business leaders can trust automated audits without fear of unpredictable outputs.',
    links: { live: '#', code: 'https://github.com/div874/Brand-Sutra' },
    featured: true,
    order_index: 3,
  },
  {
    slug: 'wallcurry-ai-recommendation',
    title: 'Wallcurry AI Recommendation Model',
    category: 'AI Projects',
    role: 'Design and Development',
    type: 'AI/ML Project',
    tagline: 'AI-driven personalized mural recommendation system integrating wall and object detection, lighting analysis, and user tastes.',
    problem:
      'Wallcurry, an art platform featuring 10,000+ mural listings, had no personalized discovery mechanism. Customers found it difficult to visualize how murals would match their specific wall dimensions, room lighting, and furniture aesthetics.',
    approach: [
      'Developed computer vision pipelines for wall boundary detection, room layout analysis, and lighting condition evaluation.',
      'Extracted visual feature embeddings using deep convolutional architectures to understand mural color palettes and artistic themes.',
      'Layered user taste preferences and room context over visual embeddings to compute personalized recommendation scores.',
      'Built a fast similarity retrieval engine using FAISS and exposed recommendations via a Python REST API.',
    ],
    architecture:
      'Room Image → Wall & Object Detection → Lighting Analysis → Visual Embeddings (ResNet/FAISS) → Re-ranking Engine → Recommendation API',
    technologies: ['Python', 'Computer Vision', 'Deep Learning', 'TensorFlow', 'FAISS', 'Flask', 'NumPy', 'VS Code'],
    results: [
      'Recommendation accuracy reached 88% based on user taste validation studies',
      '30% lift in mural conversions post-recommendation deployment',
      '45% of platform discovery shifted from manual search to personalized recommendations',
    ],
    learnings:
      'Learned the critical value of contextual inputs in visual recommendations. Recommending art is not just about catalog visual similarity; room lighting, wall dimensions, and surrounding furniture drastically impact aesthetic suitability.',
    links: { live: '#', code: '#' },
    featured: true,
    order_index: 4,
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
    technologies: ['Python', 'Google Search Console API', 'GA4 API', 'Pandas', 'Flask', 'SMTP', 'ReportLab', 'VS Code'],
    results: [
      'Reporting time reduced from 6 hours → 15 minutes per week',
      'Tracked 45+ keywords across 3 accounts in real time',
      'Identified 8 ranking drop-off issues proactively — before clients noticed',
      'Client satisfaction score: 4.9/5 for faster, consistent reporting',
    ],
    learnings:
      'This project reinforced that automation\'s biggest value is not just speed — it\'s consistency. Manual reports introduce human error and delay. Once automated, the system caught issues I would have missed in manual review. I also learned how to work with OAuth2 and service account authentication for Google APIs at a production level.',
    links: { live: '#', code: '#' },
    featured: false,
    order_index: 5,
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
    technologies: ['Python', 'Pandas', 'BigQuery', 'GA4 Data API', 'Looker Studio', 'SQL', 'Product Analytics'],
    results: [
      'Reallocated 22% of ad budget to high-performing mid-funnel campaigns',
      'Lowered Customer Acquisition Cost (CAC) by 18% across paid channels',
      'Enabled real-time attribution tracking for $50k+ monthly ad spend',
    ],
    learnings:
      'Understood the mathematical limitations of single-touch attribution models and how Markov chain transition probabilities reveal hidden assist channels in B2B customer journeys.',
    links: { live: '#', code: '#' },
    featured: false,
    order_index: 6,
  },
  {
    slug: 'nextjs-portfolio-engine',
    title: 'High-Performance Web Portfolio & Content Hub',
    category: 'Web Development Projects',
    role: 'Full-Stack Developer',
    type: 'Personal Project',
    tagline: 'Lightning-fast Next.js App Router web application with dark mode UI, structured JSON-LD, and dynamic hubs.',
    problem:
      'Traditional static portfolios lack rich content organization, programmatic SEO capabilities, and smooth interactive animations needed to showcase multidisciplinary expertise.',
    approach: [
      'Engineered modular UI components using Next.js, React 19, TypeScript, and Framer Motion.',
      'Implemented full OpenGraph metadata, Google-compliant JSON-LD structured schemas, and dynamic routing.',
      'Designed custom glassmorphic dark-theme design tokens in vanilla CSS for optimal visual experience.',
    ],
    architecture:
      'Next.js App Router → TypeScript → Tailwind & Custom CSS → Supabase / Static Data → Vercel Edge Hosting',
    technologies: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Git/GitHub', 'Vercel'],
    results: [
      '100/100 Lighthouse performance and SEO scores',
      'Sub-50ms page transitions with zero layout shift',
      'Full mobile responsiveness and accessible keyboard navigation',
    ],
    learnings:
      'Leveraged Next.js Server Components and client hydration boundaries to deliver rich animations without compromising fast initial paint metrics.',
    links: { live: 'https://www.divyanshchandra.online', code: 'https://github.com/div874/portfolio' },
    featured: false,
    order_index: 7,
  },
];

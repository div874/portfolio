export interface MetricItem {
  label: string;
  value: string;
  change: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  category: 'SEO Case Study' | 'Website Development Case Study' | 'AI Automation Case Study' | 'Digital Marketing Case Study';
  clientIndustry: string;
  timeframe: string;
  summary: string;
  heroImage?: string;
  metrics: MetricItem[];
  challenge: string[];
  strategy: string[];
  implementation: string[];
  results: string[];
  keyTakeaways: string[];
  technologies: string[];
  publishedDate: string;
}

export const CASE_STUDIES_CATEGORIES = [
  'All',
  'SEO Case Study',
  'Website Development Case Study',
  'AI Automation Case Study',
  'Digital Marketing Case Study'
] as const;

export const caseStudiesData: CaseStudy[] = [
  {
    slug: 'b2b-seo-ai-traffic-growth',
    title: 'SEO & AI Automation: Scaling B2B Organic Traffic by 240%',
    category: 'SEO Case Study',
    clientIndustry: 'B2B Software & Consulting',
    timeframe: '6 Months',
    summary:
      'A deep dive into how integrating technical SEO architecture with automated Python keyword tracking and AI content workflows drove a 240% surge in organic traffic and a 3.5x increase in qualified lead pipeline.',
    metrics: [
      {
        label: 'Organic Traffic Growth',
        value: '+240%',
        change: 'MoM Compound',
        description: 'Increased monthly non-branded search sessions across core service verticals.',
      },
      {
        label: 'Lead Pipeline',
        value: '3.5x',
        change: 'Qualified Inquiries',
        description: 'Higher conversion velocity from organic visitors to booked strategy calls.',
      },
      {
        label: 'Manual Reporting Saved',
        value: '180+ hrs',
        change: 'Over 6 Months',
        description: 'Automated Search Console & GA4 reporting pipelines using Python scripts.',
      },
      {
        label: 'Top 3 Keyword Ranks',
        value: '42 Keywords',
        change: '+28 New Rankings',
        description: 'High-intent B2B search terms secured on page 1 of Google.',
      }
    ],
    challenge: [
      'The client was relying on outdated static web pages with duplicate title tags, slow page response times, and unindexed pillar content.',
      'Their marketing team spent over 7 hours every week pulling manual metrics from Google Search Console, Google Analytics 4, and third-party tools.',
      'Organic search traffic had stagnated for 8 consecutive months, while competitors dominated high-intent transactional search queries.'
    ],
    strategy: [
      'Technical SEO Audit & Architecture Fix: Overhauled site structure, implemented schema markup (JSON-LD), optimized Core Web Vitals, and resolved canonical errors.',
      'Pillar-Cluster Content Strategy: Created comprehensive content clusters targeting bottom-of-funnel decision makers.',
      'Automated Data Intelligence: Built Python automated reporting pipelines fetching daily GSC & GA4 API data to detect rank changes and keyword cannibalization automatically.'
    ],
    implementation: [
      'Ran headless browser scripts and Python API integration to systematically clean metadata and internal linking across 150+ URLs.',
      'Configured Google Search Console API + Pandas ETL script to aggregate keyword performance daily into a central dataset.',
      'Deployed automated threshold alerts alerting the team whenever high-value page impressions dropped by more than 10% week-over-week.',
      'Engineered structured Schema markup (Organization, Service, FAQ, HowTo) to capture Google rich snippets.'
    ],
    results: [
      'Organic search traffic increased by 240% over 6 months without paid ad spend increases.',
      'Secured 42 high-intent search terms in the Top 3 search results on Google.',
      'Automated reporting eliminated 180+ hours of manual spreadsheet work across the 6-month period.',
      'Inbound demo and consultation requests grew by 350% as landing pages converted higher.'
    ],
    keyTakeaways: [
      'Technical health is the foundation: Fixing crawl efficiency and structural schema yielded immediate indexing speedups.',
      'Automation provides speed: Automated alerts allowed us to optimize underperforming keywords within days rather than waiting for monthly reports.',
      'Intent matches conversion: Focusing on high-intent transactional search queries outperformed vanity high-volume informational keywords.'
    ],
    technologies: ['Python', 'Google Search Console API', 'GA4 API', 'Pandas', 'Next.js SEO', 'JSON-LD Schema', 'Looker Studio'],
    publishedDate: '2026-08-15'
  }
];

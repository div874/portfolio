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

export const caseStudiesData: CaseStudy[] = [];

import type { DocumentAttachment } from '../utils/attachments';

export interface ProjectDetail {
  id?: string;
  slug: string;
  title: string;
  category: 'AI Projects' | 'Product Management' | string;
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
  'Product Management'
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
      'Event Crawlers & User Submissions → Deduplication Engine → Categorization Pipeline → Curated Discovery Database → Web UI → Ticket Redirects',
    technologies: ['Problem Framing', 'Feature Prioritization', 'Product Analytics', 'KPI Trees', 'Python', 'SQL', 'JavaScript', 'HTML/CSS', 'REST APIs', 'Git/GitHub', 'VS Code'],
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
    technologies: ['Problem Framing', 'Feature Prioritization', 'Product Analytics', 'LLM APIs', 'Prompt Engineering', 'LangChain', 'Python', 'REST APIs', 'Git/GitHub', 'VS Code'],
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
    title: 'Wallcurry Model (AI Mural Recommendation System)',
    category: 'AI Projects',
    role: 'Design and Development',
    type: 'AI/ML Project',
    tagline: 'AI-driven personalized mural recommendation system integrating wall and object detection, lighting analysis, and user preferences.',
    problem:
      'Wallcurry had no personalized discovery mechanism for mural designs. Customers found it difficult to select murals that suited their specific wall boundaries, room lighting conditions, and aesthetic preferences.',
    approach: [
      'Developed computer vision pipelines for wall and object detection across room photos.',
      'Implemented lighting condition analysis to evaluate ambient luminescence and color temperature.',
      'Combined room visual features with user design preferences to deliver personalized mural recommendations.',
      'Constructed recommendation ranking algorithms in Python within VS Code.',
    ],
    architecture:
      'Room Image Input → Wall & Object Detection → Lighting Condition Analysis → User Preference Scoring → Personalized Recommendation Output',
    technologies: ['Python', 'Deep Learning', 'Computer Vision', 'Object Detection', 'Lighting Analysis', 'Recommendation Algorithms', 'VS Code'],
    results: [
      'Engineered end-to-end mural recommendation pipeline for personalized suggestions',
      'Accurate wall boundary and room object segmentation across diverse room layouts',
      'Demonstrated high user satisfaction in matching mural art with room lighting conditions',
    ],
    learnings:
      'Learned the critical value of contextual inputs in visual recommendations. Recommending art is not just about catalog similarity; room lighting, wall dimensions, and surrounding furniture drastically impact aesthetic suitability.',
    links: { live: '#', code: '#' },
    featured: true,
    order_index: 4,
  },
];

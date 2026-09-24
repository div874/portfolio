import type { Metadata } from 'next';
import { Inter, Montserrat, Outfit } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-montserrat',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '600', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Divyansh Chandra | AI, Automation & Digital Marketing Specialist',
    template: '%s | Divyansh Chandra',
  },
  description: 'AI & Automation Specialist building Generative AI applications, Python workflow automation, and data-driven marketing systems to solve real business problems.',
  authors: [{ name: 'Divyansh Chandra' }],
  metadataBase: new URL('https://www.divyanshchandra.online'),
  alternates: {
    canonical: 'https://www.divyanshchandra.online/',
  },
  verification: {
    google: 'PlLnjFHCy6ggy3HjqfGTAiiqlVDM7u9aCiAi0DpC8vg',
  },
  openGraph: {
    type: 'website',
    title: 'Divyansh Chandra | AI, Automation & Digital Marketing Specialist',
    description: 'AI & Automation Specialist building Generative AI applications, Python workflow automation, and data-driven marketing systems to solve real business problems.',
    url: 'https://www.divyanshchandra.online/',
    siteName: 'Divyansh Chandra Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divyansh Chandra | AI, Automation & Digital Marketing Specialist',
    description: 'AI & Automation Specialist building Generative AI applications, Python workflow automation, and data-driven marketing systems to solve real business problems.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/favicon.png' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://www.divyanshchandra.online/#person',
      name: 'Divyansh Chandra',
      url: 'https://www.divyanshchandra.online/',
      jobTitle: 'AI, Automation & Digital Marketing Specialist',
      description:
        'Divyansh Chandra is an MBA Tech student at NMIMS specializing in AI application development, LLMs, Python process automation, technical SEO, and digital marketing data analytics.',
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'NMIMS (SVKM\'s NMIMS University)',
        url: 'https://www.nmims.edu/'
      },
      worksFor: {
        '@type': 'Organization',
        name: '1page.info',
        url: 'https://www.1page.info/'
      },
      knowsAbout: [
        'Generative AI & LLM Applications',
        'AI Agents & RAG Architectures',
        'Python ETL & Process Automation',
        'Recommendation Systems & FAISS Vector Embeddings',
        'Technical SEO & Programmatic Search Strategy',
        'Google Search Console API & GA4 Analytics',
        'React, Next.js & Full-Stack Development',
        'NMIMS MBA Tech Business Management & Engineering'
      ],
      sameAs: [
        'https://www.linkedin.com/in/div08/',
        'https://github.com/div874',
        'https://www.divyanshchandra.online/'
      ],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.accent-text', '.about-lead-text', '.section-label'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.divyanshchandra.online/#website',
      url: 'https://www.divyanshchandra.online/',
      name: 'Divyansh Chandra Portfolio',
      description:
        'Portfolio of Divyansh Chandra - AI, Automation & Digital Marketing Specialist.',
      publisher: {
        '@id': 'https://www.divyanshchandra.online/#person',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.divyanshchandra.online/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What services does Divyansh Chandra offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Divyansh Chandra builds AI-powered applications using Generative AI and LLMs, automates business workflows using Python ETL pipelines, and delivers technical SEO and data analytics solutions.',
          },
        },
        {
          '@type': 'Question',
          name: 'What technologies and frameworks does Divyansh specialize in?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Divyansh specializes in Python, TensorFlow, FAISS vector embeddings, Next.js, React, TypeScript, Supabase, Google Search Console API, and GA4 API.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

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
  title: 'Divyansh Chandra | AI, Automation & Digital Marketing',
  description: "Explore Divyansh Chandra's portfolio featuring AI, automation, digital marketing, SEO, Python, Generative AI, and real-world projects.",
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
    title: 'Divyansh Chandra | AI, Automation & Digital Marketing',
    description: "Explore Divyansh Chandra's portfolio featuring AI, automation, digital marketing, SEO, Python, Generative AI, and real-world projects.",
    url: 'https://www.divyanshchandra.online/',
    siteName: 'Divyansh Chandra Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divyansh Chandra | AI, Automation & Digital Marketing',
    description: "Explore Divyansh Chandra's portfolio featuring AI, automation, digital marketing, SEO, Python, Generative AI, and real-world projects.",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
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
      jobTitle: 'AI & Automation Developer',
      description:
        'Divyansh Chandra is an AI & Automation Developer specializing in Generative AI, LLMs, Python data engineering, automated workflow pipelines, and technical SEO.',
      knowsAbout: [
        'Generative AI',
        'LLMs & Prompt Engineering',
        'Python Data Engineering',
        'AI Automation & Workflow Engineering',
        'Recommendation Systems & Vector Embeddings',
        'Technical SEO & Analytics',
        'React & Web Development',
      ],
      sameAs: [
        'https://www.linkedin.com/in/div08/',
        'https://github.com/div874',
      ],
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

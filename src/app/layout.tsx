import { Sora } from 'next/font/google';

import './globals.css';

import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { ThirdwebProvider } from 'thirdweb/react';

import { Toaster } from '@/components/ui/Toaster';
import QueryProvider from '@/lib/providers/query-provider';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Red Flight | AI Jailbreaking CTF Game',
  description:
    'An immersive AI jailbreaking capture the flag game that challenges your skills in manipulating AI systems.',
  keywords: [
    'AI jailbreaking Game',
    'Prompt Injection',
    'Indirect Prompt Injection',
    'AI Indirect Prompt Injection Game',
    'CTF game',
    'Red Flight',
    'AI security',
    'AI Safety',
    'AI Prompt Injection Game',
    'cybersecurity',
    'AI CTF competition',
    'AI hacking challenge',
    'AI security training',
    'Cybersecurity game',
    'AI penetration testing',
  ],
  authors: [{ name: 'Red Flight Team' }],
  creator: 'Red Flight',
  publisher: 'Red Flight',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.redflight.io'), // Replace with your actual domain
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.redflight.io', // Replace with your actual domain
    title: 'Red Flight | AI Jailbreaking CTF Game',
    description:
      'Challenge your skills in manipulating AI systems with our immersive jailbreaking CTF game.',
    siteName: 'Red Flight',
    images: [
      {
        url: '/og-image.png', // Create this image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: 'Red Flight Game Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Red Flight | AI Jailbreaking CTF Game',
    description:
      'Challenge your skills in manipulating AI systems with our immersive jailbreaking CTF game.',
    creator: '@redflightAI',
    images: ['/og-image.png'], // Create this image (1200x675px recommended)
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.redflight.io', // Replace with your actual domain
    languages: {
      'en-US': 'https://www.redflight.io', // Replace with your actual domain
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Red Flight',
              url: 'https://www.redflight.io',
              description:
                'An immersive AI jailbreaking capture the flag game that challenges your skills in manipulating AI systems.',
              potentialAction: {
                '@type': 'SearchAction',
                target:
                  'https://www.redflight.io/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={sora.className}>
        <QueryProvider>
          <ThirdwebProvider>
            {children}
            <Toaster />
          </ThirdwebProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}

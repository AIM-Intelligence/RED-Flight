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

// Primary keywords for stronger SEO focus
const primaryKeywords = [
  'AI Jailbreaking',
  'Red Flight',
  'Prompt Injection',
  'AI Security CTF',
  'AI Red Teaming',
];

export const metadata: Metadata = {
  title: 'Red Flight | AI Jailbreaking CTF Game',
  description:
    "An immersive AI jailbreaking capture the flag game that challenges your skills in manipulating AI systems. Learn AI security through Red Flight's cutting-edge gameplay.",
  keywords: [
    ...primaryKeywords,
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
    'AI red teaming',
    'LLM jailbreaking',
    'AI model security',
    'AI sandbox escape',
    'adversarial prompting',
  ],
  authors: [{ name: 'Red Flight Team', url: 'https://www.redflight.io' }],
  creator: 'Red Flight',
  publisher: 'Red Flight',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.redflight.io'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.redflight.io',
    title: 'Red Flight | AI Jailbreaking CTF Game',
    description:
      'Challenge your skills in manipulating AI systems with our immersive jailbreaking CTF game.',
    siteName: 'Red Flight',
    images: [
      {
        url: '/og-image.png',
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
    images: ['/og-image.png'],
    site: '@redflightAI',
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
    canonical: 'https://www.redflight.io',
    languages: {
      'en-US': 'https://www.redflight.io',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#ff3131',
      },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'cybersecurity',
  verification: {
    google: 'add-your-verification-code',
  },
  applicationName: 'Red Flight',
  appleWebApp: {
    capable: true,
    title: 'Red Flight | AI Jailbreaking CTF Game',
    statusBarStyle: 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ff3131" />

        {/* Mobile-specific meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Red Flight" />
        <meta name="application-name" content="Red Flight" />

        {/* Explicit hreflang links */}
        <link
          rel="alternate"
          hrefLang="en-US"
          href="https://www.redflight.io"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.redflight.io"
        />

        {/* Structure data for better search engine understanding */}
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

        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Red Flight',
              url: 'https://www.redflight.io',
              logo: 'https://www.redflight.io/logo1.png',
              sameAs: [
                'https://twitter.com/redflightAI',
                'https://www.youtube.com/@aim-intelligence',
                'https://discord.gg/MvJcFmtEMj',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'contact@redflight.io',
                contactType: 'customer service',
              },
            }),
          }}
        />

        {/* Game structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Game',
              name: 'Red Flight',
              description:
                'An immersive AI jailbreaking capture the flag game that challenges your skills in manipulating AI systems.',
              url: 'https://www.redflight.io',
              genre: ['Cybersecurity', 'CTF', 'AI Security'],
              applicationCategory: 'Game',
              screenshot: 'https://www.redflight.io/og-image.png',
              author: {
                '@type': 'Organization',
                name: 'Red Flight Team',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              },
            }),
          }}
        />

        {/* Hidden SEO headings */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .seo-heading {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
          }
        `,
          }}
        />
      </head>
      <body className={sora.className}>
        {/* Hidden SEO headings */}
        <h1 className="seo-heading">Red Flight - AI Jailbreaking CTF Game</h1>
        <h2 className="seo-heading">
          Challenge your skills in AI security and prompt injection
        </h2>
        <h3 className="seo-heading">
          Learn AI Red Teaming through immersive gameplay
        </h3>

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

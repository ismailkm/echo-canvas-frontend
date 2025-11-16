import type { Metadata } from 'next';
import { Inter, Source_Sans_3 } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';
import BackgroundParticles from '@/components/BackgroundParticles';


const inter = Inter({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-inter' });
const sourceSans = Source_Sans_3({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-source-sans' });

export const metadata: Metadata = {
  title: 'Echo Canvas — Transform Sound Into Art',
  description:
    'A sanctuary for creative expression. Transform your voice, breath, and sound into emotionally resonant generative art. Radically accessible for everyone.',


};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f9f7f4',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSans.variable}`}>
      <head>
        {/* Prefers Reduced Motion */}
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </head>
      <body className="bg-calm-50 text-calm-900 antialiased">
        {/* Skip to main content link for keyboard navigation */}
        <a
          href="#main"
          className="absolute left-0 top-0 -translate-x-full rounded bg-calm-900 px-3 py-2 text-calm-50 focus:translate-x-0"
        >
          Skip to main content
        </a>

        {/* Header */}
        <Header />

        <main id="main" className="min-h-screen">
          <BackgroundParticles />
          {children}
        </main>

        {/* Global footer could go here */}
      </body>
    </html>
  );
}

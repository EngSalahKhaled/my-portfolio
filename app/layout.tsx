import type { Metadata } from 'next'
import { Outfit, JetBrains_Mono } from 'next/font/google'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import './globals.css'

/* ─── Google Fonts ─────────────────────────────────────────────────────────── */
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

/* ─── SEO Metadata ─────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Salah | Front-End Developer & Entrepreneur',
  description:
    'Portfolio of Salah — a Gemini-certified Front-End Developer and entrepreneur behind INFINITY BRIGHT. Specialising in React, Next.js, and modern web experiences.',
  keywords: ['Front-End Developer', 'React', 'Next.js', 'TypeScript', 'Portfolio', 'Salah'],
  authors: [{ name: 'Salah' }],
  openGraph: {
    title: 'Salah | Front-End Developer & Entrepreneur',
    description: 'Crafting premium digital experiences with React, Next.js, and TypeScript.',
    type: 'website',
  },
}

/* ─── Root Layout ───────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // lang/dir are updated client-side by LanguageContext — start with en/ltr
    <html lang="en" dir="ltr" className="scroll-smooth overflow-x-hidden">
      <head>
        {/* Tajawal — premium Arabic font */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${outfit.variable} ${jetbrains.variable} font-sans bg-dark text-white antialiased overflow-x-hidden`}
      >
        {/* LanguageProvider wraps all; provides lang + toggleLang everywhere */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

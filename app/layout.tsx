import type { Metadata } from 'next'
import { Outfit, JetBrains_Mono, Tajawal } from 'next/font/google'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import { ThemeProvider } from '@/lib/ThemeContext'
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

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
})

/* ─── Site URL ─────────────────────────────────────────────────────────────── */
// تأكد من أن هذا الرابط هو الرابط الحقيقي لموقعك بعد الرفع (Absolute URL)
const SITE_URL = 'https://salahkhaled.com'

/* ─── SEO Metadata ─────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Salah Khaled | Front End Developer in Riyadh',
  description:
    "Hire Salah Khaled, a Front End Developer building fast, modern, high-converting websites with Google-certified expertise. View projects and get in touch.",
  keywords: [
    'Front End Developer', 'Frontend Developer', 'Front-End Developer', 'Front End Developer Riyadh', 'React Developer', 'Next.js Developer', 'TypeScript',
    'Portfolio', 'Salah Khaled', 'Saudi Arabia', 'Web Developer Riyadh', 'Frontend Developer Saudi Arabia',
    'UI UX Developer', 'Gemini AI', 'Google Certified',
  ],
  authors: [{ name: 'Salah Khaled', url: SITE_URL }],
  creator: 'Salah Khaled',
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      ar: '/ar',
    },
  },
  openGraph: {
    title: 'Salah Khaled | Front End Developer in Riyadh',
    description: 'Hire Salah Khaled, a Front End Developer building fast, modern, high-converting websites with Google-certified expertise.',
    url: SITE_URL,
    siteName: 'Salah.dev Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`, // Ensure you use .jpg and absolute URL
        width: 1200,
        height: 630,
        alt: 'Salah Khaled - Front End Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salah Khaled | Front End Developer in Riyadh',
    description: 'Hire Salah Khaled, a Front End Developer building fast, modern, high-converting websites with Google-certified expertise.',
    images: [`${SITE_URL}/og-image.jpg`], // Use absolute URL for Twitter as well
  },
}

/* ─── JSON-LD Schema ────────────────────────────────────────────────────────── */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Salah Khaled',
  url: SITE_URL,
  jobTitle: 'Front-End Developer & Entrepreneur',
  sameAs: [
    'https://github.com/EngSalahKhaled',
    'https://www.linkedin.com/in/salahkhaled-dev/',
  ],
  knowsAbout: ['React', 'Next.js', 'TypeScript', 'Generative AI', 'Google Gemini API'],
  address: { '@type': 'PostalAddress', addressLocality: 'Riyadh', addressCountry: 'SA' },
}

/* ─── Root Layout ───────────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className={`${outfit.variable} ${jetbrains.variable} ${tajawal.variable} font-sans antialiased overflow-x-hidden`}>
        <ThemeProvider>
          <LanguageProvider>
            {/* SecurityWrapper removed — blocks devtools, hurts portfolio credibility */}
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Outfit, JetBrains_Mono, Tajawal } from 'next/font/google'
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
  title: 'Salah Khaled | Front End Developer in the Middle East',
  description:
    'Hire Salah Khaled, a Front End Developer serving the Middle East across Saudi Arabia, Egypt, and the UAE with fast, modern, high-converting websites and Google-certified expertise.',
  keywords: [
    'Front End Developer', 'Frontend Developer', 'Front-End Developer', 'Front End Developer Middle East', 'React Developer', 'Next.js Developer', 'TypeScript',
    'Portfolio', 'Salah Khaled', 'Middle East', 'Saudi Arabia', 'Egypt', 'UAE', 'Web Developer Middle East',
    'Frontend Developer Saudi Arabia', 'Frontend Developer Egypt', 'Frontend Developer UAE', 'UI UX Developer', 'Gemini AI', 'Google Certified',
  ],
  authors: [{ name: 'Salah Khaled', url: SITE_URL }],
  creator: 'Salah Khaled',
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/en',
    languages: {
      en: '/en',
      ar: '/ar',
      'x-default': '/en',
    },
  },
  openGraph: {
    title: 'Salah Khaled | Front End Developer in the Middle East',
    description: 'Hire Salah Khaled, a Front End Developer serving the Middle East across Saudi Arabia, Egypt, and the UAE with fast, modern, high-converting websites.',
    url: SITE_URL,
    siteName: 'Salah.dev Portfolio',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_AR'],
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
    title: 'Salah Khaled | Front End Developer in the Middle East',
    description: 'Hire Salah Khaled, a Front End Developer serving the Middle East across Saudi Arabia, Egypt, and the UAE with fast, modern, high-converting websites.',
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
  description:
    'Front End Developer serving the Middle East across Saudi Arabia, Egypt, and the UAE, specializing in React, Next.js, and high-converting web experiences.',
  image: `${SITE_URL}/og-image.jpg`,
  email: 'info@salahkhaled.com',
  sameAs: [
    'https://github.com/EngSalahKhaled',
    'https://www.linkedin.com/in/salahkhaled-dev/',
  ],
  knowsAbout: ['React', 'Next.js', 'TypeScript', 'Generative AI', 'Google Gemini API'],
  address: { '@type': 'PostalAddress', addressRegion: 'Middle East', addressCountry: 'SA' },
  areaServed: ['Saudi Arabia', 'Egypt', 'United Arab Emirates', 'Middle East'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'info@salahkhaled.com',
      areaServed: ['Saudi Arabia', 'Egypt', 'United Arab Emirates', 'Middle East'],
      availableLanguage: ['English', 'Arabic'],
    },
  ],
}

/* ─── Root Layout ───────────────────────────────────────────────────────────── */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = (await cookies()).get('preferred-lang')?.value === 'ar' ? 'ar' : 'en'
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} className="scroll-smooth overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className={`${outfit.variable} ${jetbrains.variable} ${tajawal.variable} font-sans antialiased overflow-x-hidden`}>
        <ThemeProvider>
          {/* SecurityWrapper removed — blocks devtools, hurts portfolio credibility */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

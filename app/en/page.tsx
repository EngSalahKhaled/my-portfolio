import type { Metadata } from 'next'
import HomePageContent from '@/components/HomePageContent'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'

export const metadata: Metadata = {
  title: 'Salah Khaled | Front End Developer in the Middle East',
  description:
    'Hire Salah Khaled, a Front End Developer serving the Middle East across Saudi Arabia, Egypt, and the UAE with React, Next.js, and Google-certified expertise.',
  alternates: {
    canonical: '/en',
    languages: {
      en: '/en',
      ar: '/ar',
      'x-default': '/en',
    },
  },
}

export default function EnglishHomePage() {
  return (
    <LanguageProvider initialLang="en" locked>
      <HomePageContent />
    </LanguageProvider>
  )
}

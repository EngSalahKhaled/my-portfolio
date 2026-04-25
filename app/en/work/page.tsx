import type { Metadata } from 'next'
import WorkPageContent from '@/components/WorkPageContent'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'

export const metadata: Metadata = {
  title: 'Work | Salah Khaled',
  description:
    'Explore selected frontend projects, case studies, and bilingual web experiences built by Salah Khaled for brands, founders, and operating teams.',
  alternates: {
    canonical: '/en/work',
    languages: {
      en: '/en/work',
      ar: '/ar/work',
      'x-default': '/en/work',
    },
  },
}

export default function EnglishWorkPage() {
  return (
    <LanguageProvider initialLang="en" locked>
      <WorkPageContent />
    </LanguageProvider>
  )
}

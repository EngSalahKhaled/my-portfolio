import type { Metadata } from 'next'
import HomePageContent from '@/components/HomePageContent'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'

export const metadata: Metadata = {
  title: 'صلاح خالد | مطور واجهات أمامية في الرياض',
  description:
    'استعن بصلاح خالد، مطور واجهات أمامية في الرياض، لبناء مواقع سريعة وعصرية تركّز على الأداء وتجربة المستخدم والتحويلات.',
  alternates: {
    canonical: '/ar',
    languages: {
      en: '/en',
      ar: '/ar',
    },
  },
}

export default function ArabicHomePage() {
  return (
    <LanguageProvider initialLang="ar" locked>
      <HomePageContent />
    </LanguageProvider>
  )
}

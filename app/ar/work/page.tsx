import type { Metadata } from 'next'
import WorkPageContent from '@/components/WorkPageContent'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'

export const metadata: Metadata = {
  title: 'الأعمال | صلاح خالد',
  description:
    'استعرض مشاريع الواجهة الأمامية ودراسات الحالة وتجارب الويب الثنائية اللغة التي نفذها صلاح خالد للعلامات التجارية والمؤسسين والفرق التشغيلية.',
  alternates: {
    canonical: '/ar/work',
    languages: {
      en: '/en/work',
      ar: '/ar/work',
      'x-default': '/en/work',
    },
  },
}

export default function ArabicWorkPage() {
  return (
    <LanguageProvider initialLang="ar" locked>
      <WorkPageContent />
    </LanguageProvider>
  )
}

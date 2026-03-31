'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { translations as tr } from '@/lib/i18n/translations'

export default function Footer() {
  const { lang } = useLanguage()
  const f = tr.footer
  const year = new Date().getFullYear()

  return (
    <footer className="py-8 border-t" style={{ borderColor: '#2A2A2A', background: '#0D0D0D' }}>
      <div className="section-wrapper flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <p>
          © {year}{' '}
          <span className="font-semibold" style={{ color: '#F5C518' }}>Salah</span>
          {' '}— {f.built[lang]}{' '}
          <span className="text-red-500" aria-hidden="true">♥</span>{' '}
          {f.using[lang]}
        </p>
        <div className="flex items-center gap-4">
          {[
            { href: '#hero',     label: lang === 'ar' ? 'الرئيسية' : 'Home' },
            { href: '#projects', label: lang === 'ar' ? 'مشاريعي' : 'Projects' },
            { href: '#contact',  label: lang === 'ar' ? 'تواصل' : 'Contact' },
          ].map(({ href, label }) => (
            <a key={href} href={href} className="hover:text-yellow-400 transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

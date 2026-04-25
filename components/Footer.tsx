'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { translations as tr } from '@/lib/i18n/translations'

export default function Footer() {
  const { lang, isAr } = useLanguage()
  const f = tr.footer
  const year = new Date().getFullYear()
  const homeHref = isAr ? '/ar' : '/en'
  const workHref = isAr ? '/ar/work' : '/en/work'
  const skillsHref = `${homeHref}#skills`
  const contactHref = `${homeHref}#contact`

  return (
    <footer
      className="py-8 border-t"
      style={{ borderColor: 'var(--dark-border)', background: 'var(--dark-bg)' }}
    >
      <div
        className="section-wrapper flex flex-col items-center gap-4 text-sm text-center sm:flex-row sm:justify-between sm:text-left"
        style={{ color: 'var(--text-muted)' }}
      >
        <p className="leading-relaxed">
          © {year}{' '}
          <span className="font-semibold" style={{ color: '#F5C518' }}>Salah Khaled</span>
          {' '}—{' '}{f.built[lang]}{' '}
          <span className="text-red-500" aria-hidden="true">♥</span>{' '}
          {f.using[lang]}
        </p>
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2">
          {[
            { href: homeHref,    label: lang === 'ar' ? 'الرئيسية' : 'Home' },
            { href: workHref,    label: lang === 'ar' ? 'الأعمال' : 'Work' },
            { href: skillsHref,  label: lang === 'ar' ? 'المهارات' : 'Skills' },
            { href: contactHref, label: lang === 'ar' ? 'تواصل' : 'Contact' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="transition-colors duration-200 whitespace-nowrap"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F5C518')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

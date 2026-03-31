'use client'

/**
 * lib/i18n/LanguageContext.tsx
 *
 * Global language state — provides lang + toggle to all components.
 * Persists choice in localStorage. Applies dir="rtl" to <html> for Arabic.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { type Lang } from './translations'

interface LanguageContextValue {
  lang: Lang
  toggleLang: () => void
  isAr: boolean
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  toggleLang: () => {},
  isAr: false,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to 'en' on server — hydrate from localStorage on client
  const [lang, setLang] = useState<Lang>('en')
  const [mounted, setMounted] = useState(false)

  // On first client render, read persisted preference
  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null
    if (stored === 'ar' || stored === 'en') setLang(stored)
    setMounted(true)
  }, [])

  // Apply dir + lang attribute whenever language changes
  useEffect(() => {
    if (!mounted) return
    const html = document.documentElement
    html.setAttribute('lang', lang)
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    // Keep font-mono RTL-friendly
    document.body.style.fontFamily = lang === 'ar'
      ? "var(--font-outfit), 'Tajawal', system-ui, sans-serif"
      : "var(--font-outfit), system-ui, sans-serif"
    localStorage.setItem('lang', lang)
  }, [lang, mounted])

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'))
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, isAr: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  )
}

/** Hook — use anywhere inside LanguageProvider */
export function useLanguage() {
  return useContext(LanguageContext)
}

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
import { useRouter } from 'next/navigation'
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

interface LanguageProviderProps {
  children: ReactNode
  initialLang?: Lang
  locked?: boolean
}

export function LanguageProvider({
  children,
  initialLang = 'en',
  locked = false,
}: LanguageProviderProps) {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>(initialLang)
  const [mounted, setMounted] = useState(false)

  // On first client render, read persisted preference
  useEffect(() => {
    if (locked) {
      setMounted(true)
      return
    }
    const stored = localStorage.getItem('lang') as Lang | null
    if (stored === 'ar' || stored === 'en') setLang(stored)
    setMounted(true)
  }, [locked])

  // Apply dir + lang attribute whenever language changes
  useEffect(() => {
    if (!mounted) return
    const html = document.documentElement
    html.setAttribute('lang', lang)
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    localStorage.setItem('lang', lang)
  }, [lang, mounted])

  const toggleLang = useCallback(() => {
    if (locked && typeof window !== 'undefined') {
      const nextLang: Lang = lang === 'en' ? 'ar' : 'en'
      localStorage.setItem('lang', nextLang)
      const hash = window.location.hash
      router.replace(`${nextLang === 'ar' ? '/ar' : '/en'}${hash}`, { scroll: false })
      return
    }
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'))
  }, [lang, locked, router])

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

'use client'

import { useRef, useEffect, useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { translations as tr } from '@/lib/i18n/translations'

/* ─── Generic scroll-reveal — uses HTMLElement to work on any tag ────────────
   FIX: Changed from useRef<HTMLDivElement> to useRef<T extends HTMLElement>
   so it can attach to <li>, <div>, or any element without TypeScript errors. */
function useScrollReveal<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─── Timeline Card ──────────────────────────────────────────────────────────
   Each item is its own component so useScrollReveal is called at the
   top level — never inside a .map() — fixing the React Hooks rule violation. */
interface TimelineCardProps {
  item: (typeof tr.business.timeline.items)[number]
  index: number
}

function TimelineCard({ item, index }: TimelineCardProps) {
  const { lang } = useLanguage()
  // ✅ FIX: ref typed as HTMLLIElement to match the <li> it attaches to
  const { ref, visible } = useScrollReveal<HTMLLIElement>()

  return (
    <li
      ref={ref}
      className={`relative transition-all duration-700 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Timeline dot */}
      <div className="timeline-dot absolute -left-6 top-1" aria-hidden="true" />

      {/* Card */}
      <div className="glass-card p-5 hover:border-yellow-400/30 transition-all duration-300 hover:-translate-y-0.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
          <h4 className="text-text-main font-semibold leading-tight">{item.title[lang]}</h4>
          <span className="text-xs font-mono flex-shrink-0" style={{ color: '#F5C518' }}>{item.year}</span>
        </div>
        <p className="text-sm font-medium mb-2" style={{ color: 'rgba(245, 197, 24,0.8)' }}>
          {item.company[lang]}
        </p>
        <p className="text-text-muted text-sm leading-relaxed">{item.desc[lang]}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.tags.map((tag) => (
            <span key={tag} className="skill-tag">{tag}</span>
          ))}
        </div>
      </div>
    </li>
  )
}

/* ─── MASHHOUR HUB Card ───────────────────────────────────────────────────*/
function MashhourHubCard() {
  const { lang } = useLanguage()
  // ✅ FIX: ref typed as HTMLDivElement — matches the <div> it attaches to
  const { ref, visible } = useScrollReveal<HTMLDivElement>()
  const mh = tr.business.mashhourHub

  const services = [
    { icon: '💻', label: mh.services.ppf[lang] },
    { icon: '📝', label: mh.services.ceramic[lang] },
    { icon: '🔐', label: mh.services.tint[lang] },
    { icon: '📁', label: mh.services.detailing[lang] },
  ]

  const stats = [
    { value: 'React', label: mh.stats.founded[lang] },
    { value: '15+', label: mh.stats.clients[lang] },
    { value: '99.9%',   label: mh.stats.certified[lang] },
    { value: mh.stats.riyadh[lang], label: mh.stats.location[lang] },
  ]

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-3xl transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      id="mashhour-hub-card"
    >
      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: 'var(--business-card-bg)' }}
        aria-hidden="true" />
      <div className="absolute inset-0 grid-lines-bg opacity-20" aria-hidden="true" />
      <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(245, 197, 24,0.2) 0%,transparent 70%)' }}
        aria-hidden="true" />

      <div className="relative z-10 p-8 md:p-10">
        {/* Brand header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#F5C518 0%,#F5C518 50%,#C09B00 100%)', color: '#0D0D0D' }}
            aria-hidden="true">MH</div>

          <div>
            <h3 className="text-2xl font-bold text-text-main tracking-wide">{mh.name[lang]}</h3>
            <p className="text-sm font-medium mt-0.5" style={{ color: '#F5C518' }}>{mh.tagline[lang]}</p>
          </div>

          <div className="sm:ml-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border"
              style={{ borderColor: 'rgba(245, 197, 24,0.3)', backgroundColor: 'rgba(245, 197, 24,0.1)', color: '#F5C518' }}>
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" aria-hidden="true" />
              {mh.badge[lang]}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-muted leading-relaxed mb-6">{mh.desc[lang]}</p>

        {/* Services */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {services.map(({ icon, label }) => (
            <div key={label}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-colors hover:border-yellow-400/30"
              style={{ borderColor: '#2A2A2A', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <span className="text-2xl" aria-hidden="true">{icon}</span>
              <span className="text-xs text-text-muted font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 pt-4 border-t border-dark-border">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-text-main font-bold text-lg leading-none">{value}</p>
              <p className="text-gray-500 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Business & Experience Section ─────────────────────────────────────────*/
export default function BusinessSection() {
  const { lang } = useLanguage()
  // ✅ FIX: ref typed as HTMLDivElement — matches the <div> it attaches to
  const { ref: headingRef, visible: headingVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section id="business" className="py-24 bg-dark" aria-label="Business and experience section">
      <div className="section-wrapper">

        {/* Section header */}
        <div
          ref={headingRef}
          className={`mb-16 transition-all duration-700 ${
            headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#F5C518' }}>
            {tr.business.sectionTag[lang]}
          </p>
          <h2 className="section-title mb-4">
            {tr.business.title[lang]}{' '}
            <span className="gradient-text">{tr.business.titleAccent[lang]}</span>
          </h2>
          <p className="text-text-muted max-w-xl leading-relaxed">{tr.business.subtitle[lang]}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Mashhour Hub card */}
          <MashhourHubCard />

          {/* Career timeline */}
          <div className="space-y-6" aria-label="Career timeline">
            <h3 className="text-lg font-semibold text-text-main mb-2">
              {tr.business.timeline.title[lang]}
            </h3>
            <div className="relative">
              <div className="absolute left-1.5 top-0 bottom-0 w-px bg-dark-border" aria-hidden="true" />
              <ul className="space-y-8 pl-8" role="list">
                {tr.business.timeline.items.map((item, i) => (
                  <TimelineCard key={item.year} item={item} index={i} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


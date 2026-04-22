'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { translations as tr } from '@/lib/i18n/translations'
import { useInView } from '@/lib/hooks/useInView'

/* ─── Animated skill bar ─────────────────────────────────────────────────────*/
function SkillBar({ name, level, active, delay }: {
  name: string; level: number; active: boolean; delay: number
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium" style={{ color: 'var(--text-muted)' }}>{name}</span>
        <span className="text-xs font-mono" style={{ color: '#F5C518' }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--skill-track)' }}>
        <div
          className="h-full rounded-full"
          style={{
            width: active ? `${level}%` : '0%',
            transitionDelay: `${delay}ms`,
            transition: 'width 900ms cubic-bezier(0.25,1,0.5,1)',
            background: 'linear-gradient(90deg,#C09B00 0%,#F5C518 60%,#FFD700 100%)',
          }}
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name}: ${level}%`}
        />
      </div>
    </div>
  )
}

/* ─── Skills Section ─────────────────────────────────────────────────────────*/
export default function SkillsSection() {
  const { lang } = useLanguage()
  // ✅ Shared hook — no more inline IntersectionObserver
  const { ref, inView } = useInView(0.1)

  const cats = tr.skills.categories

  const extraTech = [
    'JavaScript', 'Node.js', 'Python', 'SQL', 'Framer Motion',
    'GSAP', 'Redux', 'Zustand', 'Prisma', 'Supabase', 'Vercel', 'Arabic RTL UI',
  ]

  return (
    <section
      id="skills"
      className="py-24 bg-dark-surface"
      aria-label="Skills section"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="section-wrapper">

        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#F5C518' }}>
            {tr.skills.sectionTag[lang]}
          </p>
          <h2 className="section-title">
            {tr.skills.title[lang]} <span className="gradient-text">{tr.skills.titleAccent[lang]}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)' }} className="max-w-lg mx-auto">{tr.skills.subtitle[lang]}</p>
        </div>

        {/* Skill categories — staggered entrance via CSS animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cats.map((cat, ci) => (
            <div
              key={`${cat.icon}-${ci}`}
              className="glass-card p-6"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                transitionDelay: `${ci * 100}ms`,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
                <h3 className="font-bold text-lg" style={{ color: 'var(--text-main)' }}>{cat.title[lang]}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill, si) => {
                  const name = typeof skill.name === 'string' ? skill.name : skill.name[lang]
                  return (
                    <SkillBar
                      key={`${name}-${si}`}
                      name={name}
                      level={skill.level}
                      active={inView}
                      delay={ci * 100 + si * 70}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Extra tech pills */}
        <div
          className="text-center"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.4s ease',
            transitionDelay: '500ms',
          }}
        >
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{tr.skills.alsoComfort[lang]}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {extraTech.map((tech) => (
              <span key={tech} className="skill-tag">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

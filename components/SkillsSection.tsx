'use client'

import { useRef, useEffect, useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { translations as tr } from '@/lib/i18n/translations'

/* ─── Animated skill bar ─────────────────────────────────────────────────────*/
function SkillBar({ name, level, visible, delay }: {
  name: string; level: number; visible: boolean; delay: number
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-300 font-medium">{name}</span>
        <span className="text-xs font-mono" style={{ color: '#F5C518' }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#3A3A3A' }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: visible ? `${level}%` : '0%',
            transitionDelay: `${delay}ms`,
            background: 'linear-gradient(90deg,#C09B00 0%,#F5C518 60%,#FFD700 100%)',
          }}
          role="meter" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100}
          aria-label={`${name}: ${level}%`}
        />
      </div>
    </div>
  )
}

/* ─── Skills Section ─────────────────────────────────────────────────────────*/
export default function SkillsSection() {
  const { lang } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimating(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const cats = tr.skills.categories

  const extraTech = [
    'JavaScript', 'Node.js', 'Python', 'SQL', 'Framer Motion',
    'GSAP', 'Redux', 'Zustand', 'Prisma', 'Supabase', 'Vercel', 'Arabic RTL UI',
  ]

  return (
    <section id="skills" className="py-24 bg-dark-surface" aria-label="Skills section" ref={sectionRef}>
      <div className="section-wrapper">

        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#F5C518' }}>
            {tr.skills.sectionTag[lang]}
          </p>
          <h2 className="section-title">
            {tr.skills.title[lang]} <span className="gradient-text">{tr.skills.titleAccent[lang]}</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">{tr.skills.subtitle[lang]}</p>
        </div>

        {/* Skill categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 flex-wrap justify-center">
          {cats.map((cat, ci) => (
            <div
              key={ci}
              className={`glass-card p-6 transition-all duration-700 ${animating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${ci * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
                <h3 className="font-bold text-white text-lg">{cat.title[lang]}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill, si) => {
                  const name = typeof skill.name === 'string' ? skill.name : skill.name[lang]
                  return (
                    <SkillBar
                      key={si}
                      name={name}
                      level={skill.level}
                      visible={animating}
                      delay={ci * 150 + si * 80}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Extra tech pills */}
        <div
          className={`text-center transition-all duration-700 ${animating ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '500ms' }}
        >
          <p className="text-gray-500 text-sm mb-4">{tr.skills.alsoComfort[lang]}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {extraTech.map((tech) => (
              <span key={tech} className="skill-tag hover:bg-yellow-400/20 transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

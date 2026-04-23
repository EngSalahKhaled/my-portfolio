'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { translations as tr } from '@/lib/i18n/translations'

export default function ContactSection() {
  const { lang } = useLanguage()
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })
      
      if (!res.ok) {
        throw new Error('Failed to send')
      }
      
      setSubmitted(true)
      setFormState({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      alert(lang === 'ar' ? 'فشل إرسال الرسالة، يرجى المحاولة مرة أخرى لاحقاً.' : 'Failed to send message. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const c = tr.contact
  const INPUT_CLASS =
    'w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-200'
  const getInputStyle = () => ({
    background: 'var(--input-bg)',
    border: '1px solid var(--input-border)',
    color: 'var(--text-main)',
  })

  const onFocusInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--input-border-focus)'
  }
  const onBlurInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--input-border)'
  }

  const infoCards = [
    {
      icon: "📧",
      label: c.infoCards.email[lang],
      value: "info@salahkhaled.com",
      href: "mailto:info@salahkhaled.com",
    },
    {
      icon: "📍",
      label: c.infoCards.location[lang],
      value: c.infoCards.locationVal[lang],
      href: null,
    },
    {
      icon: "💼",
      label: c.infoCards.avail[lang],
      value: c.infoCards.availVal[lang],
      href: null,
    },
    {
      icon: "🕐",
      label: c.infoCards.response[lang],
      value: c.infoCards.responseVal[lang],
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-24 bg-dark-card" aria-label="Contact section" ref={sectionRef}>
      <div className="section-wrapper">

        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#F5C518' }}>
            {c.sectionTag[lang]}
          </p>
          <h2 className="section-title">
            {c.title[lang]} <span className="gradient-text">{c.titleAccent[lang]}</span>
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">{c.subtitle[lang]}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">

          {/* Contact info */}
          <div className={`lg:col-span-2 space-y-6 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {infoCards.map(({ icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 glass-card p-4">
                <span className="text-xl mt-0.5" aria-hidden="true">{icon}</span>
                <div>
                  <p className="text-text-muted text-xs font-medium uppercase tracking-wide">{label}</p>
                  {href ? (
                    <a href={href} className="text-text-main font-medium text-sm hover:text-gold transition-colors">{value}</a>
                  ) : (
                    <p className="text-text-main font-medium text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="glass-card p-8">
              {submitted ? (
                <div className="text-center py-8 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl"
                    style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)' }}>
                    ✅
                  </div>
                  <h3 className="text-text-main font-bold text-xl">{c.success.title[lang]}</h3>
                  <p className="text-text-muted text-sm">{c.success.desc[lang]}</p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline text-sm" id="contact-send-another-btn">
                    {c.success.again[lang]}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-text-muted text-xs font-medium uppercase tracking-wide">
                        {c.form.nameLabel[lang]}
                      </label>
                      <input
                        id="contact-name" name="name" type="text" required
                        placeholder={c.form.namePlaceholder[lang]}
                        value={formState.name} onChange={handleChange}
                        className={INPUT_CLASS} style={getInputStyle()}
                        autoComplete="name"
                        onFocus={onFocusInput}
                        onBlur={onBlurInput}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-text-muted text-xs font-medium uppercase tracking-wide">
                        {c.form.emailLabel[lang]}
                      </label>
                      <input
                        id="contact-email" name="email" type="email" required
                        placeholder={c.form.emailPlaceholder[lang]}
                        value={formState.email} onChange={handleChange}
                        className={INPUT_CLASS} style={getInputStyle()}
                        autoComplete="email"
                        onFocus={onFocusInput}
                        onBlur={onBlurInput}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-text-muted text-xs font-medium uppercase tracking-wide">
                      {c.form.messageLabel[lang]}
                    </label>
                    <textarea
                      id="contact-message" name="message" required rows={5}
                      placeholder={c.form.messagePlaceholder[lang]}
                      value={formState.message} onChange={handleChange}
                      className={`${INPUT_CLASS} resize-none`} style={getInputStyle()}
                      onFocus={onFocusInput}
                      onBlur={onBlurInput}
                    />
                  </div>

                  <button
                    type="submit" disabled={loading}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    id="contact-submit-btn"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 5.373 0 12h4z" />
                        </svg>
                        {c.form.sending[lang]}
                      </>
                    ) : (
                      <>
                        {c.form.send[lang]}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                          <path d="M3.105 2.289a.75.75 0 00-.826.95l1.903 6.322H13.5a.75.75 0 010 1.5H4.182l-1.903 6.323a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

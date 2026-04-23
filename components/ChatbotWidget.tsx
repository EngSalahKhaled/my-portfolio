'use client'

import { useState, useRef, useEffect, useCallback, FormEvent } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { translations as tr } from '@/lib/i18n/translations'

/* ─── Types ──────────────────────────────────────────────────────────────────*/
interface ChatMessage {
  id: number
  sender: 'user' | 'bot'
  text: string
  timestamp: string
}

/* ─── Bilingual AI reply engine ──────────────────────────────────────────────
   Detects keywords in both Arabic and English and responds in the UI language */
function getReply(msg: string, isAr: boolean): string {
  const m = msg.toLowerCase().trim()

  const matches = (keywords: string[]) => keywords.some((kw) => m.includes(kw))

  if (matches(['hello', 'hi', 'hey', 'مرحب', 'السلام', 'أهل', 'هلا', 'هاي', 'واتساب', 'whatsapp', 'رقم']))
    return isAr
      ? 'أهلاً بك! 👋 أنا المساعد الذكي. يمكنك سؤالي هنا، أو محادثة صلاح مباشرة عبر [واتساب من هنا](https://wa.me/966500438424)!'
      : "Hey! 👋 I'm the AI assistant. Ask me anything here, or chat with Salah directly on [WhatsApp here](https://wa.me/966500438424)!"

  if (matches(['darak', 'داراك', 'عقار', 'real estate', 'property', 'عقارات']))
    return isAr
      ? '**داراك** هو المشروع الرئيسي لصلاح — منصة متكاملة للعقارات والخدمات في السوق السعودية، مبنية بـ Next.js وTypeScript مع واجهة عربية RTL كاملة. 🏡'
      : '**Darak** is Salah\'s flagship project — a full real estate & services marketplace for Saudi Arabia, built with Next.js, TypeScript, and a full Arabic RTL UI. 🏡'

  if (matches(['infinity', 'إنفينيتي', 'سيار', 'car', 'protection', 'ppf', 'ceramic', 'حماية']))
    return isAr
      ? '**إنفينيتي برايت** هو مشروع صلاح لحماية السيارات في الرياض 🚗✨ — مركز معتمد من 3M متخصص في أفلام حماية الطلاء (PPF) والطلاء الخزفي وتظليل الزجاج. تأسس عام 2022.'
      : '**INFINITY BRIGHT** is Salah\'s car protection business in Riyadh 🚗✨ — a 3M-authorised centre specialising in PPF, ceramic coating & window tinting. Founded 2022.'

  if (matches(['skill', 'مهار', 'tech', 'stack', 'تقني', 'framework', 'react', 'next']))
    return isAr
      ? 'المجموعة التقنية لصلاح: **React وNext.js وTypeScript وTailwind CSS** ⚡. يُتقن أيضاً Node.js وSupabase وFramer Motion، مع خبرة تصميمية قوية من إدارة علامته التجارية الخاصة.'
      : "Salah's stack: **React, Next.js, TypeScript & Tailwind CSS** ⚡. He also knows Node.js, Supabase, Framer Motion — and has strong design instincts from running his own brand."

  if (matches(['hire', 'وظف', 'contact', 'تواصل', 'work together', 'collaborate', 'تعاون', 'project', 'مشروع']))
    return isAr
      ? 'مستعد للتعاون! 🤝 تواصل عبر [واتساب](https://wa.me/966500438424) أو انزل لقسم "تواصل معي". صلاح متاح للمشاريع الحرة والشراكات!'
      : 'Ready to collaborate! 🤝 Hit the [WhatsApp](https://wa.me/966500438424) button or scroll to Contact. Salah is open to freelance projects and partnerships!'

  if (matches(['gemini', 'google', 'certif', 'شهادة', 'certified']))
    return isAr
      ? 'صلاح حاصل على **شهادة Google Gemini المعتمدة** 🎓 — اعتراف بخبرته في أدوات الذكاء الاصطناعي وسير عمل التطوير الحديث. يمكنك رؤية الشهادة بالنقر على الـ badge في أعلى الصفحة!'
      : 'Salah holds a **Google Gemini Certified** credential 🎓 — recognising his expertise in AI tools and modern dev workflows. Click the badge at the top of the page to see the certificate!'

  if (matches(['riyadh', 'الرياض', 'saudi', 'سعودي', 'ksa', 'المملكة']))
    return isAr
      ? 'صلاح مقيم في **الرياض، المملكة العربية السعودية** 🇸🇦 ويعمل مع عملاء محليين ودوليين. يتحدث العربية والإنجليزية بطلاقة.'
      : 'Salah is based in **Riyadh, Saudi Arabia** 🇸🇦 and works with clients locally and internationally. Fluent in both Arabic and English.'

  if (matches(['experience', 'خبرة', 'background', 'خلفية', 'career', 'مسيرة', 'سنوات']))
    return isAr
      ? 'لدى صلاح أكثر من **3 سنوات** من خبرة تطوير الواجهات الأمامية 💻، يدير مشروعه التجاري الخاص، وأنجز أكثر من 20 مشروعاً. تفقد قسم "أعمالي" للمزيد!'
      : 'Salah has **3+ years** of front-end experience 💻, runs his own business, and has shipped 20+ projects. Check the Business section for the full timeline!'

  if (matches(['tadawul', 'تداول', 'trading', 'finance', 'مالي', 'stocks', 'signals']))
    return isAr
      ? '**تداول كابيتال** هو لوحة إشارات تداول آنية مع روبوت محادثة ذكي للأسواق المالية السعودية، مع رسوم متحركة بـ Framer Motion وواجهة عربية. 📈'
      : '**تداول كابيتال** is a live trading signals dashboard with AI chatbot for Saudi markets, featuring Framer Motion animations and full Arabic UI. 📈'

  if (matches(['thanks', 'شكر', 'شكراً', 'thank', 'appreciate', 'ممتاز', 'رائع', 'great']))
    return isAr
      ? 'العفو! 😊 هل تحتاج أي معلومات أخرى أو تود الحديث عبر [واتساب](https://wa.me/966500438424)؟'
      : "You're very welcome! 😊 Need anything else, or want to chat on [WhatsApp](https://wa.me/966500438424)?"

  // Default
  return isAr
    ? 'سؤال مثير للاهتمام! 🤔 يمكنك استكشاف الموقع أو التواصل السريع معي عبر زر واتساب في الأعلى.'
    : "Great question! 🤔 Feel free to explore the site or hit the WhatsApp button above to chat with me directly."
}

/* ─── Typing indicator ───────────────────────────────────────────────────────*/
function TypingIndicator() {
  return (
    <div
      className="flex gap-1.5 items-center px-4 py-3 rounded-2xl rounded-bl-sm"
      style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', maxWidth: '5rem' }}
      aria-label="Bot is typing"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full animate-bounce"
          style={{ background: 'rgba(245, 197, 24,0.6)', animationDelay: `${i * 150}ms` }}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

/* ─── Chatbot Widget ─────────────────────────────────────────────────────────*/
export default function ChatbotWidget() {
  const { lang, isAr } = useLanguage()
  const cb = tr.chatbot

  const [isOpen, setIsOpen]       = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping]   = useState(false)
  const [messages, setMessages]   = useState<ChatMessage[]>([])
  const [mounted, setMounted]     = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef       = useRef<HTMLInputElement>(null)

  /* ── Init on client only (avoids SSR hydration mismatch) ── */
  useEffect(() => {
    setMounted(true)
    setMessages([{
      id: 0,
      sender: 'bot',
      text: cb.initialMsg['en'],   // always start in EN; update below
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }])
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Translate the bot's initial greeting when language changes ── */
  useEffect(() => {
    if (!mounted) return
    setMessages((prev) =>
      prev.map((m) => m.id === 0 ? { ...m, text: cb.initialMsg[lang] } : m)
    )
  }, [lang, mounted, cb.initialMsg])

  /* ── Auto-scroll ── */
  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, isOpen])

  /* ── Focus input when opened ── */
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  /* ── Core send logic — usable for both typed input and quick prompts ── */
  const sendText = useCallback((text: string) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg: ChatMessage = { id: Date.now(), sender: 'user', text, timestamp: now }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    const delay = 800 + Math.random() * 700
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: getReply(text, isAr),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setIsTyping(false)
      setMessages((prev) => [...prev, botMsg])
      if (!isOpen) setHasUnread(true)
    }, delay)
  }, [isAr, isOpen])

  /* ── Form submit ── */
  const handleSubmit = useCallback((e?: FormEvent) => {
    e?.preventDefault()
    const text = inputValue.trim()
    if (!text) return
    setInputValue('')
    sendText(text)
  }, [inputValue, sendText])

  /* ── Render a single message bubble ── */
  const renderBubble = (msg: ChatMessage) => {
    const isBot = msg.sender === 'bot'
    return (
      <div key={msg.id} className={`flex gap-2 animate-fade-in ${isBot ? 'justify-start' : 'justify-end'}`}>
        {isBot && (
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-auto text-xs font-bold"
            style={{ background: 'linear-gradient(135deg,#F5C518,#F5C518)', color: '#0D0D0D' }}
            aria-hidden="true"
          >S</div>
        )}
        <div className={`flex flex-col gap-0.5 max-w-[82%] ${isBot ? 'items-start' : 'items-end'}`}>
          <div
            className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
              isBot ? 'rounded-bl-sm' : 'rounded-br-sm font-medium'
            }`}
            style={isBot
              ? { background: '#1A1A1A', border: '1px solid #2A2A2A', color: '#E5E5E5' }
              : { background: 'linear-gradient(135deg,#F5C518,#F5C518)', color: '#0D0D0D' }
            }
            lang={isBot ? lang : undefined}
          >
            {/* Render **bold** and [links](url) markdown snippets */}
            {msg.text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/).map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} style={isBot ? { color: '#F5C518' } : {}}>{part.slice(2, -2)}</strong>
              }
              if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
                const linkText = part.slice(1, part.indexOf(']'))
                const linkUrl = part.slice(part.indexOf('](') + 2, -1)
                return (
                  <a
                    key={i} href={linkUrl} target="_blank" rel="noopener noreferrer"
                    className="underline hover:text-white transition-colors"
                    style={{ color: '#F5C518' }}
                  >
                    {linkText}
                  </a>
                )
              }
              return part
            })}
          </div>
          <span className="text-[10px] px-1" style={{ color: '#555' }}>{msg.timestamp}</span>
        </div>
      </div>
    )
  }

  /* ── SSR stub — keeps FAB visible without triggering hydration mismatch ── */
  if (!mounted) {
    return (
      <div
        className="fixed bottom-4 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg"
        style={{ background: 'linear-gradient(135deg,#F5C518 0%,#F5C518 50%,#C09B00 100%)' }}
        aria-hidden="true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6" style={{ color: '#0D0D0D' }}>
          <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      </div>
    )
  }

  const quickPrompts = cb.quickPrompts[lang]

  return (
    <>
      {/* ── Chat window ── */}
      <div
        className={`fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 transition-all duration-300 ease-out w-[calc(100vw-32px)] sm:w-[340px] origin-bottom-right ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={cb.title[lang]}
        dir={isAr ? 'rtl' : 'ltr'}
        id="chatbot-window"
      >
        <div
          className="flex flex-col rounded-2xl overflow-hidden shadow-2xl border h-[55vh] max-h-[400px] min-h-[350px] sm:h-[480px]"
          style={{ borderColor: '#2A2A2A' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-3 sm:px-4 py-3 border-b"
            style={{ background: 'linear-gradient(135deg,#0D0D0D 0%,#1a1400 100%)', borderColor: '#2A2A2A' }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg,#F5C518,#C09B00)', color: '#0D0D0D' }}
                  aria-hidden="true"
                >S</div>
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2"
                  style={{ borderColor: '#0D0D0D' }}
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-text-main text-xs sm:text-sm font-semibold leading-none">{cb.title[lang]}</p>
                <p className="text-emerald-400 text-[10px] sm:text-xs mt-0.5">{cb.online[lang]}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* WhatsApp Call/Chat Button */}
              <a
                href="https://wa.me/966500438424"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#25D366] text-white hover:bg-[#128C7E] transition-all text-xs font-semibold shadow-md active:scale-95"
                title={isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 434.8h-.1c-33.6 0-66.4-9-95.3-26.1l-6.8-4-70.8 18.6 18.9-69-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.3 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                <span className="hidden sm:inline">{isAr ? 'واتساب' : 'WhatsApp'}</span>
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label={cb.close[lang]}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chat-scroll"
            style={{ background: '#141414' }}
            aria-live="polite"
            aria-label={isAr ? 'محادثة' : 'Chat messages'}
          >
            {messages.map(renderBubble)}

            {isTyping && (
              <div className="flex gap-2 justify-start animate-fade-in">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-auto text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg,#F5C518,#F5C518)', color: '#0D0D0D' }}
                  aria-hidden="true"
                >S</div>
                <TypingIndicator />
              </div>
            )}

            <div ref={messagesEndRef} aria-hidden="true" />
          </div>

          {/* Quick prompts — shown only at the start */}
          {messages.length <= 1 && (
            <div
              className="px-3 py-2 border-t flex gap-1.5 overflow-x-auto"
              style={{ background: '#141414', borderColor: '#2A2A2A' }}
            >
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendText(prompt)}
                  className="text-xs px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 transition-colors hover:opacity-80"
                  style={{
                    color: '#F5C518',
                    border: '1px solid rgba(245, 197, 24,0.25)',
                    background: 'rgba(245, 197, 24,0.05)',
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-3 border-t"
            style={{ background: '#141414', borderColor: '#2A2A2A' }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={cb.placeholder[lang]}
              className="flex-1 rounded-xl px-4 py-2 text-sm text-text-main placeholder-gray-600 focus:outline-none transition-all"
              style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(245, 197, 24,0.4)')}
              onBlur={(e)  => (e.target.style.borderColor = '#2A2A2A')}
              id="chatbot-input"
              aria-label={cb.placeholder[lang]}
              dir={isAr ? 'rtl' : 'ltr'}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110"
              style={{ background: 'linear-gradient(135deg,#F5C518,#C09B00)' }}
              aria-label={isAr ? 'إرسال' : 'Send'}
              id="chatbot-send-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`}
                style={{ color: '#0D0D0D' }}
              >
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.903 6.322H13.5a.75.75 0 010 1.5H4.182l-1.903 6.323a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* ── Floating Action Button ── */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="fixed bottom-4 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse-gold"
        style={{ background: 'linear-gradient(135deg,#F5C518 0%,#F5C518 50%,#C09B00 100%)' }}
        aria-label={isOpen ? cb.close[lang] : cb.open[lang]}
        id="chatbot-toggle-btn"
      >
        {/* Unread badge */}
        {hasUnread && !isOpen && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-text-main font-bold flex items-center justify-center"
            aria-label={isAr ? 'رسالة جديدة' : 'New message'}
          >1</span>
        )}

        {/* X icon when open */}
        <span className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6" style={{ color: '#0D0D0D' }}>
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </span>

        {/* Chat icon when closed */}
        <span className={`absolute transition-all duration-300 ${isOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6" style={{ color: '#0D0D0D' }}>
            <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </span>
      </button>
    </>
  )
}


/**
 * lib/i18n/translations.ts
 *
 * Central translation dictionary.
 * All UI strings are defined here in both Arabic (ar) and English (en).
 * Components import the `useTranslation` hook and `Lang` type from this file.
 */

export type Lang = "en" | "ar";

export const translations = {
  /* ─── Navigation ──────────────────────────────────────────────────────────── */
  nav: {
    about: { en: "About", ar: "عني" },
    projects: { en: "Projects", ar: "مشاريعي" },
    business: { en: "Business", ar: "أعمالي" },
    skills: { en: "Skills", ar: "المهارات" },
    contact: { en: "Contact", ar: "تواصل" },
    hireMe: { en: "Hire Me", ar: "وظّفني" },
  },

  /* ─── Hero ────────────────────────────────────────────────────────────────── */
  hero: {
    badge: { en: "Gemini Certified Student", ar: "طالب معتمد من Gemini" },
    greeting: { en: "Hello, I'm", ar: "مرحباً، أنا" },
    bio: {
      en: "I craft <gold>high-performance</gold> web experiences and build businesses that solve real-world problems. From code to company — I thrive at the intersection of tech and entrepreneurship.",
      ar: "أبني تجارب ويب <gold>عالية الأداء</gold> وأنشئ مشاريع تحل مشكلات حقيقية. من الكود إلى الشركة — أتميز عند تقاطع التقنية وريادة الأعمال.",
    },
    viewWork: { en: "View My Work", ar: "اكتشف أعمالي" },
    getInTouch: { en: "Get In Touch", ar: "تواصل معي" },
    availableFor: { en: "Available for", ar: "متاح لـ" },
    freelance: { en: "Freelance 🚀", ar: "العمل الحر 🚀" },
    basedIn: { en: "Based in", ar: "موقعي" },
    location: { en: "🇸🇦 Riyadh, KSA", ar: "🇸🇦 الرياض، السعودية" },
    typewriterPhrases: {
      en: [
        "Front-End Developer",
        "React & Next.js Engineer",
        "UI/UX Enthusiast",
        "Entrepreneur & Innovator",
      ],
      ar: [
        "مطوّر واجهات أمامية",
        "مهندس React & Next.js",
        "مصمم تجارب مستخدم",
        "رائد أعمال ومبتكر",
      ],
    },
    stats: {
      yearsExp: { en: "Years Experience", ar: "سنوات خبرة" },
      projects: { en: "Projects Shipped", ar: "مشروع منجز" },
      businesses: { en: "Active Businesses", ar: "مشاريع تجارية" },
      certs: { en: "Google Certification", ar: "شهادة Google" },
    },
    scroll: { en: "Scroll", ar: "انتقل" },
  },

  /* ─── Projects ────────────────────────────────────────────────────────────── */
  projects: {
    sectionTag: { en: "My Work", ar: "أعمالي" },
    title: { en: "Featured", ar: "مشاريع" },
    titleAccent: { en: "Projects", ar: "مميزة" },
    subtitle: {
      en: "A curated selection of products, platforms, and experiments I've shipped — from Saudi real estate to car protection dashboards.",
      ar: "مجموعة مختارة من المنتجات والمنصات والتجارب التي أطلقتها — من العقارات السعودية إلى لوحات حماية السيارات.",
    },
    featured: { en: "⭐ Featured", ar: "⭐ مميز" },
    filters: {
      all: { en: "All", ar: "الكل" },
      webApps: { en: "Web Apps", ar: "تطبيقات" },
      uiDesign: { en: "UI Design", ar: "تصميم UI" },
      mobile: { en: "Mobile", ar: "موبايل" },
    },
    status: {
      live: { en: "Live", ar: "مباشر" },
      inDevelopment: { en: "In Development", ar: "قيد التطوير" },
      caseStudy: { en: "Case Study", ar: "دراسة حالة" },
    },
    noProjects: {
      en: "No projects in this category yet — check back soon!",
      ar: "لا توجد مشاريع في هذه الفئة بعد — تابعنا قريباً!",
    },
  },

  /* ─── Business ────────────────────────────────────────────────────────────── */
  business: {
    sectionTag: { en: "Business & Background", ar: "الأعمال والخلفية" },
    title: { en: "Tech Meets", ar: "التقنية تلتقي" },
    titleAccent: { en: "Entrepreneurship", ar: "بريادة الأعمال" },
    subtitle: {
      en: "I don't just build for others — I build for myself. Running my own business alongside my development career gives me a unique perspective on what matters: user experience, reliability, and ROI.",
      ar: "لا أبني للآخرين فحسب — بل أبني لنفسي أيضاً. إدارة مشروعي الخاص جانباً مع مسيرتي التطويرية يمنحني منظوراً فريداً على ما يهم: تجربة المستخدم والموثوقية والعائد على الاستثمار.",
    },
    infinityBright: {
      name: { en: "INFINITY BRIGHT", ar: "INFINITY BRIGHT" },
      tagline: {
        en: "Car Protection Services · Riyadh, Saudi Arabia",
        ar: "خدمات حماية السيارات · الرياض، المملكة العربية السعودية",
      },
      badge: { en: "3M Authorized Dealer", ar: "وكيل معتمد من 3M" },
      desc: {
        en: "INFINITY BRIGHT is Riyadh's premium car protection centre operating under the parent company مؤسسة نوادر الفرسان للتجارة. We specialise in 3M Paint Protection Film, ceramic coating, window tinting, and full detailing services — delivering luxury care for luxury vehicles.",
        ar: "إنفينيتي برايت هي مركز حماية السيارات الفاخر في الرياض، يعمل تحت مظلة مؤسسة نوادر الفرسان للتجارة. نتخصص في أفلام حماية الطلاء 3M، والطلاء الخزفي، وتظليل الزجاج، وخدمات التنظيف الشاملة — نقدم رعاية فاخرة للسيارات الفاخرة.",
      },
      services: {
        ppf: { en: "PPF Coating", ar: "فيلم حماية الطلاء" },
        ceramic: { en: "Ceramic Shield", ar: "طلاء خزفي" },
        tint: { en: "Window Tint", ar: "تظليل زجاج" },
        detailing: { en: "Car Detailing", ar: "تنظيف شامل" },
      },
      stats: {
        founded: { en: "Founded", ar: "سنة التأسيس" },
        clients: { en: "Happy Clients", ar: "عميل سعيد" },
        certified: { en: "Certified", ar: "معتمد" },
        location: { en: "Location", ar: "الموقع" },
        riyadh: { en: "Riyadh", ar: "الرياض" },
      },
    },
    timeline: {
      title: { en: "Career Timeline", ar: "المسيرة المهنية" },
      items: [
        {
          year: "2023 – Present",
          title: {
            en: "Front-End Engineer & Founder",
            ar: "مهندس واجهات أمامية ومؤسس",
          },
          company: { en: "Freelance / Self-employed", ar: "عمل حر / مستقل" },
          desc: {
            en: "Designing and developing premium web products for clients across Saudi Arabia and internationally. Specialising in React, Next.js, and TypeScript.",
            ar: "تصميم وتطوير منتجات ويب متميزة للعملاء في المملكة العربية السعودية وعلى المستوى الدولي. متخصص في React وNext.js وTypeScript.",
          },
          tags: ["React", "Next.js", "TypeScript", "Tailwind"],
        },
        {
          year: "2025 – Present",
          title: { en: "Owner & General Manager", ar: "المالك والمدير العام" },
          company: {
            en: "INFINITY BRIGHT — Car Protection",
            ar: "إنفينيتي برايت — حماية السيارات",
          },
          desc: {
            en: "Founded and managing INFINITY BRIGHT, a 3M-authorised car protection centre in Riyadh. Overseeing operations, team management, marketing, and brand development.",
            ar: "تأسيس وإدارة مركز إنفينيتي برايت لحماية السيارات المعتمد من 3M في الرياض. الإشراف على العمليات وإدارة الفريق والتسويق وتطوير العلامة التجارية.",
          },
          tags: ["Entrepreneurship", "Operations", "Branding", "Riyadh"],
        },
        {
          year: "2021 – 2022",
          title: { en: "Junior Front-End Developer", ar: "مطوّر واجهات مبتدئ" },
          company: {
            en: "Tech Internship · KSA",
            ar: "تدريب تقني · المملكة العربية السعودية",
          },
          desc: {
            en: "Built responsive UI components, maintained legacy codebases, and collaborated with design teams to deliver pixel-perfect implementations.",
            ar: "بناء مكونات UI متجاوبة والحفاظ على قواعد الكود القديمة والتعاون مع فرق التصميم لتقديم تطبيقات دقيقة.",
          },
          tags: ["HTML", "CSS", "JavaScript", "Git"],
        },
      ],
    },
  },

  /* ─── Skills ──────────────────────────────────────────────────────────────── */
  skills: {
    sectionTag: { en: "What I Know", ar: "ما أتقنه" },
    title: { en: "Skills &", ar: "المهارات" },
    titleAccent: { en: "Expertise", ar: "والخبرات" },
    subtitle: {
      en: "A blend of technical depth and entrepreneurial breadth, refined through real-world projects and business ownership.",
      ar: "مزيج من العمق التقني وسعة الأفق الريادي، مُصقَّل عبر مشاريع حقيقية وإدارة الأعمال.",
    },
    alsoComfort: { en: "Also comfortable with", ar: "أيضاً مرتاح مع" },
    categories: [
      {
        title: { en: "Front-End", ar: "الواجهة الأمامية" },
        icon: "⚡",
        skills: [
          { name: "React / Next.js", level: 90 },
          { name: "TypeScript", level: 85 },
          { name: "Tailwind CSS", level: 92 },
          { name: "HTML5 / CSS3", level: 95 },
        ],
      },
      {
        title: { en: "Tools & Workflow", ar: "الأدوات وسير العمل" },
        icon: "🛠️",
        skills: [
          { name: "Git / GitHub", level: 88 },
          { name: "Postman / APIs", level: 80 },
          { name: "Vercel / CI-CD", level: 80 },
          { name: "REST APIs", level: 85 },
        ],
      },
      {
        title: { en: "Business", ar: "الأعمال" },
        icon: "📈",
        skills: [
          { name: { en: "Entrepreneurship", ar: "ريادة أعمال" }, level: 90 },
          {
            name: { en: "Brand Strategy", ar: "استراتيجية العلامة" },
            level: 82,
          },
          { name: { en: "Operations Mgmt", ar: "إدارة العمليات" }, level: 88 },
          { name: { en: "Client Relations", ar: "علاقات العملاء" }, level: 93 },
        ],
      },
      {
        title: { en: "AI & Prompts", ar: "أدوات الذكاء الاصطناعي" },
        icon: "🤖",
        skills: [
          { name: "Gemini & Claude", level: 95 },
          { name: "ChatGPT Plus", level: 90 },
          { name: "GitHub Copilot", level: 88 },
          { name: "Midjourney", level: 85 },
        ],
      },
      {
        title: { en: "Backend & DB", ar: "التطوير الخلفي وقواعد البيانات" },
        icon: "🗄️",
        skills: [
          {
            name: { en: "Node.js (Learning)", ar: "Node.js (قيد التعلم)" },
            level: 40,
          },
          { name: "MongoDB", level: 65 },
          { name: "Firebase", level: 80 },
          { name: "Supabase", level: 75 },
        ],
      },
      {
        title: { en: "UI/UX & Design", ar: "تصميم واجهات المستخدم" },
        icon: "🎨",
        skills: [
          { name: "Figma & FigJam", level: 85 },
          { name: "Wireframing", level: 80 },
          { name: "Prototyping", level: 82 },
          { name: "UX Principles", level: 75 },
        ],
      },
    ],
  },

  /* ─── Contact ─────────────────────────────────────────────────────────────── */
  contact: {
    sectionTag: { en: "Get In Touch", ar: "تواصل معي" },
    title: { en: "Let's", ar: "لنعمل" },
    titleAccent: { en: "Work Together", ar: "معاً" },
    subtitle: {
      en: "Open to freelance projects, full-time opportunities, and collaboration. Drop me a line — I reply within 24 hours.",
      ar: "متاح للمشاريع الحرة والفرص الوظيفية والتعاون. أرسل لي رسالة — أرد خلال 24 ساعة.",
    },
    infoCards: {
      email: { en: "Email", ar: "البريد الإلكتروني" },
      location: { en: "Location", ar: "الموقع" },
      locationVal: {
        en: "Riyadh, Saudi Arabia",
        ar: "الرياض، المملكة العربية السعودية",
      },
      avail: { en: "Availability", ar: "التوفر" },
      availVal: { en: "Open to opportunities", ar: "متاح للفرص" },
      response: { en: "Response Time", ar: "وقت الرد" },
      responseVal: { en: "Within 24 hours", ar: "خلال 24 ساعة" },
    },
    form: {
      nameLabel: { en: "Your Name", ar: "اسمك" },
      namePlaceholder: { en: "Ahmed Al-Rashid", ar: "أحمد الراشد" },
      emailLabel: { en: "Email Address", ar: "البريد الإلكتروني" },
      emailPlaceholder: { en: "you@example.com", ar: "you@example.com" },
      messageLabel: { en: "Message", ar: "الرسالة" },
      messagePlaceholder: {
        en: "Tell me about your project or opportunity...",
        ar: "أخبرني عن مشروعك أو الفرصة...",
      },
      send: { en: "Send Message", ar: "إرسال الرسالة" },
      sending: { en: "Sending…", ar: "جارٍ الإرسال…" },
    },
    success: {
      title: { en: "Message Sent!", ar: "تم إرسال الرسالة!" },
      desc: {
        en: "Thanks for reaching out! Salah will get back to you within 24 hours.",
        ar: "شكراً للتواصل! سيرد عليك صلاح خلال 24 ساعة.",
      },
      again: { en: "Send Another Message", ar: "إرسال رسالة أخرى" },
    },
  },

  /* ─── Chatbot ─────────────────────────────────────────────────────────────── */
  chatbot: {
    title: { en: "Salah's Assistant", ar: "مساعد صلاح" },
    online: { en: "● Online", ar: "● متصل" },
    placeholder: { en: "Ask anything...", ar: "اسأل أي شيء..." },
    initialMsg: {
      en: "Hi! I'm Salah's AI assistant 👋 Ask me anything about his projects, skills, or availability.",
      ar: "مرحباً! أنا المساعد الذكي لصلاح 👋 اسألني أي شيء عن مشاريعه أو مهاراته أو توفره.",
    },
    quickPrompts: {
      en: [
        "Tell me about Darak",
        "What skills does Salah have?",
        "How can I hire Salah?",
      ],
      ar: ["أخبرني عن داراك", "ما هي مهارات صلاح؟", "كيف أوظف صلاح؟"],
    },
    open: { en: "Open AI chat", ar: "افتح المحادثة" },
    close: { en: "Close AI chat", ar: "أغلق المحادثة" },
  },

  /* ─── Footer ──────────────────────────────────────────────────────────────── */
  footer: {
    built: { en: "Built with", ar: "بُني بـ" },
    using: {
      en: "using Next.js & Tailwind CSS.",
      ar: "باستخدام Next.js و Tailwind CSS.",
    },
  },
} as const;

/** Helper type to get a string value in the right language */
export function t(key: { en: string; ar: string }, lang: Lang): string {
  return key[lang];
}

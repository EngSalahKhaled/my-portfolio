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
    home: { en: "Home", ar: "الرئيسية" },
    work: { en: "Work", ar: "الأعمال" },
    about: { en: "About", ar: "عني" },
    projects: { en: "Projects", ar: "مشاريعي" },
    business: { en: "Business", ar: "أعمالي" },
    skills: { en: "Skills", ar: "المهارات" },
    contact: { en: "Contact", ar: "تواصل" },
    hireMe: { en: "Hire Me", ar: "وظّفني" },
  },

  /* ─── Hero ────────────────────────────────────────────────────────────────── */
  hero: {
    badge: { en: "Google Certified Specialist", ar: "متخصص معتمد من Google" },
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
    location: { en: "Middle East | Saudi Arabia, Egypt, UAE", ar: "الشرق الأوسط | السعودية، مصر، الإمارات" },
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
    caseStudies: {
      sectionTag: { en: "Inside The Work", ar: "داخل العمل" },
      title: { en: "Selected", ar: "دراسات" },
      titleAccent: { en: "Case Studies", ar: "حالة مختارة" },
      subtitle: {
        en: "A quick look at the challenge, approach, and measurable impact behind a few standout builds.",
        ar: "نظرة سريعة على التحدي والمنهج والأثر القابل للقياس خلف بعض المشاريع البارزة.",
      },
      challenge: { en: "Challenge", ar: "التحدي" },
      approach: { en: "Approach", ar: "المنهج" },
      outcome: { en: "Outcome", ar: "النتيجة" },
      cta: { en: "View Project", ar: "عرض المشروع" },
    },
    preview: {
      sectionTag: { en: "Selected Work", ar: "أعمال مختارة" },
      title: { en: "A focused look at", ar: "نظرة مركزة على" },
      titleAccent: { en: "recent projects", ar: "أحدث الأعمال" },
      subtitle: {
        en: "Three representative builds that show how I approach product clarity, bilingual UX, and conversion-focused frontend work.",
        ar: "ثلاثة أعمال تمثل طريقة تفكيري في وضوح المنتج وتجربة الاستخدام الثنائية اللغة والواجهات الموجهة للتحويل.",
      },
      cta: { en: "View Full Work Page", ar: "عرض صفحة الأعمال كاملة" },
    },
  },

  results: {
    sectionTag: { en: "Business Impact", ar: "الأثر التجاري" },
    title: { en: "Results That", ar: "نتائج" },
    titleAccent: { en: "Move Metrics", ar: "تحرّك الأرقام" },
    subtitle: {
      en: "I focus on outcomes, not just polish — faster launches, stronger conversion paths, and systems teams can actually use.",
      ar: "أركّز على النتائج لا المظهر فقط: إطلاق أسرع، مسارات تحويل أقوى، وأنظمة يمكن للفرق استخدامها فعلاً.",
    },
    items: [
      {
        value: "+38%",
        label: { en: "Lead Quality", ar: "جودة العملاء المحتملين" },
        detail: {
          en: "Clearer positioning and streamlined contact flows improved enquiry intent.",
          ar: "التموضع الواضح ومسارات التواصل المبسطة حسّنا نية الاستفسار وجودته.",
        },
      },
      {
        value: "-42%",
        label: { en: "Faster Load Times", ar: "تحسن سرعة التحميل" },
        detail: {
          en: "Optimised assets, lighter UI patterns, and cleaner page structure.",
          ar: "تحسين الأصول، وتخفيف عناصر الواجهة، وبنية صفحات أنظف.",
        },
      },
      {
        value: "200+",
        label: { en: "Client Records Managed", ar: "سجلات عملاء مُدارة" },
        detail: {
          en: "Operational dashboards built to support bookings, teams, and follow-up.",
          ar: "لوحات تشغيلية تدعم الحجوزات والفرق والمتابعة اليومية.",
        },
      },
      {
        value: "24h",
        label: { en: "Typical Delivery Response", ar: "زمن الاستجابة المعتاد" },
        detail: {
          en: "Fast iteration cycles for founders, brands, and internal teams.",
          ar: "دورات تنفيذ سريعة للمؤسسين والعلامات التجارية والفرق الداخلية.",
        },
      },
    ],
  },

  services: {
    sectionTag: { en: "What I Offer", ar: "ما الذي أقدمه" },
    title: { en: "Services Built Around", ar: "خدمات مبنية حول" },
    titleAccent: { en: "Real Business Needs", ar: "احتياجات العمل الحقيقية" },
    subtitle: {
      en: "I help businesses launch faster, present better, and operate with more clarity across web experiences and internal tools.",
      ar: "أساعد الشركات على الإطلاق أسرع، والظهور بشكل أقوى، والعمل بوضوح أكبر عبر تجارب الويب والأدوات الداخلية.",
    },
    items: [
      {
        title: { en: "Landing Pages", ar: "صفحات هبوط" },
        desc: {
          en: "High-converting pages for offers, launches, and paid traffic campaigns.",
          ar: "صفحات عالية التحويل للعروض والإطلاقات والحملات المدفوعة.",
        },
      },
      {
        title: { en: "Dashboards & Admin Panels", ar: "لوحات تحكم وإدارة" },
        desc: {
          en: "Operational interfaces that help teams manage content, bookings, users, and workflows.",
          ar: "واجهات تشغيلية تساعد الفرق على إدارة المحتوى والحجوزات والمستخدمين وسير العمل.",
        },
      },
      {
        title: { en: "Bilingual Websites", ar: "مواقع ثنائية اللغة" },
        desc: {
          en: "Arabic/English experiences with proper RTL support and polished UX on both sides.",
          ar: "تجارب عربية وإنجليزية مع دعم RTL احترافي وتجربة مستخدم مصقولة في اللغتين.",
        },
      },
      {
        title: { en: "Frontend Systems", ar: "أنظمة واجهات أمامية" },
        desc: {
          en: "Scalable component-driven builds using React, Next.js, and TypeScript.",
          ar: "بناءات قابلة للتوسع معتمدة على المكونات باستخدام React وNext.js وTypeScript.",
        },
      },
    ],
    ctaPrimary: { en: "Discuss Your Project", ar: "ناقش مشروعك" },
    ctaSecondary: { en: "See My Work", ar: "شاهد أعمالي" },
  },

  testimonials: {
    sectionTag: { en: "Social Proof", ar: "الانطباع والثقة" },
    title: { en: "What Clients And", ar: "ما الذي يقوله" },
    titleAccent: { en: "Teams Notice", ar: "العملاء والفرق" },
    subtitle: {
      en: "The strongest feedback usually sounds the same: clear communication, sharp execution, and work that supports business goals.",
      ar: "أقوى الانطباعات تتكرر بشكل واضح: تواصل ممتاز، تنفيذ دقيق، وعمل يخدم أهداف النشاط التجاري.",
    },
    items: [
      {
        quote: {
          en: "Fast, reliable, and unusually thoughtful about both UI details and business outcomes.",
          ar: "سريع وموثوق ويمتلك اهتماماً غير معتاد بتفاصيل الواجهة ونتائج العمل معاً.",
        },
        name: { en: "Founder", ar: "مؤسس" },
        role: { en: "Startup Client", ar: "عميل شركة ناشئة" },
      },
      {
        quote: {
          en: "He turns messy ideas into polished screens and practical systems the team can use immediately.",
          ar: "يحوّل الأفكار غير المرتبة إلى شاشات مصقولة وأنظمة عملية يمكن للفريق استخدامها فوراً.",
        },
        name: { en: "Operations Lead", ar: "مدير عمليات" },
        role: { en: "Internal Platform Project", ar: "مشروع منصة داخلية" },
      },
      {
        quote: {
          en: "Strong frontend craft, fast communication, and a clear sense of what should matter first.",
          ar: "حرفية قوية في الواجهة الأمامية، وتواصل سريع، وفهم واضح لما يجب أن يأتي أولاً.",
        },
        name: { en: "Marketing Partner", ar: "شريك تسويقي" },
        role: { en: "Agency Collaboration", ar: "تعاون مع وكالة" },
      },
    ],
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
    mashhourHub: {
      name: { en: "Mashhour Hub", ar: "مشهور هب" },
      tagline: {
        en: "Comprehensive Admin Dashboard & CMS Platform",
        ar: "منصة شاملة لإدارة المحتوى ولوحة تحكم الإدارة",
      },
      badge: { en: "SaaS Platform", ar: "منصة برمجية كخدمة" },
      desc: {
        en: "Mashhour Hub is a secure, premium, and responsive React-based admin dashboard and CMS. It features role-based access, Firebase integration, and advanced media management, serving as the central nervous system for content operations.",
        ar: "مشهور هب هي لوحة تحكم ونظام إدارة محتوى متجاوب وآمن مبني بـ React. تتميز بصلاحيات مبنية على الأدوار، وتكامل مع Firebase، وإدارة متقدمة للوسائط، وتعمل كالعصب المركزي لعمليات المحتوى.",
      },
      services: {
        ppf: { en: "Admin Dashboard", ar: "لوحة تحكم الإدارة" },
        ceramic: { en: "Content Management", ar: "إدارة المحتوى" },
        tint: { en: "Role-based Auth", ar: "صلاحيات الوصول" },
        detailing: { en: "Media Library", ar: "مكتبة الوسائط" },
      },
      stats: {
        founded: { en: "Tech Stack", ar: "التقنيات" },
        clients: { en: "Modules", ar: "الوحدات" },
        certified: { en: "Uptime", ar: "نسبة التوفر" },
        location: { en: "Database", ar: "قاعدة البيانات" },
        riyadh: { en: "Firebase", ar: "Firebase" },
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
      en: "Best for founders, brands, and teams that need a clear frontend partner for a launch, redesign, or internal product. I usually reply within 24 hours.",
      ar: "الأنسب للمؤسسين والعلامات التجارية والفرق التي تحتاج شريك واجهات واضح لمشروع إطلاق أو إعادة تصميم أو منتج داخلي. أرد عادة خلال 24 ساعة.",
    },
    fitTitle: { en: "Good Fit For", ar: "مناسب إذا كنت" },
    fitItems: {
      en: [
        "Launching a new product, landing page, or bilingual website",
        "Improving a dashboard or internal tool your team already uses",
        "Needing stronger UX, performance, and frontend structure without extra complexity",
      ],
      ar: [
        "تطلق منتجًا جديدًا أو صفحة هبوط أو موقعًا ثنائي اللغة",
        "تطوّر لوحة تحكم أو أداة داخلية يستخدمها فريقك بالفعل",
        "تحتاج UX وأداء وبنية واجهات أقوى بدون تعقيد زائد",
      ],
    },
    processTitle: { en: "What Happens Next", ar: "ماذا يحدث بعد ذلك" },
    processItems: {
      en: [
        "You share the goal, context, and timeline.",
        "I reply with the clearest next step, scope direction, or questions.",
        "If it fits, we move into execution quickly with a focused plan.",
      ],
      ar: [
        "تشارك الهدف والسياق والجدول الزمني.",
        "أرد بأوضح خطوة تالية أو اتجاه للنطاق أو أسئلة ضرورية.",
        "إذا كان هناك توافق نبدأ التنفيذ سريعًا بخطة مركزة.",
      ],
    },
    channelsTitle: { en: "Prefer A Faster Channel?", ar: "تفضّل قناة أسرع؟" },
    channelsSubtitle: {
      en: "Email is best for detailed briefs. WhatsApp is ideal for quick first contact.",
      ar: "البريد مناسب للتفاصيل الكاملة. واتساب مناسب لبداية سريعة ومباشرة.",
    },
    emailCta: { en: "Email Salah", ar: "راسل صلاح" },
    whatsappCta: { en: "Message On WhatsApp", ar: "راسل عبر واتساب" },
    formHint: {
      en: "The best first message includes your goal, timeline, and the kind of help you need.",
      ar: "أفضل رسالة أولى تتضمن الهدف والوقت المتوقع ونوع المساعدة المطلوبة.",
    },
    infoCards: {
      email: { en: "Email", ar: "البريد الإلكتروني" },
      location: { en: "Location", ar: "الموقع" },
      locationVal: {
        en: "KSA | Saudi Arabia | Riyadh",
        ar: "المملكة العربية السعودية | الرياض",
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

  workPage: {
    sectionTag: { en: "Work", ar: "الأعمال" },
    title: { en: "Case studies, launches, and", ar: "دراسات حالة وإطلاقات و" },
    titleAccent: { en: "frontend systems", ar: "أنظمة واجهات" },
    subtitle: {
      en: "A clearer look at the products, internal tools, and bilingual websites I have designed and shipped for brands, founders, and operating teams.",
      ar: "نظرة أوضح على المنتجات والأدوات الداخلية والمواقع الثنائية اللغة التي صممتها وطورتها للعلامات التجارية والمؤسسين والفرق التشغيلية.",
    },
    homeCta: { en: "Back To Home", ar: "العودة للرئيسية" },
    contactCta: { en: "Start A Project", ar: "ابدأ مشروعًا" },
    processTag: { en: "How I Work", ar: "طريقة العمل" },
    processTitle: { en: "A simple process that keeps", ar: "عملية واضحة تحفظ" },
    processAccent: { en: "teams moving", ar: "سرعة الفريق" },
    processSubtitle: {
      en: "The goal is always the same: less ambiguity, sharper frontend decisions, and faster progress from idea to shipped experience.",
      ar: "الهدف دائمًا واحد: غموض أقل وقرارات واجهات أوضح وتقدم أسرع من الفكرة إلى التجربة المنفذة.",
    },
    processItems: [
      {
        title: { en: "Clarify", ar: "توضيح" },
        desc: {
          en: "I define the user goal, business need, and the exact screen or flow that matters first.",
          ar: "أحدد هدف المستخدم واحتياج العمل والشاشة أو المسار الذي يجب أن يبدأ به التنفيذ.",
        },
      },
      {
        title: { en: "Structure", ar: "هيكلة" },
        desc: {
          en: "I shape the interface around clarity, responsiveness, and maintainable component decisions.",
          ar: "أبني الواجهة حول الوضوح والاستجابة وقرارات مكونات قابلة للصيانة.",
        },
      },
      {
        title: { en: "Ship", ar: "تنفيذ" },
        desc: {
          en: "I move quickly into implementation with attention to polish, performance, and business usefulness.",
          ar: "أنتقل سريعًا إلى التنفيذ مع اهتمام بالتفاصيل والأداء والفائدة التجارية الفعلية.",
        },
      },
    ],
  },
} as const;

/** Helper type to get a string value in the right language */
export function t(key: { en: string; ar: string }, lang: Lang): string {
  return key[lang];
}

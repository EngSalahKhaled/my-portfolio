import type { Lang } from '@/lib/i18n/translations'

export type ProjectCategory = 'Web Apps' | 'UI Design' | 'Mobile'
export type ProjectStatus = 'live' | 'inDevelopment' | 'caseStudy'
export type FilterKey = 'all' | 'webApps' | 'uiDesign' | 'mobile'

export interface ProjectCaseStudy {
  challenge: Record<Lang, string>
  approach: Record<Lang, string>
  outcome: Record<Lang, string>
}

export interface Project {
  id: string
  title: string
  subtitle: Record<Lang, string>
  description: Record<Lang, string>
  longDescription: Record<Lang, string>
  category: ProjectCategory
  tags: string[]
  status: ProjectStatus
  featured?: boolean
  gradient: string
  logo: string
  metrics: string[]
  link?: string
  caseStudy?: ProjectCaseStudy
}

export const PROJECTS: Project[] = [
  {
    id: 'mashhour-hub',
    title: 'Mashhour Hub | مشهور هب',
    subtitle: {
      en: 'AI Digital Marketing Agency · Saudi Arabia',
      ar: 'وكالة تسويق رقمي بالذكاء الاصطناعي · المملكة العربية السعودية',
    },
    description: {
      en: 'Full-scale AI-driven digital marketing agency platform for brands, startups, and individuals.',
      ar: 'منصة وكالة تسويق رقمي متكاملة بالذكاء الاصطناعي للعلامات التجارية والشركات الناشئة.',
    },
    longDescription: {
      en: 'Mashhour Hub leverages OpenAI, Gemini, and AWS ML to deliver AI video production, intelligent voiceovers, automated social media management, and high-performance web development.',
      ar: 'مشهور هب يستخدم OpenAI وGemini وAWS ML لتقديم إنتاج فيديوهات بالذكاء الاصطناعي وتعليق صوتي آلي وإدارة اجتماعية وتطوير مواقع عالية الأداء.',
    },
    category: 'Web Apps',
    tags: ['Next.js', 'OpenAI', 'Gemini AI', 'AWS ML', 'Bilingual'],
    status: 'live',
    featured: true,
    gradient: 'linear-gradient(135deg,#0d0221 0%,#1a0533 50%,#2d1060 100%)',
    logo: '/logos/logo-mashhour-hub.png',
    metrics: ['AI-Powered', 'Full Bilingual', 'Multi-Service'],
    link: 'https://mashhor-hub.com/',
    caseStudy: {
      challenge: {
        en: 'The brand needed one clear platform to present AI services, explain value quickly, and support bilingual discovery for businesses in the region.',
        ar: 'احتاجت العلامة إلى منصة واضحة واحدة تعرض خدمات الذكاء الاصطناعي وتشرح القيمة بسرعة وتدعم الاكتشاف الثنائي اللغة للشركات في المنطقة.',
      },
      approach: {
        en: 'I structured the experience around service clarity, fast scanning, and premium visual hierarchy using Next.js, bilingual content design, and a strong CTA flow.',
        ar: 'صممت التجربة حول وضوح الخدمات وسهولة التصفح والهرمية البصرية الاحترافية باستخدام Next.js ومحتوى ثنائي اللغة ومسار دعوة واضح للتواصل.',
      },
      outcome: {
        en: 'The result was a stronger agency presence, clearer offer positioning, and a more persuasive path from interest to enquiry.',
        ar: 'كانت النتيجة حضوراً أقوى للوكالة وتموضعاً أوضح للعروض ومساراً أكثر إقناعاً من الاهتمام إلى الاستفسار.',
      },
    },
  },
  {
    id: 'darak',
    title: 'Darak | داراك',
    subtitle: {
      en: 'Real Estate & Services Platform · Saudi Arabia',
      ar: 'منصة العقارات والخدمات · المملكة العربية السعودية',
    },
    description: {
      en: 'A comprehensive real estate marketplace and services aggregator for the Saudi market.',
      ar: 'منصة متكاملة للعقارات والخدمات المرتبطة بها في السوق السعودية.',
    },
    longDescription: {
      en: 'Darak connects buyers, sellers, and renters with verified listings across Saudi cities, plus maintenance, cleaning, and moving services in one platform.',
      ar: 'داراك يربط المشترين والبائعين والمستأجرين بإعلانات موثقة في المدن السعودية ويجمع معها خدمات الصيانة والتنظيف والنقل في منصة واحدة.',
    },
    category: 'Web Apps',
    tags: ['Next.js', 'TypeScript', 'Real Estate', 'Arabic UI', 'Maps API'],
    status: 'inDevelopment',
    featured: true,
    gradient: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)',
    logo: '/logos/logo-darak.png',
    metrics: ['500+ Listings', 'Arabic RTL', 'Real-time Search'],
    link: 'https://darak.sa',
    caseStudy: {
      challenge: {
        en: 'Real estate users needed a marketplace that felt trustworthy, easy to browse, and useful beyond listings alone.',
        ar: 'احتاج مستخدمو العقارات إلى سوق رقمي يبدو موثوقاً وسهل التصفح ومفيداً بما يتجاوز الإعلانات وحدها.',
      },
      approach: {
        en: 'The platform combined verified listings with supporting services, Arabic-first UX, and a structure designed for fast search and smoother decision-making.',
        ar: 'جمعت المنصة بين الإعلانات الموثقة والخدمات المساندة وتجربة استخدام عربية أولاً وبنية تساعد على البحث السريع واتخاذ القرار بشكل أسهل.',
      },
      outcome: {
        en: 'It became a more complete product experience for buyers, renters, and service-driven property operations.',
        ar: 'أصبحت التجربة أكثر تكاملاً للمشترين والمستأجرين وعمليات الخدمات المرتبطة بالعقار.',
      },
    },
  },
  {
    id: 'infinity-portal',
    title: 'Infinity Portal',
    subtitle: {
      en: 'Car Protection CRM Dashboard',
      ar: 'لوحة CRM لحماية السيارات',
    },
    description: {
      en: 'Internal CRM and booking management portal for INFINITY BRIGHT centre.',
      ar: 'نظام إدارة علاقات العملاء الداخلي لمركز إنفينيتي برايت.',
    },
    longDescription: {
      en: 'A full-stack CRM for tracking bookings, service history, inventory, and employee performance across the operation.',
      ar: 'نظام CRM متكامل لتتبع الحجوزات وسجل الخدمات والمخزون وأداء الموظفين عبر التشغيل اليومي.',
    },
    category: 'Web Apps',
    tags: ['React', 'TypeScript', 'Dashboard', 'CRM', 'Tailwind'],
    status: 'live',
    featured: true,
    gradient: 'linear-gradient(135deg,#0D0D0D 0%,#1a1a1a 50%,#2a1a00 100%)',
    logo: '/logos/logo-infinity-portal.png',
    metrics: ['200+ Clients', 'Real-time Bookings', 'Staff Management'],
    link: 'https://infinitybright.com',
    caseStudy: {
      challenge: {
        en: 'The team needed a practical internal system to manage bookings, customer records, inventory, and staff operations without friction.',
        ar: 'احتاج الفريق إلى نظام داخلي عملي لإدارة الحجوزات وسجلات العملاء والمخزون وعمليات الموظفين دون تعقيد.',
      },
      approach: {
        en: 'I focused on speed, operational clarity, and repeatable dashboard workflows so daily tasks could be handled from one place.',
        ar: 'ركّزت على السرعة ووضوح التشغيل وسير عمل قابل للتكرار داخل لوحة التحكم حتى تُدار المهام اليومية من مكان واحد.',
      },
      outcome: {
        en: 'This reduced context switching, improved record visibility, and supported smoother day-to-day team execution.',
        ar: 'خفض ذلك التنقل بين الأدوات وحسّن وضوح السجلات ودعم تنفيذ الفريق اليومي بشكل أكثر سلاسة.',
      },
    },
  },
  {
    id: 'tadawul',
    title: 'تداول كابيتال',
    subtitle: {
      en: 'Trading Signals Dashboard',
      ar: 'لوحة إشارات التداول',
    },
    description: {
      en: 'Real-time trading signals dashboard with AI chatbot for Saudi capital markets.',
      ar: 'لوحة إشارات تداول آنية مع روبوت محادثة ذكي للأسواق المالية السعودية.',
    },
    longDescription: {
      en: 'Live trading signals, portfolio analytics, and an AI chatbot for market insights tailored for long trading sessions.',
      ar: 'إشارات تداول حية وتحليلات للمحفظة وروبوت محادثة ذكي لرؤى السوق مصمم لجلسات التداول الطويلة.',
    },
    category: 'Web Apps',
    tags: ['React', 'Framer Motion', 'AI', 'Finance', 'Arabic'],
    status: 'live',
    gradient: 'linear-gradient(135deg,#0a1628 0%,#0d2137 50%,#102435 100%)',
    logo: '/logos/logo-tadawul.png',
    metrics: ['Live Charts', 'AI Chatbot', 'Arabic Support'],
  },
  {
    id: 'build-hub',
    title: 'Build Hub',
    subtitle: {
      en: 'Construction Cost Estimator',
      ar: 'مقدّر تكاليف البناء',
    },
    description: {
      en: 'AI-powered cost estimator with an animated landing page for a Saudi contractor.',
      ar: 'مقدّر تكاليف بالذكاء الاصطناعي مع صفحة هبوط متحركة لمقاول سعودي.',
    },
    longDescription: {
      en: 'A landing page and web app for Build Hub featuring an AI cost estimator, animated hero, and a service catalog with rentals support.',
      ar: 'موقع Build Hub يتضمن مقدّر الذكاء الاصطناعي وقسم خدمات وإيجارات مع واجهة تقديم قوية.',
    },
    category: 'UI Design',
    tags: ['HTML', 'CSS', 'JavaScript', 'Animations', 'AI'],
    status: 'live',
    gradient: 'linear-gradient(135deg,#1a1200 0%,#2a1e00 50%,#1a1a1a 100%)',
    logo: '/logos/logo-build-hub.png',
    metrics: ['Animated Hero', 'AI Estimator', 'Mobile First'],
  },
  {
    id: 'infinity-landing',
    title: 'INFINITY BRIGHT',
    subtitle: {
      en: 'Luxury Car Protection Landing Page',
      ar: 'صفحة هبوط لحماية السيارات الفاخرة',
    },
    description: {
      en: "Luxurious single-page site for Riyadh's premium 3M-certified car protection brand.",
      ar: 'موقع احترافي أحادي الصفحة لعلامة إنفينيتي برايت للسيارات الفاخرة.',
    },
    longDescription: {
      en: 'A dark-mode landing with services, pricing, gallery, and testimonials plus a separate products and pricing page.',
      ar: 'موقع داكن مع أقسام الخدمات والأسعار والمعرض والشهادات وصفحة مستقلة للمنتجات والأسعار.',
    },
    category: 'UI Design',
    tags: ['HTML', 'CSS', 'JS', 'Dark Mode', 'Luxury Brand'],
    status: 'live',
    gradient: 'linear-gradient(135deg,#0D0D0D 0%,#1a1400 50%,#2a1f00 100%)',
    logo: '/logos/logo-infinity-bright.png',
    metrics: ['3M Certified', 'Dark Theme', 'Luxury UX'],
    link: 'https://infinitybright.com',
  },
  {
    id: 'rentals',
    title: 'Rentals & Logistics',
    subtitle: {
      en: 'Property & Fleet Sub-platform',
      ar: 'منصة فرعية للإيجار والشحن',
    },
    description: {
      en: 'Rentals page with system dark/light mode, filtering, and service cards.',
      ar: 'صفحة إيجارات مع التحويل التلقائي بين الوضع الداكن والفاتح والفلترة.',
    },
    longDescription: {
      en: 'A rentals experience that adapts to system color scheme for property and logistics bookings in Saudi Arabia.',
      ar: 'تجربة إيجارات تتكيف مع نظام ألوان الجهاز لحجوزات العقارات والخدمات اللوجستية في السعودية.',
    },
    category: 'UI Design',
    tags: ['CSS', 'Dark/Light Mode', 'Responsive', 'Filtering'],
    status: 'caseStudy',
    gradient: 'linear-gradient(135deg,#0d1a1a 0%,#0a1f1f 50%,#122020 100%)',
    logo: '/logos/logo-rentals.png',
    metrics: ['System Theme', 'Filtering UI', 'Responsive'],
  },
]

export const FILTER_KEYS: FilterKey[] = ['all', 'webApps', 'uiDesign', 'mobile']

export const FILTER_TO_CATEGORY: Partial<Record<FilterKey, ProjectCategory>> = {
  webApps: 'Web Apps',
  uiDesign: 'UI Design',
  mobile: 'Mobile',
}

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured)
export const FEATURED_CASE_STUDIES = PROJECTS.filter((project) => project.featured && project.caseStudy)

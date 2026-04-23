/**
 * app/page.tsx — Main portfolio page
 *
 * Performance strategy:
 * - HeroSection + ProjectsSection: static (above-fold critical)
 * - All below-fold sections: dynamically imported (code-split)
 * - ChatbotWidget: ssr:false — removed from server bundle entirely
 * - ReadingProgress: lazy with ssr:false (needs window)
 */

import dynamic from 'next/dynamic'
import Navbar          from '@/components/Navbar'
import HeroSection     from '@/components/HeroSection'
import ScrollReveal    from '@/components/ScrollReveal'
import ProjectsSection from '@/components/ProjectsSection'

// ── Below-fold: dynamic to reduce initial JS ──────────────────────────────
const ToolMarquee           = dynamic(() => import('@/components/ToolMarquee'),           { ssr: false })
const BusinessSection       = dynamic(() => import('@/components/BusinessSection'))
const SkillsSection         = dynamic(() => import('@/components/SkillsSection'))
const CertificationsSection = dynamic(() => import('@/components/CertificationsSection'))
const ContactSection        = dynamic(() => import('@/components/ContactSection'))
const Footer                = dynamic(() => import('@/components/Footer'))

// ── Fully client-only: no SSR ──────────────────────────────────────────────
const ReadingProgress = dynamic(() => import('@/components/ReadingProgress'), { ssr: false })
const WhatsAppWidget  = dynamic(() => import('@/components/WhatsAppWidget'), { ssr: false })

export default function Home() {
  return (
    <>
      {/* Gold reading-progress line at top */}
      <ReadingProgress />

      {/* ── Navigation ───────────────────────────────────────────────────── */}
      <Navbar />

      <main>
        {/* 1. Hero — above fold, static import */}
        <HeroSection />

        {/* AI Workflow Marquee */}
        <ToolMarquee />

        {/* About anchor */}
        <span id="about" aria-hidden="true" />

        {/* 2. Projects */}
        <ScrollReveal>
          <ProjectsSection />
        </ScrollReveal>

        {/* 3. Business */}
        <ScrollReveal>
          <BusinessSection />
        </ScrollReveal>

        {/* 4. Skills */}
        <ScrollReveal>
          <SkillsSection />
        </ScrollReveal>

        {/* 5. Certifications */}
        <ScrollReveal>
          <CertificationsSection />
        </ScrollReveal>

        {/* 6. Contact */}
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppWidget />
    </>
  )
}

/**
 * app/page.tsx — Main portfolio page
 *
 * Assembles all section components into the full single-page portfolio.
 * Component order:
 *   Navbar → Hero → Projects → Business → Skills → Contact → Footer
 *
 * The AI Chatbot widget is rendered globally (fixed positioning) so it
 * persists across scroll positions.
 */

import Navbar          from '@/components/Navbar'
import HeroSection     from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import BusinessSection from '@/components/BusinessSection'
import SkillsSection   from '@/components/SkillsSection'
import ContactSection  from '@/components/ContactSection'
import Footer          from '@/components/Footer'
import ChatbotWidget   from '@/components/ChatbotWidget'

export default function Home() {
  return (
    <>
      {/* ── Navigation ───────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <main>
        {/* 1. Hero with typewriter and avatar card */}
        <HeroSection />

        {/* 2. About / brief intro anchor target */}
        <span id="about" aria-hidden="true" />

        {/* 3. Filterable project gallery */}
        <ProjectsSection />

        {/* 4. Business showcase (INFINITY BRIGHT) + career timeline */}
        <BusinessSection />

        {/* 5. Animated skill bars */}
        <SkillsSection />

        {/* 6. Contact form */}
        <ContactSection />
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <Footer />

      {/* ── AI Chatbot (fixed / floating) ────────────────────────────────────── */}
      <ChatbotWidget />
    </>
  )
}

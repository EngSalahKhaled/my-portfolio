import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ScrollReveal from '@/components/ScrollReveal'
import ProjectsSection from '@/components/ProjectsSection'

const ToolMarquee = dynamic(() => import('@/components/ToolMarquee'), { ssr: false })
const BusinessSection = dynamic(() => import('@/components/BusinessSection'))
const SkillsSection = dynamic(() => import('@/components/SkillsSection'))
const CertificationsSection = dynamic(() => import('@/components/CertificationsSection'))
const ContactSection = dynamic(() => import('@/components/ContactSection'))
const Footer = dynamic(() => import('@/components/Footer'))

const ReadingProgress = dynamic(() => import('@/components/ReadingProgress'), { ssr: false })
const WhatsAppWidget = dynamic(() => import('@/components/WhatsAppWidget'), { ssr: false })

export default function HomePageContent() {
  return (
    <>
      <ReadingProgress />
      <Navbar />

      <main>
        <HeroSection />
        <ToolMarquee />

        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>

        <ScrollReveal>
          <ProjectsSection />
        </ScrollReveal>

        <ScrollReveal>
          <BusinessSection />
        </ScrollReveal>

        <ScrollReveal>
          <SkillsSection />
        </ScrollReveal>

        <ScrollReveal>
          <CertificationsSection />
        </ScrollReveal>

        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
      </main>

      <Footer />
      <WhatsAppWidget />
    </>
  )
}

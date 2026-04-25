import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ScrollReveal from '@/components/ScrollReveal'
import ProjectsSection from '@/components/ProjectsSection'
import ResultsSection from '@/components/ResultsSection'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ToolMarquee from '@/components/ToolMarquee'
import BusinessSection from '@/components/BusinessSection'
import SkillsSection from '@/components/SkillsSection'
import CertificationsSection from '@/components/CertificationsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import ReadingProgress from '@/components/ReadingProgress'
import WhatsAppWidget from '@/components/WhatsAppWidget'
import ExperienceSection from '@/components/ExperienceSection'
import PricingSection from '@/components/PricingSection'
import FAQSection from '@/components/FAQSection'

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
          <ExperienceSection />
        </ScrollReveal>

        <ScrollReveal>
          <ResultsSection />
        </ScrollReveal>

        <ScrollReveal>
          <ServicesSection />
        </ScrollReveal>

        <ScrollReveal>
          <PricingSection />
        </ScrollReveal>

        <ScrollReveal>
          <ProjectsSection preview />
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
          <TestimonialsSection />
        </ScrollReveal>

        <ScrollReveal>
          <FAQSection />
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

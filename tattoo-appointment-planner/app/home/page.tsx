import { Footer } from "@/components/layout/footer"
import { MainNav } from "@/components/layout/main-nav"
import { WhyInkCircle } from "@/components/sections/why-inkcircle"
import { AppDemo } from "@/components/sections/app-demo"
import { Testimonials } from "@/components/sections/testimonials"
import { Pricing } from "@/components/sections/pricing"
import { FeatureComparison } from "@/components/sections/feature-comparison"
import { DataProtection } from "@/components/sections/data-protection"
import { FAQ } from "@/components/sections/faq"
import { Newsletter } from "@/components/sections/newsletter"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { InteractiveHero } from "@/components/sections/interactive-hero"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <MainNav />

      {/* Hero Section */}
      <InteractiveHero />

      {/* Feature Sections */}
      <ScrollReveal animation="fade" direction="up">
        <WhyInkCircle />
      </ScrollReveal>

      <ScrollReveal animation="fade" direction="up" delay={0.1}>
        <AppDemo />
      </ScrollReveal>

      <ScrollReveal animation="fade" direction="up" delay={0.1}>
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal animation="fade" direction="up" delay={0.1}>
        <Pricing />
      </ScrollReveal>

      <ScrollReveal animation="fade" direction="up" delay={0.1}>
        <FeatureComparison />
      </ScrollReveal>

      <ScrollReveal animation="fade" direction="up" delay={0.1}>
        <DataProtection />
      </ScrollReveal>

      <ScrollReveal animation="fade" direction="up" delay={0.1}>
        <FAQ />
      </ScrollReveal>

      <ScrollReveal animation="fade" direction="up" delay={0.1}>
        <Newsletter />
      </ScrollReveal>

      {/* Footer */}
      <Footer />
    </div>
  )
}

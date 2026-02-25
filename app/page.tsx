"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"
import { ProjectsSection } from "@/components/projects-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  const [activeDomainId, setActiveDomainId] = useState<string | null>(null)

  return (
    <main className="overflow-hidden">
      <Navigation />
      <HeroSection onDomainSelect={setActiveDomainId} />
      <ProjectsSection activeDomainId={activeDomainId} />
      <AboutSection />
      <ContactSection />
    </main>
  )
}

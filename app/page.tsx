"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"
import { ProjectsSection } from "@/components/projects-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { useDomains } from "@/hooks/useDomains"

export default function Home() {
  const [activeDomainId, setActiveDomainId] = useState<string | null>(null)
  const { domains, global } = useDomains()

  return (
    <main className="overflow-hidden">
      <Navigation />
      <HeroSection onDomainSelect={setActiveDomainId} domains={domains} globalContent={global} />
      <ProjectsSection activeDomainId={activeDomainId} domains={domains} />
      <AboutSection globalContent={global} />
      <ContactSection globalContent={global} />
    </main>
  )
}

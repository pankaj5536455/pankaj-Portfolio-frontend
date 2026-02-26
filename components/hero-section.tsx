"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import type { Domain, GlobalContent } from "@/lib/domain-data"
import { DomainWheel } from "@/components/domain-wheel"
import { DomainView } from "@/components/domain-view"

type ViewState = "hub" | "transitioning-out" | "domain" | "transitioning-in"

interface HeroSectionProps {
  onDomainSelect?: (domainId: string | null) => void
  domains: Domain[]
  globalContent: GlobalContent
}

export function HeroSection({ onDomainSelect, domains, globalContent }: HeroSectionProps) {
  const [viewState, setViewState] = useState<ViewState>("hub")
  const [activeDomainId, setActiveDomainId] = useState<string | null>(null)
  const [hoveredDomainId, setHoveredDomainId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const activeDomain = domains.find((d) => d.id === activeDomainId) || null
  const hoveredDomain = domains.find((d) => d.id === hoveredDomainId) || null

  const displayDomain = activeDomain || hoveredDomain
  const label = displayDomain ? displayDomain.label.toUpperCase() : globalContent.label
  const title = displayDomain ? displayDomain.title : globalContent.title
  const description = displayDomain ? displayDomain.description : globalContent.description
  const summary = displayDomain ? displayDomain.summary : globalContent.summary
  const highlights = displayDomain ? displayDomain.highlights : globalContent.highlights

  // Click a sector -> transition out hub, then show domain view
  const handleDomainClick = useCallback((id: string) => {
    setActiveDomainId(id)
    setViewState("transitioning-out")
  }, [])

  // Transition out finished -> show domain view
  useEffect(() => {
    if (viewState === "transitioning-out") {
      const timer = setTimeout(() => setViewState("domain"), 600)
      return () => clearTimeout(timer)
    }
    if (viewState === "transitioning-in") {
      const timer = setTimeout(() => {
        setViewState("hub")
        setActiveDomainId(null)
        onDomainSelect?.(null)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [viewState, onDomainSelect])

  // Notify parent when domain is selected
  useEffect(() => {
    if (viewState === "domain" && activeDomainId) {
      onDomainSelect?.(activeDomainId)
    }
  }, [viewState, activeDomainId, onDomainSelect])

  // Back from domain view -> transition in hub
  const handleBack = useCallback(() => {
    setViewState("transitioning-in")
    // Scroll to top
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const handleDomainHover = useCallback((id: string | null) => {
    if (viewState === "hub") {
      setHoveredDomainId(id)
    }
  }, [viewState])

  const isHubVisible = viewState === "hub" || viewState === "transitioning-out" || viewState === "transitioning-in"
  const isDomainVisible = viewState === "domain" || viewState === "transitioning-out" || viewState === "transitioning-in"

  const hubOpacity = viewState === "hub" ? 1 : viewState === "transitioning-in" ? 0 : 0
  const hubScale = viewState === "hub" ? 1 : 0.95
  const domainOpacity = viewState === "domain" ? 1 : 0

  const bgAccent = activeDomain?.accentColor || (hoveredDomain?.accentColor ?? null)
  const bgGlow = activeDomain?.accentGlow || (hoveredDomain?.accentGlow ?? "rgba(78, 165, 220, 0.04)")

  return (
    <div ref={containerRef} id="home" className="relative min-h-screen w-full bg-background">
      {/* Subtle background grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(${bgAccent ? `${bgAccent}06` : "rgba(255,255,255,0.015)"} 1px, transparent 1px),
            linear-gradient(90deg, ${bgAccent ? `${bgAccent}06` : "rgba(255,255,255,0.015)"} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transition: "all 0.8s ease",
        }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed -top-40 right-0 z-0 h-96 w-96 rounded-full blur-3xl"
        style={{
          background: bgGlow,
          transition: "all 0.8s ease",
        }}
      />

      {/* === HUB VIEW === */}
      {isHubVisible && (
        <section
          className="relative z-10 flex min-h-screen w-full items-center justify-center overflow-hidden"
          style={{
            opacity: hubOpacity,
            transform: `scale(${hubScale})`,
            transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: viewState === "hub" ? "auto" : "none",
          }}
        >
          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 py-20 lg:flex-row lg:gap-8 lg:px-12 xl:gap-16">

            {/* Left Panel */}
            <div className="order-2 flex max-w-sm flex-1 flex-col justify-center gap-6 lg:order-1">
              {/* Label */}
              <div className="flex items-center gap-3">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: displayDomain?.accentColor || "var(--primary)",
                    transition: "all 0.5s ease",
                  }}
                />
                <span
                  className="text-xs font-medium tracking-[0.2em] font-mono"
                  style={{
                    color: displayDomain?.accentColor || "var(--primary)",
                    transition: "color 0.5s ease",
                  }}
                >
                  {label}
                </span>
              </div>

              <h1 className="text-3xl font-semibold leading-tight text-foreground lg:text-4xl text-balance" style={{ transition: "all 0.5s ease" }}>
                {title}
              </h1>

              <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
                {description}
              </p>

              <div className="mt-2 flex items-center gap-3">
                <div
                  className="h-px"
                  style={{
                    width: "2rem",
                    backgroundColor: displayDomain?.accentColor || "var(--muted-foreground)",
                    opacity: 0.4,
                    transition: "all 0.5s ease",
                  }}
                />
                <span className="text-xs tracking-wider font-mono text-muted-foreground">
                  {displayDomain ? "DOMAIN FOCUS" : "MULTI-DOMAIN"}
                </span>
              </div>
            </div>

            {/* Center Wheel */}
            <div className="order-1 flex-shrink-0 lg:order-2">
              <DomainWheel
                domains={domains}
                activeDomain={null}
                hoveredDomain={hoveredDomainId}
                onDomainClick={handleDomainClick}
                onDomainHover={handleDomainHover}
              />
            </div>

            {/* Right Panel */}
            <div className="order-3 flex max-w-sm flex-1 flex-col justify-center gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium tracking-[0.2em] uppercase font-mono text-muted-foreground">
                  Domain Insight
                </span>
                <p className="text-sm font-medium leading-relaxed text-foreground lg:text-base">
                  {summary}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs font-medium tracking-[0.15em] uppercase font-mono text-muted-foreground">
                  Core Strengths
                </span>
                <ul className="flex flex-col gap-2.5">
                  {highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor: displayDomain?.accentColor || "var(--primary)",
                          transition: "all 0.5s ease",
                        }}
                      />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="mt-2 h-px w-full"
                style={{
                  background: displayDomain
                    ? `linear-gradient(to right, ${displayDomain.accentColor}33, transparent)`
                    : "transparent",
                  transition: "all 0.5s ease",
                }}
              />
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
            <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Click a domain to explore
            </span>
            <div className="h-8 w-px bg-muted-foreground/30" />
          </div>
        </section>
      )}

      {/* === DOMAIN VIEW === */}
      {isDomainVisible && activeDomain && (
        <div
          className="relative z-10"
          style={{
            opacity: domainOpacity,
            transform: `translateY(${viewState === "domain" ? "0" : "30px"})`,
            transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s",
            pointerEvents: viewState === "domain" ? "auto" : "none",
          }}
        >
          <DomainView domain={activeDomain} onBack={handleBack} />
        </div>
      )}
    </div>
  )
}

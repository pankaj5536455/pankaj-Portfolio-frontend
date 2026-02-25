"use client"

import type { Domain } from "@/lib/domain-data"
import { PortraitCircle } from "./portrait-circle"

interface DomainViewProps {
  domain: Domain
  onBack: () => void
}

export function DomainView({ domain, onBack }: DomainViewProps) {
  return (
    <div
      className="flex min-h-screen w-full flex-col"
      style={{ "--domain-accent": domain.accentColor } as React.CSSProperties}
    >
      {/* Top nav bar */}
      <nav className="relative z-20 flex w-full items-center justify-between px-6 py-5 lg:px-12">
        <div className="flex items-center gap-3">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: domain.accentColor }}
          />
          <span
            className="text-xs font-medium tracking-[0.2em] font-mono uppercase"
            style={{ color: domain.accentColor }}
          >
            {domain.label}
          </span>
        </div>
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs tracking-[0.15em] font-mono uppercase text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Return to domain selector"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:-translate-x-0.5">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All Domains
        </button>
      </nav>

      {/* Main content */}
      <div className="relative flex flex-1 flex-col items-center px-6 lg:px-12">
        {/* Hero area with portrait + intro */}
        <div className="flex w-full max-w-6xl flex-col items-center gap-12 py-8 lg:flex-row lg:items-start lg:gap-16 lg:py-16">

          {/* Left column: portrait + tagline */}
          <div className="flex flex-col items-center gap-6 lg:items-start lg:sticky lg:top-24">
            {/* Portrait */}
            <button
              onClick={onBack}
              className="group relative cursor-pointer"
              aria-label="Click to return to domain selector"
            >
              <PortraitCircle
                accentColor={domain.accentColor}
                sizeClass="h-64 w-64 lg:h-96 lg:w-96"
                showHoverRing={true}
              />

              {/* Back hint */}
              <span className="mt-3 block text-center text-[10px] tracking-[0.15em] font-mono uppercase text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                Click to go back
              </span>
            </button>

            {/* Tagline */}
            <p
              className="text-center text-sm font-medium tracking-wide lg:text-left"
              style={{ color: domain.accentColor }}
            >
              {domain.tagline}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-[240px]">
              {domain.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span
                    className="text-lg font-semibold font-mono"
                    style={{ color: domain.accentColor }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[10px] tracking-[0.1em] font-mono uppercase text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: content */}
          <div className="flex flex-1 flex-col gap-12 lg:gap-16">
            {/* Title & Description */}
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-semibold leading-tight text-foreground lg:text-5xl text-balance">
                {domain.title}
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
                {domain.description}
              </p>
            </div>

            {/* Philosophy */}
            <div className="flex flex-col gap-3">
              <span
                className="text-xs font-medium tracking-[0.2em] font-mono uppercase"
                style={{ color: domain.accentColor }}
              >
                Philosophy
              </span>
              <blockquote className="border-l-2 pl-5 text-sm leading-relaxed text-foreground/80 lg:text-base" style={{ borderColor: `${domain.accentColor}44` }}>
                {domain.philosophy}
              </blockquote>
            </div>

            {/* Core Strengths */}
            <div className="flex flex-col gap-4">
              <span
                className="text-xs font-medium tracking-[0.2em] font-mono uppercase"
                style={{ color: domain.accentColor }}
              >
                Core Strengths
              </span>
              <ul className="flex flex-col gap-3">
                {domain.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: domain.accentColor }}
                    />
                    <span className="text-sm leading-relaxed text-muted-foreground lg:text-base">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Toolbox */}
            <div className="flex flex-col gap-4">
              <span
                className="text-xs font-medium tracking-[0.2em] font-mono uppercase"
                style={{ color: domain.accentColor }}
              >
                Toolbox
              </span>
              <div className="flex flex-wrap gap-2">
                {domain.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md px-3 py-1.5 text-xs font-mono"
                    style={{
                      backgroundColor: `${domain.accentColor}0d`,
                      border: `1px solid ${domain.accentColor}22`,
                      color: `${domain.accentColor}cc`,
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="flex flex-col gap-5">
              <span
                className="text-xs font-medium tracking-[0.2em] font-mono uppercase"
                style={{ color: domain.accentColor }}
              >
                Selected Projects
              </span>
              <div className="flex flex-col gap-4">
                {domain.projects.map((project) => (
                  <div
                    key={project.name}
                    className="flex flex-col gap-2 rounded-lg p-5"
                    style={{
                      backgroundColor: `${domain.accentColor}06`,
                      border: `1px solid ${domain.accentColor}15`,
                    }}
                  >
                    <h3 className="text-sm font-semibold text-foreground lg:text-base">{project.name}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground lg:text-sm">{project.description}</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded px-2 py-0.5 text-[10px] font-mono"
                          style={{
                            backgroundColor: `${domain.accentColor}10`,
                            color: `${domain.accentColor}aa`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex w-full max-w-6xl items-center justify-between border-t py-8" style={{ borderColor: `${domain.accentColor}15` }}>
          <span className="text-[10px] tracking-[0.15em] font-mono uppercase text-muted-foreground">
            {domain.label} Domain
          </span>
          <button
            onClick={onBack}
            className="text-[10px] tracking-[0.15em] font-mono uppercase text-muted-foreground transition-colors hover:text-foreground"
          >
            Return to Hub
          </button>
        </div>
      </div>
    </div>
  )
}

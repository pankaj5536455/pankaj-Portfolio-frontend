"use client"

import type { GlobalContent } from "@/lib/domain-data"
import LogoFull from "@/components/logos/LogoFull"

interface AboutSectionProps {
  globalContent: GlobalContent
}

export function AboutSection({ globalContent }: AboutSectionProps) {
  return (
    <section id="about" className="relative w-full py-20 px-6 lg:px-12 border-t border-primary/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-medium tracking-[0.2em] font-mono text-primary">
              ABOUT ME
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-6">
            Systems Engineer & Builder
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              I'm a multidisciplinary engineer with a passion for building intelligent systems that bridge 
              hardware, software, and data. With expertise across eight interconnected engineering domains, 
              I create real-world solutions that scale.
            </p>

            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              My approach combines rigorous engineering principles with creative problem-solving. Whether 
              optimizing IoT sensor networks, training machine learning models, architecting microservices, 
              or designing intuitive interfaces, I focus on building systems that are not just technically 
              sound, but meaningfully solve problems.
            </p>

            {/* Highlights */}
            <div className="pt-4">
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">
                Core Strengths
              </h3>
              <div className="space-y-3">
                {globalContent.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span
                      className="inline-block mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "var(--primary)" }}
                    />
                    <span className="text-sm text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Stats Card */}
          <div className="group relative">
            <div className="rounded-lg border border-primary/20 bg-card/40 p-8 space-y-8">
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">8</div>
                <p className="text-sm text-muted-foreground">Engineering Domains</p>
              </div>

              <div className="h-px bg-primary/20" />

              <div className="space-y-6">
                <div>
                  <div className="text-2xl font-semibold text-foreground mb-1">Hardware to Cloud</div>
                  <p className="text-sm text-muted-foreground">
                    Full-stack capability from embedded systems to cloud infrastructure
                  </p>
                </div>

                <div>
                  <div className="text-2xl font-semibold text-foreground mb-1">Research-Driven</div>
                  <p className="text-sm text-muted-foreground">
                    Publications, prototypes, and production-ready implementations
                  </p>
                </div>

                <div>
                  <div className="text-2xl font-semibold text-foreground mb-1">Real-World Focus</div>
                  <p className="text-sm text-muted-foreground">
                    Solutions tested at scale with measurable impact
                  </p>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-30">
              <LogoFull size={52} color="#0f766e" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

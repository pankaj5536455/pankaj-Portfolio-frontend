"use client"

import {
  LogoAnimatedHero,
  LogoBadge,
  LogoEmailSignature,
  LogoFavicon,
  LogoFull,
  LogoIcon,
  LogoLoadingSpinner,
  LogoProgressBar,
  LogoSimplified,
} from "@/components/logos"

export function LogoShowcaseSection() {
  return (
    <section id="logos" className="relative w-full border-t border-primary/10 px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            <span className="font-mono text-xs font-medium tracking-[0.2em] text-primary">LOGO SYSTEM</span>
          </div>
          <h2 className="mb-4 text-3xl font-semibold text-foreground lg:text-4xl">Brand Variants In Use</h2>
          <p className="max-w-2xl text-muted-foreground">
            Live preview of each logo variant so you can validate how they render in real UI contexts.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-lg border border-primary/20 bg-card/40 p-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Icon</p>
            <div className="flex min-h-24 items-center justify-center">
              <LogoIcon size={38} color="#0f766e" />
            </div>
          </div>

          <div className="rounded-lg border border-primary/20 bg-card/40 p-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Favicon</p>
            <div className="flex min-h-24 items-center justify-center">
              <div className="rounded-lg border border-primary/20 bg-background p-2">
                <LogoFavicon size={52} color="#0f766e" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-primary/20 bg-card/40 p-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Badge</p>
            <div className="flex min-h-24 items-center justify-center">
              <LogoBadge text="Systems Engineer" size={130} color="#0f766e" />
            </div>
          </div>

          <div className="rounded-lg border border-primary/20 bg-card/40 p-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Simplified</p>
            <div className="flex min-h-36 items-center justify-center">
              <LogoSimplified size={130} color="#0f766e" animate={true} />
            </div>
          </div>

          <div className="rounded-lg border border-primary/20 bg-card/40 p-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Full</p>
            <div className="flex min-h-36 items-center justify-center">
              <LogoFull size={130} color="#0f766e" animate={true} />
            </div>
          </div>

          <div className="rounded-lg border border-primary/20 bg-card/40 p-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Animated Hero</p>
            <div className="flex min-h-36 items-center justify-center">
              <LogoAnimatedHero size={140} color="#0f766e" autoPlay={true} />
            </div>
          </div>

          <div className="rounded-lg border border-primary/20 bg-card/40 p-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Loading Spinner</p>
            <div className="flex min-h-28 items-center justify-center">
              <LogoLoadingSpinner size={80} color="#0f766e" />
            </div>
          </div>

          <div className="rounded-lg border border-primary/20 bg-card/40 p-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Progress</p>
            <div className="flex min-h-28 items-center justify-center">
              <LogoProgressBar progress={78} size={120} color="#0f766e" />
            </div>
          </div>

          <div className="rounded-lg border border-primary/20 bg-card/40 p-6 md:col-span-2 xl:col-span-3">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Email Signature</p>
            <div className="overflow-x-auto">
              <div className="min-w-[340px] rounded-lg border border-primary/20 bg-background/70 p-4">
                <LogoEmailSignature
                  name="Pankaj Kumar"
                  title="Systems Engineer"
                  email="contact@example.com"
                  website="portfolio.dev"
                  size={46}
                  color="#0f766e"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

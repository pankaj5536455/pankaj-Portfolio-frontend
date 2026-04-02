"use client"

import { ArrowUpRight, ChevronLeft, FolderLock, FolderOpenDot, Github, GitFork, PlayCircle, Sparkles, Star } from "lucide-react"
import type { CSSProperties } from "react"
import type { Domain } from "@/lib/domain-data"
import type { ProjectRecord } from "@/lib/project-data"
import { Button } from "@/components/ui/button"

interface ProjectDetailViewProps {
  project: ProjectRecord
  domain: Domain | null
  onBack: () => void
  onRequestContact: (project: ProjectRecord) => void
  usingSampleData: boolean
}

function ProjectLogoSlot({
  project,
  accentColor,
}: {
  project: ProjectRecord
  accentColor: string
}) {
  return (
    <div
      className="relative h-28 w-28 overflow-hidden rounded-[1.75rem] border backdrop-blur-sm lg:h-36 lg:w-36"
      style={{
        borderColor: `${accentColor}35`,
        background: `radial-gradient(circle at 30% 30%, ${accentColor}20, rgba(8, 15, 28, 0.92))`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 16px 40px ${accentColor}18`,
      }}
    >
      {project.logoUrl ? (
        <img
          src={project.logoUrl}
          alt={project.logoAlt || `${project.name} logo`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-center">
          <span className="text-2xl font-semibold tracking-[0.18em] lg:text-3xl" style={{ color: accentColor }}>
            {project.logoMonogram}
          </span>
        </div>
      )}
    </div>
  )
}

export function ProjectDetailView({
  project,
  domain,
  onBack,
  onRequestContact,
  usingSampleData,
}: ProjectDetailViewProps) {
  const accentColor = domain?.accentColor || "#55a8e5"
  const accentGlow = domain?.accentGlow || "rgba(78, 165, 220, 0.15)"
  const repoLabel = project.isPrivate ? "Private Repository" : "Public Repository"
  const ctaLabel =
    project.contactRouting?.ctaLabel ||
    (project.isPrivate ? "Contact Developer" : "View Repository")
  const metrics = [
    { label: "Language", value: project.language || "TypeScript" },
    { label: "Status", value: project.status || "In progress" },
    { label: "Year", value: project.year || "2026" },
    { label: "Team", value: project.team || "Solo build" },
    ...(project.metrics || []),
  ]

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border bg-[#0c1322]/96 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.32)] lg:p-8"
      style={{ "--project-accent": accentColor } as CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background: `linear-gradient(180deg, ${accentGlow}, rgba(12, 19, 34, 0))`,
        }}
      />

      <div className="relative z-10 space-y-8">
        <div className="flex flex-col gap-4 border-b border-white/8 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em]"
                style={{
                  borderColor: `${accentColor}3a`,
                  backgroundColor: `${accentColor}14`,
                  color: accentColor,
                }}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
                {domain?.label || "Project Archive"}
              </span>
              <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                {repoLabel}
              </span>
              {(usingSampleData || project.isSample) && (
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-primary/80">
                  Sample Content Active
                </span>
              )}
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-foreground lg:text-4xl">
                {project.name}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground lg:text-base">
                {project.summary || project.description}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="justify-start gap-2 self-start rounded-full border border-white/10 bg-white/4 px-4 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground hover:bg-white/8 hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            Back To Projects
          </Button>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.35fr_0.9fr]">
          <div className="space-y-8">
            <div className="grid gap-6 rounded-[1.75rem] border border-white/8 bg-black/18 p-5 lg:grid-cols-[auto_1fr] lg:items-center">
              <ProjectLogoSlot project={project} accentColor={accentColor} />

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {(project.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-[0.16em]"
                      style={{
                        borderColor: `${accentColor}24`,
                        backgroundColor: `${accentColor}10`,
                        color: accentColor,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
                <span className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: accentColor }}>
                  Project Overview
                </span>
              </div>
              <div className="grid gap-4">
                {(project.readmePreview || []).map((paragraph, index) => (
                  <div
                    key={`${project.slug}-paragraph-${index}`}
                    className="rounded-[1.5rem] border border-white/8 bg-white/4 p-5"
                  >
                    <p className="text-sm leading-relaxed text-muted-foreground lg:text-[15px]">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
                <span className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: accentColor }}>
                  Highlights
                </span>
              </div>
              <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-5">
                <ul className="space-y-3">
                  {(project.highlights || []).map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="min-h-[220px] rounded-[1.75rem] border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),rgba(255,255,255,0.01)_45%,rgba(0,0,0,0.16))]" />
          </div>

          <aside className="space-y-5">
            <div className="rounded-[1.75rem] border border-white/10 bg-black/18 p-5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                {project.isPrivate ? (
                  <FolderLock className="size-4" style={{ color: accentColor }} />
                ) : (
                  <FolderOpenDot className="size-4" style={{ color: accentColor }} />
                )}
                Repository Access
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {project.isPrivate
                  ? "This repository is intentionally kept private. The access request flow is available directly from this project page."
                  : "This repository uses the public access path. Once backend data is connected, the button below can use the live GitHub URL directly."}
              </p>

              <div className="mt-5 space-y-3">
                {project.isPrivate ? (
                  <Button
                    type="button"
                    onClick={() => onRequestContact(project)}
                    className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Sparkles className="size-4" />
                    {ctaLabel}
                  </Button>
                ) : project.repoUrl ? (
                  <Button asChild className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <a href={project.repoUrl} target="_blank" rel="noreferrer">
                      <Github className="size-4" />
                      {ctaLabel}
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    disabled
                    className="h-11 w-full bg-primary text-primary-foreground opacity-70"
                  >
                    <Github className="size-4" />
                    Repository Link Pending
                  </Button>
                )}

                {project.youtubeUrl ? (
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 w-full border-white/10 bg-transparent hover:bg-white/6"
                  >
                    <a href={project.youtubeUrl} target="_blank" rel="noreferrer">
                      <PlayCircle className="size-4" />
                      Watch Walkthrough
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/4 p-5">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Snapshot
              </p>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-black/16 px-4 py-3">
                  <span className="inline-flex items-center gap-2">
                    <Star className="size-4 text-primary" />
                    Stars
                  </span>
                  <span className="font-medium text-foreground">{project.stars ?? "-"}</span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-black/16 px-4 py-3">
                  <span className="inline-flex items-center gap-2">
                    <GitFork className="size-4 text-primary" />
                    Forks
                  </span>
                  <span className="font-medium text-foreground">{project.forks ?? "-"}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/4 p-5">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Build Details
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {metrics.map((metric) => (
                  <div
                    key={`${project.slug}-${metric.label}`}
                    className="rounded-2xl border border-white/8 bg-black/16 p-4"
                  >
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, FolderLock, FolderOpenDot, Search, Sparkles } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import type { Domain } from "@/lib/domain-data"
import type { ProjectRecord } from "@/lib/project-data"
import { ProjectContactDialog } from "@/components/project-contact-dialog"
import { ProjectDetailView } from "@/components/project-detail-view"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useProjects } from "@/hooks/useProjects"

interface ProjectsProps {
  activeDomainId?: string | null
  domains: Domain[]
}

type ProjectViewState = "lid" | "detail"
const DEFAULT_ACCENT = "#55a8e5"

function normalize(value?: string | null) {
  return (value || "").trim().toLowerCase()
}

function resolveProjectDomain(project: ProjectRecord, domains: Domain[]) {
  const projectDomain = normalize(project.domain)

  return (
    domains.find((domain) => {
      return [domain.id, domain.label, domain.shortLabel].some(
        (value) => normalize(value) === projectDomain
      )
    }) || null
  )
}

function ProjectLogoMini({
  project,
  accentColor,
}: {
  project: ProjectRecord
  accentColor: string
}) {
  return (
    <div
      className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[1.1rem] border"
      style={{
        borderColor: `${accentColor}35`,
        background: `radial-gradient(circle at 30% 30%, ${accentColor}20, rgba(7, 12, 22, 0.92))`,
      }}
    >
      {project.logoUrl ? (
        <img
          src={project.logoUrl}
          alt={project.logoAlt || `${project.name} logo`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="text-center">
          <div className="text-lg font-semibold tracking-[0.16em]" style={{ color: accentColor }}>
            {project.logoMonogram}
          </div>
        </div>
      )}
    </div>
  )
}

export function ProjectsSection({ activeDomainId, domains }: ProjectsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewState, setViewState] = useState<ProjectViewState>("lid")
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null)
  const [contactProjectSlug, setContactProjectSlug] = useState<string | null>(null)
  const [detailError, setDetailError] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const {
    projects,
    loading,
    error,
    usingSampleData,
    loadProjectDetails,
    submitProjectAccessRequest,
  } = useProjects()

  const activeDomain = activeDomainId ? domains.find((domain) => domain.id === activeDomainId) : null

  const projectsToShow = useMemo(() => {
    if (projects.length === 0) {
      return []
    }

    if (activeDomain) {
      return projects.filter((project) => resolveProjectDomain(project, domains)?.id === activeDomain.id)
    }

    const featured = projects.filter((project) => project.featured)
    return featured.length > 0 ? featured : projects
  }, [activeDomain, projects])

  const filteredProjects = useMemo(() => {
    const query = normalize(searchQuery)
    if (!query) return projectsToShow

    return projectsToShow.filter((project) => {
      return [
        project.name,
        project.slug,
        project.description,
        project.summary,
        project.domain,
        project.language,
        project.status,
        project.year,
        ...(project.tags || []),
        ...(project.highlights || []),
      ].some((value) => normalize(value).includes(query))
    })
  }, [projectsToShow, searchQuery])

  const activeProject =
    filteredProjects.find((project) => project.slug === activeProjectSlug) ||
    projects.find((project) => project.slug === activeProjectSlug) ||
    null

  useEffect(() => {
    if (!activeProjectSlug) return

    const stillAvailable = projectsToShow.some((project) => project.slug === activeProjectSlug)
    if (!stillAvailable) {
      setViewState("lid")
      setActiveProjectSlug(null)
      setContactProjectSlug(null)
    }
  }, [activeProjectSlug, projectsToShow])

  const handleProjectOpen = (project: ProjectRecord) => {
    setActiveProjectSlug(project.slug)
    setViewState("detail")
    setContactProjectSlug(null)
    setDetailError(null)
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    void loadProjectDetails(project.slug).catch((loadError) => {
      setDetailError(loadError instanceof Error ? loadError.message : "Could not load project details.")
    })
  }

  const handleBackToGrid = () => {
    setViewState("lid")
    setContactProjectSlug(null)
    setDetailError(null)
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const contactProject =
    filteredProjects.find((project) => project.slug === contactProjectSlug) ||
    projects.find((project) => project.slug === contactProjectSlug) ||
    null

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full border-t border-primary/10 px-6 py-20 lg:px-12"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{
                  backgroundColor: activeDomain?.accentColor || "var(--primary)",
                }}
              />
              <span
                className="text-xs font-medium tracking-[0.2em] font-mono"
                style={{
                  color: activeDomain?.accentColor || DEFAULT_ACCENT,
                }}
              >
                {activeDomain ? activeDomain.label.toUpperCase() : "PROJECTS"}
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-foreground lg:text-4xl">
                {activeDomain ? `${activeDomain.label} Projects` : "Selected Projects"}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {activeDomain
                  ? `Open any project to explore the full build story, supporting notes, and repository actions for ${activeDomain.label}.`
                  : "Browse featured work, then open a project to move into the full detail view with documentation, repository actions, and future media space."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {loading && (
              <span className="rounded-full border border-white/10 bg-white/4 px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                Syncing Projects
              </span>
            )}
            {usingSampleData && (
              <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] text-primary/80">
                Sample Data Enabled
              </span>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1220]/95 shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
          <div className="flex flex-col gap-4 border-b border-white/8 bg-gradient-to-r from-white/4 via-transparent to-primary/10 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                <Sparkles className="size-4 text-primary" />
                {viewState === "lid" ? "Project Index" : "Project Detail"}
              </div>
              <p className="text-sm text-muted-foreground">
                {viewState === "lid"
                  ? "Select a project card to move into the detailed view."
                  : `Viewing ${activeProject?.name || "project"} in focus.`}
              </p>
            </div>

            {viewState === "lid" ? (
              <div className="relative w-full max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search projects, stacks, or notes..."
                  className="h-11 border-white/10 bg-white/4 pl-10 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={handleBackToGrid}
                className="border-white/10 bg-white/4 hover:bg-white/8"
              >
                Back To Projects
              </Button>
            )}
          </div>

          <div className="relative p-5 lg:p-6">
            <AnimatePresence mode="wait" initial={false}>
              {viewState === "lid" ? (
                <motion.div
                  key="projects-lid"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {error && usingSampleData ? (
                    <div className="rounded-[1.5rem] border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                      Backend project data is not available right now, so the section is showing sample content for preview.
                    </div>
                  ) : null}

                  {filteredProjects.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.map((project) => {
                          const projectDomain = resolveProjectDomain(project, domains)
                          const accentColor = projectDomain?.accentColor || activeDomain?.accentColor || DEFAULT_ACCENT

                          return (
                            <motion.button
                              key={project.slug}
                              type="button"
                              onClick={() => handleProjectOpen(project)}
                              whileHover={{ y: -4 }}
                              whileTap={{ scale: 0.99 }}
                              className="group relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/4 p-5 text-left transition-colors hover:border-white/20 hover:bg-white/6"
                            >
                              <div
                                className="absolute inset-x-0 top-0 h-24 opacity-80"
                                style={{
                                  background: `linear-gradient(180deg, ${accentColor}18, rgba(255,255,255,0))`,
                                }}
                              />

                              <div className="relative space-y-5">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-4">
                                    <ProjectLogoMini project={project} accentColor={accentColor} />
                                    <div className="space-y-2">
                                      <div className="flex flex-wrap gap-2">
                                        <span
                                          className="rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em]"
                                          style={{
                                            borderColor: `${accentColor}30`,
                                            backgroundColor: `${accentColor}12`,
                                            color: accentColor,
                                          }}
                                        >
                                          {projectDomain?.label || project.domain || "Project"}
                                        </span>
                                        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                                          {project.isPrivate ? "Private" : "Public"}
                                        </span>
                                      </div>
                                      <div>
                                        <h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-white">
                                          {project.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                          {project.language || "TypeScript"} / {project.status || "In progress"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {project.isPrivate ? (
                                    <FolderLock className="size-5 text-muted-foreground" />
                                  ) : (
                                    <FolderOpenDot className="size-5 text-muted-foreground" />
                                  )}
                                </div>

                                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                  {project.description || "Description coming soon."}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                  {(project.tags || []).slice(0, 4).map((tag) => (
                                    <span
                                      key={`${project.slug}-${tag}`}
                                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                <div className="flex items-center justify-between border-t border-white/8 pt-4">
                                  <span className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                                    Project Detail
                                  </span>
                                  <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                                    View Project
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                  </span>
                                </div>
                              </div>
                            </motion.button>
                          )
                        })}
                      </div>

                      {!activeDomain && searchQuery ? (
                        <div className="flex justify-center">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setSearchQuery("")}
                            className="border-white/10 bg-white/4 hover:bg-white/8"
                          >
                            Clear Search
                          </Button>
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <div className="rounded-[1.75rem] border border-white/10 bg-white/4 p-10 text-center">
                      <h3 className="text-xl font-semibold text-foreground">No projects found</h3>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {loading
                          ? "Loading projects..."
                          : "Try another search, or add project data so the section has something to display."}
                      </p>
                      {searchQuery ? (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setSearchQuery("")}
                          className="mt-5 border-white/10 bg-white/4 hover:bg-white/8"
                        >
                          Reset Search
                        </Button>
                      ) : null}
                    </div>
                  )}
                </motion.div>
              ) : activeProject ? (
                <motion.div
                  key={`project-detail-${activeProject.slug}`}
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.99 }}
                  transition={{ duration: 0.34, ease: "easeOut" }}
                >
                  {detailError ? (
                    <div className="mb-4 rounded-[1.5rem] border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                      {detailError} Showing the best available project content instead.
                    </div>
                  ) : null}
                  <ProjectDetailView
                    project={activeProject}
                    domain={resolveProjectDomain(activeProject, domains)}
                    onBack={handleBackToGrid}
                    onRequestContact={(project) => setContactProjectSlug(project.slug)}
                    usingSampleData={usingSampleData}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ProjectContactDialog
        project={contactProject}
        open={Boolean(contactProject)}
        onOpenChange={(open) => {
          if (!open) {
            setContactProjectSlug(null)
          }
        }}
        onSubmitRequest={(project, payload) => submitProjectAccessRequest(project.slug, payload)}
      />
    </section>
  )
}

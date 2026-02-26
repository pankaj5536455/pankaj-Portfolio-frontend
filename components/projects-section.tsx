"use client"

import { useState, useMemo } from "react"
import type { Domain } from "@/lib/domain-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ProjectsProps {
  activeDomainId?: string | null
  domains: Domain[]
}

export function ProjectsSection({ activeDomainId, domains }: ProjectsProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const activeDomain = activeDomainId ? domains.find((d) => d.id === activeDomainId) : null

  // Get projects to show
  const projectsToShow = activeDomain
    ? activeDomain.projects
    : domains.flatMap((d) => d.projects.slice(0, 2)).slice(0, 5)

  // Filter by search query
  const filteredProjects = useMemo(() => {
    return projectsToShow.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [projectsToShow, searchQuery])

  return (
    <section id="projects" className="relative w-full py-20 px-6 lg:px-12 border-t border-primary/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{
                backgroundColor: activeDomain?.accentColor || "var(--primary)",
              }}
            />
            <span className="text-xs font-medium tracking-[0.2em] font-mono">
              {activeDomain ? activeDomain.label.toUpperCase() : "ALL DOMAINS"}
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            {activeDomain ? `${activeDomain.label} Projects` : "Featured Projects"}
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {activeDomain
              ? `Explore projects in ${activeDomain.label}`
              : "A selection of projects across our engineering domains"}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md h-10"
          />
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <div
                key={`${activeDomainId}-${idx}`}
                className="group relative p-6 rounded-lg border border-primary/20 hover:border-primary/40 bg-card/40 hover:bg-card/80 transition-all duration-300"
              >
                {/* Project Title */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>

                {/* Project Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-1 text-xs rounded bg-primary/10 text-primary border border-primary/20"
                      style={{
                        borderColor: activeDomain?.accentColor || "var(--primary)",
                        backgroundColor: `${activeDomain?.accentColor || "var(--primary)"}15`,
                        color: activeDomain?.accentColor || "var(--primary)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found matching your search.</p>
          </div>
        )}

        {/* View More */}
        {filteredProjects.length > 0 && !activeDomain && (
          <div className="mt-12 flex justify-center">
            <Button
              variant="outline"
              className="border-primary/30 hover:border-primary/50"
            >
              View All Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

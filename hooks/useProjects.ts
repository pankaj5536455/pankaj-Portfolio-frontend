import { useEffect, useState } from "react"
import { API_RETRY_INTERVAL_MS, buildApiUrl } from "@/lib/api"
import {
  buildProjectRecord,
  sampleProjects,
  type BackendProjectInput,
  type ProjectRecord,
} from "@/lib/project-data"

export interface ProjectAccessPayload {
  name: string
  email: string
  phone: string
  message: string
}

export interface ProjectAccessResult {
  message: string
  emailDelivery: boolean
  whatsappNotification: boolean
}

type ApiErrorResponse = {
  message?: string
  details?: Record<string, string>
}

function parseProjectArrayPayload(data: unknown): BackendProjectInput[] {
  if (Array.isArray((data as { value?: unknown[] })?.value)) {
    return (data as { value: BackendProjectInput[] }).value
  }
  if (Array.isArray(data)) {
    return data as BackendProjectInput[]
  }
  return []
}

async function readApiError(response: Response) {
  let message = `Request failed (${response.status}).`
  try {
    const body = (await response.json()) as ApiErrorResponse
    if (typeof body.message === "string" && body.message.trim()) {
      message = body.message.trim()
    }
    const firstDetail = body.details ? Object.values(body.details).find(Boolean) : undefined
    if (firstDetail && firstDetail !== message) {
      message = `${message} ${firstDetail}`
    }
  } catch {
    // Keep fallback message when the body is not JSON.
  }
  return message
}

export function useProjects() {
  const [projects, setProjects] = useState<ProjectRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [usingSampleData, setUsingSampleData] = useState(false)

  useEffect(() => {
    let mounted = true
    let retryTimer: ReturnType<typeof setTimeout> | null = null

    const fetchProjects = async () => {
      try {
        const res = await fetch(buildApiUrl("/projects"), {
          cache: "no-store",
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.status}`)
        }

        const data = await res.json()
        if (!mounted) return

        const rawProjects = parseProjectArrayPayload(data)
        setProjects(rawProjects.map((project, index) => buildProjectRecord(project, index)))
        setUsingSampleData(false)
        setError(null)
      } catch (err) {
        if (mounted) {
          const nextError = err instanceof Error ? err : new Error(String(err))
          setError(nextError)

          setProjects((currentProjects) => {
            const hasLiveProjects = currentProjects.some((project) => !project.isSample)
            if (hasLiveProjects) {
              return currentProjects
            }

            return sampleProjects.map((project, index) => buildProjectRecord(project, index))
          })

          setUsingSampleData(true)

          retryTimer = setTimeout(() => {
            void fetchProjects()
          }, API_RETRY_INTERVAL_MS)
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    void fetchProjects()

    return () => {
      mounted = false
      if (retryTimer) {
        clearTimeout(retryTimer)
      }
    }
  }, [])

  const loadProjectDetails = async (slug: string) => {
    const response = await fetch(buildApiUrl(`/projects/${slug}`), {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(await readApiError(response))
    }

    const detail = (await response.json()) as BackendProjectInput
    const currentIndex = projects.findIndex((project) => project.slug === slug)
    const nextRecord = buildProjectRecord(detail, currentIndex >= 0 ? currentIndex : 0)

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.slug === slug ? { ...project, ...nextRecord, isSample: false } : project
      )
    )

    return nextRecord
  }

  const submitProjectAccessRequest = async (
    slug: string,
    payload: ProjectAccessPayload
  ): Promise<ProjectAccessResult> => {
    const response = await fetch(buildApiUrl(`/projects/${slug}/access-request`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name.trim(),
        email: payload.email.trim() || null,
        phone: payload.phone.trim() || null,
        message: payload.message.trim(),
      }),
    })

    if (!response.ok) {
      throw new Error(await readApiError(response))
    }

    return (await response.json()) as ProjectAccessResult
  }

  return {
    projects,
    loading,
    error,
    usingSampleData,
    loadProjectDetails,
    submitProjectAccessRequest,
  }
}

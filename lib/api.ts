export const API_RETRY_INTERVAL_MS = 8000

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  if (normalizedPath === "/api" || normalizedPath.startsWith("/api/")) {
    return normalizedPath
  }

  return `/api${normalizedPath}`
}

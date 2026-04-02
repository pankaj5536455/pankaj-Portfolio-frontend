import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function trimTrailingSlash(value) {
  return value.replace(/\/+$/, "")
}

function isAbsoluteHttpUrl(value) {
  return /^https?:\/\//i.test(value)
}

function resolveBackendUrl() {
  const candidates = [
    process.env.BACKEND_URL,
    process.env.NEXT_PUBLIC_API_URL,
    "http://localhost:8080",
  ]

  for (const candidate of candidates) {
    const normalized = candidate?.trim()
    if (normalized && isAbsoluteHttpUrl(normalized)) {
      return trimTrailingSlash(normalized)
    }
  }

  return "http://localhost:8080"
}

const backendUrl = resolveBackendUrl()

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ]
  },
}

export default nextConfig

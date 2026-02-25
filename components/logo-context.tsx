"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import LogoSimplified from "./logos/LogoSimplified"

type LogoVariant = "icon" | "simplified" | "full" | "badge" | "animated" | "favicon" | "spinner" | "progress" | "watermark"

interface LogoContextType {
  variant: LogoVariant
  setVariant: (variant: LogoVariant) => void
  size: number
  setSize: (size: number) => void
  color: string
  setColor: (color: string) => void
}

const LogoContext = createContext<LogoContextType | undefined>(undefined)

export function LogoProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<LogoVariant>("simplified")
  const [size, setSize] = useState(24)
  const [color, setColor] = useState("#0f766e")

  return (
    <LogoContext.Provider
      value={{
        variant,
        setVariant,
        size,
        setSize,
        color,
        setColor,
      }}
    >
      {children}
    </LogoContext.Provider>
  )
}

export function useLogoContext() {
  const context = useContext(LogoContext)
  if (!context) {
    throw new Error("useLogoContext must be used within LogoProvider")
  }
  return context
}

interface LogoProps {
  size?: number
  color?: string
  variant?: LogoVariant
  className?: string
  animate?: boolean
  [key: string]: any // Allow additional props for specific variants
}

export function Logo({ size, color, variant, className = "", animate = false, ...rest }: LogoProps) {
  const context = useContext(LogoContext)

  const resolvedSize = size ?? context?.size ?? 24
  const resolvedColor = color ?? context?.color ?? "#0f766e"
  const resolvedVariant = variant ?? context?.variant ?? "simplified"

  // Dynamically import and render the logo component based on variant
  const renderLogo = () => {
    switch (resolvedVariant) {
      case "icon": {
        const LogoIcon = require("./logos/LogoIcon").default
        return <LogoIcon size={resolvedSize} color={resolvedColor} animate={animate} className={className} />
      }
      case "simplified":
        return <LogoSimplified size={resolvedSize} color={resolvedColor} animate={animate} className={className} />
      case "full": {
        const LogoFull = require("./logos/LogoFull").default
        return <LogoFull size={resolvedSize} color={resolvedColor} animate={animate} className={className} />
      }
      case "badge": {
        const LogoBadge = require("./logos/LogoBadge").default
        return <LogoBadge {...rest} size={resolvedSize} color={resolvedColor} className={className} />
      }
      case "animated": {
        const LogoAnimatedHero = require("./logos/LogoAnimatedHero").default
        return <LogoAnimatedHero size={resolvedSize} color={resolvedColor} autoPlay={animate} className={className} />
      }
      case "favicon": {
        const LogoFavicon = require("./logos/LogoFavicon").default
        return <LogoFavicon size={resolvedSize} color={resolvedColor} {...rest} />
      }
      case "spinner": {
        const LogoLoadingSpinner = require("./logos/LogoLoadingSpinner").default
        return <LogoLoadingSpinner size={resolvedSize} color={resolvedColor} {...rest} className={className} />
      }
      case "progress": {
        const LogoProgressBar = require("./logos/LogoProgressBar").default
        return <LogoProgressBar size={resolvedSize} color={resolvedColor} {...rest} className={className} />
      }
      case "watermark": {
        const LogoWatermark = require("./logos/LogoWatermark").default
        return <LogoWatermark size={resolvedSize} color={resolvedColor} {...rest} className={className} />
      }
      default:
        return <LogoSimplified size={resolvedSize} color={resolvedColor} animate={animate} className={className} />
    }
  }

  return renderLogo()
}

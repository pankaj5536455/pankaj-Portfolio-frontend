"use client"

import LogoIcon from "./LogoIcon"

interface LogoWatermarkProps {
  size?: number
  opacity?: number
  color?: string
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
  className?: string
}

export default function LogoWatermark({
  size = 80,
  opacity = 0.1,
  color = "#0f766e",
  position = "bottom-right",
  className = "",
}: LogoWatermarkProps) {
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  }

  return (
    <div className={`fixed ${positionClasses[position]} pointer-events-none z-10 ${className}`} style={{ opacity }}>
      <LogoIcon size={size} color={color} />
    </div>
  )
}

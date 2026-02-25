"use client"

import LogoIcon from "./LogoIcon"

interface LogoBadgeProps {
  text?: string
  size?: number
  color?: string
  backgroundColor?: string
  textColor?: string
  className?: string
}

export default function LogoBadge({
  text = "Pankaj Kumar",
  size = 120,
  color = "#0f766e",
  backgroundColor = "#ffffff",
  textColor = "#1a1a1a",
  className = "",
}: LogoBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border-2 ${className}`}
      style={{
        borderColor: color,
        backgroundColor,
        fontSize: size * 0.12,
      }}
    >
      {/* Mini logo */}
      <LogoIcon size={size * 0.25} color={color} />

      {/* Text */}
      <span style={{ color: textColor, fontWeight: "600" }}>{text}</span>
    </div>
  )
}

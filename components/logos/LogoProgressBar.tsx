"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import LogoIcon from "./LogoIcon"

interface LogoProgressBarProps {
  progress: number // 0 to 100
  size?: number
  color?: string
  backgroundColor?: string
  className?: string
}

export default function LogoProgressBar({
  progress,
  size = 200,
  color = "#0f766e",
  backgroundColor = "#e2e8f0",
  className = "",
}: LogoProgressBarProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)

  useEffect(() => {
    setAnimatedProgress(progress)
  }, [progress])

  const circumference = 2 * Math.PI * 80 // radius of 80

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg viewBox="0 0 200 200" width={size} height={size} className="absolute inset-0">
        <circle cx="100" cy="100" r="80" fill="none" stroke={backgroundColor} strokeWidth="8" />

        {/* Progress circle */}
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (animatedProgress / 100) * circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (animatedProgress / 100) * circumference }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ transform: "rotate(-90deg)", transformOrigin: "100px 100px" }}
        />
      </svg>

      {/* Logo in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <LogoIcon size={size * 0.4} color={color} />
      </div>

      {/* Progress text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold mt-8" style={{ color }}>
          {Math.round(animatedProgress)}%
        </span>
      </div>
    </div>
  )
}

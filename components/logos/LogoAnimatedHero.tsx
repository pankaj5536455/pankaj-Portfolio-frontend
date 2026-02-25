"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface LogoAnimatedHeroProps {
  size?: number
  color?: string
  autoPlay?: boolean
  className?: string
}

export default function LogoAnimatedHero({
  size = 300,
  color = "#0f766e",
  autoPlay = true,
  className = "",
}: LogoAnimatedHeroProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setIsPlaying(false)
        setTimeout(() => setIsPlaying(true), 500)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [autoPlay])

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Animated background particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: color,
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            opacity: 0.3,
          }}
          animate={
            isPlaying
              ? {
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }
              : {}
          }
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Main logo with complex animation */}
      <svg viewBox="0 0 200 200" width={size} height={size} className="absolute inset-0" style={{ color }}>
        {/* Outer circle with breathing effect */}
        <motion.circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
          animate={
            isPlaying
              ? {
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.4, 0.2],
                }
              : {}
          }
          transition={{ duration: 4, repeat: isPlaying ? Number.POSITIVE_INFINITY : 0 }}
        />

        {/* Main structure with sequential drawing */}
        <motion.path
          d="M100 160 L100 120"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isPlaying ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        <motion.path
          d="M100 120 L85 105 M85 105 L75 95 M85 105 L80 115"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isPlaying ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 1 }}
        />

        <motion.path
          d="M100 120 L115 105 M115 105 L125 95 M115 105 L120 115"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isPlaying ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        />

        {/* Pulsing central node */}
        <motion.circle
          cx="100"
          cy="120"
          r="4"
          fill="currentColor"
          animate={
            isPlaying
              ? {
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
            delay: 2.5,
          }}
        />

        {/* Connection nodes with staggered appearance */}
        <motion.circle
          cx="85"
          cy="105"
          r="2"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: isPlaying ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 2.8 }}
        />
        <motion.circle
          cx="115"
          cy="105"
          r="2"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: isPlaying ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 3 }}
        />
      </svg>

      {/* Click to replay */}
      <button
        onClick={() => {
          setIsPlaying(false)
          setTimeout(() => setIsPlaying(true), 100)
        }}
        className="absolute inset-0 w-full h-full bg-transparent border-none cursor-pointer"
        aria-label="Replay logo animation"
      />
    </div>
  )
}

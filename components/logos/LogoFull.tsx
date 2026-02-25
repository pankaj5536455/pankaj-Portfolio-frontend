"use client"

import { motion } from "framer-motion"

interface LogoFullProps {
  size?: number
  color?: string
  animate?: boolean
  className?: string
}

export default function LogoFull({ size = 200, color = "#0f766e", animate = false, className = "" }: LogoFullProps) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} style={{ color }}>
      {/* Outer circle - representing wholeness */}
      <motion.circle
        cx="100"
        cy="100"
        r="85"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
        initial={{ scale: 0 }}
        animate={{ scale: animate ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 3, repeat: animate ? Number.POSITIVE_INFINITY : 0 }}
      />

      {/* Main trunk/stem */}
      <motion.path
        d="M100 160 L100 120"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: animate ? 0.5 : 0 }}
      />

      {/* Root system forming 'P' */}
      <motion.path
        d="M100 160 L85 175 M100 160 L90 180 M85 175 L75 185 M90 180 L80 190"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: animate ? 0.8 : 0 }}
      />

      {/* Root system forming 'K' */}
      <motion.path
        d="M100 160 L115 175 M100 160 L110 180 M115 175 L125 185 M110 180 L120 190"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: animate ? 1 : 0 }}
      />

      {/* Neural branches - left side */}
      <motion.path
        d="M100 120 L85 105 M85 105 L75 95 M85 105 L80 115 M75 95 L65 85 M80 115 L70 125"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: animate ? 0.3 : 0 }}
      />

      {/* Neural branches - right side */}
      <motion.path
        d="M100 120 L115 105 M115 105 L125 95 M115 105 L120 115 M125 95 L135 85 M120 115 L130 125"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: animate ? 0.4 : 0 }}
      />

      {/* Central neural node */}
      <motion.circle
        cx="100"
        cy="120"
        r="4"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: animate ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 2, repeat: animate ? Number.POSITIVE_INFINITY : 0, delay: 1.8 }}
      />

      {/* Connection nodes */}
      <motion.circle
        cx="85"
        cy="105"
        r="2"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: animate ? 2 : 0 }}
      />
      <motion.circle
        cx="115"
        cy="105"
        r="2"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: animate ? 2.1 : 0 }}
      />

      {/* Subtle circuit patterns */}
      <motion.path
        d="M75 95 L70 90 L65 90 M125 95 L130 90 L135 90"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: animate ? 2.2 : 0 }}
      />
    </svg>
  )
}

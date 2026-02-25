import { motion } from "framer-motion"

interface LogoSimplifiedProps {
  size?: number
  color?: string
  animate?: boolean
  className?: string
}

export default function LogoSimplified({
  size = 200,
  color = "#0f766e",
  animate = false,
  className = "",
}: LogoSimplifiedProps) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} style={{ color }}>
      {/* Simplified version - core structure only */}
      <motion.path
        d="M100 160 L100 120 L85 105 M100 120 L115 105 M85 105 L75 95 M115 105 L125 95"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: animate ? 1.5 : 0.5 }}
      />

      {/* Central node */}
      <motion.circle
        cx="100"
        cy="120"
        r="3"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: animate ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 2, repeat: animate ? Number.POSITIVE_INFINITY : 0, delay: 1.2 }}
      />

      {/* Connection nodes */}
      <motion.circle
        cx="85"
        cy="105"
        r="1.5"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: animate ? 1.5 : 0 }}
      />
      <motion.circle
        cx="115"
        cy="105"
        r="1.5"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: animate ? 1.6 : 0 }}
      />
    </svg>
  )
}

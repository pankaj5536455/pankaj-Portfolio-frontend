"use client"

import { motion } from "framer-motion"
import LogoIcon from "./LogoIcon"

interface LogoLoadingSpinnerProps {
  size?: number
  color?: string
  speed?: number
  className?: string
}

export default function LogoLoadingSpinner({
  size = 60,
  color = "#0f766e",
  speed = 2,
  className = "",
}: LogoLoadingSpinnerProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Spinning outer ring */}
      <motion.svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: speed, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="20 10"
          opacity="0.3"
        />
      </motion.svg>

      {/* Pulsing center logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <LogoIcon size={size * 0.5} color={color} />
        </motion.div>
      </div>

      {/* Orbiting dots */}
      {[0, 120, 240].map((angle, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            top: "50%",
            left: "50%",
            transformOrigin: `0 0`,
          }}
          animate={{
            rotate: 360,
            x: Math.cos((angle * Math.PI) / 180) * (size * 0.35),
            y: Math.sin((angle * Math.PI) / 180) * (size * 0.35),
          }}
          transition={{
            duration: speed * 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  )
}

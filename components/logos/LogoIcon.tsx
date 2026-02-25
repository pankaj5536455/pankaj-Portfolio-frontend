interface LogoIconProps {
  size?: number
  color?: string
  className?: string
}

export default function LogoIcon({ size = 24, color = "#0f766e", className = "" }: LogoIconProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} style={{ color }} role="img" aria-label="Logo icon">
      <path d="M32 56 V33 L20 21" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M32 33 L44 21" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="32" cy="33" r="5" fill="currentColor" />
    </svg>
  )
}

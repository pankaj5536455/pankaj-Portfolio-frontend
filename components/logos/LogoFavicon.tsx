interface LogoFaviconProps {
  size?: number
  color?: string
  backgroundColor?: string
}

export default function LogoFavicon({
  size = 64,
  color = "#0f766e",
  backgroundColor = "transparent",
}: LogoFaviconProps) {
  const showBackground = backgroundColor !== "transparent"

  return (
    <svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-label="Favicon logo">
      {showBackground ? <rect width="64" height="64" rx="10" fill={backgroundColor} /> : null}

      {/* High-contrast geometry sized for tiny favicon rendering */}
      <path d="M32 56 V33 L20 21" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M32 33 L44 21" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="32" cy="33" r="5" fill={color} />
    </svg>
  )
}

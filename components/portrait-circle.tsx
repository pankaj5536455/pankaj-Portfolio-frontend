interface PortraitCircleProps {
  accentColor?: string
  sizeClass?: string
  showHoverRing?: boolean
}

export function PortraitCircle({
  accentColor,
  sizeClass = "h-64 w-64 lg:h-96 lg:w-96",
  showHoverRing = false,
}: PortraitCircleProps) {
  return (
    <div
      className={`relative flex ${sizeClass} items-center justify-center rounded-full overflow-hidden`}
      style={{
        background: accentColor
          ? `linear-gradient(135deg, ${accentColor}12, ${accentColor}06)`
          : "var(--background)",
        border: accentColor ? `1.5px solid ${accentColor}30` : "1.5px solid var(--border)",
      }}
    >
      {/* Portrait image - centered display */}
      <img
        src="/portrait.png"
        alt="Portrait"
        className="h-full w-full object-cover"
        style={{
          objectPosition: "center 0%",
        }}
      />

      {/* Hover ring */}
      {showHoverRing && accentColor && (
        <div
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ border: `2px solid ${accentColor}55` }}
        />
      )}
    </div>
  )
}

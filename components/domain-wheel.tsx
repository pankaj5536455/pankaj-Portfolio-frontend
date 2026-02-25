"use client"

import { useCallback, useState, useEffect } from "react"
import type { Domain } from "@/lib/domain-data"

interface DomainWheelProps {
  domains: Domain[]
  activeDomain?: string | null
  hoveredDomain: string | null
  onDomainClick: (id: string) => void
  onDomainHover: (id: string | null) => void
}

// Pre-computed stable pattern coordinates to avoid hydration mismatches
const PATTERNS: Record<string, { type: string; props: Record<string, number | string> }[]> = {
  iot: [
    { type: "line", props: { x1: 20, y1: -8, x2: 20, y2: -20 } },
    { type: "dot", props: { cx: 20, cy: -20, r: 1.5 } },
    { type: "line", props: { x1: -10, y1: 17, x2: -20, y2: 10 } },
    { type: "dot", props: { cx: -20, cy: 10, r: 1.5 } },
    { type: "line", props: { x1: -10, y1: -17, x2: -20, y2: -10 } },
    { type: "dot", props: { cx: -20, cy: -10, r: 1.5 } },
    { type: "line", props: { x1: 10, y1: 17, x2: 20, y2: 10 } },
    { type: "dot", props: { cx: 20, cy: 10, r: 1.5 } },
  ],
  "ai-ml": [
    { type: "circle", props: { cx: 0, cy: -18, r: 2.5 } },
    { type: "dot", props: { cx: 0, cy: -18, r: 1 } },
    { type: "circle", props: { cx: 17, cy: -6, r: 2.5 } },
    { type: "dot", props: { cx: 17, cy: -6, r: 1 } },
    { type: "line", props: { x1: 0, y1: -18, x2: 17, y2: -6 } },
    { type: "circle", props: { cx: 10, cy: 15, r: 2.5 } },
    { type: "line", props: { x1: 17, y1: -6, x2: 10, y2: 15 } },
    { type: "circle", props: { cx: -10, cy: 15, r: 2.5 } },
    { type: "line", props: { x1: 10, y1: 15, x2: -10, y2: 15 } },
    { type: "circle", props: { cx: -17, cy: -6, r: 2.5 } },
    { type: "line", props: { x1: -10, y1: 15, x2: -17, y2: -6 } },
  ],
  backend: [
    { type: "rect", props: { x: -4, y: -16, w: 8, h: 6 } },
    { type: "line", props: { x1: 0, y1: -10, x2: 0, y2: -4 } },
    { type: "rect", props: { x: -4, y: -4, w: 8, h: 6 } },
    { type: "line", props: { x1: 0, y1: 2, x2: 0, y2: 8 } },
    { type: "rect", props: { x: -4, y: 8, w: 8, h: 6 } },
  ],
  "web-app": [
    { type: "rect", props: { x: -12, y: -10, w: 24, h: 18 } },
    { type: "line", props: { x1: -12, y1: -4, x2: 12, y2: -4 } },
    { type: "line", props: { x1: -4, y1: -10, x2: -4, y2: 8 } },
    { type: "dot", props: { cx: -8, cy: -7, r: 1 } },
    { type: "dot", props: { cx: -5.5, cy: -7, r: 1 } },
  ],
  frontend: [
    { type: "rect", props: { x: -10, y: -10, w: 8, h: 8 } },
    { type: "rect", props: { x: 2, y: -10, w: 8, h: 8 } },
    { type: "rect", props: { x: -10, y: 2, w: 8, h: 8 } },
    { type: "rect", props: { x: 2, y: 2, w: 8, h: 8 } },
  ],
  data: [
    { type: "line", props: { x1: -15, y1: 10, x2: -8, y2: -5 } },
    { type: "line", props: { x1: -8, y1: -5, x2: 0, y2: 5 } },
    { type: "line", props: { x1: 0, y1: 5, x2: 8, y2: -12 } },
    { type: "line", props: { x1: 8, y1: -12, x2: 15, y2: -8 } },
    { type: "dot", props: { cx: -15, cy: 10, r: 1.5 } },
    { type: "dot", props: { cx: -8, cy: -5, r: 1.5 } },
    { type: "dot", props: { cx: 0, cy: 5, r: 1.5 } },
    { type: "dot", props: { cx: 8, cy: -12, r: 1.5 } },
    { type: "dot", props: { cx: 15, cy: -8, r: 1.5 } },
  ],
  embedded: [
    { type: "dot", props: { cx: -12, cy: -12, r: 1.2 } },
    { type: "dot", props: { cx: -4, cy: -12, r: 1.2 } },
    { type: "dot", props: { cx: 4, cy: -12, r: 1.2 } },
    { type: "dot", props: { cx: 12, cy: -12, r: 1.2 } },
    { type: "dot", props: { cx: -12, cy: -4, r: 1.2 } },
    { type: "dot", props: { cx: 12, cy: -4, r: 1.2 } },
    { type: "dot", props: { cx: -12, cy: 4, r: 1.2 } },
    { type: "dot", props: { cx: 12, cy: 4, r: 1.2 } },
    { type: "dot", props: { cx: -12, cy: 12, r: 1.2 } },
    { type: "dot", props: { cx: -4, cy: 12, r: 1.2 } },
    { type: "dot", props: { cx: 4, cy: 12, r: 1.2 } },
    { type: "dot", props: { cx: 12, cy: 12, r: 1.2 } },
    { type: "rect", props: { x: -6, y: -6, w: 12, h: 12 } },
  ],
  research: [
    { type: "circle", props: { cx: 0, cy: 0, r: 16 } },
    { type: "circle", props: { cx: 0, cy: 0, r: 10 } },
    { type: "line", props: { x1: 0, y1: -16, x2: 0, y2: 16 } },
    { type: "line", props: { x1: -16, y1: 0, x2: 16, y2: 0 } },
    { type: "dot", props: { cx: 10, cy: 0, r: 2 } },
    { type: "dot", props: { cx: -7, cy: 7, r: 2 } },
  ],
}

function renderPattern(domainId: string, cx: number, cy: number) {
  const items = PATTERNS[domainId] || []
  return items.map((item, i) => {
    const key = `${domainId}-${i}`
    switch (item.type) {
      case "line":
        return (
          <line
            key={key}
            x1={cx + Number(item.props.x1)}
            y1={cy + Number(item.props.y1)}
            x2={cx + Number(item.props.x2)}
            y2={cy + Number(item.props.y2)}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.2"
          />
        )
      case "dot":
        return (
          <circle
            key={key}
            cx={cx + Number(item.props.cx)}
            cy={cy + Number(item.props.cy)}
            r={Number(item.props.r)}
            fill="currentColor"
            opacity="0.2"
          />
        )
      case "circle":
        return (
          <circle
            key={key}
            cx={cx + Number(item.props.cx)}
            cy={cy + Number(item.props.cy)}
            r={Number(item.props.r)}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            opacity="0.2"
          />
        )
      case "rect":
        return (
          <rect
            key={key}
            x={cx + Number(item.props.x)}
            y={cy + Number(item.props.y)}
            width={Number(item.props.w)}
            height={Number(item.props.h)}
            rx="1"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            opacity="0.2"
          />
        )
      default:
        return null
    }
  })
}

export function DomainWheel({
  domains,
  hoveredDomain,
  onDomainClick,
  onDomainHover,
}: DomainWheelProps) {
  if (!domains || domains.length === 0) return null
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const size = 420
  const center = size / 2
  const outerRadius = size / 2 - 12
  const innerRadius = outerRadius * 0.42
  const sliceAngle = 360 / domains.length

  const polarToCartesian = useCallback(
    (angle: number, radius: number) => ({
      x: Math.round((center + radius * Math.cos((angle * Math.PI) / 180)) * 100) / 100,
      y: Math.round((center + radius * Math.sin((angle * Math.PI) / 180)) * 100) / 100,
    }),
    [center]
  )

  const createSlicePath = useCallback(
    (startAngle: number, endAngle: number, outerR: number, innerR: number) => {
      const start = polarToCartesian(startAngle, outerR)
      const end = polarToCartesian(endAngle, outerR)
      const innerStart = polarToCartesian(endAngle, innerR)
      const innerEnd = polarToCartesian(startAngle, innerR)
      const largeArc = endAngle - startAngle > 180 ? 1 : 0
      return [
        `M ${start.x} ${start.y}`,
        `A ${outerR} ${outerR} 0 ${largeArc} 1 ${end.x} ${end.y}`,
        `L ${innerStart.x} ${innerStart.y}`,
        `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
        "Z",
      ].join(" ")
    },
    [polarToCartesian]
  )

  const getSliceOpacity = (domainId: string) => {
    if (!hoveredDomain) return 0.6
    if (hoveredDomain === domainId) return 1
    return 0.25
  }

  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient glow */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          background: hoveredDomain
            ? domains.find((d) => d.id === hoveredDomain)?.accentGlow
            : "rgba(78, 165, 220, 0.06)",
          transition: "all 0.6s ease",
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="relative z-10"
        role="img"
        aria-label="Domain selector wheel with 8 engineering domains"
      >
        {/* Outer glass ring */}
        <circle cx={center} cy={center} r={outerRadius + 3} fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" className="text-foreground" />
        <circle cx={center} cy={center} r={outerRadius + 6} fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.05" className="text-foreground" />

        {/* Slices */}
        {domains.map((domain, i) => {
          const startAngle = i * sliceAngle - 90
          const endAngle = startAngle + sliceAngle
          const midAngle = startAngle + sliceAngle / 2
          const isHovered = hoveredDomain === domain.id
          const sliceCenter = polarToCartesian(midAngle, (outerRadius + innerRadius) / 2)
          const labelRadius = outerRadius - 14
          const labelPos = polarToCartesian(midAngle, labelRadius)

          return (
            <g
              key={domain.id}
              onClick={() => onDomainClick(domain.id)}
              onMouseEnter={() => onDomainHover(domain.id)}
              onMouseLeave={() => onDomainHover(null)}
              style={{
                cursor: "pointer",
                opacity: mounted ? getSliceOpacity(domain.id) : 0.6,
                transition: "opacity 0.4s ease",
                outline: "none",
              }}
              role="button"
              aria-label={`Select ${domain.label} domain`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onDomainClick(domain.id)
                }
              }}
            >
              {/* Slice fill */}
              <path
                d={createSlicePath(startAngle, endAngle, outerRadius, innerRadius)}
                fill={isHovered ? domain.accentColor : "currentColor"}
                fillOpacity={isHovered ? 0.12 : 0.03}
                stroke={isHovered ? domain.accentColor : "currentColor"}
                strokeWidth={isHovered ? "1" : "0.5"}
                strokeOpacity={isHovered ? 0.4 : 0.15}
                className={isHovered ? "" : "text-foreground"}
                style={{ transition: "all 0.3s ease" }}
              />

              {/* Surface pattern */}
              <g
                style={{
                  color: isHovered ? domain.accentColor : "currentColor",
                  transition: "color 0.3s ease",
                }}
                className={isHovered ? "" : "text-foreground"}
              >
                {renderPattern(domain.id, sliceCenter.x, sliceCenter.y)}
              </g>

              {/* Label */}
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isHovered ? domain.accentColor : "currentColor"}
                className={isHovered ? "" : "text-muted-foreground"}
                fontSize={isHovered ? "9" : "8.5"}
                fontWeight={isHovered ? "600" : "400"}
                letterSpacing="0.08em"
                style={{
                  transition: "all 0.3s ease",
                  textTransform: "uppercase" as const,
                }}
                transform={`rotate(${midAngle > 0 && midAngle < 180 ? midAngle + 90 : midAngle - 90}, ${labelPos.x}, ${labelPos.y})`}
              >
                {domain.shortLabel}
              </text>
            </g>
          )
        })}

        {/* Inner circle */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="var(--background)"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeOpacity="0.15"
          className="text-foreground"
        />

        {/* Center portrait area */}
        <g>
          <circle cx={center} cy={center} r={innerRadius} fill="var(--background)" />
          <circle cx={center} cy={center} r={innerRadius - 6} fill="var(--card)" />
          <circle cx={center} cy={center} r={innerRadius - 2} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.15" className="text-primary" />

          {/* Portrait image */}
          <defs>
            <clipPath id="portraitClip">
              <circle cx={center} cy={center} r={innerRadius - 8} />
            </clipPath>
          </defs>
          <image
            x={center - (innerRadius - 12)}
            y={center - (innerRadius - 12)}
            width={(innerRadius - 12) * 2}
            height={(innerRadius - 12) * 2}
            href="/portrait.png"
            clipPath="url(#portraitClip)"
            preserveAspectRatio="xMidYMin slice"
          />
        </g>
      </svg>
    </div>
  )
}

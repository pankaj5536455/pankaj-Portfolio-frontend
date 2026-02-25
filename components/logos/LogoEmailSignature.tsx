"use client"

import LogoIcon from "./LogoIcon"

interface LogoEmailSignatureProps {
  name?: string
  title?: string
  email?: string
  website?: string
  size?: number
  color?: string
}

export default function LogoEmailSignature({
  name = "Pankaj Kumar",
  title = "Full-Stack Developer & IoT Engineer",
  email = "pankaj@example.com",
  website = "pankajkumar.dev",
  size = 60,
  color = "#0f766e",
}: LogoEmailSignatureProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", lineHeight: "1.4" }}>
      <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: "collapse" }}>
        <tr>
          <td style={{ paddingRight: "15px", verticalAlign: "top" }}>
            {/* Email-safe SVG logo */}
            <LogoIcon size={size} color={color} />
          </td>
          <td style={{ verticalAlign: "top" }}>
            <div style={{ color: "#1a1a1a", fontWeight: "bold", fontSize: "16px", marginBottom: "2px" }}>{name}</div>
            <div style={{ color: "#666666", fontSize: "13px", marginBottom: "8px" }}>{title}</div>
            <div style={{ fontSize: "12px" }}>
              <div style={{ marginBottom: "2px" }}>
                <span style={{ color: "#666666" }}>Email: </span>
                <a href={`mailto:${email}`} style={{ color: color, textDecoration: "none" }}>
                  {email}
                </a>
              </div>
              <div>
                <span style={{ color: "#666666" }}>Web: </span>
                <a href={`https://${website}`} style={{ color: color, textDecoration: "none" }}>
                  {website}
                </a>
              </div>
            </div>
          </td>
        </tr>
      </table>

      {/* Separator line */}
      <div
        style={{
          marginTop: "10px",
          paddingTop: "10px",
          borderTop: `1px solid ${color}30`,
          fontSize: "10px",
          color: "#999999",
        }}
      >
        Building intelligent solutions that bridge hardware and software
      </div>
    </div>
  )
}

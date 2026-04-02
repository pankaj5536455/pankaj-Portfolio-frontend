import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LogoProvider } from '@/components/logo-context'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const viewport: Viewport = {
  themeColor: '#0f1729',
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Systems Engineer Portfolio',
  description: 'A multidisciplinary engineer integrating hardware, software, and data into scalable, real-world solutions.',
  generator: 'v0.app',
  icons: {
    icon: '/icon',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
        className={`${_inter.variable} ${_jetbrains.variable} font-sans antialiased`}
      >
        <LogoProvider>
          {children}
          <Analytics />
        </LogoProvider>
      </body>
    </html>
  )
}

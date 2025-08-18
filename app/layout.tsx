import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pankaj Kumar | Portfolio',
  description: 'Portfolio of Pankaj Kumar, Full-Stack Developer',
  openGraph: {
    title: 'Pankaj Kumar Portfolio',
    description: 'Showcasing skills in IoT, AI, and full-stack development',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
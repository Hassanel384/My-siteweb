import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Claritas - Matériel Médical ORL',
  description: 'Excellence en matériel médical ORL, chirurgie plastique et neurochirurgie',
  keywords: 'matériel médical, ORL, chirurgie plastique, neurochirurgie, équipement médical',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

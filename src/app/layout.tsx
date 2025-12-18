import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tiki Village - Centre Culturel Polynésien',
  description: 'Découvrez la culture polynésienne authentique à Tiki Village',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}

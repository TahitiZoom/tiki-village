import type { Metadata } from 'next'
import { headers } from 'next/headers'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Tiki Village - Centre Culturel Polynésien',
  description: 'Découvrez la culture polynésienne authentique à Tiki Village',
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const requestHeaders = headers()
  const locale = requestHeaders.get('x-locale') || 'fr'

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}

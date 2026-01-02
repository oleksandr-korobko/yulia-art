import type { Metadata } from 'next'
import '../styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Yuliia Holovatiuk-Ungureanu | Multidisciplinary Artist',
  description: 'A multidisciplinary artist working across immersive installation, sculpture, ceramics, and material-based painting, engaging with archival materials, legal documents, and artefacts to examine how war, displacement, and the pursuit of justice shape pathways of healing, resilience, and rebuilding future realities.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

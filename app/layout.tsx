import type { Metadata } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import '../styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getSiteConfig } from '@/lib/content'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500'],
  variable: '--font-serif',
  display: 'swap',
})

const siteConfig = getSiteConfig()
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: {
    default: siteConfig.siteTitle,
    template: '%s — Yuliia Holovatiuk-Ungureanu',
  },
  description: siteConfig.siteDescription,

  // OpenGraph (Facebook, LinkedIn, Instagram)
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteUrl,
    siteName: 'Yuliia Holovatiuk-Ungureanu',
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Yuliia Holovatiuk-Ungureanu - Artist Portfolio',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@yuliia_art_uk_ua',
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} antialiased`}>
        <Header navigation={siteConfig.navigation} />
        <main className="pt-20 lg:pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

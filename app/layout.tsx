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

export const metadata: Metadata = {
  title: siteConfig.siteTitle,
  description: siteConfig.siteDescription,
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
        {children}
        <Footer />
      </body>
    </html>
  )
}

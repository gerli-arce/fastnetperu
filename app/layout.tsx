"use client"

import type React from "react"
import { useScrollToTop } from "@/hooks/use-scroll-to-top"
import { WhatsAppFloating } from "@/components/whatsapp-floating"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useScrollToTop()

  return (
    <html lang="es">
      <head>
        <title>FASTNETPERU - Internet Fibra, Antena, TV Cable e IPTV</title>
        <meta name="description" content="Conectividad profesional en todo Perú" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="icon.png" />
      </head>
      <body>
        {children}
        <WhatsAppFloating />
        <ScrollToTopButton />
      </body>
    </html>
  )
}

// export const metadata = {
//       generator: 'v0.app'
//     };
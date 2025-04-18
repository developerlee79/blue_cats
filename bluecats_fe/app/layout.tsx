import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "../../../../../Downloads/blue_cat-main/components/theme-provider"
import { WagmiProvider } from "./wagmi-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sniper Dashboard",
  description: "AI-powered crypto trend analysis platform",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#0e0a19] text-white min-h-screen`}>
        <WagmiProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}

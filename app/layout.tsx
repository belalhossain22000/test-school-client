import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import ReduxProvider from "@/redux/ReduxProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Test_School - Digital Competency Assessment Platform",
  description: "Assess and certify your digital skills through our comprehensive 3-step evaluation process",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}

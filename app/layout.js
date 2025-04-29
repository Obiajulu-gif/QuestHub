import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "QuestHub - Web3 Quest Platform on Solana",
  description: "Gamified quest platform on Solana blockchain",
    generator: 'v0.dev'
}

import ClientLayout from "./ClientLayout"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a14] text-white min-h-screen`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

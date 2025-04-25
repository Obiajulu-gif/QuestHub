import { Inter } from "next/font/google"
import "./globals.css"
import WalletContextProvider from "@/components/WalletContextProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "QuestHub - Web3 Quest Platform on Solana",
  description: "Gamified quest platform on Solana blockchain",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a14] text-white min-h-screen`}>
        <WalletContextProvider>{children}</WalletContextProvider>
      </body>
    </html>
  )
}

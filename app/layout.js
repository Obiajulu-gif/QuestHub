import { Inter } from "next/font/google"
import "./globals.css"
import WalletContextProvider from "@/components/WalletContextProvider"
import { NotificationProvider } from "@/context/NotificationContext"
import { AuthProvider } from "@/context/AuthContext"
import ToastContainer from "@/components/notifications/ToastContainer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "QuestHub - Web3 Quest Platform on Solana",
  description: "Gamified quest platform on Solana blockchain",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a14] text-white min-h-screen`}>
        <WalletContextProvider>
          <AuthProvider>
            <NotificationProvider>
              {children}
              <ToastContainer />
            </NotificationProvider>
          </AuthProvider>
        </WalletContextProvider>
      </body>
    </html>
  )
}

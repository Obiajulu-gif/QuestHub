"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useWallet } from "@solana/wallet-adapter-react"

interface LayoutProps {
  children: React.ReactNode
  hideNav?: boolean
}

export default function LayoutWrapper({ children, hideNav = false }: LayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { connected } = useWallet()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a14]">
      {/* Navbar */}
      {!hideNav && <Navbar />}

      {/* Main Content */}
      <main className="flex-1 pt-16">{children}</main>

      {/* Footer */}
      {!hideNav && <Footer />}
    </div>
  )
}

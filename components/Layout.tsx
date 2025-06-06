import type React from "react"
import Navbar from "./Navbar"
// Import Footer as default instead of named import
import Footer from "./Footer"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout

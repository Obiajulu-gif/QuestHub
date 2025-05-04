"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useWallet } from "@solana/wallet-adapter-react"
import { useAuth } from "@/context/AuthContext"
import NotificationDropdown from "./notifications/NotificationDropdown"
import { Button } from "@/components/ui/Button"
import { Avatar } from "@/components/ui/Avatar"
import { Container } from "@/components/ui/Container"

const Navbar = () => {
  const pathname = usePathname()
  const { connected } = useWallet()
  const { user, signOut } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
    setUserMenuOpen(false)
  }, [pathname])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Quests", path: "/quests" },
    { name: "Badges", path: "/badges" },
    { name: "Community", path: "/community" },
    { name: "Referrals", path: "/referrals" },
    { name: "FAQ", path: "/faq" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a14]/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center mr-4 sm:mr-6">
            <span className="text-[#00a3ff] font-bold text-lg sm:text-xl whitespace-nowrap">QuestHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 flex-grow justify-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm transition-all hover:text-[#00a3ff] whitespace-nowrap ${
                  pathname === item.path ? "text-[#00a3ff]" : "text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side - Wallet & Notifications */}
          <div className="flex items-center gap-4">
            {user && <NotificationDropdown />}

            {user ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 bg-[#151524] hover:bg-[#1e1e32] px-3 py-1.5 rounded-lg transition-colors"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <Avatar
                    size="sm"
                    fallback={user.username.charAt(0)}
                    className="bg-gradient-to-br from-[#00a3ff] to-[#7928ca]"
                  />
                  <span className="text-sm hidden sm:block">{user.username}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#151524] rounded-lg shadow-lg py-1 z-50">
                    <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-[#1e1e32] transition-colors">
                      Profile
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm hover:bg-[#1e1e32] transition-colors">
                      Settings
                    </Link>
                    <button
                      onClick={signOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#1e1e32] transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-1 sm:p-2 rounded-lg hover:bg-[#151524] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden bg-[#0a0a14] overflow-hidden z-50 ${mobileMenuOpen ? "block" : "hidden"}`}
        initial={{ height: 0 }}
        animate={{ height: mobileMenuOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Container>
          <nav className="py-2 sm:py-4">
            <ul className="space-y-1 sm:space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`block py-2 px-4 rounded-lg transition-colors ${
                      pathname === item.path ? "bg-[#151524] text-[#00a3ff]" : "hover:bg-[#151524] text-gray-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {!user && (
                <>
                  <li>
                    <Link
                      href="/auth/signin"
                      className="block py-2 px-4 rounded-lg transition-colors hover:bg-[#151524] text-gray-300"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/auth/signup"
                      className="block py-2 px-4 rounded-lg transition-colors bg-[#00a3ff] text-white"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </Container>
      </motion.div>
    </header>
  )
}

export default Navbar

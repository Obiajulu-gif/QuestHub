"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import { Layout } from "@/components/Layout"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationError, setValidationError] = useState("")
  const { signUpWithEmail, signInWithWallet, error } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError("")

    // Validate password match
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match")
      return
    }

    // Validate password strength
    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters")
      return
    }

    setIsSubmitting(true)

    try {
      await signUpWithEmail(email, password, username)
    } catch (err) {
      console.error("Sign up error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWalletSignIn = async () => {
    try {
      await signInWithWallet()
    } catch (err) {
      console.error("Wallet sign in error:", err)
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh] px-4 py-8">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>

            {(error || validationError) && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-3 mb-4 text-sm">
                {error || validationError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#151524] border border-[#252540] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00a3ff]"
                  required
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-[#151524] border border-[#252540] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00a3ff]"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#151524] border border-[#252540] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00a3ff]"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#151524] border border-[#252540] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00a3ff]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#00a3ff] hover:bg-[#0090e0] text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Creating Account..." : "Sign Up with Email"}
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-grow h-px bg-[#252540]"></div>
              <span className="px-4 text-sm text-gray-400">OR</span>
              <div className="flex-grow h-px bg-[#252540]"></div>
            </div>

            <button
              onClick={handleWalletSignIn}
              className="w-full bg-[#151524] hover:bg-[#1e1e32] text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <path d="M14 12h4"></path>
              </svg>
              Connect Wallet
            </button>

            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-[#00a3ff] hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}

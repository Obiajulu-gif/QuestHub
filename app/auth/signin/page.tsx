"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import { Layout } from "@/components/Layout"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signInWithEmail, signInWithWallet, error } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await signInWithEmail(email, password)
    } catch (err) {
      console.error("Sign in error:", err)
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
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Sign In to QuestHub</h1>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-3 mb-4 text-sm">
                {error}
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#00a3ff] hover:bg-[#0090e0] text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Signing In..." : "Sign In with Email"}
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
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-[#00a3ff] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}

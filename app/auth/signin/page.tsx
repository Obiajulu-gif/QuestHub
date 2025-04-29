"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
// Import Layout directly from the .tsx file to avoid any re-export issues
import Layout from "@/components/Layout.tsx"
import { useAuth } from "@/context/AuthContext"
import WalletConnect from "@/components/WalletConnect"

export default function SignIn() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signIn(email, password)
      router.push("/profile")
    } catch (err) {
      setError("Invalid email or password")
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 sm:px-6 flex justify-center items-center">
        <div className="max-w-5xl w-full flex flex-col md:flex-row bg-[#151524] rounded-2xl overflow-hidden shadow-xl">
          {/* Left side - Image */}
          <div className="md:w-1/2 relative h-48 md:h-auto">
            <Image src="/sleek-app-login.png" alt="Sign In" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14]/80 to-transparent flex items-center justify-center p-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
                <p className="text-gray-300">Sign in to continue your quest journey and claim your rewards.</p>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="md:w-1/2 p-8">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold mb-2">Sign In to QuestHub</h1>
              <p className="text-gray-400">Access your account to continue your journey</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#0a0a14] border border-[#252540] rounded-lg focus:outline-none focus:border-[#00a3ff]"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <Link href="/auth/forgot-password" className="text-xs text-[#00a3ff] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#0a0a14] border border-[#252540] rounded-lg focus:outline-none focus:border-[#00a3ff]"
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : null}
                  Sign In
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#252540]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#151524] text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <WalletConnect fullWidth />
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-[#00a3ff] hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

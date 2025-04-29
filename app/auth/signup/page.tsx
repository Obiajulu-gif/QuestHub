"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Layout } from "@/components/Layout"
import { useAuth } from "@/context/AuthContext"
import WalletConnect from "@/components/WalletConnect"

export default function SignUp() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      await signUp(username, email, password)
      router.push("/profile")
    } catch (err) {
      setError(err.message || "Failed to create an account")
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 sm:px-6 flex justify-center items-center">
        <div className="max-w-5xl w-full flex flex-col md:flex-row bg-[#151524] rounded-2xl overflow-hidden shadow-xl">
          {/* Left side - Image */}
          <div className="md:w-1/2 relative h-48 md:h-auto">
            <Image src="/placeholder.svg?key=ucm3j" alt="Sign Up" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14]/80 to-transparent flex items-center justify-center p-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Join QuestHub</h2>
                <p className="text-gray-300">Create an account to start your quest journey and earn rewards.</p>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="md:w-1/2 p-8">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
              <p className="text-gray-400">Join the QuestHub community and start your adventure</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#0a0a14] border border-[#252540] rounded-lg focus:outline-none focus:border-[#00a3ff]"
                  placeholder="Choose a username"
                />
              </div>

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
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#0a0a14] border border-[#252540] rounded-lg focus:outline-none focus:border-[#00a3ff]"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#0a0a14] border border-[#252540] rounded-lg focus:outline-none focus:border-[#00a3ff]"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : null}
                  Create Account
                </button>
              </div>
            </form>

            <div className="mt-6">
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
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-[#00a3ff] hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

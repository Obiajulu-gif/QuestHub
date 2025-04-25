"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Layout } from "@/components/Layout"
import { useAuth } from "@/context/AuthContext"
import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function Settings() {
  const { user, updateProfile, signOut, error } = useAuth()
  const router = useRouter()

  const [username, setUsername] = useState(user?.username || "")
  const [email, setEmail] = useState(user?.email || "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [validationError, setValidationError] = useState("")

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError("")
    setSuccessMessage("")

    try {
      setIsSubmitting(true)

      // Update profile
      await updateProfile({
        username,
        email,
      })

      setSuccessMessage("Profile updated successfully")
    } catch (err: any) {
      setValidationError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError("")
    setSuccessMessage("")

    // Validate password match
    if (newPassword !== confirmPassword) {
      setValidationError("New passwords do not match")
      return
    }

    // Validate password strength
    if (newPassword.length < 8) {
      setValidationError("Password must be at least 8 characters")
      return
    }

    try {
      setIsSubmitting(true)

      // In a real app, you would call an API to update the password
      // For now, we'll just simulate a successful update
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccessMessage("Password updated successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      setValidationError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        // In a real app, you would call an API to delete the account
        // For now, we'll just sign out
        await signOut()
        router.push("/")
      } catch (err: any) {
        setValidationError(err.message)
      }
    }
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-3 mb-4 text-sm">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-500 rounded-lg p-3 mb-4 text-sm">
              {successMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {/* Profile Settings */}
              <div className="card p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Profile Information</h2>

                <form onSubmit={handleProfileUpdate} className="space-y-4">
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
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#151524] border border-[#252540] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00a3ff]"
                      required={!user?.walletAddress} // Email is optional for wallet users
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#00a3ff] hover:bg-[#0090e0] text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </div>

              {/* Password Settings */}
              {user?.email && (
                <div className="card p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Change Password</h2>

                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                        Current Password
                      </label>
                      <input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-[#151524] border border-[#252540] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00a3ff]"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                        New Password
                      </label>
                      <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-[#151524] border border-[#252540] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00a3ff]"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                        Confirm New Password
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
                      className="bg-[#00a3ff] hover:bg-[#0090e0] text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? "Updating..." : "Update Password"}
                    </button>
                  </form>
                </div>
              )}

              {/* Danger Zone */}
              <div className="card p-6 border border-red-500/20">
                <h2 className="text-lg font-semibold mb-4 text-red-400">Danger Zone</h2>

                <p className="text-sm text-gray-400 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>

                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-500 py-2 px-4 rounded-lg transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="card p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Account Type</h2>

                <div className="flex items-center gap-3 mb-4">
                  {user?.walletAddress ? (
                    <>
                      <div className="w-10 h-10 bg-[#151524] rounded-full flex items-center justify-center">
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
                          className="text-[#00a3ff]"
                        >
                          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                          <path d="M14 12h4"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Wallet Account</p>
                        <p className="text-xs text-gray-400">Connected with Solana wallet</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-[#151524] rounded-full flex items-center justify-center">
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
                          className="text-[#00a3ff]"
                        >
                          <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"></path>
                          <polyline points="15,9 18,9 18,11"></polyline>
                          <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0"></path>
                          <line x1="6" y1="10" x2="7" y2="10"></line>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Email Account</p>
                        <p className="text-xs text-gray-400">Using email and password</p>
                      </div>
                    </>
                  )}
                </div>

                {user?.walletAddress && !user?.email && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-2">
                      Add an email to your account for additional security and recovery options.
                    </p>
                    <button
                      onClick={() => router.push("/settings/add-email")}
                      className="text-sm text-[#00a3ff] hover:underline"
                    >
                      Add Email Address
                    </button>
                  </div>
                )}

                {user?.email && !user?.walletAddress && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-2">
                      Connect a wallet to your account to access Web3 features.
                    </p>
                    <button
                      onClick={() => router.push("/settings/connect-wallet")}
                      className="text-sm text-[#00a3ff] hover:underline"
                    >
                      Connect Wallet
                    </button>
                  </div>
                )}
              </div>

              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4">Account Status</h2>

                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="text-sm">Active</p>
                </div>

                <p className="text-xs text-gray-400">Member since {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}

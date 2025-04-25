"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useRouter } from "next/navigation"

// Define user types
export type UserType = {
  id: string
  email?: string
  username: string
  walletAddress?: string
  profileImage?: string
  isEmailVerified?: boolean
}

// Define auth context type
type AuthContextType = {
  user: UserType | null
  loading: boolean
  error: string | null
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string, username: string) => Promise<void>
  signInWithWallet: () => Promise<void>
  signOut: () => void
  updateProfile: (data: Partial<UserType>) => Promise<void>
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database (replace with actual API calls in production)
const MOCK_USERS = [
  {
    id: "1",
    email: "demo@questhub.io",
    username: "DemoUser",
    password: "password123", // In a real app, this would be hashed
    walletAddress: "",
    profileImage: "",
    isEmailVerified: true,
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { publicKey, connected, connect, disconnect } = useWallet()
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        // Check localStorage for existing session
        const savedUser = localStorage.getItem("questhub_user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (err) {
        console.error("Error checking existing session:", err)
      } finally {
        setLoading(false)
      }
    }

    checkExistingSession()
  }, [])

  // Monitor wallet connection
  useEffect(() => {
    if (connected && publicKey && !user?.walletAddress) {
      // If wallet is connected but user isn't logged in with wallet
      const walletAddress = publicKey.toString()

      // Check if this wallet is already associated with a user
      const existingUser = MOCK_USERS.find((u) => u.walletAddress === walletAddress)

      if (existingUser) {
        // Log in existing user
        const userData = {
          id: existingUser.id,
          username: existingUser.username,
          email: existingUser.email,
          walletAddress,
          profileImage: existingUser.profileImage,
          isEmailVerified: existingUser.isEmailVerified,
        }
        setUser(userData)
        localStorage.setItem("questhub_user", JSON.stringify(userData))
      } else {
        // Create new user with wallet
        const newUser = {
          id: `wallet_${Date.now()}`,
          username: `User_${walletAddress.substring(0, 4)}`,
          walletAddress,
          profileImage: "",
        }
        setUser(newUser)
        localStorage.setItem("questhub_user", JSON.stringify(newUser))

        // Add to mock database
        MOCK_USERS.push({
          ...newUser,
          email: "",
          password: "",
          isEmailVerified: false,
        })
      }
    }
  }, [connected, publicKey, user?.walletAddress])

  // Sign in with email
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user in mock database
      const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

      if (!foundUser) {
        throw new Error("Invalid email or password")
      }

      // Create user session
      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        walletAddress: foundUser.walletAddress,
        profileImage: foundUser.profileImage,
        isEmailVerified: foundUser.isEmailVerified,
      }

      setUser(userData)
      localStorage.setItem("questhub_user", JSON.stringify(userData))

      // Redirect to profile
      router.push("/profile")
    } catch (err: any) {
      setError(err.message)
      console.error("Sign in error:", err)
    } finally {
      setLoading(false)
    }
  }

  // Sign up with email
  const signUpWithEmail = async (email: string, password: string, username: string) => {
    try {
      setLoading(true)
      setError(null)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if email already exists
      if (MOCK_USERS.some((u) => u.email === email)) {
        throw new Error("Email already in use")
      }

      // Check if username already exists
      if (MOCK_USERS.some((u) => u.username === username)) {
        throw new Error("Username already taken")
      }

      // Create new user
      const newUser = {
        id: `email_${Date.now()}`,
        email,
        username,
        password, // In a real app, this would be hashed
        walletAddress: "",
        profileImage: "",
        isEmailVerified: false,
      }

      // Add to mock database
      MOCK_USERS.push(newUser)

      // Create user session
      const userData = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        walletAddress: newUser.walletAddress,
        profileImage: newUser.profileImage,
        isEmailVerified: newUser.isEmailVerified,
      }

      setUser(userData)
      localStorage.setItem("questhub_user", JSON.stringify(userData))

      // Redirect to profile
      router.push("/profile")
    } catch (err: any) {
      setError(err.message)
      console.error("Sign up error:", err)
    } finally {
      setLoading(false)
    }
  }

  // Sign in with wallet
  const signInWithWallet = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!connected) {
        await connect()
      }

      // The wallet connection effect will handle the rest
    } catch (err: any) {
      setError("Failed to connect wallet")
      console.error("Wallet connection error:", err)
    } finally {
      setLoading(false)
    }
  }

  // Sign out
  const signOut = () => {
    setUser(null)
    localStorage.removeItem("questhub_user")

    // Disconnect wallet if connected
    if (connected) {
      disconnect()
    }

    // Redirect to home
    router.push("/")
  }

  // Update profile
  const updateProfile = async (data: Partial<UserType>) => {
    try {
      setLoading(true)
      setError(null)

      if (!user) {
        throw new Error("Not authenticated")
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user in mock database
      const userIndex = MOCK_USERS.findIndex((u) => u.id === user.id)
      if (userIndex >= 0) {
        MOCK_USERS[userIndex] = {
          ...MOCK_USERS[userIndex],
          ...data,
        }
      }

      // Update local user state
      const updatedUser = {
        ...user,
        ...data,
      }

      setUser(updatedUser)
      localStorage.setItem("questhub_user", JSON.stringify(updatedUser))
    } catch (err: any) {
      setError(err.message)
      console.error("Profile update error:", err)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    error,
    signInWithEmail,
    signUpWithEmail,
    signInWithWallet,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

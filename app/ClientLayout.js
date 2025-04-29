"use client"

import WalletContextProvider from "@/components/WalletContextProvider"
import { NotificationProvider } from "@/context/NotificationContext"
import { AuthProvider } from "@/context/AuthContext"
import ToastContainer from "@/components/notifications/ToastContainer"
import { useEffect } from "react"

export default function ClientLayout({ children }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("ServiceWorker registration successful with scope: ", registration.scope)
          },
          (err) => {
            console.log("ServiceWorker registration failed: ", err)
          },
        )
      })
    }
  }, [])

  return (
    <WalletContextProvider>
      <AuthProvider>
        <NotificationProvider>
          {children}
          <ToastContainer />
        </NotificationProvider>
      </AuthProvider>
    </WalletContextProvider>
  )
}

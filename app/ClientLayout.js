"use client"

import WalletContextProvider from "@/components/WalletContextProvider"
import { NotificationProvider } from "@/context/NotificationContext"
import ToastContainer from "@/components/notifications/ToastContainer"
import { useEffect } from "react"
import { ScoreProvider } from "@/context/ScoreContext"
import SensayChatWidget from "@/components/SensayChatWidget"
import { SensayProvider } from "@/context/SensayContext"

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
    <ScoreProvider>
      <WalletContextProvider>
        <NotificationProvider>
          <SensayProvider>
            {children}
            <ToastContainer />
            <SensayChatWidget />
          </SensayProvider>
        </NotificationProvider>
      </WalletContextProvider>
    </ScoreProvider>
  )
}

"use client"

import { useMemo, useEffect } from "react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
  // Remove the adapters that are causing errors
  // BackpackWalletAdapter,
  // GlowWalletAdapter,
  // SlopeWalletAdapter,
  // SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"
import { WALLET_ADAPTER_NETWORK } from "@/lib/solana"
import { SimulatedWalletAdapter } from "@/utils/SimulatedWalletAdapter"

// Import wallet adapter CSS
import "@solana/wallet-adapter-react-ui/styles.css"

export default function WalletContextProvider({ children }) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork[WALLET_ADAPTER_NETWORK.toUpperCase()] || WalletAdapterNetwork.DEVNET

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  // Add the simulated wallet adapter as the first option
  const wallets = useMemo(
    () => [
      new SimulatedWalletAdapter(),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    [network],
  )

  // Set the simulated wallet as enabled by default
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('questhub_simulated_wallet', 'true')
    }
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

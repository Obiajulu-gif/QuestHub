"use client"

import { useMemo } from "react"
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

// Import wallet adapter CSS
import "@solana/wallet-adapter-react-ui/styles.css"

export default function WalletContextProvider({ children }) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork[WALLET_ADAPTER_NETWORK.toUpperCase()] || WalletAdapterNetwork.DEVNET

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      // Remove these problematic adapters
      // new BackpackWalletAdapter(),
      // new GlowWalletAdapter(),
      // new SlopeWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      // new SolletWalletAdapter({ network }),
    ],
    [network],
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

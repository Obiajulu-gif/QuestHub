import { clusterApiUrl } from "@solana/web3.js"

// Network configuration
export const SOLANA_NETWORK = "devnet" // Change to 'mainnet-beta' for production
export const SOLANA_RPC_ENDPOINT = clusterApiUrl(SOLANA_NETWORK)

// Wallet adapter configuration
export const WALLET_ADAPTER_NETWORK = SOLANA_NETWORK

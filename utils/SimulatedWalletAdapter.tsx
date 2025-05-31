import { PublicKey } from '@solana/web3.js';
import { BaseMessageSignerWalletAdapter, WalletReadyState } from '@solana/wallet-adapter-base';
import EventEmitter from 'eventemitter3';

/**
 * Simulated wallet adapter for testing and development
 */
export class SimulatedWalletAdapter extends BaseMessageSignerWalletAdapter {
  constructor() {
    super();
    
    this.name = 'Simulated Wallet';
    this.url = 'https://questhub.io';
    this.icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQiIGhlaWdodD0iMzQiIHZpZXdCb3g9IjAgMCAzNCAzNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3IDM0QzI2LjM4ODggMzQgMzQgMjYuMzg4OCAzNCAxN0MzNCA3LjYxMTE2IDI2LjM4ODggMCAxNyAwQzcuNjExMTYgMCAwIDcuNjExMTYgMCAxN0MwIDI2LjM4ODggNy42MTExNiAzNCAxNyAzNFoiIGZpbGw9IiMwREY1RTMiLz4KPHBhdGggZD0iTTEyLjEzOTEgMTIuMzkwM0wxNy4yMTY2IDkuMjMyNDJMMjIuMjk0MSAxMi4zOTAzTDE3LjIxNjYgMTUuNTQ4MkwxMi4xMzkxIDEyLjM5MDNaIiBmaWxsPSIjMUExQTNBIi8+CjxwYXRoIGQ9Ik0xMi4zMzg5IDEyLjcxNzJWMTkuMTcxTDE3LjQxNjQgMjIuMzI4OUwyMi40OTM5IDE5LjE3MVYxMi43MTcyTDE3LjQxNjQgMTUuODc1TDEyLjMzODkgMTIuNzE3MloiIGZpbGw9IiMxQTFBM0EiLz4KPC9zdmc+Cg==';
    this.supportedTransactionVersions = null;

    // Instance properties
    this._publicKey = new PublicKey('AK7RiHJB6WU9dYhmbRPGfWYbQMAUHFcKTa1QhaivyHQm');
    this._connected = false;
    this._connecting = false;
    this._readyState = WalletReadyState.Installed;
    this._emitter = new EventEmitter();
  }

  get publicKey() {
    return this._publicKey;
  }

  get connecting() {
    return this._connecting;
  }

  get connected() {
    return this._connected;
  }

  get readyState() {
    return this._readyState;
  }

  async connect() {
    try {
      if (this.connected || this.connecting) return;
      
      this._connecting = true;
      
      // Simulate a connection delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if the simulated connection should be enabled
      const shouldUseSimulated = localStorage.getItem('questhub_simulated_wallet') === 'true';
      if (!shouldUseSimulated) throw new Error('User rejected connection');
      
      this._connected = true;
      this._emitter.emit('connect', this._publicKey);
    } catch (error) {
      this._emitter.emit('error', error);
      throw error;
    } finally {
      this._connecting = false;
    }
  }

  async disconnect() {
    if (this._connected) {
      this._connected = false;
      this._emitter.emit('disconnect');
      
      // Remove the simulated wallet flag
      localStorage.removeItem('questhub_simulated_wallet');
    }
  }

  async signMessage(message) {
    if (!this._connected) throw new Error('Wallet not connected');
    if (!this._publicKey) throw new Error('Wallet does not have a public key');
    
    // Simulate message signing by returning the message itself
    return message;
  }

  async signTransaction(transaction) {
    if (!this._connected) throw new Error('Wallet not connected');
    
    // This is a mock implementation - in a real adapter this would sign the transaction
    return transaction;
  }

  async signAllTransactions(transactions) {
    if (!this._connected) throw new Error('Wallet not connected');
    
    // This is a mock implementation - in a real adapter this would sign all transactions
    return transactions;
  }

  on(event, listener) {
    this._emitter.on(event, listener);
    return this;
  }

  removeListener(event, listener) {
    this._emitter.removeListener(event, listener);
    return this;
  }
} 
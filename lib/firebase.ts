// Placeholder for Firebase auth (compatible with imports but not actually using Firebase)
export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback) => {
    // This is a mock implementation - we're using Solana auth instead
    return () => {}
  },
  signInWithEmailAndPassword: async () => {
    throw new Error("Firebase auth is not implemented. Use Solana wallet authentication instead.")
  },
  createUserWithEmailAndPassword: async () => {
    throw new Error("Firebase auth is not implemented. Use Solana wallet authentication instead.")
  },
  signOut: async () => {
    // This is a mock implementation
    return Promise.resolve()
  },
}

// Export other Firebase services that might be imported elsewhere
export const firestore = {
  collection: () => ({
    doc: () => ({
      set: () => Promise.resolve(),
      get: () => Promise.resolve({ exists: false, data: () => null }),
      update: () => Promise.resolve(),
    }),
  }),
}

export const storage = {}

// Default export for imports that use default
export default {
  auth,
  firestore,
  storage,
}

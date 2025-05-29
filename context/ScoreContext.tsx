import React, { createContext, useState, useContext } from "react"

interface ScoreContextType {
  score: number
  addReward: (amount: number) => void
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined)

export const ScoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScore] = useState(0)
  const addReward = (amount: number) => setScore(prev => prev + amount)
  return (
    <ScoreContext.Provider value={{ score, addReward }}>
      {children}
    </ScoreContext.Provider>
  )
}

export const useScore = (): ScoreContextType => {
  const context = useContext(ScoreContext)
  if (!context) {
    throw new Error("useScore must be used within ScoreProvider")
  }
  return context
} 
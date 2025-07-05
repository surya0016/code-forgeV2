// context/CounterContext.tsx
import { createContext, useContext, useState } from "react"

const CounterContext = createContext(null)

export function CounterProvider({ children }:{children: React.ReactNode}) {
  return (
    
  )
}

// Custom hook for easy access
export const useCounter = () => useContext(CounterContext)

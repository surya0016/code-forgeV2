"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import axios from "axios"
import { Problem, ProblemsResponse, ProblemSummary } from "@/lib/types"

// Context types
interface ProblemsContextType {
  problems: Problem[]
  loading: boolean
  error: string | null
  fetchProblems: () => Promise<void>
  refreshProblems: () => Promise<void>
  getProblemById: (id: number) => Problem | undefined
  getFilteredProblems: (filters: ProblemFilters) => Problem[]
}

interface ProblemFilters {
  search?: string
  difficulty?: "all" | "Easy" | "Medium" | "Hard"
  status?: "all" | "solved" | "unsolved"
  tags?: string[]
}

// Create context
const ProblemsContext = createContext<ProblemsContextType | null>(null)

// Provider component
export function ProblemsProvider({ children }: { children: ReactNode }) {
  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProblems = async () => {
    if (loading) return // Prevent multiple simultaneous requests
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.get<ProblemsResponse>("/api/problems/getProblems")
      
      if (!response.data || !Array.isArray(response.data.problems)) {
        throw new Error("Invalid response format")
      }
      
      // Transform the data to have cleaner tag structure
      const transformedProblems = response.data.problems.map(problem => ({
        ...problem,
        tags: problem.tags.map(problemTag => ({
          ...problemTag,
          tag: problemTag.tag
        }))
      }))
      
      setProblems(transformedProblems)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch problems"
      setError(errorMessage)
      console.error("Error fetching problems:", err)
    } finally {
      setLoading(false)
    }
  }

  const refreshProblems = async () => {
    await fetchProblems()
  }

  const getProblemById = (id: number): Problem | undefined => {
    return problems.find(problem => problem.id === id)
  }

  const getFilteredProblems = (filters: ProblemFilters): Problem[] => {
    return problems.filter(problem => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch = 
          problem.title.toLowerCase().includes(searchLower) ||
          problem.description.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Difficulty filter
      if (filters.difficulty && filters.difficulty !== "all") {
        if (problem.difficulty !== filters.difficulty) return false
      }

      // Status filter
      if (filters.status && filters.status !== "all") {
        if (filters.status === "solved" && !problem.isSolved) return false
        if (filters.status === "unsolved" && problem.isSolved) return false
      }

      // Tags filter
      if (filters.tags && filters.tags.length > 0) {
        const problemTags = problem.tags.map(pt => pt.tag.name)
        const hasMatchingTag = filters.tags.some(tag => problemTags.includes(tag))
        if (!hasMatchingTag) return false
      }

      return true
    })
  }

  // Fetch problems on mount
  useEffect(() => {
    fetchProblems()
  }, [])

  const value: ProblemsContextType = {
    problems,
    loading,
    error,
    fetchProblems,
    refreshProblems,
    getProblemById,
    getFilteredProblems
  }

  return (
    <ProblemsContext.Provider value={value}>
      {children}
    </ProblemsContext.Provider>
  )
}

// Custom hook for easy access
export const useProblems = () => {
  const context = useContext(ProblemsContext)
  if (!context) {
    throw new Error("useProblems must be used within a ProblemsProvider")
  }
  return context
}

// Additional utility hooks
export const useProblem = (id: number) => {
  const { getProblemById } = useProblems()
  return getProblemById(id)
}

export const useFilteredProblems = (filters: ProblemFilters) => {
  const { getFilteredProblems } = useProblems()
  return getFilteredProblems(filters)
}

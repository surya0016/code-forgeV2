"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import axios from "axios"
import { Problem, ProblemsResponse, ProblemSummary } from "@/lib/types"
import { useUser } from "@clerk/nextjs"

// Context types
interface ProblemsContextType {
  problems: Problem[]
  loading: boolean
  error: string | null
  fetchProblems: () => Promise<void>
  refreshProblems: () => Promise<void>
  getProblemById: (id: number) => Problem | undefined
  getFilteredProblems: (filters: ProblemFilters) => Problem[]
  getSortedProblems: (problems: Problem[], sortBy: SortOption, order: SortOrder) => Problem[]
}

interface ProblemFilters {
  search?: string
  difficulty?: "all" | "Easy" | "Medium" | "Hard"
  status?: "all" | "solved" | "unsolved"
  tags?: string[]
  sortBy?: SortOption
  sortOrder?: SortOrder
}

type SortOption = "title" | "difficulty" | "acceptance" | "id" | "createdAt"
type SortOrder = "asc" | "desc"

// Create context
const ProblemsContext = createContext<ProblemsContextType | null>(null)

// Provider component
export function ProblemsProvider({ children }: { children: ReactNode }) {
  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isSignedIn, user } = useUser()

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

      // If user is signed in, fetch their solved problems
      if (isSignedIn && user?.id) {
        try {
          const userProblemsResponse = await axios.get('/api/user/problems')
          const userProblems = userProblemsResponse.data
          
          // Update problems with user's solved status
          setProblems(prevProblems => 
            prevProblems.map(problem => ({
              ...problem,
              isSolved: userProblems.some((up: any) => 
                up.problemId === problem.id && up.isSolved
              )
            }))
          )
        } catch (error) {
          console.error("Error fetching user problems:", error)
        }
      }
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

  const getSortedProblems = (problems: Problem[], sortBy: SortOption, order: SortOrder): Problem[] => {
    const sortedProblems = [...problems].sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title)
          break
        case "difficulty":
          const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3 }
          comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
          break
        case "acceptance":
          comparison = a.acceptanceRate - b.acceptanceRate
          break
        case "id":
          comparison = a.id - b.id
          break
        case "createdAt":
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        default:
          comparison = 0
      }
      
      return order === "asc" ? comparison : -comparison
    })
    
    return sortedProblems
  }

  const getFilteredProblems = (filters: ProblemFilters): Problem[] => {
    let filteredProblems = problems.filter(problem => {
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

    // Apply sorting if specified
    if (filters.sortBy && filters.sortOrder) {
      filteredProblems = getSortedProblems(filteredProblems, filters.sortBy, filters.sortOrder)
    }

    return filteredProblems
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
    getFilteredProblems,
    getSortedProblems
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

// Hook for sorting problems
export const useSortedProblems = (problems: Problem[], sortBy: SortOption, order: SortOrder) => {
  const { getSortedProblems } = useProblems()
  return getSortedProblems(problems, sortBy, order)
}

// Hook for getting all available sort options
export const useSortOptions = () => {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "id", label: "Problem Number" },
    { value: "title", label: "Title" },
    { value: "difficulty", label: "Difficulty" },
    { value: "acceptance", label: "Acceptance Rate" },
    { value: "createdAt", label: "Date Added" }
  ]

  const sortOrders: { value: SortOrder; label: string }[] = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" }
  ]

  return { sortOptions, sortOrders }
}

// Export types for use in other components
export type { ProblemFilters, SortOption, SortOrder }

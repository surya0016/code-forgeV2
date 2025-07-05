"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, CheckCircle, Circle, Star } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { Problem, ProblemsResponse } from "@/lib/types"

export function ProblemsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [problems, setProblems] = useState<Problem[]>([])

  useEffect(() => {
    const fetchProblems = async () => {   
      try {
        const problems = await response()
        setProblems(problems)
      } catch (error) {
        console.error("Error fetching problems:", error)
      }
    }
    fetchProblems()
  }, [])

  const response = async (): Promise<Problem[]> => {
    const res = await axios.get<ProblemsResponse>("/api/problems/getProblems")
    if (!res.data || !Array.isArray(res.data.problems)) {
      throw new Error("Invalid response format")
    }
    return res.data.problems
  }

  const getDifficultyColor = (difficulty: Problem['difficulty']) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusIcon = (isSolved: boolean) => {
    return isSolved 
      ? <CheckCircle className="h-4 w-4 text-green-500" />
      : <Circle className="h-4 w-4 text-gray-400" />
  }

  // Filter problems based on search and filters
  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesDifficulty = difficultyFilter === "all" || 
                             problem.difficulty.toLowerCase() === difficultyFilter.toLowerCase()
    
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "solved" && problem.isSolved) ||
                         (statusFilter === "unsolved" && !problem.isSolved)
    
    return matchesSearch && matchesDifficulty && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Problems</h1>
        <p className="text-muted-foreground mt-2">Practice coding problems to improve your skills</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Problem Set</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulty</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="solved">Solved</SelectItem>
                <SelectItem value="unsolved">Todo</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Problems Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Status</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Acceptance</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead className="hidden md:table-cell">Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProblems.map((problem, index) => (
                  <TableRow key={problem.id} className="hover:bg-muted/50">
                    <TableCell>{getStatusIcon(problem.isSolved)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/problems/${problem.id}`}
                          className="font-medium hover:text-blue-600 transition-colors"
                        >
                          {index+1}. {problem.title}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{problem.acceptanceRate}%</TableCell>
                    <TableCell>
                      <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {problem.tags.map((problemTag) => (
                          <Badge key={problemTag.tagId} variant="outline" className="text-xs">
                            {problemTag.tag.name}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

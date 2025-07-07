"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, CheckCircle, Circle, RefreshCw, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { Problem } from "@/lib/types"
import { useProblems, useSortOptions, ProblemFilters, SortOption, SortOrder } from "@/context/ProblemsContext"
import { ProblemsContentSkeleton } from "./problem-content-loader"

export function ProblemsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState<SortOption>("id")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  
  const { problems, loading, error, refreshProblems, getFilteredProblems } = useProblems()
  const { sortOptions, sortOrders } = useSortOptions()

  console.log("Problem Titles:", problems.map(p => p.title)) // Debug log to check problem titles

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

  // Use the context's filtering function with sorting
  const filteredProblems = getFilteredProblems({
    search: searchQuery,
    difficulty: difficultyFilter as any,
    status: statusFilter as any,
    sortBy: sortBy,
    sortOrder: sortOrder
  })

  const handleSortChange = (newSortBy: SortOption) => {
    if (newSortBy === sortBy) {
      // If clicking the same column, toggle order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      // If clicking a different column, set new sort and default to ascending
      setSortBy(newSortBy)
      setSortOrder("asc")
    }
  }

  if (loading) {
    return (
      <ProblemsContentSkeleton/>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Button onClick={refreshProblems} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Problems</h1>
          <p className="text-muted-foreground mt-2">
            Practice coding problems to improve your skills ({problems.length} problems)
          </p>
        </div>
        <Button onClick={refreshProblems} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
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
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
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
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                {sortOrders.map(order => (
                  <SelectItem key={order.value} value={order.value}>
                    {order.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Problems Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Status</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 select-none"
                    onClick={() => handleSortChange("title")}
                  >
                    <div className="flex items-center gap-1">
                      Title
                      <ArrowUpDown className="h-3 w-3" />
                      {sortBy === "title" && (
                        <span className="text-xs">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 select-none"
                    onClick={() => handleSortChange("acceptance")}
                  >
                    <div className="flex items-center gap-1">
                      Acceptance
                      <ArrowUpDown className="h-3 w-3" />
                      {sortBy === "acceptance" && (
                        <span className="text-xs">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 select-none"
                    onClick={() => handleSortChange("difficulty")}
                  >
                    <div className="flex items-center gap-1">
                      Difficulty
                      <ArrowUpDown className="h-3 w-3" />
                      {sortBy === "difficulty" && (
                        <span className="text-xs">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProblems.map((problem, index) => (
                  <TableRow key={problem.id} className="hover:bg-muted/50">
                    <TableCell>{getStatusIcon(problem.isSolved)}</TableCell>
                    <TableCell>
                      <Link
                        href={`/problems/${problem.id}`}
                        className="font-medium hover:text-blue-600 transition-colors"
                      >
                        {index+1}. {problem.title}
                      </Link>
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

          {/* Results count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredProblems.length} of {problems.length} problems
            {(searchQuery || difficultyFilter !== "all" || statusFilter !== "all") && (
              <span className="ml-2">
                • Sorted by {sortOptions.find(opt => opt.value === sortBy)?.label.toLowerCase()} 
                ({sortOrder === "asc" ? "ascending" : "descending"})
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

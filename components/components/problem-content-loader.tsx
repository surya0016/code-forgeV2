"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, RefreshCw } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function ProblemsContentSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Button variant="outline" size="sm" disabled>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-24" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search problems..."
                className="pl-10"
                disabled
              />
            </div>
            <Select disabled>
              <SelectTrigger className="w-full sm:w-40">
                <Skeleton className="h-4 w-16" />
              </SelectTrigger>
            </Select>
            <Select disabled>
              <SelectTrigger className="w-full sm:w-40">
                <Skeleton className="h-4 w-12" />
              </SelectTrigger>
            </Select>
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
                {/* Generate skeleton rows */}
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell>
                      <Skeleton className="h-4 w-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-48" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-12" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        <Skeleton className="h-4 w-12 rounded-full" />
                        <Skeleton className="h-4 w-16 rounded-full" />
                        <Skeleton className="h-4 w-10 rounded-full" />
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

// Alternative version with more dynamic skeleton rows
export function ProblemsContentSkeletonDynamic() {
  const skeletonRows = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    titleWidth: Math.random() * 100 + 150, // Random width between 150-250px
    tagCount: Math.floor(Math.random() * 4) + 1, // 1-4 tags
  }))

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Button variant="outline" size="sm" disabled>
          <RefreshCw className="h-4 w-4 mr-2 opacity-50" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-24" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground opacity-50" />
              <div className="relative">
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
            <Skeleton className="h-10 w-full sm:w-40 rounded-md" />
            <Skeleton className="h-10 w-full sm:w-40 rounded-md" />
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
                {skeletonRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Skeleton className="h-4 w-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" style={{ width: `${row.titleWidth}px` }} />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-12" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {Array.from({ length: row.tagCount }).map((_, tagIndex) => (
                          <Skeleton
                            key={tagIndex}
                            className="h-4 rounded-full"
                            style={{ width: `${Math.random() * 30 + 40}px` }}
                          />
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

// Pulse animation version
export function ProblemsContentSkeletonPulse() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="h-10 flex-1 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-full sm:w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-full sm:w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
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
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
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

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function CodeEditorSkeleton() {
  return (
    <div className="h-96 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
      {/* Editor Header */}
      <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-20 bg-slate-200 dark:bg-slate-800" />
            <Skeleton className="h-6 w-16 bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-12 bg-slate-200 dark:bg-slate-800" />
            <Skeleton className="h-6 w-16 bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="p-4 space-y-2 bg-slate-50 dark:bg-slate-950">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <Skeleton className="h-4 w-6 bg-slate-200 dark:bg-slate-800" />
            <Skeleton
              className={`h-4 bg-slate-200 dark:bg-slate-800`}
              style={{ width: `${Math.random() * 60 + 20}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProblemDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Problem Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-12 bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-8 w-64 bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-6 w-16 bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-5 w-20 bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-5 w-24 bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-5 w-16 bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* Problem Description */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <Skeleton className="h-6 w-32 bg-slate-200 dark:bg-slate-800" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-4 bg-slate-200 dark:bg-slate-800"
              style={{ width: `${Math.random() * 40 + 60}%` }}
            />
          ))}
        </CardContent>
      </Card>

      {/* Examples */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <Skeleton className="h-6 w-24 bg-slate-200 dark:bg-slate-800" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-20 bg-slate-200 dark:bg-slate-800" />
              <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded space-y-1">
                <Skeleton className="h-4 w-32 bg-slate-200 dark:bg-slate-800" />
                <Skeleton className="h-4 w-28 bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="border-slate-200 dark:border-slate-800">
          <CardContent className="p-4 text-center">
            <Skeleton className="h-8 w-12 bg-slate-200 dark:bg-slate-800 mx-auto mb-2" />
            <Skeleton className="h-4 w-16 bg-slate-200 dark:bg-slate-800 mx-auto" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header Skeleton */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-32 bg-slate-200 dark:bg-slate-800" />
              <Skeleton className="h-6 w-20 bg-slate-200 dark:bg-slate-800" />
              <Skeleton className="h-6 w-24 bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800" />
              <Skeleton className="h-8 w-24 bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Skeleton */}
          <aside className="lg:col-span-1">
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <Skeleton className="h-6 w-20 bg-slate-200 dark:bg-slate-800" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16 bg-slate-200 dark:bg-slate-800" />
                  <Skeleton className="h-8 w-full bg-slate-200 dark:bg-slate-800" />
                </div>
                <Separator className="bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-20 bg-slate-200 dark:bg-slate-800" />
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4 bg-slate-200 dark:bg-slate-800" />
                      <Skeleton className="h-4 w-16 bg-slate-200 dark:bg-slate-800" />
                      <Skeleton className="h-4 w-8 bg-slate-200 dark:bg-slate-800" />
                    </div>
                  ))}
                </div>
                <Separator className="bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-24 bg-slate-200 dark:bg-slate-800" />
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4 bg-slate-200 dark:bg-slate-800" />
                      <Skeleton className="h-4 w-12 bg-slate-200 dark:bg-slate-800" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content Skeleton */}
          <main className="lg:col-span-3">
            {/* Search and Filter Bar */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-10 flex-1 bg-slate-200 dark:bg-slate-800" />
                <Skeleton className="h-10 w-32 bg-slate-200 dark:bg-slate-800" />
                <Skeleton className="h-10 w-24 bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-40 bg-slate-200 dark:bg-slate-800" />
                <Skeleton className="h-8 w-20 bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>

            {/* Problems List Skeleton */}
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <ProblemCardSkeleton key={i} />
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 bg-slate-200 dark:bg-slate-800" />
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-8 bg-slate-200 dark:bg-slate-800" />
                ))}
                <Skeleton className="h-8 w-8 bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Loading Status */}
      <div className="fixed bottom-4 right-4">
        <Card className="border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-bounce"></div>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Loading problems...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ProblemCardSkeleton() {
  return (
    <Card className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            {/* Status Icon */}
            <Skeleton className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-800" />

            {/* Problem Info */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-8 bg-slate-200 dark:bg-slate-800" />
                <Skeleton className="h-5 w-48 bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-16 bg-slate-200 dark:bg-slate-800" />
                <Skeleton className="h-4 w-12 bg-slate-200 dark:bg-slate-800" />
                <Skeleton className="h-4 w-20 bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="hidden sm:flex items-center space-x-6 text-sm">
            <div className="text-center">
              <Skeleton className="h-4 w-8 bg-slate-200 dark:bg-slate-800 mb-1" />
              <Skeleton className="h-3 w-12 bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="text-center">
              <Skeleton className="h-4 w-8 bg-slate-200 dark:bg-slate-800 mb-1" />
              <Skeleton className="h-3 w-16 bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

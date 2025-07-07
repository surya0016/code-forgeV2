import React from 'react';
import { BookOpen, MessageSquare, Play, Send } from 'lucide-react';

export function ProblemDetailSkeleton() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Problem Description Skeleton */}
      <div className="w-1/2 border-r overflow-auto">
        <div className="p-6">
          {/* Title and Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-80 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-6 w-16 bg-green-200 dark:bg-green-800 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-4 mb-6 text-sm">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <span className="text-gray-400">•</span>
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>

          {/* Tabs */}
          <div className="w-full">
            <div className="grid w-full grid-cols-3 border-b">
              <div className="flex items-center justify-center p-3 border-b-2 border-blue-500">
                <BookOpen className="h-4 w-4 mr-2" />
                <span>Description</span>
              </div>
              <div className="flex items-center justify-center p-3 text-gray-500">
                <span>Submissions</span>
              </div>
              <div className="flex items-center justify-center p-3 text-gray-500">
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>Discuss</span>
              </div>
            </div>

            <div className="space-y-6 mt-6">
              {/* Description */}
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>

              {/* Examples */}
              <div className="space-y-4">
                {[1, 2].map((index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-4">
                    <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-4 w-60 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div>
                <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="space-y-2">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="border border-slate-500 dark:border-slate-900 px-3 py-1.5 rounded-md">
                      <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Editor Skeleton */}
      <div className="w-1/2 flex flex-col">
        {/* Header */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            {/* Language Select */}
            <div className="w-40 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            
            {/* Buttons */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-4 py-2 border rounded bg-gray-100 dark:bg-gray-800">
                <Play className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400"></span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded">
                <Send className="h-4 w-4" />
                <span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-gray-100 dark:bg-gray-900 relative">
            {/* Simulated Code Lines */}
            <div className="absolute inset-0 p-4 font-mono text-sm space-y-2">
              <div className="flex">
                <span className="text-gray-400 w-8">1</span>
                <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-8">2</span>
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-8">3</span>
                <div className="h-4 w-56 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-8">4</span>
                <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-8">5</span>
                <div className="h-4 w-72 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-8">6</span>
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-8">7</span>
                <div className="h-4 w-60 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-8">8</span>
                <div className="h-4 w-44 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-8">9</span>
                <div className="h-4 w-52 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-8">10</span>
                <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Default export for easy importing
export default ProblemDetailSkeleton;
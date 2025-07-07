"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, MemoryStickIcon as Memory, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ExecutionResult {
  input: string
  expected: string
  actual: string
  passed: boolean
  stderr: string | null
  runtime: number | null
  memory: number | null
  exitCode: number | null
}

interface TestResultsSummary {
  totalTests: number
  passedTests: number
  failedTests: number
  totalRuntime: number
  maxMemory: number
  averageRuntime: number
}

interface TestResultsProps {
  results: ExecutionResult[]
  summary: TestResultsSummary
}

export function TestResults({ results, summary }: TestResultsProps) {
  const getStatusIcon = (passed: boolean, exitCode: number | null) => {
    if (exitCode !== 0 && exitCode !== null) {
      return <AlertCircle className="h-5 w-5 text-orange-500" />
    }
    return passed ? 
      <CheckCircle className="h-5 w-5 text-green-500" /> : 
      <XCircle className="h-5 w-5 text-red-500" />
  }

  const getStatusText = (passed: boolean, exitCode: number | null) => {
    if (exitCode !== 0 && exitCode !== null) {
      return "Runtime Error"
    }
    return passed ? "Accepted" : "Wrong Answer"
  }

  const getStatusColor = (passed: boolean, exitCode: number | null) => {
    if (exitCode !== 0 && exitCode !== null) {
      return "text-orange-600"
    }
    return passed ? "text-green-600" : "text-red-500"
  }

  const getBorderColor = (passed: boolean, exitCode: number | null) => {
    if (exitCode !== 0 && exitCode !== null) {
      return "border-l-orange-500"
    }
    return passed ? "border-l-green-500" : "border-l-red-500"
  }

  const getBadgeColor = (passed: boolean, exitCode: number | null) => {
    if (exitCode !== 0 && exitCode !== null) {
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    }
    return passed ? 
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  const formatMemory = (memoryKB: number | null) => {
    if (memoryKB === null) return "N/A"
    if (memoryKB < 1024) return `${memoryKB} KB`
    return `${(memoryKB / 1024).toFixed(1)} MB`
  }

  const formatRuntime = (runtimeMs: number | null) => {
    if (runtimeMs === null) return "N/A"
    return `${runtimeMs} ms`
  }

  const overallPassed = summary.failedTests === 0 && results.every(r => r.exitCode === 0 || r.exitCode === null)
  const hasRuntimeErrors = results.some(r => r.exitCode !== 0 && r.exitCode !== null)

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getStatusIcon(overallPassed, hasRuntimeErrors ? 1 : 0)}
          <span className={`font-semibold ${getStatusColor(overallPassed, hasRuntimeErrors ? 1 : 0)}`}>
            {getStatusText(overallPassed, hasRuntimeErrors ? 1 : 0)}
          </span>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{formatRuntime(summary.totalRuntime)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Memory className="h-4 w-4" />
            <span>{formatMemory(summary.maxMemory)}</span>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="text-center dark:bg-slate-100/10 bg-slate-900/15 py-4 border rounded-md">
          <div className="font-semibold text-lg">{summary.passedTests}/{summary.totalTests}</div>
          <div className="text-muted-foreground">Test Cases</div>
        </div>
        <div className="text-center dark:bg-slate-100/10 bg-slate-900/15 py-4 border rounded-md">
          <div className="font-semibold text-lg">{formatRuntime(summary.averageRuntime)}</div>
          <div className="text-muted-foreground">Avg Runtime</div>
        </div>
        <div className="text-center dark:bg-slate-100/10 bg-slate-900/15 py-4 border rounded-md">
          <div className="font-semibold text-lg">{formatRuntime(summary.totalRuntime)}</div>
          <div className="text-muted-foreground">Total Runtime</div>
        </div>
        <div className="text-center dark:bg-slate-100/10 bg-slate-900/15 py-4 border rounded-md">
          <div className="font-semibold text-lg">{formatMemory(summary.maxMemory)}</div>
          <div className="text-muted-foreground">Peak Memory</div>
        </div>
      </div> */}
      <div className="">
        <Tabs defaultValue={"test-0"}>
          <div className="space-y-2">
            <TabsList className="flex items-center justify-between mb-4">
              {results.map((result,index)=>(
                <TabsTrigger key={index} value={`test-${index}`} className="flex items-center space-x-2">
                  <span className={`text-sm mr-1`}>
                    Test Case {index + 1}
                  </span>
                  <span className={` ${getStatusColor(result.passed, result.exitCode)}`}>
                    &#9679;
                  </span>
                </TabsTrigger>
              ))}   
            </TabsList>
            {results.map((result, index) => (
              <div key={index}>
              <TabsContent key={index} value={`test-${index}`}>
                <Card key={index} className={`border-l-4 ${getBorderColor(result.passed, result.exitCode)}`}>
                  <CardContent className="px-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Test Case {index + 1}</span>
                      <div className="flex items-center space-x-2">
                        <Badge className={getBadgeColor(result.passed, result.exitCode)}>
                          {result.exitCode !== 0 && result.exitCode !== null ? 'Runtime Error' : 
                          result.passed ? 'Passed' : 'Failed'}
                        </Badge>
                        {result.runtime !== null && (
                          <span className="text-xs text-muted-foreground">
                            {formatRuntime(result.runtime)}
                          </span>
                        )}
                        {result.memory !== null && (
                          <span className="text-xs text-muted-foreground">
                            {formatMemory(result.memory)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="border p-2 rounded-md mb-2 dark:bg-white/10 text-sm ">
                        <span className="font-semibold">Input:</span> {result.input}
                      </div>
                      <div className="border p-2 rounded-md mb-2 dark:bg-white/10 text-sm ">
                        <span className="font-semibold">Expected:</span> {result.expected}
                      </div>
                      <div className="border p-2 rounded-md mb-2 dark:bg-white/10 text-sm ">
                        <span className="font-semibold">Output:</span> {result.actual}
                      </div>
                      {result.stderr && (
                        <div className="text-red-600">
                          <span className="font-semibold">Error:</span> {result.stderr}
                        </div>
                      )}
                      {result.exitCode !== 0 && result.exitCode !== null && (
                        <div className="text-orange-600">
                          <span className="font-semibold">Exit Code:</span> {result.exitCode}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              </div>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  )
}

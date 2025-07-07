"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Play, Send, BookOpen, MessageSquare, ThumbsUp, Share, Code } from "lucide-react"
import CodeMirror from '@uiw/react-codemirror'
import { useProblems } from "@/context/ProblemsContext"
import { useTheme } from "next-themes"
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night"
import { tokyoNightDay } from "@uiw/codemirror-theme-tokyo-night-day"
import { python } from "@codemirror/lang-python"
import { java } from "@codemirror/lang-java"
import { cpp } from "@codemirror/lang-cpp"
import { javascript } from "@codemirror/lang-javascript"
import Loading from "./loading"
import { ExecutionResult, TestResultsSummary } from "@/lib/types"
import axios from "axios"
import { TestResults } from "./test-case"
import ProblemDetailSkeleton from "../skeletons/problem-detail-skeleton"
import { useUser } from "@clerk/nextjs"
import { CheckCircle, XCircle, Copy, Code as LucideCode } from "lucide-react"
import { formatRuntime, formatMemory } from "@/lib/utils"

type Languages = "PYTHON" | "JAVASCRIPT" | "JAVA" | "CPP"

export function ProblemDetail({ problemId }: { problemId: number }) {
  const { isSignedIn, user, isLoaded } = useUser()
  const [selectedLanguage, setSelectedLanguage] = useState<Languages>("PYTHON")
  const [loadingCode, setLoadingCode] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<any>(null)

  const [testResults, setTestResults] = useState<{
    results: ExecutionResult[],
    summary: TestResultsSummary
  } | null>(null) 
  
  const { theme, setTheme } = useTheme()
  const {
    problems,
    loading,
    error,
    fetchProblems,
    getProblemById
  } = useProblems()

  const problem = getProblemById(problemId)
  const [code, setCode] = useState<string>(problem?.starterCodes?.find(code => code.language === selectedLanguage)?.code || "// Start coding here")
  
  console.log('Problem:', problem)
  console.log('Problem slug:', problem?.slug)
  console.log('Selected language:', selectedLanguage)
  console.log('Current code:', code)

  const runCode = async () => {
    if (!problem) {
      console.error('No problem found')
      return
    }

    if (!problem.slug) {
      console.error('Problem slug is missing')
      return
    }

    setLoadingCode(true)
    setTestResults(null)
    setShowResults(false)
    
    try {
      const formattedTestCases = problem?.testCases?.map(tc => ({
        input: tc.input,
        expectedOutput: tc.output
      })) || []

      console.log('Formatted test cases:', formattedTestCases)

      const requestBody = {
        language: selectedLanguage,
        code,
        testCases: formattedTestCases,
        problemSlug: problem.slug,
      }

      console.log('Request body:', requestBody)

      const response = await axios.post('/api/execute', requestBody)
      
      console.log('Response received:', response.data)

      const data = response.data

      if (!data?.results || !Array.isArray(data.results)) {
        console.error('Invalid response format:', data)
        throw new Error('Invalid response format')
      }

      setTestResults({
        results: data.results,
        summary: data.summary
      })
      setShowResults(true)
    } catch (error) {
      console.error('Error running code:', error)
      
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data)
        console.error('Response status:', error.response?.status)
        console.error('Request config:', error.config)
      }
      
      // Create error results
      const errorResults: ExecutionResult[] = (problem?.testCases ?? []).map(tc => ({
        input: tc.input,
        expected: tc.output,
        actual: '',
        passed: false,
        stderr: error instanceof Error ? error.message : 'Failed to execute code',
        runtime: null,
        memory: null,
        exitCode: 1
      }))

      const errorSummary: TestResultsSummary = {
        totalTests: problem?.testCases.length || 0,
        passedTests: 0,
        failedTests: problem?.testCases.length || 0,
        totalRuntime: 0,
        maxMemory: 0,
        averageRuntime: 0
      }

      setTestResults({
        results: errorResults,
        summary: errorSummary
      })
      setShowResults(true)
    } finally {
      setLoadingCode(false)
    }
  }

  // Add submitCode function
  const submitCode = async () => {
    if (!isSignedIn) {
      return;
    }
    
    // If we haven't run the code yet, run it first
    if (!testResults) {
      await runCode();
      // Wait a bit for testResults to be set
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setLoadingSubmit(true);
    
    try {
      const response = await axios.post('/api/submit', {
        code,
        language: selectedLanguage,
        problemId,
        // Pass the existing test results instead of re-running
        executionResult: {
          results: testResults?.results || [],
          summary: testResults?.summary || {
            totalTests: 0,
            passedTests: 0,
            failedTests: 0,
            totalRuntime: 0,
            maxMemory: 0,
            averageRuntime: 0
          }
        }
      });

      setSubmissionResult(response.data);
      setShowResults(true);

    } catch (error) {
      console.error('Error submitting code:', error);
    } finally {
      setLoadingSubmit(false);
    }
  }

  // Update code when language changes
  useEffect(() => {
    if (selectedLanguage && problem && problem.starterCodes) {
      const foundStarterCode = problem.starterCodes.find(code => code.language === selectedLanguage)
      setCode(foundStarterCode ? foundStarterCode.code : "// Start coding here")
    }
  }, [selectedLanguage, problem])

  // Fetch problems if not loaded
  useEffect(() => {
    if (!loading && (!problems || problems.length === 0)) {
      fetchProblems()
    }
  }, [problems, loading, fetchProblems])

  if (loading) {
    return (
      <ProblemDetailSkeleton/>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <span className="text-lg text-red-500">Error: {error}</span>
      </div>
    )
  }

  if (!problems || problems.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <span className="text-lg text-muted-foreground">No problems available.</span>
      </div>
    )
  }
  
  if (!problem) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <span className="text-lg text-muted-foreground">Problem not found.</span>
      </div>
    )
  }

  return ( 
    <div className="h-[calc(100vh-4rem)]">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Problem Description Panel */}
        <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
          <div className="h-full overflow-auto border-r">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold">
                    {problem.id}. {problem.title}
                  </h1>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    {problem.difficulty}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6 text-sm text-muted-foreground">
                <span>Acceptance: {problem.acceptanceRate}%</span>
                <span>•</span>
                <span>Submissions: 2.1M</span>
              </div>

              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Description
                  </TabsTrigger>
                  <TabsTrigger value="submissions">Submissions</TabsTrigger>
                  <TabsTrigger value="discuss">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Discuss
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-6 mt-6">
                  <div>
                    <p className="text-md font-semibold dark:text-slate-300 leading-relaxed whitespace-pre-line">{problem.description}</p>
                  </div>

                  <div className="space-y-4">
                    {problem.examples?.map((example, index) => (
                      <div key={index} className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Example {index + 1}:</h4>
                        <div className="space-y-2 text-sm font-mono">
                          <div>
                            <span className="font-semibold">Input:</span> {example.input}
                          </div>
                          <div>
                            <span className="font-semibold">Output:</span> {example.output}
                          </div>
                          {example.explanation && (
                            <div>
                              <span className="font-semibold">Explanation:</span> {example.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Constraints:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {problem.constraints?.map((constraint, index) => (
                        <li className="font-mono border border-slate-500 dark:border-slate-900 px-3 py-1.5 rounded-md mb-2" key={index}>{constraint.value}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {problem.tags?.map((tag) => (
                        <Badge key={tag.tagId} variant="outline">
                          {tag.tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="submissions">
                  {!submissionResult ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No submissions yet. Submit your code to see results here.
                    </div>
                  ) : (
                    <div className="space-y-6 p-4">
                      {/* Submission Status */}
                      <div className={`p-4 rounded-lg border-l-4 ${
                        submissionResult.allTestsPassed 
                          ? "bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-700" 
                          : "bg-red-50 border-red-500 dark:bg-red-900/20 dark:border-red-700"
                      }`}>
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            {submissionResult.allTestsPassed 
                              ? <span className="flex items-center text-green-700 dark:text-green-400">
                                  <CheckCircle className="w-5 h-5 mr-1" /> Accepted
                                </span>
                              : <span className="flex items-center text-red-700 dark:text-red-400">
                                  <XCircle className="w-5 h-5 mr-1" /> Wrong Answer
                                </span>
                            }
                          </h3>
                          <div className="text-sm text-muted-foreground">
                            Submitted {new Date(submissionResult.submission.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Statistics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-center dark:bg-slate-100/10 bg-slate-900/15 py-4 border rounded-md">
                          <div className="font-semibold text-lg">
                            {submissionResult.summary.passedTests}/{submissionResult.summary.totalTests}
                          </div>
                          <div className="text-muted-foreground">Test Cases</div>
                        </div>
                        <div className="text-center dark:bg-slate-100/10 bg-slate-900/15 py-4 border rounded-md">
                          <div className="font-semibold text-lg">
                            {formatRuntime(submissionResult.summary.averageRuntime)}
                          </div>
                          <div className="text-muted-foreground">Avg Runtime</div>
                        </div>
                        <div className="text-center dark:bg-slate-100/10 bg-slate-900/15 py-4 border rounded-md">
                          <div className="font-semibold text-lg">
                            {formatRuntime(submissionResult.summary.totalRuntime)}
                          </div>
                          <div className="text-muted-foreground">Total Runtime</div>
                        </div>
                        <div className="text-center dark:bg-slate-100/10 bg-slate-900/15 py-4 border rounded-md">
                          <div className="font-semibold text-lg">
                            {formatMemory(submissionResult.summary.maxMemory)}
                          </div>
                          <div className="text-muted-foreground">Peak Memory</div>
                        </div>
                      </div>

                      {/* Submitted Code */}
                      <div>
                        <h3 className="text-sm font-medium mb-2 flex items-center">
                          <Code className="w-4 h-4 mr-2" /> Submitted Code ({submissionResult.submission.language})
                        </h3>
                        <div className="relative">
                          <div className="absolute top-2 right-2">
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                              navigator.clipboard.writeText(submissionResult.submission.code);
                            }}>
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          <pre className="bg-slate-100 dark:bg-slate-900 p-4 rounded-md overflow-x-auto text-sm">
                            <code>{submissionResult.submission.code}</code>
                          </pre>
                        </div>
                      </div>

                      {/* Recent Submissions Table - If you have multiple submissions */}
                      <div className="mt-8">
                        <h3 className="text-sm font-medium mb-2">Recent Submissions</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b text-left text-xs text-muted-foreground">
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Runtime</th>
                                <th className="px-4 py-2">Memory</th>
                                <th className="px-4 py-2">Language</th>
                                <th className="px-4 py-2 text-right">Timestamp</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b hover:bg-muted/50">
                                <td className="px-4 py-2">
                                  <span className={`inline-block rounded-full px-2 py-1 text-xs ${
                                    submissionResult.allTestsPassed
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                                      : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                                  }`}>
                                    {submissionResult.submission.status}
                                  </span>
                                </td>
                                <td className="px-4 py-2 text-sm">
                                  {formatRuntime(submissionResult.submission.runtime)}
                                </td>
                                <td className="px-4 py-2 text-sm">
                                  {formatMemory(submissionResult.submission.memory)}
                                </td>
                                <td className="px-4 py-2 text-sm">
                                  {submissionResult.submission.language}
                                </td>
                                <td className="px-4 py-2 text-xs text-right">
                                  {new Date(submissionResult.submission.createdAt).toLocaleString()}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="discuss">
                  <div className="text-center py-8 text-muted-foreground">Discussion forum will appear here</div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Code Editor Panel */}
        <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            {/* Code Editor */}
            <ResizablePanel defaultSize={showResults ? 60 : 100} minSize={40}>
              <div className="h-full flex flex-col">
                <div className="border-b p-4">
                  <div className="flex items-center justify-between">
                    <Select value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as Languages)}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PYTHON">Python</SelectItem>
                        <SelectItem value="JAVASCRIPT">JavaScript</SelectItem>
                        <SelectItem value="JAVA">Java</SelectItem>
                        <SelectItem value="CPP">C++</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Button  
                        onClick={runCode} 
                        variant="outline"
                        disabled={loadingCode || loadingSubmit || !problem?.slug}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {loadingCode ? "Running..." : "Run Code"}
                      </Button>
                      <Button 
                        onClick={submitCode}
                        disabled={loadingCode || loadingSubmit || !isSignedIn}
                        className={submissionResult?.allTestsPassed ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        {!isSignedIn ? "Sign in to Submit" : loadingSubmit ? "Submitting..." : "Submit"}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-hidden">
                  <CodeMirror
                    value={code}
                    onChange={(value) => setCode(value)}
                    height="100%"
                    theme={theme === "dark" ? tokyoNight : tokyoNightDay }
                    className="text-lg"
                    maxHeight="100%"
                    extensions={[
                      selectedLanguage === "PYTHON" ? python() :
                      selectedLanguage === "JAVASCRIPT" ? javascript() :
                      selectedLanguage === "JAVA" ? java() :
                      selectedLanguage === "CPP" ? cpp() : python()
                    ]}
                  />
                </div>
              </div>
            </ResizablePanel>

            {/* Test Results Panel */}
            {showResults && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={40} minSize={20} maxSize={60}>
                  <div className="h-full overflow-auto border-t">
                    <TestResults
                      results={testResults?.results || []}
                      summary={testResults?.summary || {
                        totalTests: 0,
                        passedTests: 0,
                        failedTests: 0,
                        totalRuntime: 0,
                        maxMemory: 0,
                        averageRuntime: 0
                      }}
                    />
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
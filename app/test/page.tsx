'use client'

import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import axios from 'axios'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { TestResults } from '@/components/components/test-case'
import { ExecutionResult, TestResultsSummary } from '@/lib/types'

const mockProblem = {
  title: 'Add Two Numbers',
  description: 'Read two integers from input and print their sum.',
  defaultCode: 'a = int(input())\nb = int(input())\nprint(a + b)',
  testCases: [
    { input: '3\n5', expectedOutput: '8' },
    { input: '10\n-2', expectedOutput: '8' },
  ],
}

export default function ProblemPage() {
  const [code, setCode] = useState(mockProblem.defaultCode)
  const [loading, setLoading] = useState(false)
  const [testResults, setTestResults] = useState<{
    results: ExecutionResult[]
    summary: TestResultsSummary
  } | null>(null)
  const [showResults, setShowResults] = useState(false)

  const runCode = async () => {
    setLoading(true)
    setTestResults(null)
    setShowResults(false)

    try {
      console.log('Sending request with:', {
        language: 'PYTHON',
        code,
        testCases: mockProblem.testCases,
      })

      const response = await axios.post('/api/execute', {
        language: 'PYTHON',
        code,
        testCases: mockProblem.testCases,
      })

      console.log('Response received:', response.data)
      
      const data = response.data
      
      if (!data?.results || !Array.isArray(data.results)) {
        console.error('Invalid response format')
        return
      }

      setTestResults(data)
      setShowResults(true)
    } catch (error) {
      console.error('Error running code:', error)
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data)
        console.error('Response status:', error.response?.status)
      }
      // Create error results
      const errorResults: ExecutionResult[] = mockProblem.testCases.map(tc => ({
        input: tc.input,
        expected: tc.expectedOutput,
        actual: '',
        passed: false,
        stderr: 'Failed to execute code',
        runtime: null,
        memory: null,
        exitCode: 1
      }))

      const errorSummary: TestResultsSummary = {
        totalTests: mockProblem.testCases.length,
        passedTests: 0,
        failedTests: mockProblem.testCases.length,
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
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-6rem)]">
          {/* Left: Problem Description */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{mockProblem.title}</h1>
              <p className="text-muted-foreground mb-4">{mockProblem.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Test Cases:</h2>
              <div className="space-y-2">
                {mockProblem.testCases.map((tc, idx) => (
                  <div key={idx} className="bg-muted/50 rounded-lg p-3">
                    <div className="text-sm font-mono space-y-1">
                      <div>
                        <span className="font-semibold">Input:</span> {tc.input.replace('\n', ', ')}
                      </div>
                      <div>
                        <span className="font-semibold">Expected:</span> {tc.expectedOutput}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Results */}
            {showResults && testResults && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">Test Results:</h2>
                <TestResults 
                  results={testResults.results} 
                  summary={testResults.summary} 
                />
              </div>
            )}
          </div>

          {/* Right: Code Editor */}
          <div className="flex flex-col space-y-4">
            <div className="flex-1 min-h-0">
              <CodeMirror
                value={code}
                height="100%"
                extensions={[python()]}
                theme={vscodeDark}
                onChange={(val) => setCode(val)}
                className="h-full"
              />
            </div>
            
            <button
              onClick={runCode}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Running...
                </span>
              ) : (
                'Run Code'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

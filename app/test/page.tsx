'use client'

import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import axios from 'axios'

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
  const [output, setOutput] = useState<string[]>([])
  const [loading, setLoading] = useState(false)



  const runCode = async () => {
    setLoading(true)
    setOutput([])

    try {
      console.log('Sending request with:', {
        language: 'python3',
        code,
        testCases: mockProblem.testCases,
      })

      const response = await axios.post('/api/execute', {
        language: 'python3',
        code,
        testCases: mockProblem.testCases,
      })

      console.log('Response received:', response.data)
      
      const data = response.data
      
      if (!data?.results || !Array.isArray(data.results)) {
        setOutput(['❌ Error: Failed to run code or invalid response from server.'])
        return
      }

      const formatted = data.results.map((res: any, idx: number) => {
        return res.passed
          ? `✅ Test ${idx + 1} Passed`
          : `❌ Test ${idx + 1} Failed\nInput:\n${res.input}\nExpected: ${res.expected}\nGot: ${res.actual}`
      })

      setOutput(formatted)
    } catch (error) {
      console.error('Error running code:', error)
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data)
        console.error('Response status:', error.response?.status)
      }
      setOutput(['❌ Error: Failed to run code. Please try again.'])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">{mockProblem.title}</h1>
        <p className="mb-4 text-gray-700">{mockProblem.description}</p>
        <h2 className="font-semibold">Test Cases:</h2>
        <ul className="list-disc ml-6">
          {mockProblem.testCases.map((tc, idx) => (
            <li key={idx}>
              <strong>Input:</strong> {tc.input.replace('\n', ', ')} |{' '}
              <strong>Expected:</strong> {tc.expectedOutput}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Code Editor and Output */}
      <div className="flex flex-col gap-4">
        <CodeMirror
          value={code}
          height="300px"
          extensions={[python()]}
          theme="light"
          onChange={(val) => setCode(val)}
        />
        <button
          onClick={runCode}
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          {loading ? 'Running...' : 'Run Code'}
        </button>

        <div className="bg-gray-100 p-3 rounded min-h-[100px] overflow-y-auto whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">Results:</h2>
          {output.length > 0 ? output.map((line, i) => <p key={i}>{line}</p>) : 'No output yet'}
        </div>
      </div>
    </div>
  )
}

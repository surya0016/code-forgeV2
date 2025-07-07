import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('Received request body:', body) // Debug log
    
    const { language, code, testCases, problemSlug } = body as {
      language: keyof typeof languageConfig,
      code: string,
      testCases: Array<{ input: string, expectedOutput: string }>,
      problemSlug: string
    }

    // More detailed validation 
    if (!language) {
      return NextResponse.json({ error: 'Language is required' }, { status: 400 })
    }
    
    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 })
    }
    
    if (!testCases || !Array.isArray(testCases) || testCases.length === 0) {
      return NextResponse.json({ error: 'Valid test cases are required' }, { status: 400 })
    }
    
    if (!problemSlug) {
      return NextResponse.json({ error: 'Problem slug is required' }, { status: 400 })
    }

    console.log('Validation passed, looking for problem:', problemSlug) // Debug log

    // Get problem from database instead of importing from utils
    const problem = await prisma.problem.findUnique({
      where: { slug: problemSlug },
      include: {
        starterCodes: true
      }
    })

    if (!problem) {
      console.log('Problem not found:', problemSlug) // Debug log
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 })
    }

    const starterCode = problem.starterCodes.find(sc => sc.language === language)
    if (!starterCode?.wrapper) {
      console.log('Wrapper not found for language:', language) // Debug log
      return NextResponse.json({ error: 'Wrapper not found for this language' }, { status: 404 })
    }

    const languageConfig = {
      PYTHON: { language: 'python', version: '3.10.0' },
      JAVASCRIPT: { language: 'javascript', version: '18.15.0' },
      CPP: { language: 'cpp', version: '10.2.0' },
      JAVA: { language: 'java', version: '15.0.2' },
    }

    const config = languageConfig[language]
    if (!config) {
      return NextResponse.json({ error: 'Unsupported language' }, { status: 400 })
    }

    const results = []

    console.log(`Executing ${testCases.length} test cases for ${language}`) // Debug log

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i]
      console.log(`Executing test case ${i + 1}:`, testCase) // Debug log
      
      try {
        // Combine user code with wrapper
        const fullCode = code + '\n' + starterCode.wrapper

        const pistonRequest = {
          language: config.language,
          version: config.version,
          stdin: testCase.input,
          files: [
            {
              name: `main.${getExtension(language)}`,
              content: fullCode,
            },
          ],
        }

        console.log('Sending request to Piston API...') // Debug log

        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pistonRequest),
        })

        if (!response.ok) {
          console.error('Piston API error:', response.status, response.statusText)
          throw new Error(`Piston API error: ${response.status}`)
        }

        const data = await response.json()
        console.log('Piston API response:', data) // Debug log

        const actual = (data.run?.output || '').trim()
        const expected = testCase.expectedOutput.trim()

        results.push({
          input: testCase.input,
          expected,
          actual,
          passed: actual === expected,
          stderr: data.run?.stderr || null,
          runtime: data.run?.runtime ? Math.round(data.run.runtime) : null,
          memory: data.run?.memory ? Math.round(data.run.memory / 1024) : null,
          exitCode: data.run?.code || null,
        })
      } catch (error) {
        console.error('Error executing test case:', error)
        results.push({
          input: testCase.input,
          expected: testCase.expectedOutput,
          actual: '',
          passed: false,
          stderr: error instanceof Error ? error.message : 'Execution failed',
          runtime: null,
          memory: null,
          exitCode: null,
        })
      }
    }

    // Calculate summary statistics
    const totalRuntime = results.reduce((sum, result) => sum + (result.runtime || 0), 0)
    const maxMemory = Math.max(...results.map(result => result.memory || 0))
    const passedTests = results.filter(result => result.passed).length

    const response = {
      results,
      summary: {
        totalTests: results.length,
        passedTests,
        failedTests: results.length - passedTests,
        totalRuntime,
        maxMemory,
        averageRuntime: results.length > 0 ? Math.round(totalRuntime / results.length) : 0,
      }
    }

    console.log('Sending response:', response) // Debug log

    return NextResponse.json(response)
  } catch (err) {
    console.error('API Route Error:', err)
    return NextResponse.json({ 
      error: 'Execution failed', 
      details: err instanceof Error ? err.message : 'Unknown error' 
    }, { status: 500 })
  }
}

function getExtension(language: 'PYTHON' | 'JAVASCRIPT' | 'CPP' | 'JAVA'): string {
  const extMap: Record<'PYTHON' | 'JAVASCRIPT' | 'CPP' | 'JAVA', string> = {
    PYTHON: 'py',
    JAVASCRIPT: 'js',
    CPP: 'cpp',
    JAVA: 'java',
  }
  return extMap[language] || 'txt'
}

import { NextResponse } from 'next/server'
import { problems } from '@/lib/utils'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { language, code, testCases, problemSlug } = body as {
      language: keyof typeof languageConfig,
      code: string,
      testCases: Array<{ input: string, expectedOutput: string }>,
      problemSlug: string
    }

    if (!language || !code || !testCases || !Array.isArray(testCases) || !problemSlug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Find the problem and get the wrapper
    const problem = problems.find(p => p.slug === problemSlug)
    if (!problem) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 })
    }

    const starterCode = problem.starterCode.create.find(sc => sc.language === language)
    if (!starterCode?.wrapper) {
      return NextResponse.json({ error: 'Wrapper not found for this language' }, { status: 404 })
    }

    const languageConfig = {
      PYTHON: { language: 'python', version: '3.10.0' },
      JAVASCRIPT: { language: 'javascript', version: '18.15.0' },
      CPP: { language: 'cpp', version: '10.2.0' },
      JAVA: { language: 'java', version: '15.0.2' },
    }

    const config = languageConfig[language]
    const results = []

    for (const testCase of testCases) {
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

        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pistonRequest),
        })

        const data = await response.json()
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
          stderr: 'Execution failed',
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

    console.log(
      {
        results,
        summary: {
          totalTests: results.length,
          passedTests,
          failedTests: results.length - passedTests,
          totalRuntime,
          maxMemory,
          averageRuntime: results.length > 0 ? Math.round(totalRuntime / results.length) : 0,
        }
      })

    return NextResponse.json({ 
      results,
      summary: {
        totalTests: results.length,
        passedTests,
        failedTests: results.length - passedTests,
        totalRuntime,
        maxMemory,
        averageRuntime: results.length > 0 ? Math.round(totalRuntime / results.length) : 0,
      }
    })
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

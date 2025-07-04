import { NextResponse } from 'next/server'

type TestCase = {
  input: string
  expectedOutput: string
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { language, version, code, testCases } = body

    // Add validation
    if (!language || !code || !testCases || !Array.isArray(testCases)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Map language names to Piston API format with specific versions
    const languageConfig: Record<string, { language: string; version: string }> = {
      python3: { language: 'python', version: '3.10.0' },
      javascript: { language: 'javascript', version: '18.15.0' },
      cpp: { language: 'cpp', version: '10.2.0' },
      java: { language: 'java', version: '15.0.2' },
    }

    const config = languageConfig[language] || { language, version: version || '3.10.0' }

    const results = []

    for (const testCase of testCases as TestCase[]) {
      try {
        const pistonRequest = {
          language: config.language,
          version: config.version,
          stdin: testCase.input,
          files: [
            {
              name: `main.${getExtension(language)}`,
              content: code,
            },
          ],
        }
        
        console.log('Sending to Piston API:', pistonRequest)

        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pistonRequest),
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error('Piston API error:', response.status, response.statusText)
          console.error('Error response:', errorText)
          throw new Error(`Piston API returned ${response.status}: ${errorText}`)
        }

        const data = await response.json()
        console.log('Piston API response:', data)
        
        const actual = (data.run?.output || '').trim()
        const expected = testCase.expectedOutput.trim()

        results.push({
          input: testCase.input,
          expected,
          actual,
          passed: actual === expected,
          stderr: data.run?.stderr || null,
        })
      } catch (fetchError) {
        console.error('Error executing test case:', fetchError)
        results.push({
          input: testCase.input,
          expected: testCase.expectedOutput,
          actual: '',
          passed: false,
          stderr: 'Execution failed',
        })
      }
    }

    return NextResponse.json({ results })
  } catch (err) {
    console.error('API Route Error:', err)
    return NextResponse.json({ 
      error: 'Execution failed', 
      details: err instanceof Error ? err.message : 'Unknown error' 
    }, { status: 500 })
  }
}

function getExtension(language: string) {
  const extMap: Record<string, string> = {
    python3: 'py',
    python: 'py',
    javascript: 'js',
    cpp: 'cpp',
    java: 'java',
  }
  return extMap[language] || 'txt'
}

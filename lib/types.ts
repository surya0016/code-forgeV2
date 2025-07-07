export interface Tag {
  id: number
  name: string
  description: string
}

export interface ProblemTag {
  problemId: number
  tagId: number
  tag: Tag
}

export interface StarterCode {
  id: number
  language: "PYTHON" | "JAVA" | "JAVASCRIPT" | "CPP"
  code: string
  problemId: number
  createdAt: string
  updatedAt: string
}

export interface Examples {
  id: number
  input: string
  output: string
  explanation?: string
  problemId: number
}

export interface Constraint {
  id: number
  value: string
  problemId: number
}

export interface TestCase {
  id: number
  input: string
  output: string
  isHidden: boolean
  problemId: number
}

export interface Submission {
  id: number
  code: string
  language: string
  status: "Accepted" | "WrongAnswer" | "TimeLimitExceeded" | "RuntimeError" | "CompileError"
  runtime?: number
  memory?: number
  createdAt: string
  problemId: number
}

export interface Discussion {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  upvotes: number
  isPinned: boolean
  problemId: number
}

export interface Solution {
  id: number
  title: string
  content: string
  createdAt: string
  upvotes: number
  language?: string
  problemId: number
}

export interface Problem {
  id: number
  title: string
  description: string
  slug: string
  difficulty: "Easy" | "Medium" | "Hard"
  acceptanceRate: number
  createdAt: string
  updatedAt: string
  isSolved: boolean
  starterCodes: StarterCode[]
  testCases: TestCase[]
  submissions: Submission[]
  tags: ProblemTag[]
  discussions: Discussion[]
  solutions: Solution[]
  examples: Examples[]
  constraints: Constraint[]
}

export interface ProblemsResponse {
  problems: Problem[]
}

// Additional utility types
export type Language = "PYTHON" | "JAVA" | "JAVASCRIPT" | "CPP"
export type Difficulty = "Easy" | "Medium" | "Hard"
export type SubmissionStatus = "Accepted" | "WrongAnswer" | "TimeLimitExceeded" | "RuntimeError" | "CompileError"

// For API responses that might include selected fields only
export interface ProblemSummary {
  id: number
  title: string
  difficulty: Difficulty
  acceptanceRate: number
  isSolved: boolean
  tags: ProblemTag[]
}

// For individual problem page with full details
export interface ProblemDetails extends Problem {
  // You can add any additional computed fields here
  totalSubmissions?: number
  acceptedSubmissions?: number
}

export interface ExecutionResult {
  input: string
  expected: string
  actual: string
  passed: boolean
  stderr: string | null
  runtime: number | null
  memory: number | null
  exitCode: number | null
}

export interface TestResultsSummary {
  totalTests: number
  passedTests: number
  failedTests: number
  totalRuntime: number
  maxMemory: number
  averageRuntime: number
}

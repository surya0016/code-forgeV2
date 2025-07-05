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

export interface Problem {
  id: number
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  acceptanceRate: number
  createdAt: string
  updatedAt: string
  isSolved: boolean
  starterCode: StarterCode[]
  tags: ProblemTag[]
}

export interface ProblemsResponse {
  problems: Problem[]
}

export interface StarterCode {
  id: number
  language: "PYTHON" | "JAVA" | "JAVASCRIPT" | "TYPESCRIPT" | "CPP"
  code: string
  problemId: number
  createdAt: string
  updatedAt: string
}

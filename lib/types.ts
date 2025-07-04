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
  starterCode: string
  tags: ProblemTag[]
}

export interface ProblemsResponse {
  problems: Problem[]
}
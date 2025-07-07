import { Header } from "@/components/components/header"
import { ProblemDetail } from "@/components/components/problem-detail"

export default async function ProblemPage({params}:{params: Promise<{ problemId: string }>}) {
  const problemId = (await (params)).problemId;
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProblemDetail problemId={parseInt(problemId)} />
    </div>
  )
}

// export default async function CategoryDetail({params}: {params: Promise<{ id: string }>}) {
// const { id } = await params;
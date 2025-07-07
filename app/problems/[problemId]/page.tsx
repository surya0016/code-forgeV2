import { Header } from "@/components/components/header"
import { ProblemDetail } from "@/components/components/problem-detail"

export default async function ProblemPage({ params }: { params: { problemId: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProblemDetail problemId={parseInt(params.problemId)} />
    </div>
  )
}
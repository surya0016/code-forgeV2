import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Code, Trophy } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            <Trophy className="mr-1 h-3 w-3" />
            Join 2M+ developers
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Forge Your Path with  
            <span className="text-blue-600"> Mastery</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Practice coding problems, join contests, and ace technical interviews — all in one trusted platform.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/problems">
              <Button size="lg" className="px-8">
                Start Practicing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" size="lg" className="px-8">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">1,800+ Problems</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                From easy to hard, covering all major topics
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Weekly Contests</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Compete with developers globally</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                <Play className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Real-time Feedback</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Instant code execution and testing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Play, BookOpen, Target } from "lucide-react"
import Link from "next/link"

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <p className="text-muted-foreground mt-2">
          Ready to continue your coding journey? Here's what's waiting for you.
        </p>
      </div>

      {/* Daily Challenge */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <CardTitle>Daily Challenge</CardTitle>
              <Badge variant="secondary">New</Badge>
            </div>
            <Button>
              Solve Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Complete today's challenge to maintain your streak</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Merge Two Sorted Lists</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Easy</Badge>
                <span className="text-sm text-muted-foreground">Linked List</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Streak: 12 days</p>
              <Progress value={80} className="w-24 h-2 mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Study Plans */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-purple-500" />
              <CardTitle>Study Plans</CardTitle>
            </div>
            <CardDescription>Structured learning paths for interview prep</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">LeetCode 75</span>
                <span className="text-sm text-muted-foreground">23/75</span>
              </div>
              <Progress value={31} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Top Interview 150</span>
                <span className="text-sm text-muted-foreground">67/150</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <Button variant="outline" className="w-full">
              View All Plans
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Play className="h-5 w-5 text-green-500" />
              <CardTitle>Quick Practice</CardTitle>
            </div>
            <CardDescription>Jump into problems by topic or difficulty</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/problems?difficulty=easy">
              <Button variant="outline" className="w-full justify-start">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 mr-2">Easy</Badge>
                Practice Easy Problems
              </Button>
            </Link>
            <Link href="/problems?topic=arrays">
              <Button variant="outline" className="w-full justify-start">
                Arrays & Strings
                <Badge variant="secondary" className="ml-auto">
                  245
                </Badge>
              </Button>
            </Link>
            <Link href="/problems?topic=dynamic-programming">
              <Button variant="outline" className="w-full justify-start">
                Dynamic Programming
                <Badge variant="secondary" className="ml-auto">
                  156
                </Badge>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, ArrowRight } from "lucide-react"

const recentSubmissions = [
  {
    problem: "Two Sum",
    status: "accepted",
    language: "Python",
    time: "2 hours ago",
    difficulty: "Easy",
  },
  {
    problem: "Longest Substring",
    status: "wrong-answer",
    language: "JavaScript",
    time: "5 hours ago",
    difficulty: "Medium",
  },
  {
    problem: "Binary Tree Inorder",
    status: "accepted",
    language: "Java",
    time: "1 day ago",
    difficulty: "Medium",
  },
  {
    problem: "Valid Parentheses",
    status: "accepted",
    language: "Python",
    time: "2 days ago",
    difficulty: "Easy",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest submissions and progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentSubmissions.map((submission, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border">
            <div className="flex-shrink-0">
              {submission.status === "accepted" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : submission.status === "wrong-answer" ? (
                <XCircle className="h-5 w-5 text-red-500" />
              ) : (
                <Clock className="h-5 w-5 text-yellow-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{submission.problem}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {submission.language}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    submission.difficulty === "Easy"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : submission.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {submission.difficulty}
                </Badge>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">{submission.time}</div>
          </div>
        ))}
        <Button variant="outline" className="w-full">
          View All Submissions
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

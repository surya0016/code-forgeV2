import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    title: "Arrays & Strings",
    description: "Master fundamental data structures",
    total: 245,
    solved: 89,
    difficulty: "Easy",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  {
    title: "Dynamic Programming",
    description: "Optimize with memoization techniques",
    total: 156,
    solved: 23,
    difficulty: "Hard",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  {
    title: "Trees & Graphs",
    description: "Navigate complex data relationships",
    total: 198,
    solved: 67,
    difficulty: "Medium",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  {
    title: "System Design",
    description: "Design scalable systems",
    total: 89,
    solved: 12,
    difficulty: "Hard",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
]

export function ProblemCategories() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Problem Categories</h2>
        <Link href="/problems">
          <Button variant="outline">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <Card key={category.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{category.title}</CardTitle>
                <Badge className={category.color}>{category.difficulty}</Badge>
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {category.solved}/{category.total}
                  </span>
                </div>
                <Progress value={(category.solved / category.total) * 100} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {Math.round((category.solved / category.total) * 100)}% complete
                  </span>
                  <Button size="sm" variant="ghost">
                    Practice
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

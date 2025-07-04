import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, Flame, Calendar } from "lucide-react"

export function Stats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">234</div>
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex space-x-1">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Easy: 89</Badge>
            </div>
          </div>
          <div className="flex space-x-1 mt-1">
            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Medium: 123</Badge>
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Hard: 22</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          <Flame className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12 days</div>
          <p className="text-xs text-muted-foreground mt-2">Keep it up! Solve 1 more today</p>
          <Progress value={80} className="mt-2 h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contest Rating</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,847</div>
          <p className="text-xs text-muted-foreground mt-2">+23 from last contest</p>
          <Badge variant="secondary" className="mt-2">
            Expert
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Contest</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2d 14h</div>
          <p className="text-xs text-muted-foreground mt-2">Weekly Contest 378</p>
          <Badge variant="outline" className="mt-2">
            Register
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}

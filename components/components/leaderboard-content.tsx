"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, TrendingUp, Users, Star } from "lucide-react"

const globalRankings = [
  {
    rank: 1,
    username: "algorithm_master",
    avatar: "/placeholder.svg?height=40&width=40",
    country: "🇺🇸",
    rating: 2847,
    problemsSolved: 1250,
    contestsParticipated: 45,
    streak: 89,
  },
  {
    rank: 2,
    username: "code_ninja",
    avatar: "/placeholder.svg?height=40&width=40",
    country: "🇨🇳",
    rating: 2834,
    problemsSolved: 1189,
    contestsParticipated: 52,
    streak: 67,
  },
  {
    rank: 3,
    username: "binary_wizard",
    avatar: "/placeholder.svg?height=40&width=40",
    country: "🇮🇳",
    rating: 2821,
    problemsSolved: 1156,
    contestsParticipated: 38,
    streak: 123,
  },
  {
    rank: 4,
    username: "dp_specialist",
    avatar: "/placeholder.svg?height=40&width=40",
    country: "🇰🇷",
    rating: 2798,
    problemsSolved: 1134,
    contestsParticipated: 41,
    streak: 45,
  },
  {
    rank: 5,
    username: "graph_explorer",
    avatar: "/placeholder.svg?height=40&width=40",
    country: "🇯🇵",
    rating: 2776,
    problemsSolved: 1098,
    contestsParticipated: 47,
    streak: 78,
  },
]

const weeklyRankings = [
  {
    rank: 1,
    username: "rising_star",
    avatar: "/placeholder.svg?height=40&width=40",
    country: "🇨🇦",
    weeklyGain: 156,
    problemsSolved: 23,
    rating: 1847,
  },
  {
    rank: 2,
    username: "speed_coder",
    avatar: "/placeholder.svg?height=40&width=40",
    country: "🇩🇪",
    weeklyGain: 134,
    problemsSolved: 19,
    rating: 1692,
  },
  {
    rank: 3,
    username: "puzzle_solver",
    avatar: "/placeholder.svg?height=40&width=40",
    country: "🇧🇷",
    weeklyGain: 128,
    problemsSolved: 21,
    rating: 1543,
  },
]

export function LeaderboardContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("global")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      return getRankIcon(rank)
    }
    return <Badge variant="outline">#{rank}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground mt-2">See how you rank against other developers worldwide</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="country">Country</SelectItem>
              <SelectItem value="region">Region</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="global" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="global" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Global Ranking
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Weekly Rising
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Statistics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Top Performers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {globalRankings.map((user, index) => (
                  <div
                    key={user.rank}
                    className={`flex items-center space-x-4 p-4 rounded-lg border ${
                      user.rank <= 3
                        ? "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center justify-center w-12">{getRankIcon(user.rank)}</div>

                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                      <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold truncate">{user.username}</p>
                        <span className="text-lg">{user.country}</span>
                        {user.rating >= 2800 && (
                          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                            <Star className="mr-1 h-3 w-3 fill-current" />
                            Legend
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>Rating: {user.rating}</span>
                        <span>Solved: {user.problemsSolved}</span>
                        <span>Contests: {user.contestsParticipated}</span>
                        <span>Streak: {user.streak} days</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{user.rating}</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Weekly Rising Stars</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyRankings.map((user, index) => (
                  <div key={user.rank} className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50">
                    <div className="flex items-center justify-center w-12">{getRankBadge(user.rank)}</div>

                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                      <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold truncate">{user.username}</p>
                        <span className="text-lg">{user.country}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>Rating: {user.rating}</span>
                        <span>This week: {user.problemsSolved} solved</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">+{user.weeklyGain}</div>
                      <div className="text-xs text-muted-foreground">This week</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.1M+</div>
                <p className="text-xs text-muted-foreground">Active developers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45M+</div>
                <p className="text-xs text-muted-foreground">Total submissions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contest Participants</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">850K</div>
                <p className="text-xs text-muted-foreground">Weekly average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">Current highest</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Keep Coding!</h3>
                <p>Solve more problems to see your ranking here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Trophy, Users, Target, Play, CheckCircle } from "lucide-react"

const upcomingContests = [
  {
    id: 1,
    title: "Weekly Contest 378",
    startTime: "2024-01-20 10:30:00",
    duration: "1h 30m",
    participants: "12.5K registered",
    problems: 4,
    difficulty: "Easy to Hard",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Biweekly Contest 120",
    startTime: "2024-01-22 14:30:00",
    duration: "1h 45m",
    participants: "8.2K registered",
    problems: 4,
    difficulty: "Easy to Hard",
    status: "upcoming",
  },
]

const liveContests = [
  {
    id: 3,
    title: "Weekly Contest 377",
    startTime: "2024-01-15 10:30:00",
    duration: "1h 30m",
    participants: "15.3K participating",
    problems: 4,
    difficulty: "Easy to Hard",
    status: "live",
    timeRemaining: "45m 23s",
  },
]

const pastContests = [
  {
    id: 4,
    title: "Weekly Contest 376",
    startTime: "2024-01-13 10:30:00",
    duration: "1h 30m",
    participants: "14.1K participated",
    problems: 4,
    difficulty: "Easy to Hard",
    status: "finished",
    myRank: 1247,
    myScore: "12/16",
  },
  {
    id: 5,
    title: "Biweekly Contest 119",
    startTime: "2024-01-08 14:30:00",
    duration: "1h 45m",
    participants: "9.8K participated",
    problems: 4,
    difficulty: "Easy to Hard",
    status: "finished",
    myRank: 892,
    myScore: "15/16",
  },
]

export function ContestsContent() {
  const [selectedTab, setSelectedTab] = useState("upcoming")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Upcoming
          </Badge>
        )
      case "live":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Live</Badge>
      case "finished":
        return <Badge variant="secondary">Finished</Badge>
      default:
        return null
    }
  }

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contests</h1>
        <p className="text-muted-foreground mt-2">Compete with developers worldwide and improve your skills</p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            {upcomingContests.map((contest) => (
              <Card key={contest.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CardTitle className="text-xl">{contest.title}</CardTitle>
                      {getStatusBadge(contest.status)}
                    </div>
                    <Button>
                      <Target className="mr-2 h-4 w-4" />
                      Register
                    </Button>
                  </div>
                  <CardDescription className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDateTime(contest.startTime)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{contest.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{contest.participants}</span>
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        {contest.problems} problems • {contest.difficulty}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live" className="space-y-4">
          <div className="grid gap-4">
            {liveContests.map((contest) => (
              <Card key={contest.id} className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CardTitle className="text-xl">{contest.title}</CardTitle>
                      {getStatusBadge(contest.status)}
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                        {contest.timeRemaining} left
                      </Badge>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Play className="mr-2 h-4 w-4" />
                      Join Contest
                    </Button>
                  </div>
                  <CardDescription className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDateTime(contest.startTime)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{contest.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{contest.participants}</span>
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        {contest.problems} problems • {contest.difficulty}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        View Leaderboard
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <div className="grid gap-4">
            {pastContests.map((contest) => (
              <Card key={contest.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CardTitle className="text-xl">{contest.title}</CardTitle>
                      {getStatusBadge(contest.status)}
                      {contest.myRank && contest.myRank <= 1000 && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          <Trophy className="mr-1 h-3 w-3" />
                          Top 1000
                        </Badge>
                      )}
                    </div>
                    <Button variant="outline">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      View Results
                    </Button>
                  </div>
                  <CardDescription className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDateTime(contest.startTime)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{contest.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{contest.participants}</span>
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        {contest.problems} problems • {contest.difficulty}
                      </p>
                      {contest.myRank && (
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-foreground font-medium">Rank: #{contest.myRank.toLocaleString()}</span>
                          <span className="text-foreground font-medium">Score: {contest.myScore}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Practice
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

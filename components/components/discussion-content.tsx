"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Search, MessageSquare, ThumbsUp, Clock, Pin, Plus, Send } from "lucide-react"

const discussions = [
  {
    id: 1,
    title: "Optimal approach for Two Sum - O(n) solution",
    author: "alice_dev",
    avatar: "/placeholder.svg?height=32&width=32",
    replies: 23,
    upvotes: 45,
    timestamp: "2 hours ago",
    tags: ["Array", "Hash Table"],
    isPinned: true,
    content:
      "I wanted to share an efficient O(n) solution for the Two Sum problem using a hash map. This approach is much better than the naive O(n²) solution...",
  },
  {
    id: 2,
    title: "Dynamic Programming patterns - comprehensive guide",
    author: "code_master",
    avatar: "/placeholder.svg?height=32&width=32",
    replies: 67,
    upvotes: 128,
    timestamp: "1 day ago",
    tags: ["Dynamic Programming", "Guide"],
    isPinned: false,
    content: "After solving 100+ DP problems, I've compiled a comprehensive guide on the most common DP patterns...",
  },
  {
    id: 3,
    title: "Binary Search edge cases - avoid common pitfalls",
    author: "binary_guru",
    avatar: "/placeholder.svg?height=32&width=32",
    replies: 12,
    upvotes: 34,
    timestamp: "3 days ago",
    tags: ["Binary Search", "Tips"],
    isPinned: false,
    content:
      "Binary search seems simple but there are many edge cases that can trip you up. Here's what to watch out for...",
  },
  {
    id: 4,
    title: "Graph algorithms interview preparation",
    author: "graph_explorer",
    avatar: "/placeholder.svg?height=32&width=32",
    replies: 89,
    upvotes: 156,
    timestamp: "1 week ago",
    tags: ["Graph", "Interview"],
    isPinned: false,
    content:
      "Preparing for interviews? Here are the essential graph algorithms you need to know, with templates and examples...",
  },
]

export function DiscussionContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("all")
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Discussion</h1>
          <p className="text-muted-foreground mt-2">Share knowledge and learn from the community</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Discussion</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Enter discussion title..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  placeholder="Share your thoughts, questions, or insights..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={8}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <Send className="mr-2 h-4 w-4" />
                  Post Discussion
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="solutions">Solutions</TabsTrigger>
          <TabsTrigger value="tips">Tips & Tricks</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedTag === "all" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedTag("all")}
                  >
                    All
                  </Badge>
                  <Badge
                    variant={selectedTag === "array" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedTag("array")}
                  >
                    Array
                  </Badge>
                  <Badge
                    variant={selectedTag === "dp" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedTag("dp")}
                  >
                    Dynamic Programming
                  </Badge>
                  <Badge
                    variant={selectedTag === "graph" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedTag("graph")}
                  >
                    Graph
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.author} />
                        <AvatarFallback>{discussion.author[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          {discussion.isPinned && <Pin className="h-4 w-4 text-blue-500" />}
                          <h3 className="font-semibold text-lg hover:text-blue-600 cursor-pointer">
                            {discussion.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{discussion.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <span>by</span>
                              <span className="font-medium text-foreground">{discussion.author}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{discussion.timestamp}</span>
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex flex-wrap gap-1">
                              {discussion.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{discussion.upvotes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{discussion.replies}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions">
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Questions</h3>
              <p className="text-muted-foreground">Questions from the community will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solutions">
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Solutions</h3>
              <p className="text-muted-foreground">Solution discussions will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips">
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tips & Tricks</h3>
              <p className="text-muted-foreground">Tips and tricks will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

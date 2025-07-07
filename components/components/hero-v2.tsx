"use client"
import logo from "@/public/code-forge-logo.png"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Code,
  Play,
  Trophy,
  Users,
  Target,
  BarChart3,
  MessageSquare,
  Zap,
  BookOpen,
  Star,
  TrendingUp,
  Award,
  Clock,
  ArrowRight,
} from "lucide-react"
import { ModeToggle } from "../ui/dark-mode-toggle"
import Link from "next/link"
import Image from "next/image"
import { UserButton, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { is } from "date-fns/locale"

export default function Hero2() {
  const { isSignedIn, user, isLoaded } = useUser()
  const route = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-indigo-200 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 ">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 dark:bg-transparent overflow-hidden">
              <Image
                alt="logo"
                src={logo}
                className="object-contain h-6 w-6"
                width={24}
                height={24}
                priority
              />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">Code Forge</span>
          </Link>
          <div className="flex items-center space-x-4">
            {isSignedIn ? <UserButton/> : (
            <Link href="/auth/sign-in">
              <Button variant="outline" className="hidden md:inline-flex cursor-pointer">
                Sign In
              </Button>
            </Link>
          )}
            <ModeToggle />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 ">
          {/* Left Content */}
          <div className="space-y-8 ">
            <div className="space-y-4">
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800">
                🚀 New challenges added weekly
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Master Your
                <span className="text-blue-600 dark:text-blue-400"> Coding </span>
                Skills
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Join thousands of developers sharpening their programming skills with our comprehensive collection of
                coding challenges, from beginner to expert level.
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,200+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Problems</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2M+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Solutions</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {isSignedIn ? (
                <div className="flex space-x-4 w-full"> 
                  <Link href="/problems" className="">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                      <Play className="w-5 h-5 mr-2" />
                      Start Coding Now
                    </Button>
                  </Link>
                  <Link href="/contests">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950 px-8 py-3 "
                    >
                      <Trophy className="w-5 h-5 mr-2" />
                      Join Challenges
                    </Button>
                  </Link>
                </div>
              ):(
                <Link href="/auth/sign-up" className="w-full">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full text-white px-8 py-3 cursor-pointer">
                    Register Now For Free
                    <ArrowRight className="w-5 h-5 mr-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Right Visual Element */}
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
              {/* Code Editor Mockup */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">two-sum.py</span>
                </div>

                <div className="space-y-2 font-mono text-sm">
                  <div className="text-gray-500 dark:text-gray-400">
                    <span className="text-blue-600 dark:text-blue-400">def</span>{" "}
                    <span className="text-purple-600 dark:text-purple-400">twoSum</span>
                    <span className="text-gray-700 dark:text-gray-300">(nums, target):</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 pl-4">
                    <span className="text-blue-600 dark:text-blue-400">for</span>{" "}
                    <span className="text-gray-700 dark:text-gray-300">i in</span>{" "}
                    <span className="text-purple-600 dark:text-purple-400">range</span>
                    <span className="text-gray-700 dark:text-gray-300">(len(nums)):</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 pl-8">
                    <span className="text-blue-600 dark:text-blue-400">for</span>{" "}
                    <span className="text-gray-700 dark:text-gray-300">j in</span>{" "}
                    <span className="text-purple-600 dark:text-purple-400">range</span>
                    <span className="text-gray-700 dark:text-gray-300">(i + 1, len(nums)):</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 pl-12">
                    <span className="text-blue-600 dark:text-blue-400">if</span>{" "}
                    <span className="text-gray-700 dark:text-gray-300">nums[i] + nums[j] == target:</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 pl-16">
                    <span className="text-blue-600 dark:text-blue-400">return</span>{" "}
                    <span className="text-gray-700 dark:text-gray-300">[i, j]</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">✓ All tests passed</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Runtime: 52ms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-500 text-white p-3 rounded-lg shadow-lg">
              <Code className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Code Forge?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to excel in your coding journey, all in one platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-blue-100 dark:border-blue-900 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Diverse Challenges</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  From easy warm-ups to complex algorithms, practice with 1,200+ carefully curated problems across all
                  difficulty levels.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-100 dark:border-blue-900 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Progress Tracking</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Monitor your improvement with detailed analytics, streak counters, and personalized learning paths.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-100 dark:border-blue-900 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Active Community</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Connect with fellow developers, share solutions, and learn from the best in our vibrant community.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-100 dark:border-blue-900 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Real-time Feedback</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Get instant feedback on your solutions with our advanced testing system and optimization suggestions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-100 dark:border-blue-900 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Learning Resources</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Access comprehensive tutorials, algorithm explanations, and interview preparation materials.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-100 dark:border-blue-900 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Achievements & Badges</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Earn badges and unlock achievements as you progress through challenges and reach new milestones.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Developers Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our community has to say about their Code Forge experience
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-4xl font-bold text-gray-900 dark:text-white">50K+</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Active Developers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-4xl font-bold text-gray-900 dark:text-white">2M+</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Problems Solved</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-4xl font-bold text-gray-900 dark:text-white">24/7</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Platform Uptime</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-4xl font-bold text-gray-900 dark:text-white">4.9</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Average Rating</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-blue-100 dark:border-blue-900">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "Code Forge helped me land my dream job at Google. The interview prep section is incredible!"
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                      SJ
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Sarah Johnson</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Software Engineer at Google</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-100 dark:border-blue-900">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The progress tracking feature keeps me motivated. I've solved over 500 problems in 6 months!"
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                      MC
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Mike Chen</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Full Stack Developer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-100 dark:border-blue-900">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "Best coding platform I've used. The community discussions really help me understand different
                  approaches."
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                      EP
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Emily Parker</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">CS Student at MIT</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}

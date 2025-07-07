import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code, Home, Search } from "lucide-react"
import { ModeToggle } from "@/components/ui/dark-mode-toggle"
import { Header } from "@/components/components/header"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900">
      {/* Header */}
      <Header/>

      {/* 404 Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Error Code with Design */}
          <div className="relative">
            <div className="text-8xl lg:text-9xl font-bold text-blue-100 dark:text-blue-900/30 select-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl">🔍</div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Oops! Page Not Found</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Looks like this page got lost in the code! 🤖
              <br />
              Don't worry, even the best algorithms sometimes take a wrong turn.
            </p>
          </div>

          {/* Code Block Illustration */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
            <div className="space-y-3 font-mono text-sm text-left">
              <div className="flex items-center space-x-2 pb-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-500 dark:text-gray-400 ml-2">error.js</span>
              </div>

              <div className="space-y-1">
                <div className="text-gray-500 dark:text-gray-400">
                  <span className="text-blue-600 dark:text-blue-400">if</span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">(page.exists()) {"{"}</span>
                </div>
                <div className="text-gray-500 dark:text-gray-400 pl-4">
                  <span className="text-green-600 dark:text-green-400">// Show content</span>
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  <span className="text-gray-700 dark:text-gray-300">{"}"}</span>{" "}
                  <span className="text-blue-600 dark:text-blue-400">else</span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">{"{"}</span>
                </div>
                <div className="text-gray-500 dark:text-gray-400 pl-4">
                  <span className="text-purple-600 dark:text-purple-400">return</span>{" "}
                  <span className="text-red-600 dark:text-red-400">"404 - Not Found"</span>
                  <span className="text-gray-700 dark:text-gray-300">;</span>
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  <span className="text-gray-700 dark:text-gray-300">{"}"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950 px-8 py-3 bg-transparent"
            >
              <Link href="/">
                <Search className="w-5 h-5 mr-2" />
                Search Problems
              </Link>
            </Button>
          </div>

        </div>
      </main>
    </div>
  )
}

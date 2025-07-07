"use client"
import Link from "next/link"
import logo from "@/public/code-forge-logo.png"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "../ui/dark-mode-toggle"
import Image from "next/image"
import { Separator } from "../ui/separator"
import { UserButton, useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

export function Header() {
  const route = usePathname()
  const { isSignedIn, user, isLoaded } = useUser()
  console.log(route)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2 ">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 dark:bg-transparent">
              <span className="text-lg font-bold text-white flex items-center justify-center p-1">
                <Image
                  alt="logo"
                  src={logo}
                />
              </span>
            </div>
          </Link>
          <Separator orientation="vertical"/>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/problems" className="hover:text-blue-600 transition-colors">
              Problems
            </Link>
            <Link href="/contests" className="hover:text-blue-600 transition-colors">
              Contests
            </Link>
            <Link href="/discuss" className="hover:text-blue-600 transition-colors">
              Discuss
            </Link>
            <Link href="/leaderboard" className="hover:text-blue-600 transition-colors">
              Leaderboard
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <ModeToggle/>
          {isSignedIn ? <UserButton/> : (
            <Link href="/auth/sign-in">
              <Button variant="outline" className="hidden md:inline-flex cursor-pointer">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

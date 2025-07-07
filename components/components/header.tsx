"use client"

import { useState } from "react"
import Link from "next/link"
import logo from "@/public/code-forge-logo.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, Bell, Settings, User, LogOut, Trophy, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { ModeToggle } from "../ui/dark-mode-toggle"
import Image from "next/image"
import { Separator } from "../ui/separator"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const { theme, setTheme } = useTheme()

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
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10"
            />
          </div>
          <ModeToggle/>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                  <div className="flex items-center space-x-2 pt-1">
                    <Badge variant="secondary" className="text-xs">
                      Level 5
                    </Badge>
                    <span className="text-xs text-muted-foreground">1,250 XP</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/submissions">
                  <Trophy className="mr-2 h-4 w-4" />
                  <span>Submissions</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                <span>Toggle theme</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

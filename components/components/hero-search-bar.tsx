"use client"

import { useState } from "react"
import { Search, Hash, BookOpen, Code2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const suggestions = [
  { icon: Hash, label: "Two Sum", category: "Array" },
  { icon: Code2, label: "Binary Search", category: "Algorithm" },
  { icon: BookOpen, label: "Dynamic Programming", category: "Topic" },
  { icon: Hash, label: "Linked List Cycle", category: "Linked List" },
  { icon: Code2, label: "Merge Sort", category: "Sorting" },
  { icon: BookOpen, label: "Graph Traversal", category: "Graph" },
]

export function SearchBar() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search problems, topics, or algorithms..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setOpen(true)}
              className="pl-10 pr-4 py-3 text-lg border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search problems..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Popular Searches">
                {suggestions.map((suggestion, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      setValue(suggestion.label)
                      setOpen(false)
                    }}
                  >
                    <suggestion.icon className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>{suggestion.label}</span>
                    <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">{suggestion.category}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

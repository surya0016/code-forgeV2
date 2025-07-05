"use client"

import { useState } from "react"

interface CodeEditorProps {
  language: string
}

export function CodeEditor({ language }: CodeEditorProps) {
  const [code, setCode] = useState(getDefaultCode(language))

  function getDefaultCode(lang: string) {
    switch (lang) {
      case "python":
        return `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your solution here
        pass`
      case "javascript":
        return `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
};`
      case "java":
        return `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[0];
    }
}`
      case "cpp":
        return `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};`
      case "go":
        return `func twoSum(nums []int, target int) []int {
    // Write your solution here
    return []int{}
}`
      default:
        return "// Write your solution here"
    }
  }

  return (
    <div className="h-full bg-gray-900 text-gray-100">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-full p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none border-none outline-none"
        style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
        spellCheck={false}
      />
    </div>
  )
}

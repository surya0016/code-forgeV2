import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
 

export const problems = [
  {
    title: "Two Sum",
    slug: "two-sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.`,
    difficulty: "Easy",
    acceptanceRate: 49.2,
    starterCode: "def twoSum(nums, target):\n    pass",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists.",
    ],
    testCases: [
      { input: "2 7 11 15\n9", output: "0 1", isHidden: false },
      { input: "3 2 4\n6", output: "1 2", isHidden: true },
    ],
    tags: ["Array", "Hash Table"],
  },
  {
    title: "Add Two Numbers",
    slug: "add-two-numbers",
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.`,
    difficulty: "Medium",
    acceptanceRate: 41.5,
    starterCode: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\ndef addTwoNumbers(l1, l2):\n    pass",
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807.",
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]",
        explanation: "",
      },
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 ≤ Node.val ≤ 9",
      "It is guaranteed that the list represents a number that does not have leading zeros, except for the number 0 itself.",
    ],
    testCases: [
      { input: "2 4 3\n5 6 4", output: "7 0 8", isHidden: false },
      { input: "0\n0", output: "0", isHidden: false },
    ],
    tags: ["Linked List", "Math", "Recursion"],
  },
  {
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    difficulty: "Medium",
    acceptanceRate: 33.1,
    starterCode: "def lengthOfLongestSubstring(s):\n    pass",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.',
      },
    ],
    constraints: [
      "0 ≤ s.length ≤ 5 * 10⁴",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    testCases: [
      { input: "abcabcbb", output: "3", isHidden: false },
      { input: "bbbbb", output: "1", isHidden: false },
    ],
    tags: ["Hash Table", "String", "Sliding Window"],
  },
  {
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.`,
    difficulty: "Hard",
    acceptanceRate: 35.8,
    starterCode: "def findMedianSortedArrays(nums1, nums2):\n    pass",
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2.",
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.",
      },
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 ≤ m ≤ 1000",
      "0 ≤ n ≤ 1000",
      "1 ≤ m + n ≤ 2000",
      "-10⁶ ≤ nums1[i], nums2[i] ≤ 10⁶",
    ],
    testCases: [
      { input: "1 3\n2", output: "2.00000", isHidden: false },
      { input: "1 2\n3 4", output: "2.50000", isHidden: false },
    ],
    tags: ["Array", "Binary Search", "Divide and Conquer"],
  },
  {
    title: "Longest Palindromic Substring",
    slug: "longest-palindromic-substring",
    description: `Given a string s, return the longest palindromic substring in s.`,
    difficulty: "Medium",
    acceptanceRate: 31.0,
    starterCode: "def longestPalindrome(s):\n    pass",
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
        explanation: "",
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 1000",
      "s consist of only digits and English letters.",
    ],
    testCases: [
      { input: "babad", output: "bab", isHidden: false },
      { input: "cbbd", output: "bb", isHidden: false },
    ],
    tags: ["String", "Dynamic Programming"],
  },
  {
    title: "Reverse Integer",
    slug: "reverse-integer",
    description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2³¹, 2³¹ - 1], then return 0.`,
    difficulty: "Medium",
    acceptanceRate: 28.5,
    starterCode: "def reverse(x):\n    pass",
    examples: [
      {
        input: "x = 123",
        output: "321",
        explanation: "",
      },
      {
        input: "x = -123",
        output: "-321",
        explanation: "",
      },
    ],
    constraints: [
      "-2³¹ ≤ x ≤ 2³¹ - 1",
    ],
    testCases: [
      { input: "123", output: "321", isHidden: false },
      { input: "-123", output: "-321", isHidden: false },
      { input: "120", output: "21", isHidden: false },
      { input: "0", output: "0", isHidden: false },
      { input: "1534236469", output: "0", isHidden: true }, // Example of overflow
    ],
    tags: ["Math"],
  },
  {
    title: "Palindrome Number",
    slug: "palindrome-number",
    description: `Given an integer x, return true if x is a palindrome integer. An integer is a palindrome when it reads the same backward as forward. For example, 121 is palindrome while 123 is not.`,
    difficulty: "Easy",
    acceptanceRate: 53.6,
    starterCode: "def isPalindrome(x):\n    pass",
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation: "Reads 121 from left to right and from right to left.",
      },
      {
        input: "x = -121",
        output: "false",
        explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.",
      },
    ],
    constraints: [
      "-2³¹ ≤ x ≤ 2³¹ - 1",
    ],
    testCases: [
      { input: "121", output: "true", isHidden: false },
      { input: "-121", output: "false", isHidden: false },
      { input: "10", output: "false", isHidden: false },
      { input: "0", output: "true", isHidden: false },
    ],
    tags: ["Math"],
  },
  {
    title: "Roman to Integer",
    slug: "roman-to-integer",
    description: `Given a Roman numeral, convert it to an integer.`,
    difficulty: "Easy",
    acceptanceRate: 58.7,
    starterCode: "def romanToInt(s):\n    pass",
    examples: [
      {
        input: 's = "III"',
        output: "3",
        explanation: "III = 3.",
      },
      {
        input: 's = "LVIII"',
        output: "58",
        explanation: "L = 50, V = 5, III = 3. LVIII = 50 + 5 + 3 = 58.",
      },
      {
        input: 's = "MCMXCIV"',
        output: "1994",
        explanation: "M = 1000, CM = 900, XC = 90 and IV = 4. MCMXCIV = 1000 + 900 + 90 + 4 = 1994.",
      },
    ],
    constraints: [
      "1 <= s.length <= 15",
      "s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').",
      "It is guaranteed that s is a valid Roman numeral in the range [1, 3999].",
    ],
    testCases: [
      { input: "III", output: "3", isHidden: false },
      { input: "LVIII", output: "58", isHidden: false },
      { input: "MCMXCIV", output: "1994", isHidden: false },
    ],
    tags: ["Hash Table", "String"],
  },
  {
    title: "Longest Common Prefix",
    slug: "longest-common-prefix",
    description: `Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".`,
    difficulty: "Easy",
    acceptanceRate: 39.0,
    starterCode: "def longestCommonPrefix(strs):\n    pass",
    examples: [
      {
        input: 'strs = ["flower","flow","flight"]',
        output: '"fl"',
        explanation: "",
      },
      {
        input: 'strs = ["dog","racecar","car"]',
        output: '""',
        explanation: "There is no common prefix among the input strings.",
      },
    ],
    constraints: [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
      "strs[i] consists of only lowercase English letters.",
    ],
    testCases: [
      { input: "flower flow flight", output: "fl", isHidden: false },
      { input: "dog racecar car", output: "", isHidden: false },
      { input: "a", output: "a", isHidden: false },
      { input: "ab a", output: "a", isHidden: false },
    ],
    tags: ["String", "Trie"],
  },
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
    \nAn input string is valid if:
    \n1. Open brackets must be closed by the same type of brackets.
    \n2. Open brackets must be closed in the correct order.
    \n3. Every close bracket has a corresponding open bracket of the same type.`,
    difficulty: "Easy",
    acceptanceRate: 41.6,
    starterCode: "def isValid(s):\n    pass",
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "",
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation: "",
      },
    ],
    constraints: [
      "1 <= s.length <= 10⁴",
      "s consists of parentheses only '()[]{}'.",
    ],
    testCases: [
      { input: "()", output: "true", isHidden: false },
      { input: "()[]{}", output: "true", isHidden: false },
      { input: "(]", output: "false", isHidden: false },
      { input: "([{}])", output: "true", isHidden: false },
      { input: "{[]}", output: "true", isHidden: false },
    ],
    tags: ["String", "Stack"],
  },
];

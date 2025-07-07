# Valid Parentheses
def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    return not stack

# Longest Common Prefix
def longestCommonPrefix(strs: list[str]) -> str:
    if not strs:
        return ""
    
    prefix = strs[0]
    for i in range(1, len(strs)):
        while strs[i].find(prefix) != 0:
            prefix = prefix[:-1]
            if not prefix:
                return ""
    return prefix

# Roman to Integer
def romanToInt(s: str) -> int:
    roman_map = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    total = 0
    i = 0
    while i < len(s):
        if i + 1 < len(s) and roman_map[s[i]] < roman_map[s[i+1]]:
            total += roman_map[s[i+1]] - roman_map[s[i]]
            i += 2
        else:
            total += roman_map[s[i]]
            i += 1
    return total

# Palindrome Number
def isPalindrome(x: int) -> bool:
    if x < 0:
        return False
    original = x
    reversed_x = 0
    while x > 0:
        reversed_x = reversed_x * 10 + x % 10
        x //= 10
    return original == reversed_x

# Reverse Integer
def reverse(x: int) -> int:
    sign = -1 if x < 0 else 1
    x = abs(x)
    reversed_x = 0
    while x > 0:
        reversed_x = reversed_x * 10 + x % 10
        x //= 10
    
    result = sign * reversed_x
    if not (-2**31 <= result <= 2**31 - 1):
        return 0
    return result

# Longest Palindromic Substring
def longestPalindrome(s: str) -> str:
    if not s:
        return ""

    start = 0
    max_len = 1
    n = len(s)

    def expand_around_center(left, right):
        while left >= 0 and right < n and s[left] == s[right]:
            left -= 1
            right += 1
        return left + 1, right - 1

    for i in range(n):
        # Odd length palindromes
        l1, r1 = expand_around_center(i, i)
        len1 = r1 - l1 + 1
        if len1 > max_len:
            max_len = len1
            start = l1

        # Even length palindromes
        l2, r2 = expand_around_center(i, i + 1)
        len2 = r2 - l2 + 1
        if len2 > max_len:
            max_len = len2
            start = l2
            
    return s[start : start + max_len]

# Median of Two Sorted Arrays
def findMedianSortedArrays(nums1: list[int], nums2: list[int]) -> float:
    merged = []
    i, j = 0, 0
    while i < len(nums1) and j < len(nums2):
        if nums1[i] < nums2[j]:
            merged.append(nums1[i])
            i += 1
        else:
            merged.append(nums2[j])
            j += 1
    merged.extend(nums1[i:])
    merged.extend(nums2[j:])

    n = len(merged)
    if n % 2 == 1:
        return float(merged[n // 2])
    else:
        mid1 = merged[n // 2 - 1]
        mid2 = merged[n // 2]
        return (float(mid1) + float(mid2)) / 2.0

# Longest Substring Without Repeating Characters
def lengthOfLongestSubstring(s: str) -> int:
    char_set = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len

# Add Two Numbers (Singly-linked list node definition needed for this)
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1: ListNode, l2: ListNode) -> ListNode:
    dummy_head = ListNode(0)
    current = dummy_head
    carry = 0

    while l1 or l2 or carry:
        val1 = l1.val if l1 else 0
        val2 = l2.val if l2 else 0

        total_sum = val1 + val2 + carry
        carry = total_sum // 10
        new_digit = total_sum % 10

        current.next = ListNode(new_digit)
        current = current.next

        if l1:
            l1 = l1.next
        if l2:
            l2 = l2.next
    
    return dummy_head.next

# Two Sum (assuming the most common version: return indices)
def twoSum(nums: list[int], target: int) -> list[int]:
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []
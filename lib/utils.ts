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
    starterCode: {
      create: [
        {
          language: "PYTHON",
          code: "def twoSum(nums, target):\n    pass",
          wrapper: `
if __name__ == "__main__":
    import sys
    input_lines = sys.stdin.read().strip().split('\\n')
    nums = list(map(int, input_lines[0].split()))
    target = int(input_lines[1])
    result = twoSum(nums, target)
    print(' '.join(map(str, result)))
          `.trim()
        },
        {
          language: "JAVA",
          code: `
class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return null;
    }
}`.trim(),
          wrapper: `
import java.util.*;
import java.io.*;

class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] numsStr = br.readLine().split(" ");
        int[] nums = new int[numsStr.length];
        for (int i = 0; i < numsStr.length; i++) {
            nums[i] = Integer.parseInt(numsStr[i]);
        }
        int target = Integer.parseInt(br.readLine());
        Solution sol = new Solution();
        int[] result = sol.twoSum(nums, target);
        System.out.println(result[0] + " " + result[1]);
    }
}
`.trim()
        },
        {
          language: "JAVASCRIPT",
          code: `
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your code here
}`.trim(),
          wrapper: `
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\\n');
const nums = input[0].split(' ').map(Number);
const target = parseInt(input[1]);
const result = twoSum(nums, target);
console.log(result.join(' '));
          `.trim()
        },
        {
          language: "CPP",
          code: `
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};`.trim(),
          wrapper: `
#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    istringstream iss(line);
    vector<int> nums;
    int num;
    while (iss >> num) {
        nums.push_back(num);
    }
    int target;
    cin >> target;
    
    Solution sol;
    vector<int> result = sol.twoSum(nums, target);
    cout << result[0] << " " << result[1] << endl;
    return 0;
}
`.trim()
        },
      ],
    },
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
    starterCode: {
      create: [
        {
          language: "PYTHON",
          code: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1, l2):
    pass`.trim(),
          wrapper: `
if __name__ == "__main__":
    import sys
    input_lines = sys.stdin.read().strip().split('\\n')
    l1_vals = list(map(int, input_lines[0].split()))
    l2_vals = list(map(int, input_lines[1].split()))
    
    def create_linked_list(vals):
        if not vals:
            return None
        head = ListNode(vals[0])
        current = head
        for val in vals[1:]:
            current.next = ListNode(val)
            current = current.next
        return head
    
    def linked_list_to_array(head):
        result = []
        current = head
        while current:
            result.append(current.val)
            current = current.next
        return result
    
    l1 = create_linked_list(l1_vals)
    l2 = create_linked_list(l2_vals)
    result = addTwoNumbers(l1, l2)
    output = linked_list_to_array(result)
    print(' '.join(map(str, output)))
          `.trim()
        },
        {
          language: "JAVA",
          code: `
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Your code here
        return null;
    }
}`.trim(),
          wrapper: `
import java.util.*;
import java.io.*;

class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] l1Str = br.readLine().split(" ");
        String[] l2Str = br.readLine().split(" ");
        
        ListNode l1 = createLinkedList(l1Str);
        ListNode l2 = createLinkedList(l2Str);
        
        Solution sol = new Solution();
        ListNode result = sol.addTwoNumbers(l1, l2);
        printLinkedList(result);
    }
    
    static ListNode createLinkedList(String[] vals) {
        if (vals.length == 0) return null;
        ListNode head = new ListNode(Integer.parseInt(vals[0]));
        ListNode current = head;
        for (int i = 1; i < vals.length; i++) {
            current.next = new ListNode(Integer.parseInt(vals[i]));
            current = current.next;
        }
        return head;
    }
    
    static void printLinkedList(ListNode head) {
        List<String> result = new ArrayList<>();
        ListNode current = head;
        while (current != null) {
            result.add(String.valueOf(current.val));
            current = current.next;
        }
        System.out.println(String.join(" ", result));
    }
}
`.trim()
        },
        {
          language: "JAVASCRIPT",
          code: `
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    // Your code here
}`.trim(),
          wrapper: `
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\\n');
const l1Vals = input[0].split(' ').map(Number);
const l2Vals = input[1].split(' ').map(Number);

function createLinkedList(vals) {
    if (vals.length === 0) return null;
    const head = new ListNode(vals[0]);
    let current = head;
    for (let i = 1; i < vals.length; i++) {
        current.next = new ListNode(vals[i]);
        current = current.next;
    }
    return head;
}

function linkedListToArray(head) {
    const result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

const l1 = createLinkedList(l1Vals);
const l2 = createLinkedList(l2Vals);
const result = addTwoNumbers(l1, l2);
const output = linkedListToArray(result);
console.log(output.join(' '));
          `.trim()
        },
        {
          language: "CPP",
          code: `
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // Your code here
        return nullptr;
    }
};`.trim(),
          wrapper: `
#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

ListNode* createLinkedList(vector<int>& vals) {
    if (vals.empty()) return nullptr;
    ListNode* head = new ListNode(vals[0]);
    ListNode* current = head;
    for (int i = 1; i < vals.size(); i++) {
        current->next = new ListNode(vals[i]);
        current = current->next;
    }
    return head;
}

void printLinkedList(ListNode* head) {
    vector<int> result;
    ListNode* current = head;
    while (current) {
        result.push_back(current->val);
        current = current->next;
    }
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << " ";
        cout << result[i];
    }
    cout << endl;
}

int main() {
    string line;
    getline(cin, line);
    istringstream iss1(line);
    vector<int> l1Vals;
    int num;
    while (iss1 >> num) {
        l1Vals.push_back(num);
    }
    
    getline(cin, line);
    istringstream iss2(line);
    vector<int> l2Vals;
    while (iss2 >> num) {
        l2Vals.push_back(num);
    }
    
    ListNode* l1 = createLinkedList(l1Vals);
    ListNode* l2 = createLinkedList(l2Vals);
    
    Solution sol;
    ListNode* result = sol.addTwoNumbers(l1, l2);
    printLinkedList(result);
    return 0;
}
`.trim()
        },
      ],
    },
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
    starterCode: {
      create: [
        {
          language: "PYTHON",
          code: "def lengthOfLongestSubstring(s):\n    pass",
          wrapper: `
if __name__ == "__main__":
    import sys
    s = sys.stdin.read().strip()
    result = lengthOfLongestSubstring(s)
    print(result)
          `.trim()
        },
        {
          language: "JAVA",
          code: `
class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Your code here
        return 0;
    }
}`.trim(),
          wrapper: `
import java.util.*;
import java.io.*;

class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        Solution sol = new Solution();
        int result = sol.lengthOfLongestSubstring(s);
        System.out.println(result);
    }
}
`.trim()
        },
        {
          language: "JAVASCRIPT",
          code: `
/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    // Your code here
}`.trim(),
          wrapper: `
const fs = require('fs');
const s = fs.readFileSync(0, 'utf8').trim();
const result = lengthOfLongestSubstring(s);
console.log(result);
          `.trim()
        },
        {
          language: "CPP",
          code: `
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Your code here
        return 0;
    }
};`.trim(),
          wrapper: `
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    Solution sol;
    int result = sol.lengthOfLongestSubstring(s);
    cout << result << endl;
    return 0;
}
`.trim()
        },
      ],
    },
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
    starterCode: {
      create: [
        {
          language: "PYTHON",
          code: "def findMedianSortedArrays(nums1, nums2):\n    pass",
          wrapper: `
if __name__ == "__main__":
    import sys
    input_lines = sys.stdin.read().strip().split('\\n')
    nums1 = list(map(int, input_lines[0].split()))
    nums2 = list(map(int, input_lines[1].split()))
    result = findMedianSortedArrays(nums1, nums2)
    print(f"{result:.5f}")
          `.trim()
        },
        {
          language: "JAVA",
          code: `
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Your code here
        return 0.0;
    }
}`.trim(),
          wrapper: `
import java.util.*;
import java.io.*;

class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] nums1Str = br.readLine().split(" ");
        String[] nums2Str = br.readLine().split(" ");
        
        int[] nums1 = new int[nums1Str.length];
        for (int i = 0; i < nums1Str.length; i++) {
            nums1[i] = Integer.parseInt(nums1Str[i]);
        }
        
        int[] nums2 = new int[nums2Str.length];
        for (int i = 0; i < nums2Str.length; i++) {
            nums2[i] = Integer.parseInt(nums2Str[i]);
        }
        
        Solution sol = new Solution();
        double result = sol.findMedianSortedArrays(nums1, nums2);
        System.out.printf("%.5f%n", result);
    }
}
`.trim()
        },
        {
          language: "JAVASCRIPT",
          code: `
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
    // Your code here
}`.trim(),
          wrapper: `
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\\n');
const nums1 = input[0].split(' ').map(Number);
const nums2 = input[1].split(' ').map(Number);
const result = findMedianSortedArrays(nums1, nums2);
console.log(result.toFixed(5));
          `.trim()
        },
        {
          language: "CPP",
          code: `
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Your code here
        return 0.0;
    }
};`.trim(),
          wrapper: `
#include <iostream>
#include <vector>
#include <sstream>
#include <iomanip>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    istringstream iss1(line);
    vector<int> nums1;
    int num;
    while (iss1 >> num) {
        nums1.push_back(num);
    }
    
    getline(cin, line);
    istringstream iss2(line);
    vector<int> nums2;
    while (iss2 >> num) {
        nums2.push_back(num);
    }
    
    Solution sol;
    double result = sol.findMedianSortedArrays(nums1, nums2);
    cout << fixed << setprecision(5) << result << endl;
    return 0;
}
`.trim()
        },
      ],
    },
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
    starterCode: {
      create: [
        {
          language: "PYTHON",
          code: "def longestPalindrome(s):\n    pass",
          wrapper: `
if __name__ == "__main__":
    import sys
    s = sys.stdin.read().strip()
    result = longestPalindrome(s)
    print(result)
          `.trim()
        },
        {
          language: "JAVA",
          code: `
class Solution {
    public String longestPalindrome(String s) {
        // Your code here
        return "";
    }
}`.trim(),
          wrapper: `
import java.util.*;
import java.io.*;

class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        Solution sol = new Solution();
        String result = sol.longestPalindrome(s);
        System.out.println(result);
    }
}
`.trim()
        },
        {
          language: "JAVASCRIPT",
          code: `
/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
    // Your code here
}`.trim(),
          wrapper: `
const fs = require('fs');
const s = fs.readFileSync(0, 'utf8').trim();
const result = longestPalindrome(s);
console.log(result);
          `.trim()
        },
        {
          language: "CPP",
          code: `
class Solution {
public:
    string longestPalindrome(string s) {
        // Your code here
        return "";
    }
};`.trim(),
          wrapper: `
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    Solution sol;
    string result = sol.longestPalindrome(s);
    cout << result << endl;
    return 0;
}
`.trim()
        },
      ],
    },
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
    starterCode: {
      create: [
        {
          language: "PYTHON",
          code: "def reverse(x):\n    pass",
          wrapper: `
if __name__ == "__main__":
    import sys
    x = int(sys.stdin.read().strip())
    result = reverse(x)
    print(result)
          `.trim()
        },
        {
          language: "JAVA",
          code: `
class Solution {
    public int reverse(int x) {
        // Your code here
        return 0;
    }
}`.trim(),
          wrapper: `
import java.util.*;
import java.io.*;

class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int x = Integer.parseInt(br.readLine());
        Solution sol = new Solution();
        int result = sol.reverse(x);
        System.out.println(result);
    }
}
`.trim()
        },
        {
          language: "JAVASCRIPT",
          code: `
/**
 * @param {number} x
 * @return {number}
 */
function reverse(x) {
    // Your code here
}`.trim(),
          wrapper: `
const fs = require('fs');
const x = parseInt(fs.readFileSync(0, 'utf8').trim());
const result = reverse(x);
console.log(result);
          `.trim()
        },
        {
          language: "CPP",
          code: `
class Solution {
public:
    int reverse(int x) {
        // Your code here
        return 0;
    }
};`.trim(),
          wrapper: `
#include <iostream>
using namespace std;

int main() {
    int x;
    cin >> x;
    Solution sol;
    int result = sol.reverse(x);
    cout << result << endl;
    return 0;
}
`.trim()
        },
      ],
    },
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
      { input: "1534236469", output: "0", isHidden: true },
    ],
    tags: ["Math"],
  },
  {
    title: "Palindrome Number",
    slug: "palindrome-number",
    description: `Given an integer x, return true if x is a palindrome integer. An integer is a palindrome when it reads the same backward as forward. For example, 121 is palindrome while 123 is not.`,
    difficulty: "Easy",
    acceptanceRate: 53.6,
    starterCode: {
      create: [
        {
          language: "PYTHON",
          code: "def isPalindrome(x):\n    pass",
          wrapper: `
if __name__ == "__main__":
    import sys
    x = int(sys.stdin.read().strip())
    result = isPalindrome(x)
    print(str(result).lower())
          `.trim()
        },
        {
          language: "JAVA",
          code: `
class Solution {
    public boolean isPalindrome(int x) {
        // Your code here
        return false;
    }
}`.trim(),
          wrapper: `
import java.util.*;
import java.io.*;

class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int x = Integer.parseInt(br.readLine());
        Solution sol = new Solution();
        boolean result = sol.isPalindrome(x);
        System.out.println(result);
    }
}
`.trim()
        },
        {
          language: "JAVASCRIPT",
          code: `
/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
    // Your code here
}`.trim(),
          wrapper: `
const fs = require('fs');
const x = parseInt(fs.readFileSync(0, 'utf8').trim());
const result = isPalindrome(x);
console.log(result);
          `.trim()
        },
        {
          language: "CPP",
          code: `
class Solution {
public:
    bool isPalindrome(int x) {
        // Your code here
        return false;
    }
};`.trim(),
          wrapper: `
#include <iostream>
using namespace std;

int main() {
    int x;
    cin >> x;
    Solution sol;
    bool result = sol.isPalindrome(x);
    cout << (result ? "true" : "false") << endl;
    return 0;
}
`.trim()
        },
      ],
    },
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
    starterCode: {
      create: [
        {
          language: "PYTHON",
          code: "def romanToInt(s):\n    pass",
          wrapper: `
if __name__ == "__main__":
    import sys
    s = sys.stdin.read().strip()
    result = romanToInt(s)
    print(result)
          `.trim()
        },
        {
          language: "JAVA",
          code: `
class Solution {
    public int romanToInt(String s) {
        // Your code here
        return 0;
    }
}`.trim(),
          wrapper: `
import java.util.*;
import java.io.*;

class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        Solution sol = new Solution();
        int result = sol.romanToInt(s);
        System.out.println(result);
    }
}
`.trim()
        },
        {
          language: "JAVASCRIPT",
          code: `
/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
    // Your code here
}`.trim(),
          wrapper: `
const fs = require('fs');
const s = fs.readFileSync(0, 'utf8').trim();
const result = romanToInt(s);
console.log(result);
          `.trim()
        },
        {
          language: "CPP",
          code: `
class Solution {
public:
    int romanToInt(string s) {
        // Your code here
        return 0;
    }
};`.trim(),
          wrapper: `
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    Solution sol;
    int result = sol.romanToInt(s);
    cout << result << endl;
    return 0;
}
`.trim()
        },
      ],
    },
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
    starterCode: {
      create: [
        {
          language: "PYTHON",
          code: "def longestCommonPrefix(strs):\n    pass",
          wrapper: `
if __name__ == "__main__":
    import sys
    strs = sys.stdin.read().strip().split()
    result = longestCommonPrefix(strs)
    print(result)
          `.trim()
        },
        {
          language: "JAVA",
          code: `
class Solution {
    public String longestCommonPrefix(String[] strs) {
        // Your code here
        return "";
    }
}`.trim(),
          wrapper: `
import java.util.*;
import java.io.*;

class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] strs = br.readLine().split(" ");
        Solution sol = new Solution();
        String result = sol.longestCommonPrefix(strs);
        System.out.println(result);
    }
}
`.trim()
        },
        {
          language: "JAVASCRIPT",
          code: `
/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
    // Your code here
}`.trim(),
          wrapper: `
const fs = require('fs');
const strs = fs.readFileSync(0, 'utf8').trim().split(' ');
const result = longestCommonPrefix(strs);
console.log(result);
          `.trim()
        },
        {
          language: "CPP",
          code: `
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        // Your code here
        return "";
    }
};`.trim(),
          wrapper: `
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    istringstream iss(line);
    vector<string> strs;
    string str;
    while (iss >> str) {
        strs.push_back(str);
    }
    
    Solution sol;
    string result = sol.longestCommonPrefix(strs);
    cout << result << endl;
    return 0;
}
`.trim()
        },
      ],
    },
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
    starterCode: {
      create: [
        {
          language: "PYTHON",
          code: "def isValid(s):\n    pass",
          wrapper: `
if __name__ == "__main__":
    import sys
    s = sys.stdin.read().strip()
    result = isValid(s)
    print(str(result).lower())
          `.trim()
        },
        {
          language: "JAVA",
          code: `
class Solution {
    public boolean isValid(String s) {
        // Your code here
        return false;
    }
}`.trim(),
          wrapper: `
import java.util.*;
import java.io.*;

class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        Solution sol = new Solution();
        boolean result = sol.isValid(s);
        System.out.println(result);
    }
}
`.trim()
        },
        {
          language: "JAVASCRIPT",
          code: `
/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Your code here
}`.trim(),
          wrapper: `
const fs = require('fs');
const s = fs.readFileSync(0, 'utf8').trim();
const result = isValid(s);
console.log(result);
          `.trim()
        },
        {
          language: "CPP",
          code: `
class Solution {
public:
    bool isValid(string s) {
        // Your code here
        return false;
    }
};`.trim(),
          wrapper: `
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    Solution sol;
    bool result = sol.isValid(s);
    cout << (result ? "true" : "false") << endl;
    return 0;
}
`.trim()
        },
      ],
    },
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
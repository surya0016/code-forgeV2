"use server";

import prisma from "@/lib/prisma";
import { Problem, ProblemSummary } from "@/lib/types";
import { Language } from "@prisma/client"; // Import the Language enum

// Define a recursive type for serializable objects
type SerializableValue = 
  | string 
  | number 
  | boolean 
  | null 
  | undefined 
  | Date
  | { [key: string]: SerializableValue }
  | SerializableValue[];

// Create a reusable serializeDates function
const serializeDates = (obj: SerializableValue): SerializableValue => {
  if (!obj || typeof obj !== "object") return obj;
  
  if (obj instanceof Date) {
    return obj.toISOString();
  }
  
  if (Array.isArray(obj)) {
    return obj.map(serializeDates);
  }
  
  const newObj: { [key: string]: SerializableValue } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value instanceof Date) {
        newObj[key] = value.toISOString();
      } else if (typeof value === "object") {
        newObj[key] = serializeDates(value);
      } else {
        newObj[key] = value;
      }
    }
  }
  
  return newObj;
};

const getProblems = async (): Promise<Problem[]> => {
  try {
    const problems = await prisma.problem.findMany({
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        constraints: true,
        examples: true,
        testCases: true,
        starterCodes: true,
        submissions: true,
        discussions: true,
        solutions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    
    return problems.map(problem => serializeDates(problem) as unknown as Problem);
    
  } catch (error) {
    console.error("Error fetching problems:", error);
    throw new Error("Failed to fetch problems");
  }
}

// Get a single problem by ID
const getProblemById = async (id: number): Promise<Problem | null> => {
  try {
    const problem = await prisma.problem.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        constraints: true,
        examples: true,
        testCases: true,
        starterCodes: true,
        submissions: true,
        discussions: true,
        solutions: true,
      },
    });
    
    if (!problem) return null;
    return serializeDates(problem) as unknown as Problem;
    
  } catch (error) {
    console.error("Error fetching problem:", error);
    throw new Error("Failed to fetch problem");
  }
}

// Get a single problem by slug
const getProblemBySlug = async (slug: string): Promise<Problem | null> => {
  try {
    const problem = await prisma.problem.findUnique({
      where: { slug },
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        constraints: true,
        examples: true,
        testCases: true,
        starterCodes: true,
        submissions: true,
        discussions: true,
        solutions: true,
      },
    });
    
    if (!problem) return null;
    return serializeDates(problem) as unknown as Problem;
    
  } catch (error) {
    console.error("Error fetching problem by slug:", error);
    throw new Error("Failed to fetch problem");
  }
}

// Get problems with minimal data for listing
const getProblemsSummary = async (): Promise<ProblemSummary[]> => {
  try {
    const problems = await prisma.problem.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        difficulty: true,
        acceptanceRate: true,
        tags: {
          include: {
            tag: true
          }
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    // Map tags to ensure tag.description is always a string
    return problems.map((problem) => ({
      ...problem,
      isSolved: false, // Default value; replace with actual logic if available
      tags: problem.tags.map((tagObj) => ({
        ...tagObj,
        tag: {
          ...tagObj.tag,
          description: tagObj.tag.description ?? "",
        },
      })),
    }));
    
  } catch (error) {
    console.error("Error fetching problems summary:", error);
    throw new Error("Failed to fetch problems summary");
  }
}

// Get starter code for a specific problem and language
const getStarterCode = async (problemId: number, language: string): Promise<{ code: string; wrapper: string } | null> => {
  try {
    const starterCode = await prisma.starterCode.findUnique({
      where: {
        problemId_language: {
          problemId,
          language: language as Language, // Cast to Language enum
        },
      },
      select: {
        code: true,
        wrapper: true,
      },
    });

    return starterCode;
  } catch (error) {
    console.error("Error fetching starter code:", error);
    throw new Error("Failed to fetch starter code");
  }
}

// Get starter code by problem slug and language
const getStarterCodeBySlug = async (slug: string, language: string): Promise<{ code: string; wrapper: string } | null> => {
  try {
    const problem = await prisma.problem.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!problem) return null;

    const starterCode = await prisma.starterCode.findUnique({
      where: {
        problemId_language: {
          problemId: problem.id,
          language: language as Language, // Cast to Language enum
        },
      },
      select: {
        code: true,
        wrapper: true,
      },
    });

    return starterCode;
  } catch (error) {
    console.error("Error fetching starter code by slug:", error);
    throw new Error("Failed to fetch starter code");
  }
}

// Get all starter codes for a problem
const getAllStarterCodes = async (problemId: number) => {
  try {
    const starterCodes = await prisma.starterCode.findMany({
      where: { problemId },
      select: {
        language: true,
        code: true,
        wrapper: true,
      },
    });

    return starterCodes;
  } catch (error) {
    console.error("Error fetching all starter codes:", error);
    throw new Error("Failed to fetch starter codes");
  }
}

export { 
  getProblems, 
  getProblemById, 
  getProblemBySlug,
  getProblemsSummary,
  getStarterCode,
  getStarterCodeBySlug,
  getAllStarterCodes
};
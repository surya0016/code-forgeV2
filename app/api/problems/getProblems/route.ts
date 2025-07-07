import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper function to serialize dates to ISO strings
const serializeDates = (obj: any): any => {
  if (!obj || typeof obj !== "object") return obj;
  
  if (obj instanceof Date) {
    return obj.toISOString();
  }
  
  if (Array.isArray(obj)) {
    return obj.map(serializeDates);
  }
  
  const newObj: { [key: string]: any } = {};
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

export async function GET() {
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
    
    // Serialize dates before returning JSON response
    const serializedProblems = serializeDates(problems);
    
    return NextResponse.json({
      problems: serializedProblems
    });
  } catch (error) {
    console.log("[GET PROBLEMS API] :", error);
    return new NextResponse("Error while fetching problems", { status: 500 });
  }
}
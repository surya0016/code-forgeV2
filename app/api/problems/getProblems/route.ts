import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
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

    return NextResponse.json({
      problems
    })
  } catch (error) {
    console.log("[GET PROBLEMS API] :",error )
    return new NextResponse("Error while fetching problems", {status:500})
  }

}
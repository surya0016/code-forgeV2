import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    console.log("[SUBMIT CODE] User ID:", userId);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { code, language, problemId, executionResult } = body;

    if (!code || !language || !problemId || !executionResult) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Get the problem (just to verify it exists)
    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
    });

    if (!problem) {
      return new NextResponse("Problem not found", { status: 404 });
    }

    // Use the provided execution results instead of running the code again
    const allTestsPassed = executionResult.summary.passedTests === executionResult.summary.totalTests;
    const status = allTestsPassed ? "Accepted" : "WrongAnswer"; // This is correct!
    
    // Calculate average runtime and memory
    const avgRuntime = executionResult.summary.averageRuntime || 0;
    const maxMemory = executionResult.summary.maxMemory || 0;

    // Create submission record
    const submission = await prisma.submission.create({
      data: {
        userId,
        problemId,
        code,
        language,
        status,
        runtime: Math.round(avgRuntime),
        memory: Math.round(maxMemory),
      },
    });

    // Update user stats
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalSubmissions: { increment: 1 },
        ...(allTestsPassed && { solvedProblems: { increment: 1 } }),
      },
    });

    // Update or create UserProblem record
    await prisma.userProblem.upsert({
      where: {
        userId_problemId: {
          userId,
          problemId,
        },
      },
      update: {
        attempts: { increment: 1 },
        lastAttempt: new Date(),
        ...(allTestsPassed && {
          isSolved: true,
          solvedAt: new Date(),
        }),
      },
      create: {
        userId,
        problemId,
        attempts: 1,
        lastAttempt: new Date(),
        isSolved: allTestsPassed,
        ...(allTestsPassed && { solvedAt: new Date() }),
      },
    });

    // Update problem acceptance rate with correct enum value
    // const acceptedSubmissions = await prisma.submission.count({
    //   where: { 
    //     problemId,
    //     status: "Accepted", // Match the exact enum value
    //   },
    // });

    // Rest of your code...

    return NextResponse.json({
      submission: {
        id: submission.id,
        status: submission.status,
        runtime: submission.runtime,
        memory: submission.memory,
        createdAt: submission.createdAt,
      },
      results: executionResult.results,
      summary: executionResult.summary,
      allTestsPassed,
    });

  } catch (error) {
    console.error("[SUBMIT CODE ERROR]:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
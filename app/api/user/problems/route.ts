import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    
    const userProblems = await prisma.userProblem.findMany({
      where: { userId }
    })
    
    return NextResponse.json(userProblems)
  } catch (error) {
    console.error("Error fetching user problems:", error)
    return new NextResponse("Error fetching user problems", { status: 500 })
  }
}
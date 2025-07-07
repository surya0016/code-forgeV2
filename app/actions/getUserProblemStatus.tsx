"use server"

import prisma from "@/lib/prisma"

export async function getUserProblemStatus(userId: string, problemId: number) {
  try {
    const userProblem = await prisma.userProblem.findUnique({
      where: {
        userId_problemId: {
          userId,
          problemId
        }
      }
    })
    
    return userProblem
  } catch (error) {
    console.error("Error fetching user problem status:", error)
    return null
  }
}
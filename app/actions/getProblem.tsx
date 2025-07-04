"use server";

import prisma from "@/lib/prisma";

const getProblems = async() => {
  try {
    const problems = await prisma.problem.findMany({
      include: {
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    return problems.map(problem => ({ 
      id: problem.id,
      title: problem.title,
      acceptance: problem.acceptanceRate,
      difficulty: problem.difficulty,
      tags: problem.tags.map(tag => tag.tagId),
      status: "active", // Assuming all problems are active
    }));
  } catch (error) {
    
  }
}
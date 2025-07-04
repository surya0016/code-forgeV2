import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
  try {
    const problems = await prisma.problem.findMany({
      include:{
        tags: {
          include:{
            tag: true
          }
        }
      }
    }) 

    return NextResponse.json({
      problems
    })
  } catch (error) {
    console.log("[GET PROBLEMS API] :",error )
    return new NextResponse("Error while fetching problems", {status:500})
  }

}
import { Submission } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(req: Request){
  try {
    const body = await req.json()
    const {id,
          code,
          status,
          memory,
          runtime,
          createdAt,
          problemId,
          language,} = body as Submission
          
  } catch (error) {
    
  }
}
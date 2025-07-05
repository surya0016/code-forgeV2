/*
  Warnings:

  - You are about to drop the column `starterCode` on the `Problem` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('PYTHON', 'JAVA', 'JAVASCRIPT', 'CPP');

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "starterCode";

-- CreateTable
CREATE TABLE "StarterCode" (
    "id" SERIAL NOT NULL,
    "language" "Language" NOT NULL,
    "code" TEXT NOT NULL DEFAULT '//Start your code here',
    "problemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StarterCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StarterCode_problemId_language_key" ON "StarterCode"("problemId", "language");

-- AddForeignKey
ALTER TABLE "StarterCode" ADD CONSTRAINT "StarterCode_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The values [InProgress] on the enum `SubmissionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `createdAt` on the `Constraint` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ProblemTag` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Solution` table. All the data in the column will be lost.
  - The `language` column on the `Solution` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `wrapper` on the `StarterCode` table. All the data in the column will be lost.
  - You are about to drop the column `testResults` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TestCase` table. All the data in the column will be lost.
  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `language` on the `Submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SubmissionStatus_new" AS ENUM ('Accepted', 'WrongAnswer', 'TimeLimitExceeded', 'RuntimeError', 'CompileError');
ALTER TABLE "Submission" ALTER COLUMN "status" TYPE "SubmissionStatus_new" USING ("status"::text::"SubmissionStatus_new");
ALTER TYPE "SubmissionStatus" RENAME TO "SubmissionStatus_old";
ALTER TYPE "SubmissionStatus_new" RENAME TO "SubmissionStatus";
DROP TYPE "SubmissionStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Constraint" DROP CONSTRAINT "Constraint_problemId_fkey";

-- DropForeignKey
ALTER TABLE "Discussion" DROP CONSTRAINT "Discussion_problemId_fkey";

-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_problemId_fkey";

-- DropForeignKey
ALTER TABLE "ProblemTag" DROP CONSTRAINT "ProblemTag_problemId_fkey";

-- DropForeignKey
ALTER TABLE "ProblemTag" DROP CONSTRAINT "ProblemTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_discussionId_fkey";

-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_problemId_fkey";

-- DropForeignKey
ALTER TABLE "StarterCode" DROP CONSTRAINT "StarterCode_problemId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_problemId_fkey";

-- DropForeignKey
ALTER TABLE "TestCase" DROP CONSTRAINT "TestCase_problemId_fkey";

-- DropIndex
DROP INDEX "Problem_slug_key";

-- AlterTable
ALTER TABLE "Constraint" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "ProblemTag" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "updatedAt",
DROP COLUMN "language",
ADD COLUMN     "language" TEXT;

-- AlterTable
ALTER TABLE "StarterCode" DROP COLUMN "wrapper",
ALTER COLUMN "code" SET DEFAULT '//Start your code here';

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "testResults",
DROP COLUMN "language",
ADD COLUMN     "language" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "TestCase" DROP COLUMN "createdAt";

-- DropTable
DROP TABLE "Example";

-- DropTable
DROP TABLE "Reply";

-- CreateTable
CREATE TABLE "Examples" (
    "id" SERIAL NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "explanation" TEXT,
    "problemId" INTEGER NOT NULL,

    CONSTRAINT "Examples_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StarterCode" ADD CONSTRAINT "StarterCode_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constraint" ADD CONSTRAINT "Constraint_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemTag" ADD CONSTRAINT "ProblemTag_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemTag" ADD CONSTRAINT "ProblemTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examples" ADD CONSTRAINT "Examples_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `dislikes` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `wrappedCode` on the `Problem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "dislikes",
DROP COLUMN "likes",
DROP COLUMN "wrappedCode",
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Examples" (
    "id" SERIAL NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "explanation" TEXT,
    "problemId" INTEGER NOT NULL,

    CONSTRAINT "Examples_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Constraint" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL,

    CONSTRAINT "Constraint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Problem_slug_key" ON "Problem"("slug");

-- AddForeignKey
ALTER TABLE "Examples" ADD CONSTRAINT "Examples_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constraint" ADD CONSTRAINT "Constraint_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

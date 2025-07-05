/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StarterCode" ADD COLUMN     "wrapper" TEXT NOT NULL DEFAULT '// Default wrapper',
ALTER COLUMN "code" SET DEFAULT '// Start your code here';

-- CreateIndex
CREATE UNIQUE INDEX "Problem_slug_key" ON "Problem"("slug");

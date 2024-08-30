/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Paper` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Paper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Paper" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Paper_slug_key" ON "Paper"("slug");

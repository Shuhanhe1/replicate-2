/*
  Warnings:

  - Added the required column `paperId` to the `Experiment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experiment" ADD COLUMN     "paperId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Paper" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paper_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Experiment" ADD CONSTRAINT "Experiment_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

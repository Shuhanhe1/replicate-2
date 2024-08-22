/*
  Warnings:

  - Added the required column `pubmedId` to the `Paper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Paper" ADD COLUMN     "pubmedId" TEXT NOT NULL;

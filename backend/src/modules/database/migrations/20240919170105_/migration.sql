-- DropForeignKey
ALTER TABLE "Experiment" DROP CONSTRAINT "Experiment_paperId_fkey";

-- DropForeignKey
ALTER TABLE "ExperimentItem" DROP CONSTRAINT "ExperimentItem_experimentId_fkey";

-- DropForeignKey
ALTER TABLE "Instruction" DROP CONSTRAINT "Instruction_experimentId_fkey";

-- DropForeignKey
ALTER TABLE "Methodology" DROP CONSTRAINT "Methodology_experimentId_fkey";

-- AddForeignKey
ALTER TABLE "ExperimentItem" ADD CONSTRAINT "ExperimentItem_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Methodology" ADD CONSTRAINT "Methodology_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instruction" ADD CONSTRAINT "Instruction_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experiment" ADD CONSTRAINT "Experiment_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

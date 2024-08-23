-- AlterTable
ALTER TABLE "ExperimentItem" ALTER COLUMN "material" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Paper" ADD COLUMN     "authors" TEXT[],
ADD COLUMN     "tags" TEXT[];

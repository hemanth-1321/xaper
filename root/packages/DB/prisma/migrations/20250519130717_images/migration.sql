-- AlterTable
ALTER TABLE "AvailabeAction" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "AvailabeTriggers" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Zap" ALTER COLUMN "userId" DROP DEFAULT;

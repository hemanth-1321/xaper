/*
  Warnings:

  - You are about to drop the column `availabeActionId` on the `Action` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_actionId_fkey";

-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_availabeActionId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "availabeActionId",
ADD COLUMN     "availabeTriggersId" TEXT,
ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "sortingOrder" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "AvailabeAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_availabeTriggersId_fkey" FOREIGN KEY ("availabeTriggersId") REFERENCES "AvailabeTriggers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

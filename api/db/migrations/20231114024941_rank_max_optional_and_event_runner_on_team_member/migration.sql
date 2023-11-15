/*
  Warnings:

  - You are about to drop the column `runnerId` on the `FantasyTeamMember` table. All the data in the column will be lost.
  - Added the required column `eventRunnerId` to the `FantasyTeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickNumber` to the `FantasyTeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FantasyTeamMember" DROP CONSTRAINT "FantasyTeamMember_runnerId_fkey";

-- AlterTable
ALTER TABLE "FantasyTeamMember" DROP COLUMN "runnerId",
ADD COLUMN     "eventRunnerId" TEXT NOT NULL,
ADD COLUMN     "pickNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FantasyTeamRule" ALTER COLUMN "rankMax" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FantasyTeamMember" ADD CONSTRAINT "FantasyTeamMember_eventRunnerId_fkey" FOREIGN KEY ("eventRunnerId") REFERENCES "EventRunner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

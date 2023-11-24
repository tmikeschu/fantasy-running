/*
  Warnings:

  - You are about to drop the column `fantasyTeamId` on the `FantasyTeamWager` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "FantasyTeamWager_fantasyTeamId_key";

-- AlterTable
ALTER TABLE "FantasyTeamWager" DROP COLUMN "fantasyTeamId";

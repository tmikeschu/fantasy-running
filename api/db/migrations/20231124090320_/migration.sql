/*
  Warnings:

  - A unique constraint covering the columns `[fantasyTeamWagerId]` on the table `FantasyTeam` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "FantasyTeamWager" DROP CONSTRAINT "FantasyTeamWager_fantasyTeamId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "FantasyTeam_fantasyTeamWagerId_key" ON "FantasyTeam"("fantasyTeamWagerId");

-- AddForeignKey
ALTER TABLE "FantasyTeam" ADD CONSTRAINT "FantasyTeam_fantasyTeamWagerId_fkey" FOREIGN KEY ("fantasyTeamWagerId") REFERENCES "FantasyTeamWager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

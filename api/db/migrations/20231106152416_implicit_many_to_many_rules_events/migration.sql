/*
  Warnings:

  - You are about to drop the `FantasyTeamRulesOnFantasyEvents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FantasyTeamRulesOnFantasyEvents" DROP CONSTRAINT "FantasyTeamRulesOnFantasyEvents_fantasyEventId_fkey";

-- DropForeignKey
ALTER TABLE "FantasyTeamRulesOnFantasyEvents" DROP CONSTRAINT "FantasyTeamRulesOnFantasyEvents_fantasyTeamRuleId_fkey";

-- DropTable
DROP TABLE "FantasyTeamRulesOnFantasyEvents";

-- CreateTable
CREATE TABLE "_FantasyEventToFantasyTeamRule" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FantasyEventToFantasyTeamRule_AB_unique" ON "_FantasyEventToFantasyTeamRule"("A", "B");

-- CreateIndex
CREATE INDEX "_FantasyEventToFantasyTeamRule_B_index" ON "_FantasyEventToFantasyTeamRule"("B");

-- AddForeignKey
ALTER TABLE "_FantasyEventToFantasyTeamRule" ADD CONSTRAINT "_FantasyEventToFantasyTeamRule_A_fkey" FOREIGN KEY ("A") REFERENCES "FantasyEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FantasyEventToFantasyTeamRule" ADD CONSTRAINT "_FantasyEventToFantasyTeamRule_B_fkey" FOREIGN KEY ("B") REFERENCES "FantasyTeamRule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

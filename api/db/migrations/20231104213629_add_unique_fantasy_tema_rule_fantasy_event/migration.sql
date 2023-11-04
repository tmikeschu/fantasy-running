/*
  Warnings:

  - A unique constraint covering the columns `[fantasyTeamRuleId,fantasyEventId]` on the table `FantasyTeamRulesOnFantasyEvents` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FantasyTeamRulesOnFantasyEvents_fantasyTeamRuleId_fantasyEv_key" ON "FantasyTeamRulesOnFantasyEvents"("fantasyTeamRuleId", "fantasyEventId");

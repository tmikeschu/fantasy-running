/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `FantasyEvent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FantasyEvent_eventId_key" ON "FantasyEvent"("eventId");

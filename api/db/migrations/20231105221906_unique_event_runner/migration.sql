/*
  Warnings:

  - A unique constraint covering the columns `[eventId,runnerId]` on the table `EventRunner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EventRunner_eventId_runnerId_key" ON "EventRunner"("eventId", "runnerId");

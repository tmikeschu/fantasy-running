/*
  Warnings:

  - Made the column `points` on table `EventRunnerResult` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EventRunnerResult" ALTER COLUMN "points" SET NOT NULL;

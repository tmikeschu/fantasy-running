/*
  Warnings:

  - You are about to drop the `Performance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_runnerId_fkey";

-- DropTable
DROP TABLE "Performance";

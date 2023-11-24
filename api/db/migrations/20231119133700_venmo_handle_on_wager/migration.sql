/*
  Warnings:

  - You are about to drop the column `venmoHandle` on the `User` table. All the data in the column will be lost.
  - Added the required column `venmoHandle` to the `FantasyTeamWager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FantasyTeamWager" ADD COLUMN     "venmoHandle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "venmoHandle";

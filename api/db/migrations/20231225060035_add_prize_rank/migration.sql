/*
  Warnings:

  - Added the required column `rank` to the `FantasyEventPrize` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FantasyEventPrize" ADD COLUMN     "rank" INTEGER NOT NULL;

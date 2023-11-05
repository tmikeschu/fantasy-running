/*
  Warnings:

  - Added the required column `genderDivision` to the `Runner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Runner" ADD COLUMN     "genderDivision" TEXT NOT NULL;

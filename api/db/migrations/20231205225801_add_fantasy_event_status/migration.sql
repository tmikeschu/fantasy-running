-- CreateEnum
CREATE TYPE "FantasyEventStatus" AS ENUM ('PENDING', 'LIVE', 'COMPLETE');

-- AlterTable
ALTER TABLE "FantasyEvent" ADD COLUMN     "status" "FantasyEventStatus" NOT NULL DEFAULT 'PENDING';

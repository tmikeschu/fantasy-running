-- AlterTable
ALTER TABLE "FantasyEventConfig" ALTER COLUMN "teamCount" DROP NOT NULL,
ALTER COLUMN "teamSize" DROP NOT NULL,
ALTER COLUMN "dnfPoints" DROP NOT NULL,
ALTER COLUMN "topNPoints" DROP NOT NULL;

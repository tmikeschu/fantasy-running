-- CreateTable
CREATE TABLE "FantasyEventConfig" (
    "id" TEXT NOT NULL,
    "teamCount" INTEGER NOT NULL,
    "teamSize" INTEGER NOT NULL,
    "dnfPoints" INTEGER NOT NULL,
    "topNPoints" INTEGER NOT NULL,
    "fantasyEventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FantasyEventConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FantasyEventConfig_fantasyEventId_key" ON "FantasyEventConfig"("fantasyEventId");

-- AddForeignKey
ALTER TABLE "FantasyEventConfig" ADD CONSTRAINT "FantasyEventConfig_fantasyEventId_fkey" FOREIGN KEY ("fantasyEventId") REFERENCES "FantasyEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "FantasyEventPrize" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fantasyEventId" TEXT NOT NULL,

    CONSTRAINT "FantasyEventPrize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FantasyEventPrizeBlob" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fantasyEventPrizeId" TEXT NOT NULL,

    CONSTRAINT "FantasyEventPrizeBlob_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FantasyEventPrize" ADD CONSTRAINT "FantasyEventPrize_fantasyEventId_fkey" FOREIGN KEY ("fantasyEventId") REFERENCES "FantasyEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FantasyEventPrizeBlob" ADD CONSTRAINT "FantasyEventPrizeBlob_fantasyEventPrizeId_fkey" FOREIGN KEY ("fantasyEventPrizeId") REFERENCES "FantasyEventPrize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

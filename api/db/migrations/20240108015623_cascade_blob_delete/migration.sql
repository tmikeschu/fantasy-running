-- DropForeignKey
ALTER TABLE "FantasyEventPrizeBlob" DROP CONSTRAINT "FantasyEventPrizeBlob_fantasyEventPrizeId_fkey";

-- AddForeignKey
ALTER TABLE "FantasyEventPrizeBlob" ADD CONSTRAINT "FantasyEventPrizeBlob_fantasyEventPrizeId_fkey" FOREIGN KEY ("fantasyEventPrizeId") REFERENCES "FantasyEventPrize"("id") ON DELETE CASCADE ON UPDATE CASCADE;

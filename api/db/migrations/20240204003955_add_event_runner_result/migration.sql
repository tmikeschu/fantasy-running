-- CreateTable
CREATE TABLE "EventRunnerResult" (
    "id" TEXT NOT NULL,
    "eventRunnerId" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventRunnerResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventRunnerResult_eventRunnerId_key" ON "EventRunnerResult"("eventRunnerId");

-- AddForeignKey
ALTER TABLE "EventRunnerResult" ADD CONSTRAINT "EventRunnerResult_eventRunnerId_fkey" FOREIGN KEY ("eventRunnerId") REFERENCES "EventRunner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[timestamp]` on the table `Records` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Records_timestamp_key" ON "Records"("timestamp");

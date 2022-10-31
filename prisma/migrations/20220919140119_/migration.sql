/*
  Warnings:

  - A unique constraint covering the columns `[record]` on the table `Records` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `record` to the `Records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Records" ADD COLUMN     "record" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Records_record_key" ON "Records"("record");

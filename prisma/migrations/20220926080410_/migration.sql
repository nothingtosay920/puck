/*
  Warnings:

  - A unique constraint covering the columns `[collect_id]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reading_id]` on the table `Reading` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[zan_id]` on the table `Zan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `collect_id` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reading_id` to the `Reading` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zan_id` to the `Zan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "collect_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reading" ADD COLUMN     "reading_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Zan" ADD COLUMN     "zan_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Collection_collect_id_key" ON "Collection"("collect_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reading_reading_id_key" ON "Reading"("reading_id");

-- CreateIndex
CREATE UNIQUE INDEX "Zan_zan_id_key" ON "Zan"("zan_id");

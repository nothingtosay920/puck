/*
  Warnings:

  - You are about to drop the column `column` on the `Gather` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Gather" DROP CONSTRAINT "Gather_column_fkey";

-- AlterTable
ALTER TABLE "Gather" DROP COLUMN "column";

-- CreateTable
CREATE TABLE "_ColumnToGather" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ColumnToGather_AB_unique" ON "_ColumnToGather"("A", "B");

-- CreateIndex
CREATE INDEX "_ColumnToGather_B_index" ON "_ColumnToGather"("B");

-- AddForeignKey
ALTER TABLE "_ColumnToGather" ADD FOREIGN KEY ("A") REFERENCES "Column"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColumnToGather" ADD FOREIGN KEY ("B") REFERENCES "Gather"("id") ON DELETE CASCADE ON UPDATE CASCADE;

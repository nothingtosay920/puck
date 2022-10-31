/*
  Warnings:

  - You are about to drop the `Column` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ColumnToGather` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_ColumnToGather" DROP CONSTRAINT "_ColumnToGather_A_fkey";

-- DropForeignKey
ALTER TABLE "_ColumnToGather" DROP CONSTRAINT "_ColumnToGather_B_fkey";

-- DropTable
DROP TABLE "Column";

-- DropTable
DROP TABLE "_ColumnToGather";

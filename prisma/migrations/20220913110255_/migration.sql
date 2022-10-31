/*
  Warnings:

  - Added the required column `column` to the `Gather` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gather" ADD COLUMN     "column" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Column" (
    "id" SERIAL NOT NULL,
    "column_name" TEXT NOT NULL,
    "column_img" TEXT NOT NULL,
    "column_id" TEXT NOT NULL,
    "column_description" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Column_column_id_key" ON "Column"("column_id");

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gather" ADD CONSTRAINT "Gather_column_fkey" FOREIGN KEY ("column") REFERENCES "Column"("column_id") ON DELETE CASCADE ON UPDATE CASCADE;

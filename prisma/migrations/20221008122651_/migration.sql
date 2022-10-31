/*
  Warnings:

  - A unique constraint covering the columns `[draft]` on the table `Draft` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `draft` to the `Draft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Draft" ADD COLUMN     "draft" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Draft_draft_key" ON "Draft"("draft");

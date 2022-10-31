/*
  Warnings:

  - A unique constraint covering the columns `[article_id]` on the table `Records` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Records_timestamp_key";

-- CreateIndex
CREATE UNIQUE INDEX "Records_article_id_key" ON "Records"("article_id");

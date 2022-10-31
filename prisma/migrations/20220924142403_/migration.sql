/*
  Warnings:

  - You are about to drop the `ArticleBeFollowed` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[article_id]` on the table `MessageData` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ArticleBeFollowed" DROP CONSTRAINT "ArticleBeFollowed_article_id_fkey";

-- DropTable
DROP TABLE "ArticleBeFollowed";

-- CreateTable
CREATE TABLE "ArticleFollow" (
    "id" SERIAL NOT NULL,
    "info_id" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,

    CONSTRAINT "ArticleFollow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArticleFollow_info_id_key" ON "ArticleFollow"("info_id");

-- CreateIndex
CREATE UNIQUE INDEX "MessageData_article_id_key" ON "MessageData"("article_id");

-- AddForeignKey
ALTER TABLE "ArticleFollow" ADD CONSTRAINT "ArticleFollow_info_id_fkey" FOREIGN KEY ("info_id") REFERENCES "Info"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleFollow" ADD CONSTRAINT "ArticleFollow_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("outer_id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `ArticleFollow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BeFollow` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `timestamp` to the `MessageData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `MessageData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ArticleFollow" DROP CONSTRAINT "ArticleFollow_article_id_fkey";

-- DropForeignKey
ALTER TABLE "ArticleFollow" DROP CONSTRAINT "ArticleFollow_info_id_fkey";

-- DropForeignKey
ALTER TABLE "BeFollow" DROP CONSTRAINT "BeFollow_info_id_fkey";

-- DropForeignKey
ALTER TABLE "BeFollow" DROP CONSTRAINT "BeFollow_user_id_fkey";

-- DropForeignKey
ALTER TABLE "MessageData" DROP CONSTRAINT "MessageData_article_id_fkey";

-- AlterTable
ALTER TABLE "MessageData" ADD COLUMN     "timestamp" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "ArticleFollow";

-- DropTable
DROP TABLE "BeFollow";

-- CreateTable
CREATE TABLE "_InfoToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ArticleToInfo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InfoToUser_AB_unique" ON "_InfoToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_InfoToUser_B_index" ON "_InfoToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToInfo_AB_unique" ON "_ArticleToInfo"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToInfo_B_index" ON "_ArticleToInfo"("B");

-- AddForeignKey
ALTER TABLE "_InfoToUser" ADD FOREIGN KEY ("A") REFERENCES "Info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InfoToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToInfo" ADD FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToInfo" ADD FOREIGN KEY ("B") REFERENCES "Info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

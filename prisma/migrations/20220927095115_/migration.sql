/*
  Warnings:

  - Added the required column `article_type` to the `MessageData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MessageData" ADD COLUMN     "article_type" "ArticleType" NOT NULL;

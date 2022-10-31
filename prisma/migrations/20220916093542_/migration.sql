/*
  Warnings:

  - You are about to drop the column `type` on the `Gather` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gather" DROP COLUMN "type",
ADD COLUMN     "article_type" "ArticleType" NOT NULL DEFAULT E'COLUMN';

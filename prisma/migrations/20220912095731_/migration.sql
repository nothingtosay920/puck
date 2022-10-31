/*
  Warnings:

  - You are about to drop the column `readings` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `zan` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "readings",
DROP COLUMN "zan";

-- CreateTable
CREATE TABLE "Zan" (
    "id" SERIAL NOT NULL,
    "article_id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Zan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reading" (
    "id" SERIAL NOT NULL,
    "article_id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Zan" ADD CONSTRAINT "Zan_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zan" ADD CONSTRAINT "Zan_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("outer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("outer_id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `UserZan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_gather_id_fkey";

-- DropForeignKey
ALTER TABLE "BeFollow" DROP CONSTRAINT "BeFollow_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Draft" DROP CONSTRAINT "Draft_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Gather" DROP CONSTRAINT "Gather_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_uuid_fkey";

-- DropForeignKey
ALTER TABLE "UserZan" DROP CONSTRAINT "UserZan_authorId_fkey";

-- DropIndex
DROP INDEX "Collection_article_id_key";

-- DropIndex
DROP INDEX "Draft_article_id_key";

-- DropTable
DROP TABLE "UserZan";

-- AddForeignKey
ALTER TABLE "Draft" ADD CONSTRAINT "Draft_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Draft" ADD CONSTRAINT "Draft_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("outer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Records" ADD CONSTRAINT "Records_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("outer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeFollow" ADD CONSTRAINT "BeFollow_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("outer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gather" ADD CONSTRAINT "Gather_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_gather_id_fkey" FOREIGN KEY ("gather_id") REFERENCES "Gather"("gather_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

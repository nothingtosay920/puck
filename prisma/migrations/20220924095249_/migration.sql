/*
  Warnings:

  - You are about to drop the column `be_followed` on the `BeFollow` table. All the data in the column will be lost.
  - You are about to drop the column `artile_id` on the `MessageData` table. All the data in the column will be lost.
  - You are about to drop the column `time_stamp` on the `MessageData` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `MessageData` table. All the data in the column will be lost.
  - Added the required column `article_id` to the `MessageData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BeFollow" DROP COLUMN "be_followed";

-- AlterTable
ALTER TABLE "MessageData" DROP COLUMN "artile_id",
DROP COLUMN "time_stamp",
DROP COLUMN "user_id",
ADD COLUMN     "article_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BeFollowData" (
    "id" SERIAL NOT NULL,
    "be_followed_user" TEXT NOT NULL,

    CONSTRAINT "BeFollowData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BeFollowToBeFollowData" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BeFollowToBeFollowData_AB_unique" ON "_BeFollowToBeFollowData"("A", "B");

-- CreateIndex
CREATE INDEX "_BeFollowToBeFollowData_B_index" ON "_BeFollowToBeFollowData"("B");

-- AddForeignKey
ALTER TABLE "MessageData" ADD CONSTRAINT "MessageData_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("outer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeFollowData" ADD CONSTRAINT "BeFollowData_be_followed_user_fkey" FOREIGN KEY ("be_followed_user") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BeFollowToBeFollowData" ADD FOREIGN KEY ("A") REFERENCES "BeFollow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BeFollowToBeFollowData" ADD FOREIGN KEY ("B") REFERENCES "BeFollowData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

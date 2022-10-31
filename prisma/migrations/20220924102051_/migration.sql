/*
  Warnings:

  - You are about to drop the `_BeFollowToBeFollowData` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[uid]` on the table `BeFollowData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `befollowed_id` to the `BeFollow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `BeFollowData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BeFollowToBeFollowData" DROP CONSTRAINT "_BeFollowToBeFollowData_A_fkey";

-- DropForeignKey
ALTER TABLE "_BeFollowToBeFollowData" DROP CONSTRAINT "_BeFollowToBeFollowData_B_fkey";

-- AlterTable
ALTER TABLE "BeFollow" ADD COLUMN     "befollowed_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BeFollowData" ADD COLUMN     "uid" TEXT NOT NULL;

-- DropTable
DROP TABLE "_BeFollowToBeFollowData";

-- CreateIndex
CREATE UNIQUE INDEX "BeFollowData_uid_key" ON "BeFollowData"("uid");

-- AddForeignKey
ALTER TABLE "BeFollow" ADD CONSTRAINT "BeFollow_befollowed_id_fkey" FOREIGN KEY ("befollowed_id") REFERENCES "BeFollowData"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

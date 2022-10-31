/*
  Warnings:

  - You are about to drop the column `uid` on the `BeFollowData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `BeFollow` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `BeFollow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `befollowed_id` to the `BeFollowData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BeFollow" DROP CONSTRAINT "BeFollow_befollowed_id_fkey";

-- DropIndex
DROP INDEX "BeFollowData_uid_key";

-- AlterTable
ALTER TABLE "BeFollow" ADD COLUMN     "uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BeFollowData" DROP COLUMN "uid",
ADD COLUMN     "befollowed_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BeFollow_uid_key" ON "BeFollow"("uid");

-- AddForeignKey
ALTER TABLE "BeFollowData" ADD CONSTRAINT "BeFollowData_befollowed_id_fkey" FOREIGN KEY ("befollowed_id") REFERENCES "BeFollow"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

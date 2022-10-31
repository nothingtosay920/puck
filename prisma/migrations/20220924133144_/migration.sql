/*
  Warnings:

  - You are about to drop the column `befollowed_id` on the `BeFollow` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `BeFollow` table. All the data in the column will be lost.
  - You are about to drop the column `data_id` on the `MessageData` table. All the data in the column will be lost.
  - You are about to drop the `BeFollowData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `info_id` to the `BeFollow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `info_id` to the `MessageData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BeFollowData" DROP CONSTRAINT "BeFollowData_be_followed_user_fkey";

-- DropForeignKey
ALTER TABLE "BeFollowData" DROP CONSTRAINT "BeFollowData_befollowed_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_user_id_fkey";

-- DropForeignKey
ALTER TABLE "MessageData" DROP CONSTRAINT "MessageData_data_id_fkey";

-- DropIndex
DROP INDEX "BeFollow_uid_key";

-- AlterTable
ALTER TABLE "BeFollow" DROP COLUMN "befollowed_id",
DROP COLUMN "uid",
ADD COLUMN     "info_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MessageData" DROP COLUMN "data_id",
ADD COLUMN     "info_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "BeFollowData";

-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "Info" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "reading_time" TEXT NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Info_uuid_key" ON "Info"("uuid");

-- AddForeignKey
ALTER TABLE "MessageData" ADD CONSTRAINT "MessageData_info_id_fkey" FOREIGN KEY ("info_id") REFERENCES "Info"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeFollow" ADD CONSTRAINT "BeFollow_info_id_fkey" FOREIGN KEY ("info_id") REFERENCES "Info"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

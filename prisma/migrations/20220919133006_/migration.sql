/*
  Warnings:

  - You are about to drop the `_RecordsToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `Records` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_RecordsToUser" DROP CONSTRAINT "_RecordsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecordsToUser" DROP CONSTRAINT "_RecordsToUser_B_fkey";

-- AlterTable
ALTER TABLE "Records" ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_RecordsToUser";

-- AddForeignKey
ALTER TABLE "Records" ADD CONSTRAINT "Records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

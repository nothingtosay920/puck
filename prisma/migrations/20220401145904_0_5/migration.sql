-- CreateEnum
CREATE TYPE "RoleV" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Role" (
    "uuid" TEXT NOT NULL,
    "role" "RoleV" NOT NULL DEFAULT E'USER'
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_uuid_key" ON "Role"("uuid");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "DynamicType" AS ENUM ('ZAN', 'Follow', 'COLLECTION', 'RELEASE', 'FollowArticle');

-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('SINGLE', 'COLUMN', 'GATHER');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_img" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "reading_time" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageData" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "artile_id" TEXT NOT NULL,
    "time_stamp" TEXT NOT NULL,
    "data_id" INTEGER NOT NULL,

    CONSTRAINT "MessageData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Draft" (
    "id" SERIAL NOT NULL,
    "article_id" TEXT NOT NULL,
    "time_stmap" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Draft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleBeFollowed" (
    "id" SERIAL NOT NULL,
    "article_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "ArticleBeFollowed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Records" (
    "id" SERIAL NOT NULL,
    "article_id" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "percentage" TEXT NOT NULL,

    CONSTRAINT "Records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeFollow" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "be_followed" TEXT NOT NULL,

    CONSTRAINT "BeFollow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dynamic" (
    "dynamic_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "type" "DynamicType" NOT NULL,
    "time_tamp" TEXT NOT NULL,

    CONSTRAINT "Dynamic_pkey" PRIMARY KEY ("dynamic_id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "collection_id" SERIAL NOT NULL,
    "article_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("collection_id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "follow_id" SERIAL NOT NULL,
    "follow_user" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("follow_id")
);

-- CreateTable
CREATE TABLE "Gather" (
    "id" SERIAL NOT NULL,
    "gather_name" TEXT NOT NULL DEFAULT E'',
    "article_description" TEXT NOT NULL,
    "type" "ArticleType" NOT NULL DEFAULT E'COLUMN',
    "gather_id" TEXT NOT NULL,
    "gather_img" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Gather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "outer_id" TEXT NOT NULL,
    "article" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT E'',
    "hot" INTEGER NOT NULL DEFAULT 0,
    "readings" INTEGER NOT NULL DEFAULT 0,
    "zan" INTEGER NOT NULL DEFAULT 0,
    "gather_id" TEXT NOT NULL,
    "article_img" TEXT NOT NULL,
    "article_type" "ArticleType" NOT NULL,
    "edit_time" TEXT NOT NULL,
    "release" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserZan" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "UserZan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "uuid" TEXT NOT NULL,
    "role" "RoleType" NOT NULL DEFAULT E'USER'
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Label" (
    "id" SERIAL NOT NULL,
    "label_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RecordsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DynamicToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ArticleToLabel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ArticleToCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Draft_article_id_key" ON "Draft"("article_id");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_article_id_key" ON "Collection"("article_id");

-- CreateIndex
CREATE UNIQUE INDEX "Gather_gather_id_key" ON "Gather"("gather_id");

-- CreateIndex
CREATE UNIQUE INDEX "Article_outer_id_key" ON "Article"("outer_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserZan_article_id_key" ON "UserZan"("article_id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_uuid_key" ON "Role"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_description_key" ON "Category"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_id_key" ON "Category"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "Label_label_id_key" ON "Label"("label_id");

-- CreateIndex
CREATE UNIQUE INDEX "Label_name_key" ON "Label"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Label_description_key" ON "Label"("description");

-- CreateIndex
CREATE UNIQUE INDEX "_RecordsToUser_AB_unique" ON "_RecordsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RecordsToUser_B_index" ON "_RecordsToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DynamicToUser_AB_unique" ON "_DynamicToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DynamicToUser_B_index" ON "_DynamicToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToLabel_AB_unique" ON "_ArticleToLabel"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToLabel_B_index" ON "_ArticleToLabel"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToCategory_AB_unique" ON "_ArticleToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToCategory_B_index" ON "_ArticleToCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToUser_AB_unique" ON "_CategoryToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToUser_B_index" ON "_CategoryToUser"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageData" ADD CONSTRAINT "MessageData_data_id_fkey" FOREIGN KEY ("data_id") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Draft" ADD CONSTRAINT "Draft_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleBeFollowed" ADD CONSTRAINT "ArticleBeFollowed_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("outer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeFollow" ADD CONSTRAINT "BeFollow_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gather" ADD CONSTRAINT "Gather_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_gather_id_fkey" FOREIGN KEY ("gather_id") REFERENCES "Gather"("gather_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserZan" ADD CONSTRAINT "UserZan_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecordsToUser" ADD FOREIGN KEY ("A") REFERENCES "Records"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecordsToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DynamicToUser" ADD FOREIGN KEY ("A") REFERENCES "Dynamic"("dynamic_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DynamicToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToLabel" ADD FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToLabel" ADD FOREIGN KEY ("B") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToCategory" ADD FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToCategory" ADD FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToUser" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

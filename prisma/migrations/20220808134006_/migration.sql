-- CreateEnum
CREATE TYPE "DynamicType" AS ENUM ('ZAN', 'Follow', 'COLLECTION', 'RELEASE', 'FollowArticle');

-- CreateEnum
CREATE TYPE "MusterType" AS ENUM ('SINGLE', 'MUSTER');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "open_id" TEXT NOT NULL,
    "uuid_user" TEXT NOT NULL,
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
CREATE TABLE "MusterArticleBeFollowed" (
    "id" SERIAL NOT NULL,
    "muster_article_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "MusterArticleBeFollowed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GatherArticleBeFollowed" (
    "id" SERIAL NOT NULL,
    "gather_article_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "GatherArticleBeFollowed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Records" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
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
    "user_id" TEXT NOT NULL,

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
CREATE TABLE "Muster" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "description" TEXT NOT NULL,
    "type" "MusterType" NOT NULL DEFAULT E'MUSTER',
    "muster_id" TEXT NOT NULL,
    "muster_img" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Muster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gather" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "gather_img" TEXT NOT NULL,
    "gather_id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Gather_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "GatherArticle" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "outer_id" TEXT NOT NULL,
    "article" TEXT NOT NULL,
    "hot" INTEGER NOT NULL DEFAULT 0,
    "readings" INTEGER NOT NULL DEFAULT 0,
    "zan" INTEGER NOT NULL DEFAULT 0,
    "gather" TEXT NOT NULL,
    "article_img" TEXT NOT NULL,
    "article_type" TEXT NOT NULL DEFAULT E'GATHER',
    "edit_time" TEXT NOT NULL,
    "release" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GatherArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusterArticle" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "outer_id" TEXT NOT NULL,
    "article" TEXT NOT NULL,
    "hot" INTEGER NOT NULL DEFAULT 0,
    "readings" INTEGER NOT NULL DEFAULT 0,
    "zan" INTEGER NOT NULL DEFAULT 0,
    "edit_time" TEXT NOT NULL,
    "muster" TEXT NOT NULL,
    "release" BOOLEAN NOT NULL DEFAULT false,
    "article_img" TEXT NOT NULL,
    "article_type" TEXT NOT NULL DEFAULT E'MUSTER',

    CONSTRAINT "MusterArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "uuid" TEXT NOT NULL,
    "role" "RoleType" NOT NULL DEFAULT E'USER'
);

-- CreateTable
CREATE TABLE "CategoryUserMap" (
    "id" SERIAL NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "CategoryUserMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryMusterMap" (
    "id" SERIAL NOT NULL,
    "article_id" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "CategoryMusterMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryGatherMap" (
    "id" SERIAL NOT NULL,
    "article_id" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "CategoryGatherMap_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "MusterLabelMap" (
    "id" SERIAL NOT NULL,
    "article_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "MusterLabelMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GatherLabelMap" (
    "id" SERIAL NOT NULL,
    "article_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "GatherLabelMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Label" (
    "label_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_open_id_key" ON "User"("open_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_user_key" ON "User"("uuid_user");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Draft_article_id_key" ON "Draft"("article_id");

-- CreateIndex
CREATE UNIQUE INDEX "Records_article_id_key" ON "Records"("article_id");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_article_id_key" ON "Collection"("article_id");

-- CreateIndex
CREATE UNIQUE INDEX "Muster_muster_id_key" ON "Muster"("muster_id");

-- CreateIndex
CREATE UNIQUE INDEX "Gather_gather_id_key" ON "Gather"("gather_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserZan_article_id_key" ON "UserZan"("article_id");

-- CreateIndex
CREATE UNIQUE INDEX "GatherArticle_outer_id_key" ON "GatherArticle"("outer_id");

-- CreateIndex
CREATE UNIQUE INDEX "MusterArticle_outer_id_key" ON "MusterArticle"("outer_id");

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

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageData" ADD CONSTRAINT "MessageData_data_id_fkey" FOREIGN KEY ("data_id") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Draft" ADD CONSTRAINT "Draft_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusterArticleBeFollowed" ADD CONSTRAINT "MusterArticleBeFollowed_muster_article_id_fkey" FOREIGN KEY ("muster_article_id") REFERENCES "MusterArticle"("outer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GatherArticleBeFollowed" ADD CONSTRAINT "GatherArticleBeFollowed_gather_article_id_fkey" FOREIGN KEY ("gather_article_id") REFERENCES "GatherArticle"("outer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Records" ADD CONSTRAINT "Records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeFollow" ADD CONSTRAINT "BeFollow_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dynamic" ADD CONSTRAINT "Dynamic_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Muster" ADD CONSTRAINT "Muster_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gather" ADD CONSTRAINT "Gather_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserZan" ADD CONSTRAINT "UserZan_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GatherArticle" ADD CONSTRAINT "GatherArticle_gather_fkey" FOREIGN KEY ("gather") REFERENCES "Gather"("gather_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusterArticle" ADD CONSTRAINT "MusterArticle_muster_fkey" FOREIGN KEY ("muster") REFERENCES "Muster"("muster_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryUserMap" ADD CONSTRAINT "CategoryUserMap_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryUserMap" ADD CONSTRAINT "CategoryUserMap_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryMusterMap" ADD CONSTRAINT "CategoryMusterMap_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "MusterArticle"("outer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryMusterMap" ADD CONSTRAINT "CategoryMusterMap_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryGatherMap" ADD CONSTRAINT "CategoryGatherMap_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Gather"("gather_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryGatherMap" ADD CONSTRAINT "CategoryGatherMap_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusterLabelMap" ADD CONSTRAINT "MusterLabelMap_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "MusterArticle"("outer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusterLabelMap" ADD CONSTRAINT "MusterLabelMap_label_fkey" FOREIGN KEY ("label") REFERENCES "Label"("label_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GatherLabelMap" ADD CONSTRAINT "GatherLabelMap_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Gather"("gather_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GatherLabelMap" ADD CONSTRAINT "GatherLabelMap_label_fkey" FOREIGN KEY ("label") REFERENCES "Label"("label_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

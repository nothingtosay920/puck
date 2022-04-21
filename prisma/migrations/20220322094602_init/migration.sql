-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "open_id" TEXT NOT NULL,
    "uuid_user" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Muster" (
    "name" TEXT,
    "muster_id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Gather" (
    "name" TEXT NOT NULL,
    "gather_id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GatherArticle" (
    "id" SERIAL NOT NULL,
    "tilte" TEXT NOT NULL,
    "outer_id" TEXT NOT NULL,
    "article" TEXT[],
    "gather" TEXT NOT NULL,
    "article_type" TEXT NOT NULL DEFAULT E'GATHER',

    CONSTRAINT "GatherArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusterArticle" (
    "id" SERIAL NOT NULL,
    "tilte" TEXT NOT NULL,
    "outer_id" TEXT NOT NULL,
    "article" TEXT NOT NULL,
    "muster" TEXT NOT NULL,
    "article_type" TEXT NOT NULL DEFAULT E'MUSTER',

    CONSTRAINT "MusterArticle_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Muster_muster_id_key" ON "Muster"("muster_id");

-- CreateIndex
CREATE UNIQUE INDEX "Gather_gather_id_key" ON "Gather"("gather_id");

-- CreateIndex
CREATE UNIQUE INDEX "MusterArticle_outer_id_key" ON "MusterArticle"("outer_id");

-- AddForeignKey
ALTER TABLE "Muster" ADD CONSTRAINT "Muster_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gather" ADD CONSTRAINT "Gather_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GatherArticle" ADD CONSTRAINT "GatherArticle_gather_fkey" FOREIGN KEY ("gather") REFERENCES "Gather"("gather_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusterArticle" ADD CONSTRAINT "MusterArticle_muster_fkey" FOREIGN KEY ("muster") REFERENCES "Muster"("muster_id") ON DELETE RESTRICT ON UPDATE CASCADE;

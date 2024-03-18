-- CreateTable
CREATE TABLE "Actuality" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "photoURL" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Actuality_pkey" PRIMARY KEY ("id")
);

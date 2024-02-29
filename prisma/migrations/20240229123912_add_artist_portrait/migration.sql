-- CreateTable
CREATE TABLE "ArtistPortrait" (
    "id" SERIAL NOT NULL,
    "artistId" INTEGER NOT NULL,
    "portraitId" INTEGER NOT NULL,

    CONSTRAINT "ArtistPortrait_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portrait" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Portrait_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArtistPortrait" ADD CONSTRAINT "ArtistPortrait_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistPortrait" ADD CONSTRAINT "ArtistPortrait_portraitId_fkey" FOREIGN KEY ("portraitId") REFERENCES "Portrait"("id") ON DELETE CASCADE ON UPDATE CASCADE;

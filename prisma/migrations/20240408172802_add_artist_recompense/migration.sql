-- CreateTable
CREATE TABLE "ArtistRecompense" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "ArtistRecompense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArtistRecompense" ADD CONSTRAINT "ArtistRecompense_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

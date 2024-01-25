/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ArtistUnknow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ArtistUnknow_name_key" ON "ArtistUnknow"("name");

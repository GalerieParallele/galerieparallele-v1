/*
  Warnings:

  - A unique constraint covering the columns `[mediaURL]` on the table `OeuvreImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OeuvreImage_mediaURL_key" ON "OeuvreImage"("mediaURL");

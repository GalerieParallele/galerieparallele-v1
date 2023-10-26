/*
  Warnings:

  - The primary key for the `ArtistTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ArtistTag` table. All the data in the column will be lost.
  - The primary key for the `OeuvreTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OeuvreTag` table. All the data in the column will be lost.
  - The primary key for the `OeuvreTypes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OeuvreTypes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ArtistTag` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`artistId`, `tagId`);

-- AlterTable
ALTER TABLE `OeuvreTag` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`oeuvreId`, `tagId`);

-- AlterTable
ALTER TABLE `OeuvreTypes` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`oeuvreId`, `typeOeuvreId`);

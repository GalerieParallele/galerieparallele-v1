/*
  Warnings:

  - You are about to drop the `artist_tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `oeuvre_tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `artist_tag` DROP FOREIGN KEY `artist_tag_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `artist_tag` DROP FOREIGN KEY `artist_tag_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `oeuvre_tag` DROP FOREIGN KEY `oeuvre_tag_oeuvreId_fkey`;

-- DropForeignKey
ALTER TABLE `oeuvre_tag` DROP FOREIGN KEY `oeuvre_tag_tagId_fkey`;

-- DropTable
DROP TABLE `artist_tag`;

-- DropTable
DROP TABLE `oeuvre_tag`;

-- CreateTable
CREATE TABLE `ArtistTag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `artistId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OeuvreTag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `oeuvreId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ArtistTag` ADD CONSTRAINT `ArtistTag_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistTag` ADD CONSTRAINT `ArtistTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OeuvreTag` ADD CONSTRAINT `OeuvreTag_oeuvreId_fkey` FOREIGN KEY (`oeuvreId`) REFERENCES `Oeuvre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OeuvreTag` ADD CONSTRAINT `OeuvreTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

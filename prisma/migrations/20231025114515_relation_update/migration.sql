/*
  Warnings:

  - You are about to drop the column `expositionId` on the `Artist` table. All the data in the column will be lost.
  - Added the required column `artistId` to the `Exposition` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Artist` DROP FOREIGN KEY `Artist_expositionId_fkey`;

-- AlterTable
ALTER TABLE `Artist` DROP COLUMN `expositionId`;

-- AlterTable
ALTER TABLE `Exposition` ADD COLUMN `artistId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `ArtistOeuvre` (
    `artistId` INTEGER NOT NULL,
    `oeuvreId` INTEGER NOT NULL,

    PRIMARY KEY (`artistId`, `oeuvreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ArtistOeuvre` ADD CONSTRAINT `ArtistOeuvre_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistOeuvre` ADD CONSTRAINT `ArtistOeuvre_oeuvreId_fkey` FOREIGN KEY (`oeuvreId`) REFERENCES `Oeuvre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exposition` ADD CONSTRAINT `Exposition_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

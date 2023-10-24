-- DropForeignKey
ALTER TABLE `Article` DROP FOREIGN KEY `Article_userid_fkey`;

-- DropForeignKey
ALTER TABLE `Artist` DROP FOREIGN KEY `Artist_expositionId_fkey`;

-- DropForeignKey
ALTER TABLE `SaveTheDate` DROP FOREIGN KEY `SaveTheDate_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `artist_tag` DROP FOREIGN KEY `artist_tag_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `artist_tag` DROP FOREIGN KEY `artist_tag_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `oeuvre_tag` DROP FOREIGN KEY `oeuvre_tag_oeuvreId_fkey`;

-- DropForeignKey
ALTER TABLE `oeuvre_tag` DROP FOREIGN KEY `oeuvre_tag_tagId_fkey`;

-- AlterTable
ALTER TABLE `Article` MODIFY `userid` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `SaveTheDate` ADD CONSTRAINT `SaveTheDate_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Artist` ADD CONSTRAINT `Artist_expositionId_fkey` FOREIGN KEY (`expositionId`) REFERENCES `Exposition`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artist_tag` ADD CONSTRAINT `artist_tag_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artist_tag` ADD CONSTRAINT `artist_tag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `oeuvre_tag` ADD CONSTRAINT `oeuvre_tag_oeuvreId_fkey` FOREIGN KEY (`oeuvreId`) REFERENCES `Oeuvre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `oeuvre_tag` ADD CONSTRAINT `oeuvre_tag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

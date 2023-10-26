/*
  Warnings:

  - You are about to drop the column `date` on the `Exposition` table. All the data in the column will be lost.
  - You are about to drop the column `photoURL` on the `Exposition` table. All the data in the column will be lost.
  - Added the required column `year` to the `Exposition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encadrement` to the `Oeuvre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hauteur` to the `Oeuvre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longueur` to the `Oeuvre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numerotation` to the `Oeuvre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signature` to the `Oeuvre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `support` to the `Oeuvre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technique` to the `Oeuvre` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Artist` MODIFY `siret` VARCHAR(191) NULL,
    MODIFY `tva` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Exposition` DROP COLUMN `date`,
    DROP COLUMN `photoURL`,
    ADD COLUMN `year` INTEGER NOT NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `Oeuvre` ADD COLUMN `anecdote` TEXT NULL,
    ADD COLUMN `encadrement` VARCHAR(191) NOT NULL,
    ADD COLUMN `hauteur` INTEGER NOT NULL,
    ADD COLUMN `largeur` INTEGER NULL,
    ADD COLUMN `longueur` INTEGER NOT NULL,
    ADD COLUMN `numerotation` INTEGER NOT NULL,
    ADD COLUMN `signature` VARCHAR(191) NOT NULL,
    ADD COLUMN `support` VARCHAR(191) NOT NULL,
    ADD COLUMN `technique` VARCHAR(191) NOT NULL,
    MODIFY `description` TEXT NULL;

-- CreateTable
CREATE TABLE `OeuvreImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mediaURL` TEXT NOT NULL,
    `oeuvreId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeOeuvre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TypeOeuvre_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompositionType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `oeuvreId` INTEGER NOT NULL,
    `typeOeuvreId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnknowArtistOeuvre` (
    `artistId` INTEGER NOT NULL,
    `oeuvreId` INTEGER NOT NULL,

    PRIMARY KEY (`artistId`, `oeuvreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnknowArtist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OeuvreImage` ADD CONSTRAINT `OeuvreImage_oeuvreId_fkey` FOREIGN KEY (`oeuvreId`) REFERENCES `Oeuvre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompositionType` ADD CONSTRAINT `CompositionType_oeuvreId_fkey` FOREIGN KEY (`oeuvreId`) REFERENCES `Oeuvre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompositionType` ADD CONSTRAINT `CompositionType_typeOeuvreId_fkey` FOREIGN KEY (`typeOeuvreId`) REFERENCES `TypeOeuvre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnknowArtistOeuvre` ADD CONSTRAINT `UnknowArtistOeuvre_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `UnknowArtist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnknowArtistOeuvre` ADD CONSTRAINT `UnknowArtistOeuvre_oeuvreId_fkey` FOREIGN KEY (`oeuvreId`) REFERENCES `Oeuvre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

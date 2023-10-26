/*
  Warnings:

  - You are about to drop the column `userid` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the `CompositionType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exposition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LegalInformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SaveTheDate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypeOeuvre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnknowArtist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnknowArtistOeuvre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Article` DROP FOREIGN KEY `Article_userid_fkey`;

-- DropForeignKey
ALTER TABLE `CompositionType` DROP FOREIGN KEY `CompositionType_oeuvreId_fkey`;

-- DropForeignKey
ALTER TABLE `CompositionType` DROP FOREIGN KEY `CompositionType_typeOeuvreId_fkey`;

-- DropForeignKey
ALTER TABLE `Exposition` DROP FOREIGN KEY `Exposition_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `LegalInformation` DROP FOREIGN KEY `LegalInformation_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `SaveTheDate` DROP FOREIGN KEY `SaveTheDate_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `UnknowArtistOeuvre` DROP FOREIGN KEY `UnknowArtistOeuvre_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `UnknowArtistOeuvre` DROP FOREIGN KEY `UnknowArtistOeuvre_oeuvreId_fkey`;

-- AlterTable
ALTER TABLE `Article` DROP COLUMN `userid`,
    ADD COLUMN `editorId` INTEGER NULL;

-- DropTable
DROP TABLE `CompositionType`;

-- DropTable
DROP TABLE `Exposition`;

-- DropTable
DROP TABLE `LegalInformation`;

-- DropTable
DROP TABLE `SaveTheDate`;

-- DropTable
DROP TABLE `TypeOeuvre`;

-- DropTable
DROP TABLE `UnknowArtist`;

-- DropTable
DROP TABLE `UnknowArtistOeuvre`;

-- CreateTable
CREATE TABLE `ArtistSaveTheDate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `photoURL` TEXT NOT NULL,
    `artistId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArtistExposition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `year` INTEGER NOT NULL,
    `artistId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArtistLegalInformation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `societe` VARCHAR(191) NOT NULL,
    `adrNumVoie` VARCHAR(191) NOT NULL,
    `adrRue` VARCHAR(191) NOT NULL,
    `adrVille` VARCHAR(191) NOT NULL,
    `adrCodePostal` VARCHAR(191) NOT NULL,
    `siret` VARCHAR(191) NOT NULL,
    `tva` VARCHAR(191) NOT NULL,
    `numMaisonsDesArtistes` VARCHAR(191) NOT NULL,
    `numSecuriteSociale` VARCHAR(191) NOT NULL,
    `artistId` INTEGER NOT NULL,

    UNIQUE INDEX `ArtistLegalInformation_siret_key`(`siret`),
    UNIQUE INDEX `ArtistLegalInformation_tva_key`(`tva`),
    UNIQUE INDEX `ArtistLegalInformation_numSecuriteSociale_key`(`numSecuriteSociale`),
    UNIQUE INDEX `ArtistLegalInformation_artistId_key`(`artistId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypesOeuvre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TypesOeuvre_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OeuvreTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `oeuvreId` INTEGER NOT NULL,
    `typeOeuvreId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArtistUnknowOeuvre` (
    `artistId` INTEGER NOT NULL,
    `oeuvreId` INTEGER NOT NULL,

    PRIMARY KEY (`artistId`, `oeuvreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArtistUnknow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ArtistSaveTheDate` ADD CONSTRAINT `ArtistSaveTheDate_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_editorId_fkey` FOREIGN KEY (`editorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistExposition` ADD CONSTRAINT `ArtistExposition_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistLegalInformation` ADD CONSTRAINT `ArtistLegalInformation_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OeuvreTypes` ADD CONSTRAINT `OeuvreTypes_oeuvreId_fkey` FOREIGN KEY (`oeuvreId`) REFERENCES `Oeuvre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OeuvreTypes` ADD CONSTRAINT `OeuvreTypes_typeOeuvreId_fkey` FOREIGN KEY (`typeOeuvreId`) REFERENCES `TypesOeuvre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistUnknowOeuvre` ADD CONSTRAINT `ArtistUnknowOeuvre_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `ArtistUnknow`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistUnknowOeuvre` ADD CONSTRAINT `ArtistUnknowOeuvre_oeuvreId_fkey` FOREIGN KEY (`oeuvreId`) REFERENCES `Oeuvre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

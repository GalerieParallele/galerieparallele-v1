-- CreateTable
CREATE TABLE `LegalInformation` (
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

    UNIQUE INDEX `LegalInformation_siret_key`(`siret`),
    UNIQUE INDEX `LegalInformation_tva_key`(`tva`),
    UNIQUE INDEX `LegalInformation_numSecuriteSociale_key`(`numSecuriteSociale`),
    UNIQUE INDEX `LegalInformation_artistId_key`(`artistId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LegalInformation` ADD CONSTRAINT `LegalInformation_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

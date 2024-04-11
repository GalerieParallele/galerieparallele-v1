/*
  Warnings:

  - You are about to drop the `ArtistLegalInformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LegalInformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserLegalInformation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[siret]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tva]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siret]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tva]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ArtistLegalInformation" DROP CONSTRAINT "ArtistLegalInformation_artistId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistLegalInformation" DROP CONSTRAINT "ArtistLegalInformation_legalInformationId_fkey";

-- DropForeignKey
ALTER TABLE "UserLegalInformation" DROP CONSTRAINT "UserLegalInformation_legalInformationId_fkey";

-- DropForeignKey
ALTER TABLE "UserLegalInformation" DROP CONSTRAINT "UserLegalInformation_userId_fkey";

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "adrCodePostal" TEXT,
ADD COLUMN     "adrNumVoie" TEXT,
ADD COLUMN     "adrRue" TEXT,
ADD COLUMN     "adrVille" TEXT,
ADD COLUMN     "numMaisonsDesArtistes" TEXT,
ADD COLUMN     "numSecuriteSociale" TEXT,
ADD COLUMN     "siret" TEXT,
ADD COLUMN     "societe" TEXT,
ADD COLUMN     "tauxTva" TEXT,
ADD COLUMN     "tva" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "adrCodePostal" TEXT,
ADD COLUMN     "adrNumVoie" TEXT,
ADD COLUMN     "adrRue" TEXT,
ADD COLUMN     "adrVille" TEXT,
ADD COLUMN     "siret" TEXT,
ADD COLUMN     "societe" TEXT,
ADD COLUMN     "tva" TEXT;

-- DropTable
DROP TABLE "ArtistLegalInformation";

-- DropTable
DROP TABLE "LegalInformation";

-- DropTable
DROP TABLE "UserLegalInformation";

-- CreateIndex
CREATE UNIQUE INDEX "Artist_siret_key" ON "Artist"("siret");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_tva_key" ON "Artist"("tva");

-- CreateIndex
CREATE UNIQUE INDEX "User_siret_key" ON "User"("siret");

-- CreateIndex
CREATE UNIQUE INDEX "User_tva_key" ON "User"("tva");

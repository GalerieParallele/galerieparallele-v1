/*
  Warnings:

  - You are about to drop the column `adrCodePostal` on the `ArtistLegalInformation` table. All the data in the column will be lost.
  - You are about to drop the column `adrNumVoie` on the `ArtistLegalInformation` table. All the data in the column will be lost.
  - You are about to drop the column `adrRue` on the `ArtistLegalInformation` table. All the data in the column will be lost.
  - You are about to drop the column `adrVille` on the `ArtistLegalInformation` table. All the data in the column will be lost.
  - You are about to drop the column `siret` on the `ArtistLegalInformation` table. All the data in the column will be lost.
  - You are about to drop the column `societe` on the `ArtistLegalInformation` table. All the data in the column will be lost.
  - You are about to drop the column `tva` on the `ArtistLegalInformation` table. All the data in the column will be lost.
  - Added the required column `legalInformationId` to the `ArtistLegalInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orientation` to the `Oeuvre` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrientationType" AS ENUM ('PORTRAIT', 'PAYSAGE', 'CARRE');

-- DropIndex
DROP INDEX "ArtistLegalInformation_siret_key";

-- DropIndex
DROP INDEX "ArtistLegalInformation_tva_key";

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "atTheTop" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ArtistLegalInformation" DROP COLUMN "adrCodePostal",
DROP COLUMN "adrNumVoie",
DROP COLUMN "adrRue",
DROP COLUMN "adrVille",
DROP COLUMN "siret",
DROP COLUMN "societe",
DROP COLUMN "tva",
ADD COLUMN     "legalInformationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Oeuvre" ADD COLUMN     "atTheTop" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "orientation" "OrientationType" NOT NULL;

-- CreateTable
CREATE TABLE "UserLegalInformation" (
    "id" SERIAL NOT NULL,
    "legalInformationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserLegalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalInformation" (
    "id" SERIAL NOT NULL,
    "societe" TEXT,
    "adrNumVoie" TEXT,
    "adrRue" TEXT,
    "adrVille" TEXT,
    "adrCodePostal" TEXT,
    "siret" TEXT,
    "tva" TEXT,

    CONSTRAINT "LegalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Couleur" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Couleur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OeuvreCouleur" (
    "oeuvreId" INTEGER NOT NULL,
    "couleurId" INTEGER NOT NULL,

    CONSTRAINT "OeuvreCouleur_pkey" PRIMARY KEY ("oeuvreId","couleurId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLegalInformation_userId_key" ON "UserLegalInformation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LegalInformation_siret_key" ON "LegalInformation"("siret");

-- CreateIndex
CREATE UNIQUE INDEX "LegalInformation_tva_key" ON "LegalInformation"("tva");

-- CreateIndex
CREATE UNIQUE INDEX "Couleur_name_key" ON "Couleur"("name");

-- AddForeignKey
ALTER TABLE "ArtistLegalInformation" ADD CONSTRAINT "ArtistLegalInformation_legalInformationId_fkey" FOREIGN KEY ("legalInformationId") REFERENCES "LegalInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLegalInformation" ADD CONSTRAINT "UserLegalInformation_legalInformationId_fkey" FOREIGN KEY ("legalInformationId") REFERENCES "LegalInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLegalInformation" ADD CONSTRAINT "UserLegalInformation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OeuvreCouleur" ADD CONSTRAINT "OeuvreCouleur_oeuvreId_fkey" FOREIGN KEY ("oeuvreId") REFERENCES "Oeuvre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OeuvreCouleur" ADD CONSTRAINT "OeuvreCouleur_couleurId_fkey" FOREIGN KEY ("couleurId") REFERENCES "Couleur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

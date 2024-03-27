/*
  Warnings:

  - The primary key for the `Couleur` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Couleur` table. All the data in the column will be lost.
  - The primary key for the `OeuvreCouleur` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `couleurId` on the `OeuvreCouleur` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Oeuvre` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hexa` to the `OeuvreCouleur` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OeuvreCouleur" DROP CONSTRAINT "OeuvreCouleur_couleurId_fkey";

-- AlterTable
ALTER TABLE "Couleur" DROP CONSTRAINT "Couleur_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Couleur_pkey" PRIMARY KEY ("hexa");

-- AlterTable
ALTER TABLE "OeuvreCouleur" DROP CONSTRAINT "OeuvreCouleur_pkey",
DROP COLUMN "couleurId",
ADD COLUMN     "hexa" TEXT NOT NULL,
ADD CONSTRAINT "OeuvreCouleur_pkey" PRIMARY KEY ("oeuvreId", "hexa");

-- CreateIndex
CREATE UNIQUE INDEX "Oeuvre_name_key" ON "Oeuvre"("name");

-- AddForeignKey
ALTER TABLE "OeuvreCouleur" ADD CONSTRAINT "OeuvreCouleur_hexa_fkey" FOREIGN KEY ("hexa") REFERENCES "Couleur"("hexa") ON DELETE CASCADE ON UPDATE CASCADE;

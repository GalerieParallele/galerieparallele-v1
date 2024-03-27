/*
  Warnings:

  - A unique constraint covering the columns `[hexa]` on the table `Couleur` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hexa` to the `Couleur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Couleur" ADD COLUMN     "hexa" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Oeuvre" ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Couleur_hexa_key" ON "Couleur"("hexa");

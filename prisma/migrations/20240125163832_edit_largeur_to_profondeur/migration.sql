/*
  Warnings:

  - You are about to drop the column `largeur` on the `Oeuvre` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Oeuvre" DROP COLUMN "largeur",
ADD COLUMN     "profondeur" INTEGER;

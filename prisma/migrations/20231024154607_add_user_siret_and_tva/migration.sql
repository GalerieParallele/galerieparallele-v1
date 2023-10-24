/*
  Warnings:

  - A unique constraint covering the columns `[tva]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siret]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `siret` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tva` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Artist` ADD COLUMN `siret` VARCHAR(191) NOT NULL,
    ADD COLUMN `tva` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Artist_tva_key` ON `Artist`(`tva`);

-- CreateIndex
CREATE UNIQUE INDEX `Artist_siret_key` ON `Artist`(`siret`);

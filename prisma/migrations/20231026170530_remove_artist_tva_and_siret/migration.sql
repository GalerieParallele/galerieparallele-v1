/*
  Warnings:

  - You are about to drop the column `siret` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `tva` on the `Artist` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Artist_siret_key` ON `Artist`;

-- DropIndex
DROP INDEX `Artist_tva_key` ON `Artist`;

-- AlterTable
ALTER TABLE `Artist` DROP COLUMN `siret`,
    DROP COLUMN `tva`;

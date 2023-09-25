/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Devlog` table. All the data in the column will be lost.
  - Added the required column `tags` to the `Devlog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Devlog` DROP COLUMN `updatedAt`,
    ADD COLUMN `tags` ENUM('UPDATE', 'CREATE', 'DELETE', 'REVIEW') NOT NULL;

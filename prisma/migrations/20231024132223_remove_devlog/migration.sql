/*
  Warnings:

  - You are about to drop the `Devlog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Devlog` DROP FOREIGN KEY `Devlog_userid_fkey`;

-- DropTable
DROP TABLE `Devlog`;

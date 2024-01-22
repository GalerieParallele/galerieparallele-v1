/*
  Warnings:

  - Added the required column `position` to the `OeuvreImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OeuvreImage" ADD COLUMN     "position" INTEGER NOT NULL;

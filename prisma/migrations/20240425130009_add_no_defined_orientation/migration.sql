/*
  Warnings:

  - Made the column `orientation` on table `Oeuvre` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "OrientationType" ADD VALUE 'NO_DEFINED';
COMMIT;

-- AlterTable
ALTER TABLE "Oeuvre" ALTER COLUMN "orientation" SET NOT NULL,
ALTER COLUMN "orientation" SET DEFAULT 'NO_DEFINED';

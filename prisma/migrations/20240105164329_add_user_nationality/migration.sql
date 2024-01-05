-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "nationality" TEXT;

-- AlterTable
ALTER TABLE "ArtistSaveTheDate" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

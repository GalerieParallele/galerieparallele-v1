/*
  Warnings:

  - You are about to drop the column `photoURL` on the `Actuality` table. All the data in the column will be lost.
  - Added the required column `mediaURL` to the `Actuality` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actuality" DROP COLUMN "photoURL",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "editorId" INTEGER,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "mediaURL" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Actuality" ADD CONSTRAINT "Actuality_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

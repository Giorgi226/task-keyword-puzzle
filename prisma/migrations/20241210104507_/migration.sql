/*
  Warnings:

  - You are about to drop the column `keyword` on the `Puzzle` table. All the data in the column will be lost.
  - Added the required column `keywordId` to the `Puzzle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Puzzle" DROP COLUMN "keyword",
ADD COLUMN     "keywordId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Puzzle" ADD CONSTRAINT "Puzzle_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Key"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

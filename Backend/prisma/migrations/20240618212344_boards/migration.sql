/*
  Warnings:

  - You are about to drop the column `content` on the `Card` table. All the data in the column will be lost.
  - Added the required column `title` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT 'default_image.jpg',
ADD COLUMN     "kudo" TEXT NOT NULL DEFAULT 'No kudos yet';

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "content",
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "title" TEXT NOT NULL;

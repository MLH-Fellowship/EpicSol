/*
  Warnings:

  - You are about to drop the column `content` on the `Product` table. All the data in the column will be lost.
  - Added the required column `developer` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `youtube_url` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "youtube_url" TEXT NOT NULL,
    "desc" TEXT,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "developer" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "platform" TEXT NOT NULL
);
INSERT INTO "new_Product" ("id", "title") SELECT "id", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

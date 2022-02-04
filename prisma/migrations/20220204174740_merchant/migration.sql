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
    "merchant_address" TEXT NOT NULL DEFAULT '9iSD3wkC1aq3FcwgjJfEua9FkkZJWv7Cuxs6sKjc3VnR',
    "publisher" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "platform" TEXT NOT NULL
);
INSERT INTO "new_Product" ("desc", "developer", "id", "image", "platform", "price", "publisher", "release_date", "title", "youtube_url") SELECT "desc", "developer", "id", "image", "platform", "price", "publisher", "release_date", "title", "youtube_url" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

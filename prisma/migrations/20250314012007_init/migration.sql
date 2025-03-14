/*
  Warnings:

  - You are about to alter the column `availability` on the `Vehicle` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - Added the required column `distance` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doors` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuel` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gearBox` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seats` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "global" BOOLEAN NOT NULL DEFAULT false,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "pricePerDay" REAL NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "features" JSONB NOT NULL,
    "location" JSONB NOT NULL,
    "images" JSONB NOT NULL,
    "seats" INTEGER NOT NULL,
    "totalStars" INTEGER NOT NULL DEFAULT 0,
    "starCount" INTEGER NOT NULL DEFAULT 0,
    "gearBox" TEXT NOT NULL,
    "fuel" TEXT NOT NULL,
    "doors" INTEGER NOT NULL,
    "distance" TEXT NOT NULL
);
INSERT INTO "new_Vehicle" ("availability", "brand", "category", "description", "features", "global", "id", "images", "location", "model", "name", "pricePerDay", "subcategory", "type", "year") SELECT "availability", "brand", "category", "description", "features", "global", "id", "images", "location", "model", "name", "pricePerDay", "subcategory", "type", "year" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

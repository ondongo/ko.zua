/*
  Warnings:

  - You are about to drop the column `brand` on the `Immobilier` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `Immobilier` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Immobilier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Immobilier" DROP COLUMN "brand",
DROP COLUMN "features",
DROP COLUMN "model",
ADD COLUMN     "bathrooms" INTEGER,
ADD COLUMN     "bedrooms" INTEGER,
ADD COLUMN     "furnished" BOOLEAN,
ALTER COLUMN "starCount" DROP NOT NULL,
ALTER COLUMN "views" DROP NOT NULL;

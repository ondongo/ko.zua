-- CreateTable
CREATE TABLE "Vehicle" (
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
    "availability" TEXT NOT NULL,
    "features" JSONB NOT NULL,
    "location" JSONB NOT NULL,
    "images" JSONB NOT NULL
);

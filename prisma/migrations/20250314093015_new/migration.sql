-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "global" BOOLEAN NOT NULL DEFAULT false,
    "category" TEXT NOT NULL,
    "condition" TEXT,
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
    "starCount" INTEGER NOT NULL DEFAULT 0,
    "gearBox" TEXT NOT NULL,
    "fuel" TEXT NOT NULL,
    "doors" INTEGER NOT NULL,
    "distance" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "saleStatus" TEXT NOT NULL DEFAULT 'RENT'
);

-- CreateTable
CREATE TABLE "Immobilier" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "brand" TEXT,
    "model" TEXT,
    "price" REAL NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "features" JSONB NOT NULL,
    "location" JSONB NOT NULL,
    "images" JSONB NOT NULL,
    "rooms" INTEGER,
    "starCount" INTEGER NOT NULL DEFAULT 0,
    "parcelSize" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "saleStatus" TEXT NOT NULL DEFAULT 'RENT'
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehicleId" TEXT,
    "immobilierId" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT,
    "customerEmail" TEXT,
    CONSTRAINT "Reservation_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Reservation_immobilierId_fkey" FOREIGN KEY ("immobilierId") REFERENCES "Immobilier" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehicleId" TEXT,
    "immobilierId" TEXT,
    "saleDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" REAL NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT,
    "customerEmail" TEXT,
    CONSTRAINT "Vente_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Vente_immobilierId_fkey" FOREIGN KEY ("immobilierId") REFERENCES "Immobilier" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehicleId" TEXT,
    "immobilierId" TEXT,
    "stars" INTEGER NOT NULL,
    CONSTRAINT "Rating_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Rating_immobilierId_fkey" FOREIGN KEY ("immobilierId") REFERENCES "Immobilier" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER'
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

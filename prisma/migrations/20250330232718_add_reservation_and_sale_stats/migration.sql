/*
  Warnings:

  - A unique constraint covering the columns `[year,month,day]` on the table `ReservationStats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "VenteStats" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "totalSales" INTEGER NOT NULL,
    "totalRevenue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VenteStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VenteStats_year_month_day_key" ON "VenteStats"("year", "month", "day");

-- CreateIndex
CREATE UNIQUE INDEX "ReservationStats_year_month_day_key" ON "ReservationStats"("year", "month", "day");

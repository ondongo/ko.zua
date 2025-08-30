-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('RENT_VEHICLE', 'SELL_VEHICLE', 'RENT_ESTATE', 'SELL_ESTATE');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'QUALIFIED', 'CONTACTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "LeadActorType" AS ENUM ('INDIVIDUAL', 'COMPANY');

-- AlterTable
ALTER TABLE "Immobilier" ADD COLUMN     "isSuper" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ownerType" "LeadActorType" NOT NULL DEFAULT 'COMPANY',
ADD COLUMN     "partnerLeadId" TEXT;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "isSuper" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ownerType" "LeadActorType" NOT NULL DEFAULT 'COMPANY',
ADD COLUMN     "partnerLeadId" TEXT;

-- CreateTable
CREATE TABLE "PartnerLead" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT,
    "actorType" "LeadActorType" NOT NULL DEFAULT 'INDIVIDUAL',
    "leadType" "LeadType" NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "note" TEXT,
    "isSuper" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerLead_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_partnerLeadId_fkey" FOREIGN KEY ("partnerLeadId") REFERENCES "PartnerLead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Immobilier" ADD CONSTRAINT "Immobilier_partnerLeadId_fkey" FOREIGN KEY ("partnerLeadId") REFERENCES "PartnerLead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

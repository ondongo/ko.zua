import { Prisma, Vehicle } from "@prisma/client";
import { IVehicleRepository } from "./IVehicleRepository";
import { GenericRepository } from "./generic/PrismaRepository";
import { prisma } from "@/configs/prisma";

export class VehicleRepository
  extends GenericRepository<Vehicle>
  implements IVehicleRepository
{
  constructor() {
    super(prisma.vehicle);
  }

  async findAvailableVehicles(): Promise<Vehicle[]> {
    return await prisma.vehicle.findMany({
      where: { availability: true },
    });
  }

  async findByBrand(brand: string): Promise<Vehicle[]> {
    return await prisma.vehicle.findMany({
      where: { brand },
    });
  }

  async findSimilarVehicles(
    category: string,
    excludeId: string
  ): Promise<Vehicle[]> {
    return await prisma.vehicle.findMany({
      where: {
        category,
        id: { not: excludeId },
      },
      take: 4,
    });
  }

  async getFilteredVehicles(filters: {
    availability?: boolean;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
    category?: string;
    minRating?: number;
    searchQuery?: string;
    startDate?: Date;
    endDate?: Date;
    saleStatus?: "RENT" | "SALE";
  }): Promise<Vehicle[]> {
    return prisma.vehicle.findMany({
      where: {
        ...(filters.availability !== undefined && {
          availability: filters.availability,
        }),
        ...(filters.brand && { brand: filters.brand }),
        ...(filters.minPrice !== undefined && {
          pricePerDay: { gte: filters.minPrice },
        }),
        ...(filters.maxPrice !== undefined && {
          pricePerDay: { lte: filters.maxPrice },
        }),
        ...(filters.location && {
          location: {
            path: "city",
            equals: filters.location,
          },
        }),
        ...(filters.category && { category: filters.category }),
        ...(filters.searchQuery && {
          OR: [
            {
              brand: {
                contains: filters.searchQuery,
                mode: "insensitive",
              } as Prisma.StringFilter,
            },
            {
              model: {
                contains: filters.searchQuery,
                mode: "insensitive",
              } as Prisma.StringFilter,
            },
            {
              name: {
                contains: filters.searchQuery,
                mode: "insensitive",
              } as Prisma.StringFilter,
            },
            {
              description: {
                contains: filters.searchQuery,
                mode: "insensitive",
              } as Prisma.StringFilter,
            },
          ],
        }),
        ...(filters.saleStatus && { saleStatus: filters.saleStatus }),
      },
    });
  }
}

import { Immobilier, Prisma } from "@prisma/client";
import { GenericRepository } from "./generic/PrismaRepository";
import { IRealEstateRepository } from "./IRealEstateRespository";
import { prisma } from "@/configs/prisma";
export class RealEstateRepository
  extends GenericRepository<Immobilier>
  implements IRealEstateRepository
{
  constructor() {
    super(prisma.immobilier);
  }
  async getFilteredImmobilier(filters: {
    availability?: boolean;
    minPrice?: number;
    maxPrice?: number;
    city?: string;
    neighborhood?: string;
    category?: string;
    minRating?: number;
    searchQuery?: string;
    startDate?: Date;
    endDate?: Date;
    saleStatus?: "RENT" | "SALE";
  }): Promise<Immobilier[]> {
    return prisma.immobilier.findMany({
      where: {
        ...(filters.availability !== undefined && {
          availability: filters.availability,
        }),

        ...(filters.minPrice !== undefined && {
          price: { gte: filters.minPrice },
        }),
        ...(filters.maxPrice !== undefined && {
          price: { lte: filters.maxPrice },
        }),
        ...(filters.city && {
          location: {
            equals: { city: filters.city },
          },
        }),

        ...(filters.neighborhood && {
          location: {
            equals: { neighborhood: filters.neighborhood },
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
  async findSimilarImmobilier(
    category: string,
    excludeId: string
  ): Promise<Immobilier[]> {
    return await prisma.immobilier.findMany({
      where: {
        category,
        id: { not: excludeId },
      },
      take: 4,
    });
  }
}

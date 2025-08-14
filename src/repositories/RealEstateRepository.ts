import { Immobilier, Prisma } from "@prisma/client";
import { GenericRepository } from "./generic/PrismaRepository";
import { IRealEstateRepository } from "./IRealEstateRespository";
import { prisma } from "@/configs/prisma";
import { PaginatedResult } from "@/types/allType";
export class RealEstateRepository
  extends GenericRepository<Immobilier>
  implements IRealEstateRepository
{
  constructor() {
    super(prisma.immobilier);
  }

  async getFilteredImmobilier(
    filters: {
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
    },
    pagination: {
      page?: number;
      pageSize?: number;
    }
  ): Promise<PaginatedResult<Immobilier>> {
    const page = pagination.page ?? 1;
    const pageSize = pagination.pageSize ?? 12;

    console.log("Repository - Filtres reçus:", filters);
    console.log("Repository - minPrice:", filters.minPrice, "maxPrice:", filters.maxPrice);

    const whereClause = {
      ...(filters.availability !== undefined && {
        availability: filters.availability,
      }),

      ...(filters.minPrice !== undefined && {
        price: { gte: filters.minPrice },
      }),
      ...(filters.maxPrice !== undefined && {
        price: { lte: filters.maxPrice },
      }),
      ...(filters.city &&
        filters.neighborhood && {
          AND: [
            {
              location: {
                path: ["city"],
                equals: filters.city,
              },
            },
            {
              location: {
                path: ["neighborhood"],
                equals: filters.neighborhood,
              },
            },
          ],
        }),

      ...(filters.category && { category: filters.category }),
      ...(filters.searchQuery && {
        OR: [
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
    };

    console.log("Repository - Clause WHERE construite:", JSON.stringify(whereClause, null, 2));

    const [immobiliers, totalItems] = await prisma.$transaction([
      prisma.immobilier.findMany({
        where: whereClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.immobilier.count({
        where: whereClause,
      }),
    ]);

    console.log("Repository - Résultats trouvés:", immobiliers.length);
    console.log("Repository - Prix des résultats:", immobiliers.map(item => ({ id: item.id, name: item.name, price: item.price })));

    const totalPages = Math.ceil(totalItems / pageSize);

    return { data: immobiliers, totalItems, totalPages };
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

  async getLatestImmobilier(): Promise<Immobilier[]> {
    return await prisma.immobilier.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  }

  async toggleAvailability(
    immobilierId: string,
    availability: boolean
  ): Promise<Immobilier> {
    return await prisma.immobilier.update({
      where: { id: immobilierId },
      data: { availability },
    });
  }
}

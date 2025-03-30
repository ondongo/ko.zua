import { Rating } from "@prisma/client";
import { GenericRepository } from "./generic/PrismaRepository";
import { IReviewRepository } from "./IReviewRepository";
import { prisma } from "@/configs/prisma";
export class ReviewRepository
  extends GenericRepository<Rating>
  implements IReviewRepository
{
  constructor() {
    super(prisma.rating);
  }
  async getLastFiveRatingsForVehicle(vehicleId: string) {
    return await prisma.rating.findMany({
      where: { vehicleId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        vehicleId: true,
        immobilierId: true,
        authorName: true,
        content: true,
        stars: true,
        createdAt: true,
      },
    });
  }

  async getLastFiveRatingsForImmobilier(immobilierId: string) {
    return await prisma.rating.findMany({
      where: { immobilierId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        vehicleId: true,
        immobilierId: true,
        authorName: true,
        content: true,
        stars: true,
        createdAt: true,
      },
    });
  }

  async getAverageRatingForVehicle(vehicleId: string) {
    const result = await prisma.rating.aggregate({
      where: { vehicleId },
      _avg: { stars: true },
    });

    const average = result._avg.stars ?? 0;
    return average;
  }

  async getAverageRatingForImmobilier(immobilierId: string) {
    const result = await prisma.rating.aggregate({
      where: { immobilierId },
      _avg: { stars: true },
    });

    const average = result._avg.stars ?? 0;
    return average;
  }
}

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
}

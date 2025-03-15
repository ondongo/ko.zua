import { Immobilier } from "@prisma/client";
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
}

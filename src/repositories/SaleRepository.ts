import { Vente } from "@prisma/client";
import { GenericRepository } from "./generic/PrismaRepository";
import { ISaleRepository } from "./ISaleRepository";
import { prisma } from "@/configs/prisma";
export class SaleRepository
  extends GenericRepository<Vente>
  implements ISaleRepository
{
  constructor() {
    super(prisma.vente);
  }
}

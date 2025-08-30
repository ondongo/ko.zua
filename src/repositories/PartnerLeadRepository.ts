import { PartnerLead } from "@prisma/client";
import { GenericRepository } from "./generic/PrismaRepository";

import { prisma } from "@/configs/prisma";
import { IPartnerLeadRepository } from "./IPartnerLeadRepository";
export class PartnerLeadRepository
  extends GenericRepository<PartnerLead>
  implements IPartnerLeadRepository
{
  constructor() {
    super(prisma.partnerLead);
  }
}

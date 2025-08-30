import { PartnerLead } from "@prisma/client";
import { IRepository } from "./generic/IRepository";

export interface IPartnerLeadRepository extends IRepository<PartnerLead> {}

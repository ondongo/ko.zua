import { PartnerLeadRepository } from "@/repositories/PartnerLeadRepository";
import { PartnerLeadService } from "@/services/PartnerLeadService";
import { PartnerLead } from "@prisma/client";

const repository = new PartnerLeadRepository();
const partnerLeadService = new PartnerLeadService(repository);

export const PartnerLeadController = {
  async createPartnerLead(partnerLeadData: PartnerLead): Promise<void> {
    return await partnerLeadService.createPartnerLead(partnerLeadData);
  },

  async deletePartnerLead(id: string): Promise<void> {
    return await partnerLeadService.deletePartnerLead(id);
  },
};

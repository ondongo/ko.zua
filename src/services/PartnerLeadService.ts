import { PartnerLeadRepository } from "@/repositories/PartnerLeadRepository";
import { PartnerLead } from "@prisma/client";

export class PartnerLeadService {
  private repository: PartnerLeadRepository;

  constructor(repository: PartnerLeadRepository) {
    this.repository = repository;
  }

  async createPartnerLead(partnerLeadData: PartnerLead): Promise<void> {
    return this.repository.save(partnerLeadData);
  }

  async deletePartnerLead(id: string): Promise<void> {
    return this.repository.delete(id);
  }

}

import { RealEstateRepository } from "@/repositories/RealEstateRepository";
import { Immobilier } from "@prisma/client";

export class RealEstateService {
  private repository: RealEstateRepository;

  constructor(repository: RealEstateRepository) {
    this.repository = repository;
  }

  async getRealEstateById(id: string): Promise<Immobilier | null> {
    return this.repository.findById(id);
  }

  async createRealEstate(realEstateData: Immobilier): Promise<void> {
    return this.repository.save(realEstateData);
  }

  async deleteRealEstate(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}

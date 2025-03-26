import { RealEstateRepository } from "@/repositories/RealEstateRepository";
import { PaginatedResult } from "@/types/allType";
import { Immobilier } from "@prisma/client";

export class RealEstateService {
  private repository: RealEstateRepository;

  constructor(repository: RealEstateRepository) {
    this.repository = repository;
  }

  async getAllRealEstates(
    page: number,
    pageSize: number
  ): Promise<PaginatedResult<Immobilier>> {
    return this.repository.findAll(page, pageSize);
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
  async getFilteredRealEstate(
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
    return this.repository.getFilteredImmobilier(filters, pagination);
  }

  async findSimilarRealEstate(
    category: string,
    excludeId: string
  ): Promise<Immobilier[]> {
    return this.repository.findSimilarImmobilier(category, excludeId);
  }
}

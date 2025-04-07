import { Immobilier, Vehicle } from "@prisma/client";
import { RealEstateService } from "@/services/RealEstateService";
import { RealEstateRepository } from "@/repositories/RealEstateRepository";

const repository = new RealEstateRepository();
const realEstateService = new RealEstateService(repository);

export const RealEstateController = {
  async toggleAvailability(
    immobilierId: string,
    availability: boolean
  ): Promise<Immobilier> {
    return await realEstateService.toggleAvailability(
      immobilierId,
      availability
    );
  },

  async getAllRealEstates(
    page: number,
    pageSize: number
  ): Promise<{
    immobiliers: Immobilier[];
    totalPages: number;
    totalItems: number;
  }> {
    const result = await realEstateService.getAllRealEstates(page, pageSize);

    return {
      immobiliers: result.data,
      totalPages: result.totalPages,
      totalItems: result.totalItems,
    };
  },

  async getRealEstateById(id: string): Promise<Immobilier | null> {
    return await realEstateService.getRealEstateById(id);
  },

  async createOrUpdateRealEstate(vehicleData: Immobilier): Promise<void> {
    return await realEstateService.createRealEstate(vehicleData);
  },

  async deleteRealEstate(id: string): Promise<void> {
    return await realEstateService.deleteRealEstate(id);
  },

  async getFilteredRealEstates(
    filters: {
      availability?: boolean;
      brand?: string;
      minPrice?: number;
      maxPrice?: number;
      city?: string;
      neighborhood?: string;
      category?: string;
      searchQuery?: string;
      startDate?: Date;
      endDate?: Date;
      saleStatus?: "RENT" | "SALE";
    },
    pagination: {
      page?: number;
      pageSize?: number;
    }
  ): Promise<{
    immobiliers: Immobilier[];
    totalPages: number;
    totalItems: number;
  }> {
    const result = await realEstateService.getFilteredRealEstate(
      filters,
      pagination
    );

    return {
      immobiliers: result.data,
      totalPages: result.totalPages,
      totalItems: result.totalItems,
    };
  },
  async getSimilarRealEstate(
    category: string,
    excludeId: string
  ): Promise<Immobilier[]> {
    return await realEstateService.findSimilarRealEstate(category, excludeId);
  },
  async getLatestRealEstates(): Promise<Immobilier[]> {
    return await realEstateService.getLatestRealEstates();
  },
};

import { Immobilier, Vehicle } from "@prisma/client";
import { RealEstateService } from "@/services/RealEstateService";
import { RealEstateRepository } from "@/repositories/RealEstateRepository";

const repository = new RealEstateRepository();
const realEstateService = new RealEstateService(repository);

export const RealEstateController = {


  async getAllRealEstates(): Promise<Immobilier[]> {
    return await realEstateService.getAllRealEstates();
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


  async getFilteredRealEstates(filters: {
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
  }): Promise<Immobilier[]> {
    return await realEstateService.getFilteredRealEstate(filters);
  },
};

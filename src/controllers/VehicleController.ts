import { VehicleService } from "@/services/VehicleService";
import { VehicleRepository } from "@/repositories/VehicleRepository";
import { Vehicle } from "@prisma/client";

const repository = new VehicleRepository();
const vehicleService = new VehicleService(repository);

export const VehicleController = {
  async getAllVehicles(
    page: number,
    pageSize: number
  ): Promise<{
    vehicles: Vehicle[];
    totalPages: number;
    totalItems: number;
  }> {
    const result = await vehicleService.getAllVehicles(page, pageSize);

    return {
      vehicles: result.data, 
      totalPages: result.totalPages,
      totalItems: result.totalItems,
    };
  },


  async getVehicleById(id: string): Promise<Vehicle | null> {
    return await vehicleService.getVehicleById(id);
  },

  async createVehicle(vehicleData: Vehicle): Promise<void> {
    return await vehicleService.createVehicle(vehicleData);
  },

  async deleteVehicle(id: string): Promise<void> {
    return await vehicleService.deleteVehicle(id);
  },

  async getAvailableVehicles(): Promise<Vehicle[]> {
    return await vehicleService.getAvailableVehicles();
  },

  async getVehiclesByBrand(brand: string): Promise<Vehicle[]> {
    return await vehicleService.getVehiclesByBrand(brand);
  },

  async getFilteredVehicles(filters: {
    availability?: boolean;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
    category?: string;
    searchQuery?: string;
    startDate?: Date;
    endDate?: Date;
    saleStatus?: "RENT" | "SALE";
  }): Promise<Vehicle[]> {
    return await vehicleService.getFilteredVehicles(filters);
  },

  async getSimilarVehicles(
    category: string,
    excludeId: string
  ): Promise<Vehicle[]> {
    return await vehicleService.findSimilarVehicles(category, excludeId);
  },
};

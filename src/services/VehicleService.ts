import { Vehicle } from "@prisma/client";
import { VehicleRepository } from "@/repositories/VehicleRepository";
import { PaginatedResult } from "@/types/allType";

export class VehicleService {
  private repository: VehicleRepository;

  constructor(repository: VehicleRepository) {
    this.repository = repository;
  }


  async toggleAvailability(vehicleId: string, availability: boolean):Promise<Vehicle> {
    return this.repository.toggleAvailability(vehicleId, availability);
  }
  
  async getAllVehicles(
    page: number,
    pageSize: number
  ): Promise<PaginatedResult<Vehicle>> {
    return this.repository.findAll(page, pageSize);
  }

  async getVehicleById(id: string): Promise<Vehicle | null> {
    return this.repository.findById(id);
  }

  async createVehicle(vehicleData: Vehicle): Promise<void> {
    return this.repository.save(vehicleData);
  }

  async deleteVehicle(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async getAvailableVehicles(): Promise<Vehicle[]> {
    return this.repository.findAvailableVehicles();
  }

  async getVehiclesByBrand(brand: string): Promise<Vehicle[]> {
    return this.repository.findByBrand(brand);
  }

  async getFilteredVehicles(
    filters: {
      availability?: boolean;
      brand?: string;
      minPrice?: number;
      maxPrice?: number;
      location?: string;
      category?: string;
      minRating?: number;
      searchQuery?: string;
      startDate?: Date;
      endDate?: Date;
      saleStatus?: "RENT" | "SALE";
      condition?: string;
    },
    pagination: {
      page?: number;
      pageSize?: number;
    }
  ): Promise<PaginatedResult<Vehicle>> {
    return this.repository.getFilteredVehicles(filters, pagination);
  }

  async findSimilarVehicles(
    category: string,
    excludeId: string
  ): Promise<Vehicle[]> {
    return this.repository.findSimilarVehicles(category, excludeId);
  }

  async getLatestVehicles(): Promise<Vehicle[]> {
    return this.repository.getLatestVehicles();
  }
}

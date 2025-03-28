import { Vehicle } from "@prisma/client";
import { IRepository } from "./generic/IRepository";
import { PaginatedResult } from "@/types/allType";

export interface IVehicleRepository extends IRepository<Vehicle> {

  toggleAvailability(vehicleId: string, availability: boolean): Promise<Vehicle>;
  findAvailableVehicles(): Promise<Vehicle[]>;
  findByBrand(brand: string): Promise<Vehicle[]>;
  getFilteredVehicles(
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
    },
    pagination: {
      page?: number;
      pageSize?: number;
    }
  ): Promise<PaginatedResult<Vehicle>>;

  findSimilarVehicles(category: string, excludeId: string): Promise<Vehicle[]>;
}

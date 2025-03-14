import { Vehicle } from "@prisma/client";
import { IRepository } from "./generic/IRepository";

export interface IVehicleRepository extends IRepository<Vehicle> {
  findAvailableVehicles(): Promise<Vehicle[]>;
  findByBrand(brand: string): Promise<Vehicle[]>;
  getFilteredVehicles(filters: {
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
  }): Promise<Vehicle[]>;
}

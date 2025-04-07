import { Immobilier } from "@prisma/client";
import { IRepository } from "./generic/IRepository";
import { PaginatedResult } from "@/types/allType";

export interface IRealEstateRepository extends IRepository<Immobilier> {
    getFilteredImmobilier(filters: {
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
      },  pagination: {
        page?: number;
        pageSize?: number;
      }): Promise<PaginatedResult<Immobilier>>;
    
      findSimilarImmobilier(category: string, excludeId: string): Promise<Immobilier[]>;
      getLatestImmobilier(): Promise<Immobilier[]>;
      toggleAvailability(
        immobilierId: string,
        availability: boolean
      ): Promise<Immobilier>;
}

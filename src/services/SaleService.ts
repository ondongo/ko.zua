import { SaleRepository } from "@/repositories/SaleRepository";
import { Vente } from "@prisma/client";

export class SaleService {
    private repository: SaleRepository;
  
    constructor(repository: SaleRepository) {
      this.repository = repository;
    }
  
    async createSale(saleData: Vente): Promise<void> {
      return this.repository.save(saleData);
    }
  }
  
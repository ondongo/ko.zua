import { SaleRepository } from "@/repositories/SaleRepository";
import { PaginatedResult } from "@/types/allType";
import { Vente } from "@prisma/client";

export class SaleService {
  private repository: SaleRepository;

  constructor(repository: SaleRepository) {
    this.repository = repository;
  }

  async createSale(saleData: Vente): Promise<void> {
    return this.repository.save(saleData);
  }
  async deleteSale(id: string): Promise<void> {
    return this.repository.delete(id);
  }
  async getAllSales(
    page: number,
    pageSize: number
  ): Promise<PaginatedResult<Vente>> {
    return this.repository.findAll(page, pageSize);
  }
}

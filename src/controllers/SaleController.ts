import { Vente } from "@prisma/client";
import { SaleService } from "@/services/SaleService";
import { SaleRepository } from "@/repositories/SaleRepository";

const repository = new SaleRepository();
const saleService = new SaleService(repository);

export const SaleController = {
  async getAllSales(
    page: number,
    pageSize: number
  ): Promise<{
    sales: Vente[];
    totalPages: number;
    totalItems: number;
  }> {
    const result = await saleService.getAllSales(page, pageSize);

    return {
      sales: result.data,
      totalPages: result.totalPages,
      totalItems: result.totalItems,
    };
  },

  async createSale(saleData: Vente): Promise<void> {
    return await saleService.createSale(saleData);
  },

  async deleteSale(id: string): Promise<void> {
    return await saleService.deleteSale(id);
  },
};

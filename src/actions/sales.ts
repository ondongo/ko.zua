"use server"
import { SaleController } from "@/controllers/SaleController";
import { Vente } from "@prisma/client";

export async function deleteSale(saleId: string): Promise<void> {
  await SaleController.deleteSale(saleId);
}
export async function createSale(saleData: Vente): Promise<void> {
  await SaleController.createSale(saleData);
}
export async function getAllSales(page: number, pageSize: number) {
  const result = await SaleController.getAllSales(page, pageSize);

  const data = result.sales.map((sale) => ({
    id: sale.id,
    vehicleId: sale.vehicleId ?? "",
    immobilierId: sale.immobilierId ?? "",
    saleDate: sale.saleDate ? new Date(sale.saleDate) : new Date(),
    createdAt: sale.createdAt ? new Date(sale.createdAt) : new Date(),
    customerName: sale.customerName,
    customerPhone: sale.customerPhone,
    customerEmail: sale.customerEmail ?? "",
    price: sale.price,
  }));
  return {
    sales: data,
    totalPages: result.totalPages ?? 1,
    totalItems: result.totalItems ?? 0,
  };
}

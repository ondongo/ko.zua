export interface Vente {
  id: string;
  vehicleId?: string | null;
  immobilierId?: string | null;
  saleDate: Date;
  price: number;
  customerName: string;
  customerPhone?: string | null;
  customerEmail?: string | null;
  createdAt: Date;
}

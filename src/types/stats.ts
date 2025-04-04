export interface ReservationStats {
  id: string;
  year: number;
  month: number;
  day: number;
  totalCount: number;
  createdAt: Date;
}

export interface VenteStats {
  id: string;
  year: number;
  month: number;
  day: number;
  totalSales: number;
  totalRevenue: number;
  createdAt: Date;
}

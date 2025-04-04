export type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface Reservation {
  id: string;
  vehicleId?: string | null;
  immobilierId?: string | null;
  startDate: Date;
  endDate: Date;
  status: ReservationStatus;
  price: number;
  customerName: string;
  customerPhone?: string | null;
  customerEmail?: string | null;
  createdAt: Date;
  vehicle?:any;
  immobilier?:any;
}

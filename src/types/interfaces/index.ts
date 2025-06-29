export interface ReservationData {
    phone: string;
    name: string;
    email: string;
    reservationName: string;
    date: string;
    reservationType: "sale" | "simple" | "eclair";
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date;
  }
  
  
  export interface InvoiceData {
    id: string;
    createdAt: Date;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    name: string;
    reservationType: "sale" | "simple" | "eclair";
    category: string;
    price: number;
    startDate: Date | null;
    endDate: Date | null;
  }

  export interface DateRangeType {
    startDate: Date;
    endDate: Date;
    key: string;
  }
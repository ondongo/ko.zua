export interface Reservation {
    id: string;
    userId: string;
    type: string;
    itemId: string;
    dateStart: string;
    dateEnd: string;
    status: string;
    paymentStatus: string;
    totalAmount: number;
  }
  
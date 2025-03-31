import { Reservation } from "@prisma/client";
import { ReservationRepository } from "@/repositories/ReservationRepository";
import { ReservationService } from "@/services/ReservationService";

const repository = new ReservationRepository();
const reservationService = new ReservationService(repository);

export const ReservationController = {
  async getAllReservations(
    page: number,
    pageSize: number
  ): Promise<{
    reservations: Reservation[];
    totalPages: number;
    totalItems: number;
  }> {
    const result = await reservationService.getAllReservations(page, pageSize);

    return {
      reservations: result.data,
      totalPages: result.totalPages,
      totalItems: result.totalItems,
    };
  },

  async createReservation(reservationData: Reservation): Promise<void> {
    return await reservationService.createReservation(reservationData);
  },

  async deleteReservation(id: string): Promise<void> {
    return await reservationService.deleteReservation(id);
  },
};

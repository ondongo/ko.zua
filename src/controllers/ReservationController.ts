import { ReservationRepository } from "@/repositories/ReservationRepository";
import { ReservationService } from "@/services/ReservationService";
import { Reservation } from "@prisma/client";

const repository = new ReservationRepository();
const reservationService = new ReservationService(repository);

export const VehicleController = {
  async createReservation(reservationData: Reservation): Promise<void> {
    return await reservationService.createReservation(reservationData);
  },
};

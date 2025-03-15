import { ReservationRepository } from "@/repositories/ReservationRepository";
import { Reservation } from "@prisma/client";

export class ReservationService {
  private repository: ReservationRepository;

  constructor(repository: ReservationRepository) {
    this.repository = repository;
  }

  async createReservation(reservationData: Reservation): Promise<void> {
    return this.repository.save(reservationData);
  }
}

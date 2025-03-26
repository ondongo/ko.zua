import { ReservationRepository } from "@/repositories/ReservationRepository";
import { PaginatedResult } from "@/types/allType";
import { Reservation } from "@prisma/client";

export class ReservationService {
  private repository: ReservationRepository;

  constructor(repository: ReservationRepository) {
    this.repository = repository;
  }

  async createReservation(reservationData: Reservation): Promise<void> {
    return this.repository.save(reservationData);
  }
  async deleteReservation(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async getAllReservations(
    page: number,
    pageSize: number
  ): Promise<PaginatedResult<Reservation>> {
    return this.repository.findAll(page, pageSize);
  }
}

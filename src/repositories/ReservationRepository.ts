import { Reservation } from "@prisma/client";
import { GenericRepository } from "./generic/PrismaRepository";
import { IReservationRepository } from "./IReservationRepository";

export class ReservationRepository
  extends GenericRepository<Reservation>
  implements IReservationRepository
{
  constructor() {
    super(prisma.vehicle);
  }
}

import { Reservation } from "@prisma/client";
import { GenericRepository } from "./generic/PrismaRepository";
import { IReservationRepository } from "./IReservationRepository";
import { prisma } from "@/configs/prisma";
export class ReservationRepository
  extends GenericRepository<Reservation>
  implements IReservationRepository
{
  constructor() {
    super(prisma.reservation);
  }
}

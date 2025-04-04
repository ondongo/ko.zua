import { ReservationStats } from "@prisma/client";
import { IRepository } from "./generic/IRepository";

export interface IReservationStatsRepository
  extends IRepository<ReservationStats> {}

import { Reservation } from "@prisma/client";
import { IRepository } from "./generic/IRepository";

export interface IReservationRepository extends IRepository<Reservation> {}

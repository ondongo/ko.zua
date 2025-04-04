import { VenteStats } from "@prisma/client";
import { IRepository } from "./generic/IRepository";

export interface ISaleStatsRepository extends IRepository<VenteStats> {}

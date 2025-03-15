import { Immobilier } from "@prisma/client";
import { IRepository } from "./generic/IRepository";

export interface IRealEstateRepository extends IRepository<Immobilier> {}

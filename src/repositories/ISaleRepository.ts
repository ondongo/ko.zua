import { Vente } from "@prisma/client";
import { IRepository } from "./generic/IRepository";

export interface ISaleRepository extends IRepository<Vente> {}

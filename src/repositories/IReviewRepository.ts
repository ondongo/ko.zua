import { Rating } from "@prisma/client";
import { IRepository } from "./generic/IRepository";

export interface IReviewRepository extends IRepository<Rating> {}

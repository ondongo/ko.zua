import { Rating } from "@prisma/client";
import { IRepository } from "./generic/IRepository";

export interface IReviewRepository extends IRepository<Rating> {
    getLastFiveRatingsForVehicle(vehicleId: string): Promise<Rating[]>;
    getLastFiveRatingsForImmobilier(immobilierId: string): Promise<Rating[]>;
    getAverageRatingForVehicle(vehicleId: string): Promise<number>;
    getAverageRatingForImmobilier(immobilierId: string): Promise<number>;
    
}

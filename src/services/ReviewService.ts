import { ReviewRepository } from "@/repositories/ReviewRepository";
import { Rating } from "@prisma/client";

export class ReviewService {
  private repository: ReviewRepository;

  constructor(repository: ReviewRepository) {
    this.repository = repository;
  }

  async createReview(reviewData: Rating): Promise<void> {
    return this.repository.save(reviewData);
  }

  async deleteReview(id: string): Promise<void> {
    return this.repository.delete(id);
  }
  async getLastFiveRatingsForVehicle(vehicleId: string){
    return this.repository.getLastFiveRatingsForVehicle(vehicleId);
  }

  async getLastFiveRatingsForImmobilier(immobilierId: string){
    return this.repository.getLastFiveRatingsForVehicle(immobilierId);
  }

  async getAverageRatingForVehicle(immobilierId: string){
    return this.repository.getAverageRatingForVehicle(immobilierId);
  }

  async getAverageRatingForImmobilier(vehicleId: string){
    return this.repository.getAverageRatingForImmobilier(vehicleId);
  }
}

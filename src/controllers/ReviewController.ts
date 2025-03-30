import { ReviewRepository } from "@/repositories/ReviewRepository";
import { ReviewService } from "@/services/ReviewService";
import { Rating } from "@prisma/client";

const repository = new ReviewRepository();
const vehicleService = new ReviewService(repository);

export const ReviewController = {
  async createReview(reviewData: Rating): Promise<void> {
    return await vehicleService.createReview(reviewData);
  },

  async deleteReview(id: string): Promise<void> {
    return await vehicleService.deleteReview(id);
  },
  async getLastFiveRatingsForVehicle(vehicleId: string) {
    return await vehicleService.getLastFiveRatingsForVehicle(vehicleId);
  },

  async getLastFiveRatingsForImmobilier(immobilierId: string) {
    return await vehicleService.getLastFiveRatingsForVehicle(immobilierId);
  },

  async getAverageRatingForVehicle(immobilierId: string): Promise<number> {
    return await vehicleService.getAverageRatingForVehicle(immobilierId);
  },

  async getAverageRatingForImmobilier(vehicleId: string): Promise<number> {
    return await vehicleService.getAverageRatingForImmobilier(vehicleId);
  },
};

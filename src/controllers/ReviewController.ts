import { ReviewRepository } from "@/repositories/ReviewRepository";
import { ReviewService } from "@/services/ReviewService";
import { Rating } from "@prisma/client";

const repository = new ReviewRepository();
const reviewService = new ReviewService(repository);

export const ReviewController = {
  async createReview(reviewData: Rating): Promise<void> {
    return await reviewService.createReview(reviewData);
  },

  async deleteReview(id: string): Promise<void> {
    return await reviewService.deleteReview(id);
  },
  async getLastFiveRatingsForVehicle(vehicleId: string) {
    return await reviewService.getLastFiveRatingsForVehicle(vehicleId);
  },

  async getLastFiveRatingsForImmobilier(immobilierId: string) {
    return await reviewService.getLastFiveRatingsForImmobilier(immobilierId);
  },

  async getAverageRatingForVehicle(vehicleId: string): Promise<number> {
    return await reviewService.getAverageRatingForVehicle(vehicleId);
  },

  async getAverageRatingForImmobilier(immobilierId: string): Promise<number> {
    return await reviewService.getAverageRatingForImmobilier(immobilierId);
  },
};

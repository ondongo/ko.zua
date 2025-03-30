"use server";
import { ReviewController } from "@/controllers/ReviewController";
import { Rating } from "@prisma/client";

export async function createReview(reviewData: Rating): Promise<void> {
  await ReviewController.createReview(reviewData);
}

export async function getLastFiveRatingsForVehicle(vehicleId: string): Promise<
  {
    id: string;
    vehicleId?: string;
    immobilierId?: string;
    stars: number;
    authorName: string;
    content: string;
    createdAt: Date;
  }[]
> {
  const result = await ReviewController.getLastFiveRatingsForVehicle(vehicleId);
  return result.map((rating) => ({
    id: rating.id,
    vehicleId: rating.vehicleId ?? "",
    immobilierId: rating.immobilierId ?? "",
    stars: rating.stars,
    authorName: rating.authorName,
    content: rating.content,
    createdAt: rating.createdAt,
  }));
}

export async function getAverageRatingForVehicle(vehicleId: string) {
  return await ReviewController.getAverageRatingForVehicle(vehicleId);
}

export async function getLastFiveRatingsForImmobilier(
  immobilierId: string
): Promise<
  {
    id: string;
    vehicleId?: string;
    immobilierId?: string;
    stars: number;
    authorName: string;
    content: string;
    createdAt: Date;
  }[]
> {
  const result = await ReviewController.getLastFiveRatingsForImmobilier(
    immobilierId
  );
  return result.map((rating) => ({
    id: rating.id,
    vehicleId: rating.vehicleId ?? "",
    immobilierId: rating.immobilierId ?? "",
    stars: rating.stars,
    authorName: rating.authorName,
    content: rating.content,
    createdAt: rating.createdAt,
  }));
}

export async function getAverageRatingForImmobilier(immobilierId: string) {
  return await ReviewController.getAverageRatingForImmobilier(immobilierId);
}

"use server"
import { ReservationController } from "@/controllers/ReservationController";
import { Reservation } from "@prisma/client";

export async function deleteReservation(reservationId: string): Promise<void> {
  await ReservationController.deleteReservation(reservationId);
}
export async function createReservation(
  reservationData: Reservation
): Promise<void> {
  await ReservationController.createReservation(reservationData);
}

export async function getAllReservations(page: number, pageSize: number) {
  const result = await ReservationController.getAllReservations(page, pageSize);

  const data = result.reservations.map((reservation) => ({
    id: reservation.id,
    startDate: reservation.startDate,
    endDate: reservation.endDate,
    vehicleId: reservation.vehicleId ?? "",
    immobilierId: reservation.immobilierId ?? "",
    createdAt: reservation.createdAt
      ? new Date(reservation.createdAt)
      : new Date(),
    status: reservation.status,
    customerName: reservation.customerName,
    customerPhone: reservation.customerPhone,
    customerEmail: reservation.customerEmail ?? "",
    price: reservation.price,
  }));
  return {
    reservations: data,
    totalPages: result.totalPages ?? 1,
    totalItems: result.totalItems ?? 0,
  };
}

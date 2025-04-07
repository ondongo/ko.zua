import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { Reservation, ReservationStatus } from "@/types/reservation";
import Invoice from "@/components/Invoice";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function TableReservations({
  reservations,
}: {
  reservations: Reservation[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium"
                >
                  Nom du client
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium"
                >
                  Téléphone
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium"
                >
                  Date début
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium"
                >
                  Date fin
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium"
                >
                  Prix
                </TableCell>
             
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100">
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="px-5 py-3 text-theme-sm text-gray-700">
                    {reservation.customerName}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-sm text-gray-700">
                    {reservation.customerPhone || "-"}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-sm text-gray-700">
                    {reservation.customerEmail || "-"}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-sm text-gray-700">
                    {new Date(reservation.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-sm text-gray-700">
                    {new Date(reservation.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-sm text-gray-700">
                    {reservation.price.toLocaleString()} CFA
                  </TableCell>
              
                  <TableCell className="px-5 py-3 text-theme-sm text-white">
                    <PDFDownloadLink
                      document={
                        <Invoice
                          invoice={{
                            id: reservation.id,
                            createdAt: reservation.createdAt,
                            customerName: reservation.customerName,
                            customerEmail: reservation.customerEmail ?? "",
                            customerPhone: reservation.customerPhone ?? "",
                            reservationType: "simple",
                            category:
                              reservation.vehicleId != null
                                ? "Véhicule"
                                : "Immobilier",
                            price: reservation.price,
                            startDate: reservation.startDate,
                            endDate: reservation.endDate,
                          
                          }}
                        />
                      }
                      fileName="facture.pdf"
                    >
                      {({ loading }) => (
                        <button
                          className="hidden md:block btn w-full py-2 text-sm md:text-base lg:py-3 rounded-md md:rounded-lg bg-yellowkouzua hover:bg-yellowkouzua-dark px-4"
                          disabled={loading} // Désactiver le bouton pendant le téléchargement
                        >
                          {loading ? (
                            <div className="spinner"></div>
                          ) : (
                            "Générer la facture"
                          )}
                        </button>
                      )}
                    </PDFDownloadLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

// Exemple de fonction à adapter selon ta logique backend

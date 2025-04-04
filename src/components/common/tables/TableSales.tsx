"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Vente } from "@/types/sale";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "@/components/Invoice";

export default function TableSales({ sales }: { sales: Vente[] }) {

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1024px]">
          <Table>
            <TableHeader className="border-b border-gray-100">
              <TableRow>
                <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Nom du client
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Téléphone
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Email
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Date de vente
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Prix
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                    {sale.customerName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                    {sale.customerPhone || "-"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                    {sale.customerEmail || "-"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                    {new Date(sale.saleDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                    {sale.price} CFA
                  </TableCell>
                  <TableCell className="px-4 py-3 text-white text-theme-sm">
                    <div className="flex gap-2">
                     
                        <PDFDownloadLink
                          document={<Invoice invoice={{
                            id: sale.id,
                            createdAt: sale.createdAt,
                            customerName: sale.customerName,
                            customerEmail: sale.customerEmail ?? "",
                            customerPhone: sale.customerPhone ?? "",
                            reservationType: "sale",
                            category: sale.vehicleId != null ? "Véhicule" : "Immobilier",
                            price: sale.price,
                          
                          }} />}
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
                      
                    </div>
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

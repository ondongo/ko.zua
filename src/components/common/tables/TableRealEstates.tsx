import React from "react";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { RealEstate } from "@/types/real_estate";

export default function TableRealEstates({ real_estates }: { real_estates: RealEstate[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white  ">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 ">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs "
                >
                  Image
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs "
                >
                  Nom de l&apos;immobilier
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs "
                >
                  Catégorie
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs "
                >
                  Prix
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs "
                >
                  Disponibilité
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs "
                >
                  Ville
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs "
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {real_estates?.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm ">
                    <div className="flex -space-x-2">
                      {Array.isArray(r.images) &&
                        r.images.length > 0 &&
                        r.images.map((srcImage, index) => (
                          <div
                            key={index}
                            className="w-14 h-14 overflow-hidden border-2 border-white rounded-full"
                          >
                            <Image
                              width={30}
                              height={30}
                              src={srcImage || "/placeholder.jpg"}
                              alt={`Photo principale ${index + 1}`}
                              className="w-full h-full object-cover"
                              
                            />
                          </div>
                        ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm ">
                    {r.name}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm ">
                    {r.category}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm ">
                    {r.price} CFA
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm ">
                    <Badge
                      size="sm"
                      color={r.availability === true ? "success" : "error"}
                    >
                      {r.availability ? "Disponible" : "Indisponible"}
                    </Badge>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                    {r.location.city}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                        Modifier
                      </button>
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
                        Supprimer
                      </button>
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

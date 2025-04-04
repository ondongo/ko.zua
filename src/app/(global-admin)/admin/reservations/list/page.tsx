"use client";

import { getAllReservations } from "@/actions/reservations";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import Pagination from "@/components/common/tables/Pagination";
import TableReservations from "@/components/common/tables/TableReservations";
import { Reservation } from "@/types/reservation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

export default function ReservationList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

  const fetchReservations = async () => {
    const result = await getAllReservations(currentPage, 4);
    setReservations(result.reservations);
    setTotalPages(result.totalPages);
  };

  useEffect(() => {
    fetchReservations();
  }, [currentPage]);

  return (
    <div>
      <PageBreadcrumb pageTitle="Liste des réservations" />
      <div className="space-y-6">
        <ComponentCard title="Liste des réservations">
          <TableReservations reservations={reservations} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </ComponentCard>
      </div>
    </div>
  );
}

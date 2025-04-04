"use client";
import { getAllSales } from "@/actions/sales";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import Pagination from "@/components/common/tables/Pagination";
import TableSales from "@/components/common/tables/TableSales";
import { Vente } from "@/types/sale";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

export default function ReservationList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sales, setSales] = useState<Vente[]>([]);
  const [totalPages, setTotalPages] = useState(0);
 

  const fetchSales = async () => {
    const result = await getAllSales(currentPage, 4);
    setSales(result.sales);
    setTotalPages(result.totalPages);
  };

  useEffect(() => {
    fetchSales();
  }, [currentPage]);

  return (
    <div>
      <PageBreadcrumb pageTitle="Liste des ventes" />
      <div className="space-y-6">
        <ComponentCard title="Liste des ventes">
          <TableSales sales={sales} />
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

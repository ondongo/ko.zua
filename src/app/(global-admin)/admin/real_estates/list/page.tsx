"use client";

import { getAllRealEstates } from "@/actions/realEstates";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pagination from "@/components/common/tables/Pagination";
import TableRealEstates from "@/components/common/tables/TableRealEstates";
import { RealEstate } from "@/types/real_estate";
import { useEffect, useState } from "react";

import React from "react";

export default function RealEstatesList() {
  const [currentPage, setCurrentPage] = useState(1);

  const [realEstates, setRealEstates] = useState<RealEstate[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const fetchRealEstates = async () => {
    const result = await getAllRealEstates(currentPage, 4);
    setRealEstates(result.immobiliers);
    setTotalPages(result.totalPages);
  };

  useEffect(() => {
    fetchRealEstates();
  }, [currentPage]);
  return (
    <div>
      <PageBreadcrumb pageTitle="Liste des logements" />
      <div className="space-y-6">
        <ComponentCard title="Liste des logements">
          <TableRealEstates real_estates={realEstates} />
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

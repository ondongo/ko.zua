"use client";

import { getAllVehicles } from "@/actions/vehicles";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import Pagination from "@/components/common/tables/Pagination";
import TableVehicles from "@/components/common/tables/TableVehicles";
import { Vehicle } from "@/types/vehicle";
import { useEffect, useState } from "react";

import React from "react";

export default function VehiclesList() {
  const [currentPage, setCurrentPage] = useState(1);

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const fetchVehicles = async () => {
    const result = await getAllVehicles(currentPage, 4);
    setVehicles(result.vehicles);
    setTotalPages(result.totalPages);
  };

  useEffect(() => {
    fetchVehicles();
  }, [currentPage]);
  return (
    <div>
      <PageBreadcrumb pageTitle="Liste des vehicules" />
      <div className="space-y-6">
        <ComponentCard title="Liste des vehicules">
          <TableVehicles vehicles={vehicles} />
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

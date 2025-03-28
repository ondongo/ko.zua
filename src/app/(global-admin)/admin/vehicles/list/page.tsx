"use client";

import {
  deleteVehicle,
  getAllVehicles,
  toggleAvailability,
} from "@/actions/vehicles";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import Pagination from "@/components/common/tables/Pagination";
import TableVehicles from "@/components/common/tables/TableVehicles";
import { Vehicle } from "@/types/vehicle";
import { useEffect, useState } from "react";

import React from "react";
import { toast } from "react-toastify";

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

  const handleToggleAvailability = async (
    vehicleId: string,
    availability: boolean
  ) => {
    try {
      const updatedVehicle = await toggleAvailability(vehicleId, availability);
      setVehicles((prevVehicles) =>
        prevVehicles.map((v) =>
          v.id === updatedVehicle.id ? updatedVehicle : v
        )
      );
    } catch (error) {
      console.error("Erreur lors du changement d'état du véhicule :", error);
      toast.error("Erreur lors du changement d'état du véhicule");
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    try {
      await deleteVehicle(vehicleId);
      fetchVehicles();
      toast.success("Le véhicule a été supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression du véhicule :", error);
      toast.error("Erreur lors de la suppression du véhicule");
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Liste des vehicules" />
      <div className="space-y-6">
        <ComponentCard title="Liste des vehicules">
          <TableVehicles
            vehicles={vehicles}
            toggleAvailability={handleToggleAvailability}
            handleDeleteVehicle={handleDeleteVehicle}
          />
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

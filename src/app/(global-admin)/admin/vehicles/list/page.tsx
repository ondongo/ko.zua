"use client";

import {
  deleteVehicle,
  getAllVehicles,
  toggleAvailability,
} from "@/actions/vehicles";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DashboardListSkeleton from "@/components/skeletons/DashboardListSkeleton";
import Pagination from "@/components/common/tables/Pagination";
import TableVehicles from "@/components/common/tables/TableVehicles";
import { Vehicle } from "@/types/vehicle";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import React from "react";
import { toast } from "react-toastify";

export default function VehiclesList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchVehicles = async () => {
    setLoading(true);
    const result = await getAllVehicles(currentPage, 4);
    setVehicles(result.vehicles);
    setTotalPages(result.totalPages);
    setLoading(false);
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

  const handleEditLink = (vehicleId: string) => {
    router.push(`/admin/vehicles/edit/${vehicleId}`);
  };

  if (loading) {
    return <DashboardListSkeleton rows={4} columns={7} />;
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Liste des vehicules" />
      <div className="space-y-6">
        <ComponentCard title="Liste des vehicules">
          <TableVehicles
            vehicles={vehicles}
            toggleAvailability={handleToggleAvailability}
            handleDeleteVehicle={handleDeleteVehicle}
            handleEditLink={handleEditLink}
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

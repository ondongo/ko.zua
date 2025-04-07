"use client";

import {
  deleteRealEstate,
  getAllRealEstates,
  toggleAvailability,
} from "@/actions/realEstates";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pagination from "@/components/common/tables/Pagination";
import TableRealEstates from "@/components/common/tables/TableRealEstates";
import { RealEstate } from "@/types/real_estate";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import React from "react";
import { toast } from "react-toastify";

export default function RealEstatesList() {
  const [currentPage, setCurrentPage] = useState(1);

  const [realEstates, setRealEstates] = useState<RealEstate[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();
  const fetchRealEstates = async () => {
    const result = await getAllRealEstates(currentPage, 4);
    setRealEstates(result.immobiliers);
    setTotalPages(result.totalPages);
  };

  useEffect(() => {
    fetchRealEstates();
  }, [currentPage]);

  const handleToggleAvailability = async (
    immobilierId: string,
    availability: boolean
  ) => {
    try {
      const updatedImmobilier = await toggleAvailability(
        immobilierId,
        availability
      );
      setRealEstates((prevImmobiliers) =>
        prevImmobiliers.map((imm) =>
          imm.id === updatedImmobilier.id ? updatedImmobilier : imm
        )
      );
    } catch (error) {
      console.error("Erreur lors du changement d'état du véhicule :", error);
      toast.error("Erreur lors du changement d'état du véhicule");
    }
  };

  const handleDeleteImmobilier = async (immobilierId: string) => {
    try {
      await deleteRealEstate(immobilierId);
      fetchRealEstates();
      toast.success("Le véhicule a été supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression du véhicule :", error);
      toast.error("Erreur lors de la suppression du véhicule");
    }
  };

  const handleEditLink = (vehicleId: string) => {
    router.push(`/admin/real_estates/edit/${vehicleId}`);
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Liste des logements" />
      <div className="space-y-6">
        <ComponentCard title="Liste des logements">
          <TableRealEstates
            real_estates={realEstates}
            toggleAvailability={handleToggleAvailability}
            handleDeleteImmobilier={handleDeleteImmobilier}
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

import { useState, useEffect } from "react";

import { VehicleController } from "@/controllers/VehicleController";
import { Vehicle } from "@/types/vehicle";

export const useVehicle = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Récupérer tous les véhicules
  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);

    try {
      //const data = await VehicleController.getAllVehicles();
      //setVehicles(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer un véhicule par ID
  const fetchVehicleById = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      return null;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Créer un nouveau véhicule
  const createVehicle = async (vehicleData: Vehicle) => {
    setLoading(true);
    setError(null);

    try {
      //await VehicleController.createVehicle(vehicleData);
      fetchVehicles(); // Rafraîchir la liste
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un véhicule
  const deleteVehicle = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await VehicleController.deleteVehicle(id);
      fetchVehicles(); // Rafraîchir la liste
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Rechercher des véhicules par plage de prix
  /*   const searchVehiclesByPrice = async (minPrice: number, maxPrice: number) => {
    setLoading(true);
    setError(null);

    try {
      const data = await VehicleController.searchVehiclesByPriceRange(minPrice, maxPrice);
      setVehicles(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }; */

  return {
    vehicles,
    loading,
    error,
    fetchVehicles,
    fetchVehicleById,
    createVehicle,
    deleteVehicle,
    //searchVehiclesByPrice,
  };
};

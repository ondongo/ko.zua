"use server";

import { VehicleController } from "@/controllers/VehicleController";
import { Vehicle } from "@/types/vehicle";
import { Vehicle as PrismaVehicle } from "@prisma/client";

export async function getAllVehicles(): Promise<Vehicle[]> {
  const vehicles: PrismaVehicle[] = await VehicleController.getAllVehicles();

  return vehicles.map((vehicle) => ({
    id: vehicle.id,
    name: vehicle.name,
    description: vehicle.description ?? "",
    global: vehicle.global,
    category: vehicle.category,
    condition: vehicle.condition ?? "Neuf", // Condition par défaut "Neuf"
    type: vehicle.type,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    pricePerDay: vehicle.pricePerDay,
    availability: vehicle.availability,
    saleStatus: vehicle.saleStatus, // Statut de vente
    features: {
      mileage: (vehicle.features as any).mileage, // Accès via 'as any'
      fuel: (vehicle.features as any).fuel,
      transmission: (vehicle.features as any).gearBox,
      seats: (vehicle.features as any).seats,
      abs: (vehicle.features as any).abs ?? false,
      cruiseControl: (vehicle.features as any).cruiseControl ?? false,
      airBags: (vehicle.features as any).airBags ?? false,
      airConditioner: (vehicle.features as any).airConditioner,
    },
    location: {
      city: (vehicle.location as any).city ?? "",
      neighborhood: (vehicle.location as any).neighborhood ?? "",
    },
    images: vehicle.images ?? [],
    starCount: vehicle.starCount,
    doors: vehicle.doors,
    distance: vehicle.distance,
    gearBox: vehicle.gearBox,
    fuel: vehicle.fuel,
  }));
}

export async function getFilteredVehicles(filters: {
  availability?: boolean;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  category?: string;
  minRating?: number;
  searchQuery?: string;
  startDate?: Date;
  endDate?: Date;
}): Promise<Vehicle[]> {
  try {
    const vehicles = await VehicleController.getFilteredVehicles(filters);

    return vehicles.map((vehicle) => ({
      id: vehicle.id,
      name: vehicle.name,
      description: vehicle.description ?? undefined,
      global: vehicle.global,
      category: vehicle.category,
      condition: vehicle.condition ?? "Neuf", // Condition par défaut "Neuf"
      type: vehicle.type,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      pricePerDay: vehicle.pricePerDay,
      availability: vehicle.availability,
      saleStatus: vehicle.saleStatus, // Statut de vente
      features: {
        mileage: (vehicle.features as any).mileage, // Accès via 'as any'
        fuel: (vehicle.features as any).fuel,
        transmission: (vehicle.features as any).gearBox,
        seats: (vehicle.features as any).seats,
        abs: (vehicle.features as any).abs ?? false,
        cruiseControl: (vehicle.features as any).cruiseControl ?? false,
        airBags: (vehicle.features as any).airBags ?? false,
        airConditioner: (vehicle.features as any).airConditioner,
      },
      location: {
        city: (vehicle.location as any).city ?? "",
        neighborhood: (vehicle.location as any).neighborhood ?? "",
      },
      images: vehicle.images ?? [],
      starCount: vehicle.starCount,
      doors: vehicle.doors,
      distance: vehicle.distance,
      gearBox: vehicle.gearBox,
      fuel: vehicle.fuel,
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des véhicules filtrés :", error);
    return [];
  }
}

"use server";

import { VehicleController } from "@/controllers/VehicleController";
import { Vehicle } from "@/types/vehicle";
import { Vehicle as PrismaVehicle } from "@prisma/client";



export async function toggleAvailability(vehicleId: string, availability: boolean): Promise<Vehicle> {
  const vehicle: PrismaVehicle | null= await VehicleController.toggleAvailability(vehicleId, availability);
  return {
    id: vehicle.id,
    name: vehicle.name,
    description: vehicle.description ?? "",
    global: vehicle.global,
    category: vehicle.category,
    condition: vehicle.condition ?? "Neuf",
    type: vehicle.type,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    price: vehicle.price,
    availability: vehicle.availability,
    saleStatus: vehicle.saleStatus,
    features: {
      mileage: (vehicle.features as any).mileage,
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
    createdAt: vehicle.createdAt ? new Date(vehicle.createdAt) : new Date(),
  };
}

export async  function deleteVehicle(vehicleId: string): Promise<void> {
  await VehicleController.deleteVehicle(vehicleId);
}
export async function createVehicle(vehicleData: PrismaVehicle): Promise<void> {
  await VehicleController.createVehicle(vehicleData);
}


export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const vehicle: PrismaVehicle | null = await VehicleController.getVehicleById(
    id
  );

  if (!vehicle) {
    return null;
  }

  return {
    id: vehicle.id,
    name: vehicle.name,
    description: vehicle.description ?? "",
    global: vehicle.global,
    category: vehicle.category,
    condition: vehicle.condition ?? "Neuf",
    type: vehicle.type,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    price: vehicle.price,
    availability: vehicle.availability,
    saleStatus: vehicle.saleStatus,
    features: {
      mileage: (vehicle.features as any).mileage,
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
    createdAt: vehicle.createdAt ? new Date(vehicle.createdAt) : new Date(),
  };
}

export async function getAllVehicles(page: number, pageSize: number) {
  const result = await VehicleController.getAllVehicles(page, pageSize);

  const data = result.vehicles.map((vehicle) => ({
    id: vehicle.id,
    name: vehicle.name,
    description: vehicle.description ?? "",
    global: vehicle.global,
    category: vehicle.category,
    condition: vehicle.condition ?? "Neuf",
    type: vehicle.type,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    price: vehicle.price,
    availability: vehicle.availability,
    saleStatus: vehicle.saleStatus,
    features: {
      mileage: (vehicle.features as any).mileage,
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
    createdAt: vehicle.createdAt ? new Date(vehicle.createdAt) : new Date(),
  }));
  return {
    vehicles: data,
    totalPages: result.totalPages ?? 1,
    totalItems: result.totalItems ?? 0,
  };
}

export async function getFilteredVehicles(
  filters: {
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
    saleStatus?: "RENT" | "SALE";
  },
  pagination: {
    page?: number;
    pageSize?: number;
  }
) {
  try {
    const result = await VehicleController.getFilteredVehicles(
      filters,
      pagination
    );
    const data = result.vehicles.map((vehicle) => ({
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
      price: vehicle.price,
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
      createdAt: vehicle.createdAt ? new Date(vehicle.createdAt) : new Date(),
    }));
    return {
      vehicles: data,
      totalPages: result.totalPages ?? 1,
      totalItems: result.totalItems ?? 0,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des véhicules filtrés :",
      error
    );
    return [];
  }
}

export async function getSimilarVehicles(category: string, excludeId: string) {
  const vehicles = await VehicleController.getSimilarVehicles(
    category,
    excludeId
  );
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
    price: vehicle.price,
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
    createdAt: vehicle.createdAt ? new Date(vehicle.createdAt) : new Date(),
  }));
}

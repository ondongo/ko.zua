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
    subcategory: vehicle.subcategory,
    type: vehicle.type,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    pricePerDay: vehicle.pricePerDay,
    availability: vehicle.availability,
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
    location: vehicle.location as {
      city: string;
      neighborhood: string;
    },
    images: vehicle.images as string[],
    totalStars: vehicle.totalStars,
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

    //faire un console.log bien clean
    //console.log(vehicles);
    //console.log("----------------------------------------");
    
    return vehicles.map((vehicle) => ({
      id: vehicle.id,
      name: vehicle.name,
      description: vehicle.description ?? undefined,
      global: vehicle.global,
      category: vehicle.category,
      subcategory: vehicle.subcategory,
      type: vehicle.type,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      pricePerDay: vehicle.pricePerDay,
      availability: vehicle.availability,
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
      location: vehicle.location as {
        city: string;
        neighborhood: string;
      },
      images: vehicle.images as string[],
      totalStars: vehicle.totalStars,
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

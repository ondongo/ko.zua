"use server";

import { RealEstateController } from "@/controllers/RealEstateController";
import { RealEstate } from "@/types/real_estate";
import { Immobilier } from "@prisma/client";


export async function getAllRealEstates(): Promise<RealEstate[]> {
  const realEstates:Immobilier[] = await RealEstateController.getAllRealEstates();

    return realEstates.map((realEstate) => ({
        id: realEstate.id,
        name: realEstate.name,
        description: realEstate.description ?? "",
      
        category: realEstate.category,
    
        type: realEstate.type,
    
        price: realEstate.price,
        availability: realEstate.availability,
        saleStatus: realEstate.saleStatus,
        features: {
            bedrooms: (realEstate.features as any).bedrooms,
            bathrooms: (realEstate.features as any).bathrooms,
            surface: (realEstate.features as any).surface,
            furnished: (realEstate.features as any).furnished,
    
        },
        location: {
          city: (realEstate.location as any).city ?? "",
          neighborhood: (realEstate.location as any).neighborhood ?? "",
        },
        images: realEstate.images ?? [],
        starCount: realEstate.starCount,
       
        createdAt: realEstate.createdAt ? new Date(realEstate.createdAt) : new Date(),
      }
      ));
}

export async function getRealEstateById(id: string): Promise<RealEstate | null> {
  const realEstate: Immobilier | null = await RealEstateController.getRealEstateById(id);
  
  if (!realEstate) {
    return null;
  }

  return {
    id: realEstate.id,
    name: realEstate.name,
    description: realEstate.description ?? "",
  
    category: realEstate.category,

    type: realEstate.type,

    price: realEstate.price,
    availability: realEstate.availability,
    saleStatus: realEstate.saleStatus,
    features: {
        bedrooms: (realEstate.features as any).bedrooms,
        bathrooms: (realEstate.features as any).bathrooms,
        surface: (realEstate.features as any).surface,
        furnished: (realEstate.features as any).furnished,

    },
    location: {
      city: (realEstate.location as any).city ?? "",
      neighborhood: (realEstate.location as any).neighborhood ?? "",
    },
    images: realEstate.images ?? [],
    starCount: realEstate.starCount,
   
    createdAt: realEstate.createdAt ? new Date(realEstate.createdAt) : new Date(),
  };
}



export async function getFilteredRealEstates(filters: {
  availability?: boolean;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  neighborhood?: string;
  category?: string;
  minRating?: number;
  searchQuery?: string;
  startDate?: Date;
  endDate?: Date;
  saleStatus?: "RENT" | "SALE";
}): Promise<RealEstate[]> {
  try {
    const realEstates:Immobilier[] = await RealEstateController.getFilteredRealEstates(filters);

    return realEstates.map((realEstate) => ({
        id: realEstate.id,
        name: realEstate.name,
        description: realEstate.description ?? "",
        category: realEstate.category,
        type: realEstate.type,
        price: realEstate.price,
        availability: realEstate.availability,
        saleStatus: realEstate.saleStatus,
        features: {
            bedrooms: (realEstate.features as any).bedrooms,
            bathrooms: (realEstate.features as any).bathrooms,
            surface: (realEstate.features as any).surface,
            furnished: (realEstate.features as any).furnished
        },
        location: {
          city: (realEstate.location as any).city ?? "",
          neighborhood: (realEstate.location as any).neighborhood ?? "",
        },
        images: realEstate.images ?? [],
        starCount: realEstate.starCount,
       
        createdAt: realEstate.createdAt ? new Date(realEstate.createdAt) : new Date(),
      }
      ));
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des véhicules filtrés :",
      error
    );
    return [];
  }
}

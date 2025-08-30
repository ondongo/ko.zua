"use server";

import { RealEstateController } from "@/controllers/RealEstateController";
import { RealEstate } from "@/types/real_estate";
import { Immobilier } from "@prisma/client";

export async function toggleAvailability(
  vehicleId: string,
  availability: boolean
): Promise<RealEstate> {
  const realEstate: Immobilier | null =
    await RealEstateController.toggleAvailability(vehicleId, availability);

  return {
    id: realEstate.id,
    name: realEstate.name,
    description: realEstate.description ?? "",
    category: realEstate.category,
    type: realEstate.type,
    price: realEstate.price,
    discountedPrice: realEstate.discountedPrice ?? 0,
    availability: realEstate.availability,
    saleStatus: realEstate.saleStatus,

    bedrooms: realEstate.bedrooms ?? 0,
    bathrooms: realEstate.bathrooms ?? 0,
    furnished: realEstate.furnished ?? false,
    rooms: realEstate.rooms ?? 0,
    parcelSize: realEstate.parcelSize ?? 0,

    location: {
      city: (realEstate.location as any)?.city ?? "",
      neighborhood: (realEstate.location as any)?.neighborhood ?? "",
    },

    images: realEstate.images ?? [],
    starCount: realEstate.starCount ?? 0,
    views: realEstate.views ?? 0,

    createdAt: realEstate.createdAt
      ? new Date(realEstate.createdAt)
      : new Date(),
    updatedAt: realEstate.updatedAt ?? new Date(),
  };
}

export async function createOrUpdateRealEstate(
  realEstateData: any
): Promise<void> {
  await RealEstateController.createOrUpdateRealEstate(realEstateData);
}

export async function deleteRealEstate(id: string): Promise<void> {
  await RealEstateController.deleteRealEstate(id);
}

export async function getAllRealEstates(page: number, pageSize: number) {
  const result = await RealEstateController.getAllRealEstates(page, pageSize);

  const data = result.immobiliers.map((realEstate) => ({
    id: realEstate.id,
    name: realEstate.name,
    description: realEstate.description ?? "",
    category: realEstate.category,
    type: realEstate.type,
    price: realEstate.price,
    discountedPrice: realEstate.discountedPrice ?? 0,
    availability: realEstate.availability,
    saleStatus: realEstate.saleStatus,

    bedrooms: realEstate.bedrooms ?? 0,
    bathrooms: realEstate.bathrooms ?? 0,
    furnished: realEstate.furnished ?? false,
    rooms: realEstate.rooms ?? 0,
    parcelSize: realEstate.parcelSize ?? 0,

    location: {
      city: (realEstate.location as any)?.city ?? "",
      neighborhood: (realEstate.location as any)?.neighborhood ?? "",
    },

    images: realEstate.images ?? [],
    starCount: realEstate.starCount ?? 0,
    views: realEstate.views ?? 0,

    createdAt: realEstate.createdAt
      ? new Date(realEstate.createdAt)
      : new Date(),
    updatedAt: realEstate.updatedAt ?? new Date(),
  }));

  return {
    immobiliers: data,
    totalPages: result.totalPages ?? 1,
    totalItems: result.totalItems ?? 0,
  };
}

export async function getRealEstateById(
  id: string
): Promise<RealEstate | null> {
  const realEstate: Immobilier | null =
    await RealEstateController.getRealEstateById(id);

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
    discountedPrice: realEstate.discountedPrice ?? 0,
    availability: realEstate.availability,
    saleStatus: realEstate.saleStatus,

    bedrooms: realEstate.bedrooms ?? 0,
    bathrooms: realEstate.bathrooms ?? 0,
    furnished: realEstate.furnished ?? false,
    rooms: realEstate.rooms ?? 0,
    parcelSize: realEstate.parcelSize ?? 0,

    location: {
      city: (realEstate.location as any)?.city ?? "",
      neighborhood: (realEstate.location as any)?.neighborhood ?? "",
    },

    images: realEstate.images ?? [],
    starCount: realEstate.starCount ?? 0,
    views: realEstate.views ?? 0,

    createdAt: realEstate.createdAt
      ? new Date(realEstate.createdAt)
      : new Date(),
    updatedAt: realEstate.updatedAt ?? new Date(),
  };
}

export async function getFilteredRealEstates(
  filters: {
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
  },
  pagination: {
    page?: number;
    pageSize?: number;
  }
) {
  try {
    const result = await RealEstateController.getFilteredRealEstates(
      filters,
      pagination
    );

    const data = result.immobiliers.map((realEstate) => ({
      id: realEstate.id,
      name: realEstate.name,
      description: realEstate.description ?? "",
      category: realEstate.category,
      type: realEstate.type,
      price: realEstate.price,
      discountedPrice: realEstate.discountedPrice ?? 0,
      availability: realEstate.availability,
      saleStatus: realEstate.saleStatus,

      bedrooms: realEstate.bedrooms ?? 0,
      bathrooms: realEstate.bathrooms ?? 0,
      furnished: realEstate.furnished ?? false,
      rooms: realEstate.rooms ?? 0,
      parcelSize: realEstate.parcelSize ?? 0,

      location: {
        city: (realEstate.location as any)?.city ?? "",
        neighborhood: (realEstate.location as any)?.neighborhood ?? "",
      },

      images: realEstate.images ?? [],
      starCount: realEstate.starCount ?? 0,
      views: realEstate.views ?? 0,

      createdAt: realEstate.createdAt
        ? new Date(realEstate.createdAt)
        : new Date(),
      updatedAt: realEstate.updatedAt ?? new Date(),
    }));

    return {
      immobiliers: data,
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
export async function getSimilarRealEstate(
  category: string,
  excludeId: string
) {
  const real_estates = await RealEstateController.getSimilarRealEstate(
    category,
    excludeId
  );
  return real_estates.map((realEstate) => ({
    id: realEstate.id,
    name: realEstate.name,
    description: realEstate.description ?? "",
    category: realEstate.category,
    type: realEstate.type,
    price: realEstate.price,
    discountedPrice: realEstate.discountedPrice ?? 0,
    availability: realEstate.availability,
    saleStatus: realEstate.saleStatus,

    bedrooms: realEstate.bedrooms ?? 0,
    bathrooms: realEstate.bathrooms ?? 0,
    furnished: realEstate.furnished ?? false,
    rooms: realEstate.rooms ?? 0,
    parcelSize: realEstate.parcelSize ?? 0,

    location: {
      city: (realEstate.location as any)?.city ?? "",
      neighborhood: (realEstate.location as any)?.neighborhood ?? "",
    },

    images: realEstate.images ?? [],
    starCount: realEstate.starCount ?? 0,
    views: realEstate.views ?? 0,

    createdAt: realEstate.createdAt
      ? new Date(realEstate.createdAt)
      : new Date(),
    updatedAt: realEstate.updatedAt ?? new Date(),
  }));
}

export async function getLatestRealEstates() {
  const real_estates = await RealEstateController.getLatestRealEstates();
  return real_estates.map((realEstate) => ({
    id: realEstate.id,
    name: realEstate.name,
    description: realEstate.description ?? "",
    category: realEstate.category,
    type: realEstate.type,
    price: realEstate.price,
    discountedPrice: realEstate.discountedPrice ?? 0,
    availability: realEstate.availability,
    saleStatus: realEstate.saleStatus,

    bedrooms: realEstate.bedrooms ?? 0,
    bathrooms: realEstate.bathrooms ?? 0,
    furnished: realEstate.furnished ?? false,
    rooms: realEstate.rooms ?? 0,
    parcelSize: realEstate.parcelSize ?? 0,

    location: {
      city: (realEstate.location as any)?.city ?? "",
      neighborhood: (realEstate.location as any)?.neighborhood ?? "",
    },

    images: realEstate.images ?? [],
    starCount: realEstate.starCount ?? 0,
    views: realEstate.views ?? 0,

    createdAt: realEstate.createdAt
      ? new Date(realEstate.createdAt)
      : new Date(),
    updatedAt: realEstate.updatedAt ?? new Date(),
  }));
}

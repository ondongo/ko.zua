export interface RealEstate {
    id: string;
    name: string;
    category: string;
    description?: string;
    type: string;
    createdAt: any;
    saleStatus: "RENT" | "SALE"; 
    location: {
      city: string;
      neighborhood: string;
    };
    price: number;
    features: {
      bedrooms: number;
      bathrooms: number;
      surface: string;
      furnished: boolean;
    };
    
    images: any;
    availability: boolean;
    starCount: number;
  }
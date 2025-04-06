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
  discountedPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  furnished?: boolean;
  rooms?: number;
  images: any;
  availability: boolean;
  parcelSize?: number;
  starCount: number;
  views: number;
  updatedAt: any;
}

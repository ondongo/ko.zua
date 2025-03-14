export interface Vehicle {
  id: string;
  name: string;
  description?: string;
  global: boolean;
  category: string;
  subcategory: string;
  type: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  availability: boolean;
  features: {
    mileage: string;
    fuel: string;
    transmission: string;
    seats: number;
    abs: boolean;
    cruiseControl: boolean;
    airBags: boolean;
    airConditioner: boolean;
  };
  location: {
    city: string;
    neighborhood: string;
  };
  images: string[];
  totalStars: number;
  starCount: number;
  doors: number;
  distance: string;
  gearBox: String;
  fuel: String;
}

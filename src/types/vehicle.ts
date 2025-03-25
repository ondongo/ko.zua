export interface Vehicle {
  id: string;
  name: string;
  createdAt: any;
  description?: string;
  global: boolean;
  category: string;
  type: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  availability: boolean;
  features: {
    mileage: string; // Le type reste 'string' pour 'mileage'
    fuel: string; // Le type reste 'string' pour 'fuel'
    transmission: string; // Le type reste 'string' pour 'transmission'
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
  images: any;
  starCount: number;
  doors: number;
  distance: string;
  gearBox: string; // Corrigé en string au lieu de 'String'
  fuel: string; // Corrigé en string au lieu de 'String'
  condition?: string; // Ajout de condition comme optionnel (Neuf ou Occasion)
  saleStatus: "RENT" | "SALE"; // Ajout du statut de vente avec valeurs possibles
}

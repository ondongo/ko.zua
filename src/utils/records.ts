export const categoriesRealEstate = [
  { value: "", label: "Faire le choix d'une catégorie." },
  { value: "Land", label: "Parcelle / Terrain" },
  { value: "House", label: "Maison / Bâtiment" },
];

export const typesRealEstate = [
  { value: "", label: "Faire le choix d'un type de bien" },
  { value: "villa", label: "Villa" },
  { value: "studio", label: "Studio" },
  { value: "appartement", label: "Appartement" },
  { value: "immeuble", label: "Immeuble" },
  { value: "chambre", label: "Chambre" },
  { value: "duplex", label: "Duplex" },
  { value: "triplex", label: "Triplex" },
  { value: "maison plain-pied", label: "Maison plain-pied" },
  { value: "maison à étage", label: "Maison à étage" },
  { value: "terrain constructible", label: "Terrain constructible" },
  { value: "terrain agricole", label: "Terrain agricole" },
];

export const quartiersPointeNoire = [
  "Loandjili",
  "Fond Tié-Tié",
  "Ngoyo",
  "Mpaka",
  "Siafoumou",
  "Vonvon",
];

export const quartiersBrazzaville = [
  "Centre-ville",
  "Plateaux",
  "Makélékélé",
  "Talangaï",
  "Ouenze",
  "Kinkala",
];

export const featureLabels: Record<string, string> = {
  airConditioner: "Climatisation",
  airBags: "Airbags",
  abs: "Système ABS",
  cruiseControl: "Régulateur de vitesse",
};

export const categoryOptions = [
  { value: "", label: "Faire le choix de la catégorie" },
  { value: "Citadine", label: "Citadine" },
  { value: "Suv", label: "Suv" },
  { value: "4x4", label: "4x4" },
  { value: "Berline", label: "Berline" },
  { value: "Camionnette", label: "Camionnette" },
];

export const saleStatusOptions = [
  { value: "", label: "Faire le choix du statut de vente" },
  { value: "RENT", label: "Location" },
  { value: "SALE", label: "Vente" },
];

export const conditionOptions = [
  { value: "", label: "Faire le choix de l'état" },
  { value: "Neuf", label: "Neuf" },
  { value: "Occasion", label: "Occasion" },
];

export const fuelOptions = [
  { value: "", label: "Faire le choix du carburant" },
  { value: "Essence", label: "Essence" },
  { value: "Diesel", label: "Diesel" },
  { value: "Électrique", label: "Électrique" },
  { value: "Hybride", label: "Hybride" },
];

export const gearBoxOptions = [
  { value: "", label: "Faire le choix de la boîte de vitesses" },
  { value: "Manuel", label: "Manuel" },
  { value: "Automatique", label: "Automatique" },
];

export const locationOptions = [
  { value: "", label: "Faire le choix de la localisation" },
  { value: "Pointe-Noire", label: "Pointe-Noire" },
  { value: "Brazzaville", label: "Brazzaville" },
];

export const stepsRealEstate = [
  "Informations générales",
  "Détails de la propriété",
  "Caractéristiques & Images",
  "Validation des informations",
];
export const steps = [
  "Informations générales",
  "Détails du véhicule",
  "Caractéristiques & Images",
  "Validation des informations",
];

export const countryFormats: Record<string, string> = {
  sn: "+221 77 777 77 77", // Sénégal 🇸🇳
  ga: "+241 06 12 34 56", // Gabon 🇬🇦
  cg: "+242 06 123 45 67", // Congo 🇨🇬
};

export const getPlaceholder = (country: string) => {
  return countryFormats[country] || "Entrez votre numéro";
};

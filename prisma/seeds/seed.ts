const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Données pour les véhicules
  const vehicles = [
    {
      name: "Citroën C4",
      description: "Une voiture compacte et confortable, idéale pour la ville.",
      global: false,
      category: "Suv",
      type: "Car",
      brand: "Citroën",
      model: "C4",
      year: 2024,
      price: 15000, // Prix en FCFA
      discountedPrice: null, // Optionnel
      availability: true,
      features: {
        airConditioner: true,
        airBags: true,
        abs: true,
        cruiseControl: true
      },
      location: { city: "Brazzaville", country: "Congo" },
      images: [
        "https://cdn-drivek-datak.motork.net/configurator-imgs/cars/fr/$original$/CITROEN/C4/48875_HATCHBACK-5-DOORS/citroen-c4-front-view.jpg",
        "https://www.automoli.com/common/vehicles/_assets/img/gallery/f38/citroen-c4-iii-phase-ii-2024.jpg"
      ],
      seats: 5,
      starCount: 5,
      gearBox: "Automatic",
      fuel: "Petrol",
      doors: 4,
      distance: "500 km",
      saleStatus: "RENT", // Statut de vente (Location ou Vente)
      views: 0 // Nombre de vues
    },
    {
      name: "Citroën C4 Picasso",
      description: "Un monospace spacieux pour la famille et les longs trajets.",
      global: false,
      category: "Berline",
      type: "Car",
      brand: "Citroën",
      model: "C4 Picasso",
      year: 2019,
      price: 20000,
      discountedPrice: 18000, // Prix après réduction
      availability: true,
      features: {
        airConditioner: true,
        airBags: true,
        abs: true,
        cruiseControl: true
      },
      location: { city: "Pointe-Noire", country: "Congo" },
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/9/92/2009_Citroen_C4_Picasso_5_Exclusive_HDi_S-A_2.0_Front.jpg"
      ],
      seats: 7,
      starCount: 3,
      gearBox: "Automatic",
      fuel: "Diesel",
      doors: 5,
      distance: "600 km",
      saleStatus: "RENT",
      views: 0
    },
    {
      name: "Citroën C4X",
      description: "Une berline élégante et confortable pour la route.",
      global: false,
      category: "4x4",
      type: "Car",
      brand: "Citroën",
      model: "C4X",
      year: 2022,
      price: 25000,
      discountedPrice: null,
      availability: true,
      features: {
        airConditioner: true,
        airBags: true,
        abs: true,
        cruiseControl: true
      },
      location: { city: "Dolisie", country: "Congo" },
      images: [
        "https://cdnwp.dealerk.com/4fb7c394/uploads/sites/2/2022/11/citroen-c4x-10-1-scaled.jpg"
      ],
      seats: 5,
      starCount: 4,
      gearBox: "Automatic",
      fuel: "Petrol",
      doors: 4,
      distance: "700 km",
      saleStatus: "RENT",
      views: 0
    },
    {
      name: "Dacia Lodgy",
      description: "Un véhicule polyvalent pour les familles et les groupes.",
      global: false,
      category: "Berline",
      type: "Car",
      brand: "Dacia",
      model: "Lodgy",
      year: 2020,
      price: 18000,
      discountedPrice: 17000, // Prix après réduction
      availability: true,
      features: {
        airConditioner: true,
        airBags: true,
        abs: true,
        cruiseControl: true
      },
      location: { city: "Ouesso", country: "Congo" },
      images: [
        "https://i.gaw.to/content/photos/15/17/151743_Dacia_Lodgy_une_gamme_en_pleine_evolution.jpg?1024x640"
      ],
      seats: 7,
      starCount: 4,
      gearBox: "Manual",
      fuel: "Diesel",
      doors: 5,
      distance: "650 km",
      saleStatus: "RENT",
      views: 0
    }
  ];

  // Données pour les biens immobiliers
  const immobiliers = [
    {
      name: "Maison à vendre à Brazzaville",
      description: "Maison spacieuse avec 4 chambres et un grand jardin.",
      category: "House",
      type: "Appartement",
      brand: "Privée",
      model: "Moderne",
      price: 35000000, // Prix en FCFA
      discountedPrice: 33000000, // Prix après réduction
      availability: true,
      features: {
        airConditioner: true,
        pool: true,
        garden: true,
        garage: true
      },
      location: { city: "Brazzaville", country: "Congo" },
      images: [
        "https://static.wixstatic.com/media/1e390e_3962435691774a2f87bac5da772e3e79~mv2.jpg/v1/fill/w_960,h_720,al_c,q_85/IMG-20220923-WA0026.jpg"
      ],
      rooms: 4,
      starCount: 3,
      parcelSize: 300, // Taille de la parcelle en m²
      saleStatus: "SALE", // Statut de vente
      views: 0
    },
    {
      name: "Terrain à vendre à Pointe-Noire",
      description: "Terrain plat avec vue sur la mer, idéal pour un projet immobilier.",
      category: "Land",
      type: "Terrain",
      brand: "Terrain",
      model: "Commercial",
      price: 10000000,
      discountedPrice: null,
      availability: true,
      features: {
        access: true,
        view: "Sea",
        area: "5000 m²"
      },
      location: { city: "Pointe-Noire", country: "Congo" },
      images: [
        "https://static.wixstatic.com/media/1e390e_3962435691774a2f87bac5da772e3e79~mv2.jpg/v1/fill/w_960,h_720,al_c,q_85/IMG-20220923-WA0026.jpg"
      ],
      rooms: 0,
      starCount: 5,
      parcelSize: 5000,  // Taille du terrain en m²
      saleStatus: "SALE", // Statut de vente
      views: 0
    }
  ];

  // Insérer les véhicules et les immobiliers
  await prisma.vehicle.createMany({ data: vehicles });
  await prisma.immobilier.createMany({ data: immobiliers });

  console.log("🚗🚀 4 véhicules et 2 biens immobiliers ajoutés avec succès !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

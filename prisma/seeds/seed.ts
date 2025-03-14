const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const vehicles = [
    {
      name: "Citroën C4",
      description: "Une voiture compacte et confortable, idéale pour la ville.",
      global: false,
      category: "Hatchback",
      subcategory: "Compact",
      type: "Car",
      brand: "Citroën",
      model: "C4",
      year: 2024,
      pricePerDay: 15000, // Prix en FCFA
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
      totalStars: 50,
      starCount: 10,
      gearBox: "Automatic",
      fuel: "Petrol",
      doors: 4,
      distance: "500 km"
    },
    {
      name: "Citroën C4 Picasso",
      description: "Un monospace spacieux pour la famille et les longs trajets.",
      global: false,
      category: "Minivan",
      subcategory: "Family",
      type: "Car",
      brand: "Citroën",
      model: "C4 Picasso",
      year: 2019,
      pricePerDay: 20000,
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
      totalStars: 60,
      starCount: 15,
      gearBox: "Automatic",
      fuel: "Diesel",
      doors: 5,
      distance: "600 km"
    },
    {
      name: "Citroën C4X",
      description: "Une berline élégante et confortable pour la route.",
      global: false,
      category: "Sedan",
      subcategory: "Luxury",
      type: "Car",
      brand: "Citroën",
      model: "C4X",
      year: 2022,
      pricePerDay: 25000,
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
      totalStars: 75,
      starCount: 18,
      gearBox: "Automatic",
      fuel: "Petrol",
      doors: 4,
      distance: "700 km"
    },
    {
      name: "Dacia Lodgy",
      description: "Un véhicule polyvalent pour les familles et les groupes.",
      global: false,
      category: "Minivan",
      subcategory: "Family",
      type: "Car",
      brand: "Dacia",
      model: "Lodgy",
      year: 2020,
      pricePerDay: 18000,
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
      totalStars: 65,
      starCount: 14,
      gearBox: "Manual",
      fuel: "Diesel",
      doors: 5,
      distance: "650 km"
    }
  ];

  await prisma.vehicle.createMany({ data: vehicles });

  console.log("🚗🚀 4 véhicules ajoutés avec succès !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email("zodEmailError"),
  password: z.string().min(8, "zodPasswordError"),
});


export type AuthType = z.infer<typeof AuthSchema>;



export const vehicleSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  condition: z.string().optional(),
  brand: z.string().min(1, "La marque est requise"),
  model: z.string().min(1, "Le modèle est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  year: z.number().int().min(1900, "Année invalide"),
  price: z.number().positive("Le prix doit être positif"),
  discountedPrice: z.number().optional(),
  fuel: z.string().min(1, "Le carburant est requis"),
  gearBox: z.string().min(1, "La boîte de vitesses est requise"),
  seats: z.number().int().positive("Nombre de sièges invalide"),
  doors: z.number().int().positive("Nombre de portes invalide"),
  distance: z.string().optional(),
  availability: z.boolean(),
  saleStatus: z.enum(["RENT", "SALE"]),
  location: z.string().optional(),
  images: z.array(z.instanceof(File)).refine(files => files.length > 0, {
    message: "Au moins une image est requise",
  }),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;

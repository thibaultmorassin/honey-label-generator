import { z } from "zod";

export const labelFormSchema = z.object({
  productName: z.string().min(1, "Nom du produit est requis"),
  expirationDate: z.date({
    required_error: "Date d'expiration est requise",
    invalid_type_error: "Date d'expiration invalide",
  }),
  size: z.enum(["250g", "500g"], {
    invalid_type_error: "Taille invalide",
  }),
});

export type LabelFormData = z.infer<typeof labelFormSchema>;

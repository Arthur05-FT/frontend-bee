import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().nonempty("Email requis.").email("Email invalide."),
});

export const signUpSchema = z.object({
  nom: z.string().nonempty("Nom requis.").max(70, "Le nom est trop long."),
  prenom: z
    .string()
    .nonempty("Prénom requis.")
    .max(70, "Prénom est trop long."),
  email: z.string().nonempty("Email requis.").email("Email invalide."),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;

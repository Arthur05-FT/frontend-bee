"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpSchema,
  SignUpFormData,
} from "@/lib/validations/auth.validation";
import { Apple } from "@/components/icons/apple";
import { Google } from "@/components/icons/google";
import { Phone } from "@/components/icons/phone";
import { TiktokCircle } from "@/components/icons/tiktok";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Spinner } from "@/components/ui/spinner";

const SignUpComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log("✅ Données valides :", data);
    // ici tu peux envoyer les données à ton backend
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex justify-center px-10"
    >
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="w-full text-2xl">Inscrivez-vous</FieldLegend>
          <FieldDescription className="w-full mb-5">
            Rejoignez-nous dès aujourd&apos;hui ! Créez votre compte en quelques
            minutes.
          </FieldDescription>

          <FieldGroup>
            <Field orientation={"horizontal"} className="gap-4">
              <Field>
                <Input type="text" placeholder="Nom" {...register("nom")} />
                {errors.nom && (
                  <FieldDescription className="text-sm text-white">
                    {errors.nom.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <Input
                  type="text"
                  placeholder="Prénom"
                  {...register("prenom")}
                />
                {errors.prenom && (
                  <FieldDescription className="text-sm text-white">
                    {errors.prenom.message}
                  </FieldDescription>
                )}
              </Field>
            </Field>

            <Field className="flex flex-col">
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && (
                <FieldDescription className="text-sm text-white">
                  {errors.email.message}
                </FieldDescription>
              )}
            </Field>

            <Button type="submit" className="flex items-center bg-amber-500">
              {isSubmitting ? (
                <Spinner />
              ) : (
                <span className="flex items-center gap-2">
                  S&apos;inscrire
                  <ArrowRight size={20} />
                </span>
              )}
            </Button>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldGroup>
            <Button type="button" className="flex items-center gap-2">
              <Phone />
              <span>S&apos;inscrire avec un numéro</span>
            </Button>
            <Button type="button" className="flex items-center gap-2">
              <Apple />
              <span>S&apos;inscrire avec Apple</span>
            </Button>
            <Button type="button" className="flex items-center gap-2">
              <Google />
              <span>S&apos;inscrire avec Google</span>
            </Button>
            <Button type="button" className="flex items-center gap-2">
              <TiktokCircle />
              <span>S&apos;inscrire avec Tiktok</span>
            </Button>
          </FieldGroup>
        </FieldSet>

        <FieldDescription className="flex items-center justify-center gap-2 mb-10">
          <span>Vous avez déjà un compte ?</span>
          <Link href="/auth/sign-in">Se connecter</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
};

export default SignUpComponent;

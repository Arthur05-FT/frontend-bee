"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInSchema,
  SignInFormData,
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
import { useRouter } from "next/navigation";
import { sendOTP } from "@/lib/auth/send-otp";

const SignInComponent = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    await sendOTP({
      email: data.email,
      setError,
      router,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex justify-center px-10"
    >
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="w-full text-2xl">Connectez-vous</FieldLegend>
          <FieldDescription className="w-full mb-5">
            Connectez-vous à votre compte et profitez de nos services exclusifs.
          </FieldDescription>

          <FieldGroup>
            <Field>
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.email && (
                <FieldDescription className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </FieldDescription>
              )}
              {error && (
                <FieldDescription className="text-sm text-red-500 mt-1">
                  {error}
                </FieldDescription>
              )}
            </Field>
            <Button
              type="submit"
              className="flex items-center bg-amber-500 hover:bg-amber-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Spinner />
              ) : (
                <span className="flex items-center gap-2">
                  Se connecter
                  <ArrowRight size={20} />
                </span>
              )}
            </Button>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldGroup className="flex flex-col gap-2">
            <Button
              type="button"
              className="flex items-center gap-2"
              onClick={() => router.push("/auth/sign-in-phone")}
            >
              <Phone />
              <span>Se connecter avec un numéro</span>
            </Button>

            <Button
              type="button"
              className="flex items-center gap-2"
              // onClick={() => handleSocialSignIn("apple")}
            >
              <Apple />
              <span>Se connecter avec Apple</span>
            </Button>

            <Button
              type="button"
              className="flex items-center gap-2"
              // onClick={() => handleSocialSignIn("google")}
            >
              <Google />
              <span>Se connecter avec Google</span>
            </Button>

            <Button
              type="button"
              className="flex items-center gap-2"
              // onClick={() => handleSocialSignIn("tiktok")}
            >
              <TiktokCircle />
              <span>Se connecter avec TikTok</span>
            </Button>
          </FieldGroup>
        </FieldSet>

        <FieldDescription className="flex items-center gap-2 mb-10">
          <span>Vous n&apos;avez pas de compte ?</span>
          <Link href="/auth/sign-up">S&apos;inscrire</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
};

export default SignInComponent;

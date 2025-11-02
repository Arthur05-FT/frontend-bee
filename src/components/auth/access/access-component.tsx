"use client";

import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/ui/countdown";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const AccessComponent = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center px-10">
      <FieldGroup>
        <FieldSet>
          <div className="flex items-center gap-2 mb-4">
            <button
              type="button"
              onClick={() => router.push("/auth/sign-in")}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft size={20} />
            </button>
            <FieldLegend className="text-2xl">
              Entrez le code de vérification
            </FieldLegend>
          </div>
          <FieldDescription>
            Nous vous avons envoyé un code de vérification à
          </FieldDescription>
          <FieldGroup>
            <Field>
              <div className="flex flex-col items-center gap-4">
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <Button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600"
                >
                  Vérifier
                </Button>
              </div>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSet>
          <FieldDescription className="flex gap-2 items-center">
            <span>Vous n&apos;avez pas reçu le code?</span>
            <span className="text-gray-400 cursor-not-allowed">Renvoyer</span>
          </FieldDescription>
          <FieldDescription className="flex gap-1.5 items-center">
            Renvoi de code disponible dans <Countdown seconds={59} />
          </FieldDescription>
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

export default AccessComponent;

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
import Link from "next/link";
import React from "react";

const AccessComponent = () => {
  return (
    <form className="w-full flex justify-center px-10">
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="text-2xl">
            Entrez le code de vérification
          </FieldLegend>
          <FieldDescription>
            Nous vous avons envoyez un code de vérification à
            n********@gmail.com
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
                <Button className="w-full bg-amber-500">Vérifier</Button>
              </div>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSet>
          <FieldDescription className="flex gap-2 items-center">
            <span>Vous n&apos;avez pas reçu le code?</span>
            <Link href={"/"}>Renvoyer</Link>
          </FieldDescription>
          <FieldDescription className="flex gap-1.5 items-center">
            Renvoie de code disponible dans <Countdown seconds={59} />
          </FieldDescription>
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

export default AccessComponent;

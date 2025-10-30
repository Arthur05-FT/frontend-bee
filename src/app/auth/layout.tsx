import { HeaderSignInAndSignUp } from "@/components/layout/header";
import { FieldDescription } from "@/components/ui/field";
import Link from "next/link";
import React from "react";

export default function LayoutSignInAndSignUp({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
      <div className="w-full h-screen flex flex-col">
        <HeaderSignInAndSignUp />
        <div className="flex-1">{children}</div>
        <FieldDescription className="w-full mb-5 text-center px-4">
          En continuant, vous acceptez les{" "}
          <Link href={"/terms"}>conditions d&apos;utilisation</Link> et la{" "}
          <Link href={"/policy"}>politique de confidentialité</Link> de Bee.
        </FieldDescription>
      </div>
      <div className="w-1/2 hidden"></div>
    </div>
  );
}

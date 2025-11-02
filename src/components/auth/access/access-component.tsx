"use client";

import { useState, useEffect } from "react";
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
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft } from "lucide-react";
import { maskEmail } from "@/lib/shared/mask-email";
import { verifyOtp } from "@/lib/auth/verify-otp";
import { handleResendOtp } from "@/lib/auth/resend-otp";

const AccessComponent = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("pending_verification_email");
    if (!storedEmail) {
      router.push("/auth/sign-in");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const handleOtpComplete = async (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      await verifyOtp({
        otp: value,
        email,
        router,
        setIsVerifying,
        setError,
        setOtp,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      await verifyOtp({
        otp,
        email,
        setIsVerifying,
        setError,
        router,
        setOtp,
      });
    }
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
            Nous vous avons envoyé un code de vérification à {maskEmail(email)}
          </FieldDescription>
          <FieldGroup>
            <Field>
              <div className="flex flex-col items-center gap-4">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={handleOtpComplete}
                  disabled={isVerifying}
                >
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

                {error && (
                  <FieldDescription className="text-sm text-red-500">
                    {error}
                  </FieldDescription>
                )}

                <Button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600"
                  disabled={otp.length !== 6 || isVerifying}
                >
                  {isVerifying ? <Spinner /> : "Vérifier"}
                </Button>
              </div>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSet>
          <FieldDescription className="flex gap-2 items-center">
            <span>Vous n&apos;avez pas reçu le code?</span>
            {canResend ? (
              <button
                type="button"
                onClick={() =>
                  handleResendOtp({
                    email,
                    setIsResending,
                    setError,
                    setCanResend,
                  })
                }
                disabled={isResending}
                className="text-blue-500 hover:underline disabled:opacity-50 font-medium"
              >
                {isResending ? <Spinner /> : "Renvoyer"}
              </button>
            ) : (
              <span className="text-gray-400 cursor-not-allowed">Renvoyer</span>
            )}
          </FieldDescription>
          {!canResend && (
            <FieldDescription className="flex gap-1.5 items-center">
              Renvoi de code disponible dans{" "}
              <Countdown seconds={59} onComplete={() => setCanResend(true)} />
            </FieldDescription>
          )}
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

export default AccessComponent;
